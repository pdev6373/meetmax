"use client";
import { useEffect, useState, useContext } from "react";
import { DataType, FetchType } from "@/types";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { useRefreshToken } from ".";

const axiosReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export default function useAxiosPrivate() {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const controller = new AbortController();
  const refresh = useRefreshToken();
  const {
    accessToken: { accessToken },
  } = useContext(AuthContext);
  const [isRequestMade, setIsRequestMade] = useState(false);

  useEffect(() => {
    const requestIntercept = axiosReq.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isRequestMade) return;
        const prevRequest = error?.config;

        if (
          error?.response?.status === 403 &&
          !prevRequest?.sent &&
          !isRequestMade
        ) {
          prevRequest.sent = true;
          setIsRequestMade(true);
          const { accessToken } = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          // return await fetchData({
          //   method: prevRequest.method,
          //   url: prevRequest.url,
          //   payload: prevRequest.data,
          //   contentType: prevRequest.headers["Content-Type"],
          //   token: accessToken,
          // });
          return axiosReq(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestIntercept);
      axiosReq.interceptors.response.eject(responseIntercept);
    };
  }, []);

  // useEffect(() => {
  //   if (isMounted) return;

  //   return () => {
  //     controller.abort();
  //   };
  // }, [isMounted]);

  const fetchData = async ({
    url,
    method = "GET",
    payload = null,
    contentType = "application/json",
    token = "",
  }: FetchType) => {
    try {
      setLoading(true);
      setIsMounted(true);

      const response = await axiosReq({
        method: method,
        url: url,
        data: payload,
        headers: {
          "Content-Type": contentType,
          Authorization: token ? `Bearer ${token}` : null,
        },
        signal: controller.signal,
      });

      const data: DataType = response.data;
      return { success: true, data };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response?.data?.message)
            return {
              success: true,
              data: {
                success: false,
                message: error.response?.data?.message,
                data: [],
              } as DataType,
            };
          return {
            success: false,
            data: {
              success: false,
              message: "An error occurred",
              data: [],
            } as DataType,
          };
        }
        return {
          success: false,
          data: {
            success: false,
            message: "An error occurred",
            data: [],
          } as DataType,
        };
      }

      return {
        success: false,
        data: {
          success: false,
          message: "An error occurred",
          data: [],
        } as DataType,
      };
    } finally {
      setLoading(false);
      setIsMounted(false);
    }
  };

  return {
    fetchData,
    loading,
  };
}
