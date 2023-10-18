"use client";
import { useEffect, useState, useContext } from "react";
import { FetchType } from "@/types";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { useRefreshToken } from ".";

type DataType = {
  success: boolean;
  message: string;
  data: any;
};

const axiosReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [previousRequest, setPreviousRequest] = useState<any>({});

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
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          setIsFirstRequest(false);
          refresh();
          setPreviousRequest(prevRequest);
          return;
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestIntercept);
      axiosReq.interceptors.response.eject(responseIntercept);
    };
  }, []);

  useEffect(() => {
    if (!isFirstRequest) {
      setPreviousRequest((prev: any) => ({
        ...prev,
        headers: {
          ...prev.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }));
    }
  }, [isFirstRequest, accessToken]);

  useEffect(() => {
    previousRequest && axiosReq(previousRequest);
  }, [previousRequest]);

  useEffect(() => {
    if (isMounted) return;

    return () => {
      controller.abort();
    };
  }, [isMounted]);

  const fetchData = async ({
    url,
    method = "GET",
    payload = null,
  }: FetchType) => {
    try {
      setLoading(true);
      setIsMounted(true);

      const response = await axiosReq({
        method: method,
        url: url,
        data: payload,
        signal: controller.signal,
      });

      const data: DataType = response.data;
      return { success: true, data };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response?.data?.message)
            return { success: true, data: error.response?.data };
          return {
            success: false,
            data: { success: false, message: error.response?.statusText },
          };
        }
        return {
          success: false,
          data: { success: false, message: error.message },
        };
      }

      return {
        success: false,
        data: { success: false, message: error.message },
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
