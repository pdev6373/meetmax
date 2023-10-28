"use client";
import { useState, useEffect, useContext } from "react";
import { Heading, Wrapper, FormBottomText, Button, Alert } from "@/components";
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
}: CheckMailType) {
  const router = useRouter();
  const { fetchData, loading } = useAxios();
  const {
    fields: { name, password, dateOfBirth, gender },
  } = useContext(AuthContext);
  const getDetails = () =>
    JSON.parse(localStorage.getItem("meetmax_email") || "false");
  const [details, setDetails] = useState({
    email: getDetails().email,
    type: getDetails().type,
  });
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState(true);

  useEffect(() => {
    const gottenDetails = getDetails();

    !gottenDetails.email
      ? router.replace("/login")
      : gottenDetails.type === "signup" && !name
      ? router.replace("/signup")
      : setDetails({
          email: gottenDetails.email,
          type: gottenDetails.type,
        });
  }, [name, router]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const resendEmailHandler = async () => {
    if (!details.email) {
      router.replace("/login");
      return;
    }

    if (details.type === "signup" && !name) {
      router.replace("/signup");
      return;
    }

    const response = await fetchData(
      details.type === "signup"
        ? {
            url: "/auth/register",
            method: "POST",
            payload: {
              email: details.email,
              firstname: name.split(" ")[0],
              lastname: name.split(" ").slice(1).join(" "),
              password,
              dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
              gender: gender,
            },
          }
        : {
            url: "/auth/forgot-password",
            method: "POST",
            payload: { email: details.email },
          }
    );

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
    toggleAlertHandler();
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={error}>
        {alertMessage}
      </Alert>
      <div className={styles.wrapper}>
        <Wrapper>
          <div className={styles.main}>
            <div className={styles.mainTop}>
              <div className={styles.header}>
                <Heading type="heading">{checkMailText}</Heading>

                {details.email ? (
                  <h3 className={styles.subHeading}>
                    {sendMailText}:{" "}
                    <span className={styles.subHeadingAccent}>
                      {details.email}
                    </span>
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
              onActionTextClick={resendEmailHandler}
              loading={loading}
            />
          </div>
        </Wrapper>
      </div>
    </>
  );
}
