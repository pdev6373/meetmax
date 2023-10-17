"use client";
import { useEffect, useState } from "react";
import { FetchType } from "@/types";
import axios from "axios";

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

export default function useAxios() {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const controller = new AbortController();

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
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status == 500)
          return { success: false, data: error.response?.data };
        return { success: true, data: error.response?.data };
      }
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
