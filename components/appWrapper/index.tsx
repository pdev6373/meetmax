"use client";
import { useState, useEffect, useContext } from "react";
import { LayoutType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useRefreshToken } from "@/hooks";

export default function Appwrapper({ children }: LayoutType) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    accessToken: { accessToken, setAccessToken },
    userDetails: { setUserDetails },
    remember: { remember },
  } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();

        setAccessToken(response?.accessToken);
        setUserDetails(response?.userDetails);
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken && remember === "yes"
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [accessToken, refresh, remember, setAccessToken, setUserDetails]);

  return remember === "no" ? (
    <>{children}</>
  ) : isLoading ? (
    <></>
  ) : (
    <>{children}</>
  );
}
