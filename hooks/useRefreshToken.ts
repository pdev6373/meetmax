"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { useAxios } from ".";

export default function useRefreshToken() {
  const { fetchData, data, success } = useAxios();
  const {
    accessToken: { setAccessToken },
    userDetails: { setUserDetails },
  } = useContext(AuthContext);

  useEffect(() => {
    if (success && data.success) {
      setAccessToken(data?.data?.accessToken);
      setUserDetails(data?.data?.userDetails);
    }
  }, [success, data]);

  const refresh = () =>
    fetchData({
      url: "/auth/refresh",
      method: "GET",
    });

  return refresh;
}
