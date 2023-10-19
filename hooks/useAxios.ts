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
            return {
              success: true,
              data: {
                success: false,
                message: error.response?.data?.message,
                data: [] as DataType[],
              },
            };
          return {
            success: false,
            data: {
              success: false,
              message: "An error occurred",
              data: [] as DataType[],
            },
          };
        }
        return {
          success: false,
          data: {
            success: false,
            message: "An error occurred",
            data: [] as DataType[],
          },
        };
      }

      return {
        success: false,
        data: {
          success: false,
          message: "An error occurred",
          data: [] as DataType[],
        },
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
