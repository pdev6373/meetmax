"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Text, Wrapper } from "..";
import { ResetPasswordFormType } from "@/types";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";

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
    resetPassword: { loading, makeRequest },
  } = useContext(AuthContext);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "password" | "confirm-password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    setErrorMessage("");
  }, [password, confirmPassword]);

  useEffect(() => {
    console.log(isPasswordChanged);

    if (isPasswordChanged) {
      setIsPasswordChanged(false);
      router.replace("/login");
    }
  }, [isPasswordChanged]);

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

    const response = await makeRequest(token);

    console.log(response);

    if (!response.succeeded) return "An error occurred";
    if (!response.response.success) return response.response.message;

    setIsPasswordChanged(true);
  };

  const togglePasswordHandler = () => setHidePassword((prev) => !prev);
  const toggleConfirmPasswordHandler = () =>
    setHideConfirmPassword((prev) => !prev);

  return (
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
  );
}
