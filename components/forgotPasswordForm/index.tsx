"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Alert, Button, Input, Text, Wrapper } from "..";
import styles from "./index.module.css";
import { ForgotPasswordFormType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

export default function ForgotPasswordForm({
  emailPlaceholder,
  buttonText,
  backText,
  defaultError,
  emailError,
}: ForgotPasswordFormType) {
  const router = useRouter();
  const {
    fields: { email },
    setFields: { setEmail },
  } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchData, loading } = useAxios();
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  const forgotPasswordHandler = async (e: any) => {
    e?.preventDefault();

    if (!email) {
      setErrorMessage(defaultError);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage(emailError);
      return;
    }

    const response = await fetchData({
      url: "/auth/forgot-password",
      method: "POST",
      payload: {
        email,
      },
    });

    if (!response?.success) {
      setAlertMessage("An error occurred");
      toggleAlertHandler();
      return;
    }

    if (response?.success && !response?.data) {
      toggleAlertHandler();
      return;
    }

    if (response?.success && !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    localStorage.setItem(
      "meetmax_email",
      JSON.stringify({ email, type: "forgot-password" })
    );
    router.push("/check-mail");
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
      <Wrapper>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={forgotPasswordHandler}>
            <Input
              type="email"
              icon="/assets/@.svg"
              placeholder={emailPlaceholder}
              value={email}
              onChange={setEmail}
              errorComponent={
                errorMessage ? <Text type="error">{errorMessage}</Text> : null
              }
            />
            <Button
              onClick={forgotPasswordHandler}
              type="submit"
              isLoading={loading}
            >
              {buttonText}
            </Button>
          </form>

          <Link href="/login" className={styles.goBack}>
            <Image
              src="/assets/back.svg"
              alt="back arrow"
              width={6}
              height={10}
            />
            <p className={styles.backText}>{backText}</p>
          </Link>
        </div>
      </Wrapper>
    </>
  );
}
