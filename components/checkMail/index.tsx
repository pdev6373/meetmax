"use client";
import { Heading, Wrapper, FormBottomText, Button } from "@/components";
import styles from "./index.module.css";
import Link from "next/link";
import { CheckMailType } from "@/types";

export default function CheckMail({
  checkMailText,
  sendMailText,
  skipNowText,
  noEmailText,
  resendText,
}: CheckMailType) {
  const resendEmailHandler = () => {};

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.main}>
          <div className={styles.mainTop}>
            <div className={styles.header}>
              <Heading type="heading">{checkMailText}</Heading>

              <h3 className={styles.subHeading}>
                {sendMailText}:{" "}
                <span className={styles.subHeadingAccent}>ahmed@gmail.com</span>
              </h3>
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
            onActionTextClick={resendEmailHandler}
          />
        </div>
      </Wrapper>
    </div>
  );
}
