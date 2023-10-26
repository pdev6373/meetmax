"use client";
import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Input,
  SettingsHeading,
  SettingsRouteText,
  Text,
} from "@/components";
import styles from "./index.module.css";
import { useAxios } from "@/hooks";
import useUserReq from "@/helpers/useUserReq";
import { PasswordAndSecurity } from "@/types";

const devices = [
  {
    icon: "/assets/pc.svg",
    type: "Windows PC",
    location: "Dhaka, Bangladesh",
    app: "Chrome",
    timeAgo: "Active Now",
  },
  {
    icon: "/assets/laptop.svg",
    type: "Windows Laptop",
    location: "Dhaka, Bangladesh",
    app: "Chrome",
    timeAgo: "53 minutes ago",
  },
  {
    icon: "/assets/mobile.svg",
    type: "Huawei GT3",
    location: "Dhaka, Bangladesh",
    app: "Chrome",
    timeAgo: "March 31 at 6:40 PM",
  },
  {
    icon: "/assets/tab.svg",
    type: "Samsung Tab",
    location: "Dhaka, Bangladesh",
    app: "Chrome",
    timeAgo: "Active Now",
  },
];

export default function PasswordAndSecurity({
  changePasswordText,
  currentPasswordText,
  forgotPasswordText,
  newPasswordText,
  retypePasswordText,
  save,
  errorText,
  successText,
  confirmPasswordError,
  defaultError,
  invalidOldPassword,
  passwordError,
}: PasswordAndSecurity) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { fetchData } = useAxios();
  const {
    changePassword: { loading, makeRequest },
  } = useUserReq();
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [danger, setDanger] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "old-password" | "new-password" | "confirm-new-password" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [oldPassword, newPassword, confirmNewPassword]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  const handleForgotPassword = async () => {
    try {
      await fetchData({
        url: "/auth/logout",
      });

      window?.location?.replace?.("/forgot-password");
    } catch (error: any) {
      console.error(error);
    }
  };

  const changePasswordHandler = async (e: any) => {
    e?.preventDefault();

    if (!oldPassword) {
      setErrorComponentToShow("old-password");
      setErrorMessage(defaultError);
      return;
    }

    if (oldPassword.length < 8) {
      setErrorComponentToShow("old-password");
      setErrorMessage(passwordError);
      return;
    }

    if (!newPassword) {
      setErrorComponentToShow("new-password");
      setErrorMessage(defaultError);
      return;
    }

    if (newPassword.length < 8) {
      setErrorComponentToShow("new-password");
      setErrorMessage(passwordError);
      return;
    }

    if (!confirmNewPassword) {
      setErrorComponentToShow("confirm-new-password");
      setErrorMessage(defaultError);
      return;
    }

    if (confirmNewPassword.length < 8) {
      setErrorComponentToShow("confirm-new-password");
      setErrorMessage(passwordError);
      return;
    }

    if (confirmNewPassword.length < 8) {
      setErrorComponentToShow("confirm-new-password");
      setErrorMessage(passwordError);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorComponentToShow("confirm-new-password");
      setErrorMessage(confirmPasswordError);
      return;
    }

    const response = await makeRequest(oldPassword, newPassword);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(errorText);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(successText);
    toggleAlertHandler();
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={danger}>
        {alertMessage}
      </Alert>

      <SettingsRouteText>Password & Security</SettingsRouteText>
      {/* <SettingsHeading>{`Where You're Logged In`}</SettingsHeading> */}

      <div className={styles.main}>
        {/* <section className={styles.top}>
          <div className={styles.devices}>
            {devices.map((device, index) => (
              <div className={styles.device} key={index}>
                <div className={styles.deviceIconWrapper}>
                  <Image
                    src={device.icon}
                    alt="device icon"
                    fill
                    className={styles.deviceIcon}
                  />
                </div>

                <div className={styles.textWrapper}>
                  <p
                    className={styles.textTop}
                  >{`${device.type} · ${device.location}`}</p>
                  <p
                    className={styles.textBottom}
                  >{`${device.app} •${device.timeAgo}`}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.seeAll}>See All</p>
        </section> */}

        <section className={styles.bottom}>
          <SettingsHeading>{changePasswordText}</SettingsHeading>

          <form className={styles.form} onSubmit={changePasswordHandler}>
            <div className={styles.formInputs}>
              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>{currentPasswordText}</p>
                <Input
                  icon=""
                  onChange={setOldPassword}
                  placeholder=""
                  type="password"
                  value={oldPassword}
                  errorComponent={
                    errorComponentToShow === "old-password" ? (
                      <Text type="error">{errorMessage}</Text>
                    ) : null
                  }
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>{newPasswordText}</p>
                <Input
                  icon=""
                  onChange={setNewPassword}
                  placeholder=""
                  type="password"
                  value={newPassword}
                  errorComponent={
                    errorComponentToShow === "new-password" ? (
                      <Text type="error">{errorMessage}</Text>
                    ) : null
                  }
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>{retypePasswordText}</p>
                <Input
                  icon=""
                  onChange={setConfirmNewPassword}
                  placeholder=""
                  type="password"
                  value={confirmNewPassword}
                  errorComponent={
                    errorComponentToShow === "confirm-new-password" ? (
                      <Text type="error">{errorMessage}</Text>
                    ) : null
                  }
                />
              </div>
            </div>

            <p className={styles.forgotPassword} onClick={handleForgotPassword}>
              {forgotPasswordText}
            </p>

            <div className={styles.buttonWrapper}>
              <Button
                onClick={changePasswordHandler}
                type="submit"
                disabled={loading}
                isLoading={loading}
                variation="small"
              >
                {save}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
