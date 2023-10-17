"use client";
import { useState, useEffect, useContext } from "react";
import { Input, Button, FormBottomText, Text, Alert } from "@/components";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginFormType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

export default function LoginForm({
  emailPlaceholder,
  passwordPlaceholder,
  rememberText,
  forgotPasswordText,
  noAccountText,
  signupText,
  signinText,
  defaultError,
  emailError,
  passwordError,
}: LoginFormType) {
  const {
    fields: { email, password },
    setFields: { setEmail, setPassword },
    accessToken: { accessToken, setAccessToken },
    userDetails: { setUserDetails },
    remember: { remember, setRemember },
    resetFields,
  } = useContext(AuthContext);
  const { fetchData, loading } = useAxios();
  const [hidePassword, setHidePassword] = useState(true);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "email" | "password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    resetFields();
  }, []);

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [email, password]);

  useEffect(() => {
    accessToken && router.replace("/");
  }, [accessToken]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    localStorage.setItem("meetmax_remember", JSON.stringify(remember));
  }, [remember]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const signupHandler = () => "/signup";
  const rememberHandler = () => setRemember((prev) => !prev);
  const togglePasswordHandler = () => setHidePassword((prev) => !prev);

  const loginHandler = async (e: any) => {
    e?.preventDefault();

    if (!email) {
      setErrorComponentToShow("email");
      setErrorMessage(defaultError);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorComponentToShow("email");
      setErrorMessage(emailError);
      return;
    }

    if (!password) {
      setErrorComponentToShow("password");
      setErrorMessage(defaultError);
      return;
    }

    if (password.length < 8) {
      setErrorComponentToShow("password");
      setErrorMessage(passwordError);
      return;
    }

    const response = await fetchData({
      url: "/auth/login",
      method: "POST",
      payload: {
        email,
        password,
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

    setAlertMessage("");
    setUserDetails(response?.data?.data?.userDetails);
    setAccessToken(response?.data?.data?.accessToken);
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
      <form className={styles.form} onSubmit={loginHandler} noValidate>
        <div className={styles.formMain}>
          <div className={styles.formInput}>
            <Input
              type="email"
              icon="/assets/@.svg"
              onChange={setEmail}
              value={email}
              placeholder={emailPlaceholder}
              errorComponent={
                errorComponentToShow === "email" ? (
                  <Text type="error">{errorMessage}</Text>
                ) : null
              }
            />

            <Input
              type={hidePassword ? "password" : "text"}
              actionIcon={
                hidePassword ? "/assets/eyeoff.svg" : "/assets/eye.svg"
              }
              icon="/assets/lock.svg"
              onChange={setPassword}
              value={password}
              placeholder={passwordPlaceholder}
              onActionIconClick={togglePasswordHandler}
              errorComponent={
                errorComponentToShow === "password" ? (
                  <Text type="error">{errorMessage}</Text>
                ) : null
              }
            />
          </div>

          <div className={styles.formActions}>
            <div className={styles.remember} onClick={rememberHandler}>
              <Image
                src={remember ? "/assets/check.svg" : "/assets/uncheck.svg"}
                alt="checkbox"
                width={16}
                height={16}
              />
              <p className={styles.rememberText}>{rememberText}</p>
            </div>

            <Link href="/forgot-password" className={styles.forgotPassword}>
              {forgotPasswordText}
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={loading}>
          {signinText}
        </Button>

        <FormBottomText
          mainform
          actionType="link"
          text={noAccountText}
          actionText={signupText}
          onActionTextClick={signupHandler}
        />
      </form>
    </>
  );
}
