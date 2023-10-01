"use client";
import { useState, useEffect } from "react";
import { Input, Button, FormBottomText, Text } from "@/components";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginFormType } from "@/types";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "email" | "password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [email, password]);

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

    router.push("/");
  };
  const signupHandler = () => "/signup";
  const rememberHandler = () => setRemember((prev) => !prev);

  return (
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
            actionIcon={hidePassword ? "/assets/eyeoff.svg" : "/assets/eye.svg"}
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

      <Button type="submit">{signinText}</Button>

      <FormBottomText
        mainform
        actionType="link"
        text={noAccountText}
        actionText={signupText}
        onActionTextClick={signupHandler}
      />
    </form>
  );
}
