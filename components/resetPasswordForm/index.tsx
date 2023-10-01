"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Text, Wrapper } from "..";
import { ResetPasswordFormType } from "@/types";
import styles from "./index.module.css";

export default function ResetPasswordForm({
  newPasswordPlaceholder,
  confirmNewPasswordPlaceholder,
  buttonText,
  backText,
  defaultError,
  passwordError,
  confirmPasswordError,
}: ResetPasswordFormType) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "password" | "confirm-password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  useEffect(() => {
    setErrorMessage("");
  }, [password, confirmPassword]);

  const forgotPasswordHandler = async (e: any) => {
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

    router.push("/login");
  };

  const togglePasswordHandler = () => setHidePassword((prev) => !prev);
  const toggleConfirmPasswordHandler = () =>
    setHideConfirmPassword((prev) => !prev);

  return (
    <Wrapper>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={forgotPasswordHandler}>
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

          <Button onClick={forgotPasswordHandler} type="submit">
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
