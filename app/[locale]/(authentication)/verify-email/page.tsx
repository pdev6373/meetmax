"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useAxios } from "@/hooks";
import { useRouter } from "next/navigation";
import { Alert } from "@/components";

export default function ResetPassword({ searchParams }: any) {
  const { fetchData } = useAxios();
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState(true);
  const [makeRequest, setMakeRequest] = useState(false);
  const { replace, push } = useRouter();

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  useEffect(() => {
    if (!searchParams.token) {
      replace("/login");
      return;
    }

    setMakeRequest(true);
  }, [searchParams]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => {
      setShowAlert("no");
      push("/login");
    }, 2000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    if (!makeRequest) return;

    const verifyEmail = async () => {
      const response = await fetchData({
        url: "/auth/verify",
        method: "POST",
        payload: {
          token: searchParams.token,
        },
      });

      if (!response?.success) {
        setError(true);
        setAlertMessage("An error occurred");
        toggleAlertHandler();
        return;
      }

      if (response?.success && !response?.data) {
        setError(true);
        toggleAlertHandler();
        return;
      }

      if (response?.success && !response?.data?.success) {
        setError(true);
        setAlertMessage(response?.data?.message);
        toggleAlertHandler();
        return;
      }

      setError(false);
      setAlertMessage(response?.data?.message);
    };

    verifyEmail();
  }, [searchParams, makeRequest]);

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={error}>
        {alertMessage}
      </Alert>
      <div className={styles.wrapper}>
        <Image src="/assets/spinner.svg" alt="spinner" width={32} height={32} />
      </div>
    </>
  );
}
