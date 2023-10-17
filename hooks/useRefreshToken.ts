"use client";
import { useAxios } from ".";

export default function useRefreshToken() {
  const { fetchData } = useAxios();

  const refresh = async () => {
    const response = await fetchData({
      url: "/auth/refresh",
      method: "GET",
    });

    // if (!response?.success) return "Error";
    // if (!response?.data?.success) return "Error";

    // setAccessToken(response?.data?.data?.accessToken);
    // setUserDetails(response?.data?.data?.userDetails);

    return {
      accessToken: response?.data?.data?.accessToken,
      userDetails: response?.data?.data?.userDetails,
    };
  };

  return refresh;
}
