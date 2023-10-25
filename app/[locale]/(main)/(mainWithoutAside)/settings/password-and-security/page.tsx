"use client";
import { useState, useEffect, useContext } from "react";
import {
  Alert,
  Button,
  Input,
  SettingsHeading,
  SettingsRouteText,
} from "@/components";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";
import { useRouter } from "next/navigation";
import useUserReq from "@/helpers/useUserReq";

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

export default function PasswordAndSecurity() {
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

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

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

    if (oldPassword.length < 8 || newPassword.length < 8) {
      setAlertMessage("Password should be at least 8 characters");
      toggleAlertHandler();
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlertMessage("Password does not match");
      toggleAlertHandler();
      return;
    }

    const response = await makeRequest(oldPassword, newPassword);

    setAlertMessage(response?.data?.message);
    toggleAlertHandler();

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      return;
    }

    setDanger(false);
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
          <SettingsHeading>Change Password</SettingsHeading>

          <form className={styles.form} onSubmit={changePasswordHandler}>
            <div className={styles.formInputs}>
              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>Current Password</p>
                <Input
                  icon=""
                  onChange={setOldPassword}
                  placeholder=""
                  type="password"
                  value={oldPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>New Password</p>
                <Input
                  icon=""
                  onChange={setNewPassword}
                  placeholder=""
                  type="password"
                  value={newPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>Re-type new Password</p>
                <Input
                  icon=""
                  onChange={setConfirmNewPassword}
                  placeholder=""
                  type="password"
                  value={confirmNewPassword}
                />
              </div>
            </div>

            <p className={styles.forgotPassword} onClick={handleForgotPassword}>
              Forgot Password?
            </p>

            <div className={styles.buttonWrapper}>
              <Button
                onClick={changePasswordHandler}
                type="submit"
                disabled={loading}
                isLoading={loading}
                variation="small"
              >
                Save
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
