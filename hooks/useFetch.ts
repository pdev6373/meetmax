"use client";
import { useState } from "react";
import { FetchType } from "@/types";

export default function useFetch() {
  const [loading, setLoading] = useState(false);

  const fetchData = async ({ url, method, payload }: FetchType) => {
    try {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
      ).json();

      return response;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchData,
    loading,
  };
}
