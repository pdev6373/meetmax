"use client";
import { useState, useEffect, useContext } from "react";
import { Heading, Wrapper, FormBottomText, Button } from "@/components";
import styles from "./index.module.css";
import Link from "next/link";
import { CheckMailType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function CheckMail({
  checkMailText,
  sendMailText,
  skipNowText,
  noEmailText,
  resendText,
  resendAgainText,
}: CheckMailType) {
  const router = useRouter();
  const [emailResent, setEmailResent] = useState(false);

  const {
    fields: { email },
    sendVerificationLink: { loading, makeRequest },
  } = useContext(AuthContext);

  useEffect(() => {
    !email && router.replace("/signup");
  }, []);

  const resendEmailHandler = async () => {
    const response = await makeRequest();

    if (!response.succeeded) {
      setEmailResent(false);
      return "An error occurred";
    }
    if (!response.response.success) {
      setEmailResent(false);
      return response.response.message;
    }

    setEmailResent(true);
  };

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.main}>
          <div className={styles.mainTop}>
            <div className={styles.header}>
              <Heading type="heading">{checkMailText}</Heading>

              {email ? (
                <h3 className={styles.subHeading}>
                  {sendMailText}:{" "}
                  <span className={styles.subHeadingAccent}>{email}</span>
                </h3>
              ) : (
                <h3 className={styles.subHeading}>{sendMailText}</h3>
              )}
            </div>

            <Link href="/login" className={styles.skipButton}>
              <Button type="submit">{skipNowText}</Button>
            </Link>
          </div>

          <FormBottomText
            mainform={false}
            actionType="button"
            text={noEmailText}
            actionText={resendText}
            actionTextTwo={resendAgainText}
            onActionTextClick={resendEmailHandler}
            loading={loading}
            showActionTextTwo={emailResent}
          />
        </div>
      </Wrapper>
    </div>
  );
}
