"use client";
import { useEffect, useState, useContext } from "react";
import { FetchType } from "@/types";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import useRefreshToken from "./useRefreshToken";

type DataType = {
  success: boolean;
  message: string;
  data: any;
};

const dataInitialValue: DataType = {
  success: false,
  message: "",
  data: [],
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
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(dataInitialValue);
  const [requestInfo, setRequestInfo] = useState<FetchType>({
    url: "",
    payload: null,
    method: "GET",
    credentials: "include",
  });
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
    if (!requestInfo.url) return;

    let isMounted = true;
    const controller = new AbortController();

    const makeRequest = async () => {
      try {
        setLoading(true);

        const response = await axiosReq({
          method: requestInfo.method,
          url: requestInfo.url,
          data: requestInfo.payload || null,
          signal: controller.signal,
        });

        if (isMounted) {
          setData(response.data);
          setSuccess(true);
        }
      } catch (err) {
        console.error(err);
        setSuccess(false);
        setData(dataInitialValue);
      } finally {
        setLoading(false);
      }
    };

    makeRequest();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [requestInfo]);

  const fetchData = ({
    url,
    method = "GET",
    payload,
    credentials = "include",
  }: FetchType) => {
    setRequestInfo({
      url,
      method,
      credentials,
      payload,
    });
  };

  return fetchData;
}
