"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Alert, Button, Input, Text, Wrapper } from "..";
import { ResetPasswordFormType } from "@/types";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

export default function ResetPasswordForm({
  newPasswordPlaceholder,
  confirmNewPasswordPlaceholder,
  buttonText,
  backText,
  defaultError,
  passwordError,
  confirmPasswordError,
  token,
}: ResetPasswordFormType) {
  const router = useRouter();
  const {
    fields: { password, confirmPassword },
    setFields: { setPassword, setConfirmPassword },
  } = useContext(AuthContext);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "password" | "confirm-password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState(false);
  const { fetchData, loading } = useAxios();

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);

  useEffect(() => {
    setErrorMessage("");
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isPasswordChanged) {
      setTimeout(() => {
        setIsPasswordChanged(false);
        router.replace("/login");
      }, 1000);
    }
  }, [isPasswordChanged]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const resetPasswordHandler = async (e: any) => {
    e?.preventDefault();

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

    if (password !== confirmPassword) {
      setErrorComponentToShow("confirm-password");
      setErrorMessage(confirmPasswordError);
      return;
    }

    const response = await fetchData({
      url: "/auth/new-password",
      method: "PATCH",
      payload: {
        password,
        token,
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
    setIsPasswordChanged(true);
  };

  const togglePasswordHandler = () => setHidePassword((prev) => !prev);
  const toggleConfirmPasswordHandler = () =>
    setHideConfirmPassword((prev) => !prev);

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={error}>
        {alertMessage}
      </Alert>
      <Wrapper>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={resetPasswordHandler}>
            <div className={styles.inputs}>
              <Input
                type={hidePassword ? "password" : "text"}
                actionIcon={
                  hidePassword ? "/assets/eyeoff.svg" : "/assets/eye.svg"
                }
                icon="/assets/lock.svg"
                onChange={setPassword}
                value={password}
                placeholder={newPasswordPlaceholder}
                onActionIconClick={togglePasswordHandler}
                errorComponent={
                  errorComponentToShow === "password" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
              <Input
                type={hideConfirmPassword ? "password" : "text"}
                actionIcon={
                  hideConfirmPassword ? "/assets/eyeoff.svg" : "/assets/eye.svg"
                }
                icon="/assets/lock.svg"
                onChange={setConfirmPassword}
                value={confirmPassword}
                placeholder={confirmNewPasswordPlaceholder}
                onActionIconClick={toggleConfirmPasswordHandler}
                errorComponent={
                  errorComponentToShow === "confirm-password" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
            </div>

            <Button type="submit" isLoading={loading}>
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
