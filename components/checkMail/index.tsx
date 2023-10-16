"use client";
import { useState, useEffect, useContext } from "react";
import { Heading, Wrapper, FormBottomText, Button } from "@/components";
import styles from "./index.module.css";
import Link from "next/link";
import { CheckMailType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useAxios } from "@/hooks";
import format from "date-fns/format";

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
  const { data, fetchData, loading, success } = useAxios();
  const {
    fields: { email, name, password, dateOfBirth, gender },
  } = useContext(AuthContext);

  useEffect(() => {
    !email && router.replace("/signup");
  }, []);

  useEffect(() => {
    if (success && data.success) setEmailResent(true);
    else setEmailResent(false); // Error
  }, [success, data]);

  const resendEmailHandler = async () => {
    fetchData({
      url: "/auth/register",
      method: "POST",
      payload: {
        email,
        firstname: name.split(" ")[0],
        lastname: name.split(" ").slice(1).join(" "),
        password,
        dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
        gender: gender.label,
      },
    });
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
