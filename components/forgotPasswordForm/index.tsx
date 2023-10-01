"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, Text, Wrapper } from "..";
import styles from "./index.module.css";
import { ForgotPasswordFormType } from "@/types";

export default function ForgotPasswordForm({
  emailPlaceholder,
  buttonText,
  backText,
  defaultError,
  emailError,
}: ForgotPasswordFormType) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

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

    router.push("/check-mail");
  };

  return (
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
