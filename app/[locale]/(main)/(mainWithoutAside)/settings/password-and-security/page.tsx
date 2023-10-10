"use client";
import { useState } from "react";
import { Input, SettingsHeading, SettingsRouteText } from "@/components";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

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

  return (
    <>
      <SettingsRouteText>Password & Security</SettingsRouteText>
      <SettingsHeading>Where You're Logged In</SettingsHeading>

      <div className={styles.main}>
        <section className={styles.top}>
          <div className={styles.devices}>
            {devices.map((device) => (
              <div className={styles.device}>
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
        </section>

        <section className={styles.bottom}>
          <SettingsHeading>Change Password</SettingsHeading>

          <form className={styles.form}>
            <div className={styles.formInputs}>
              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>Current Password</p>
                <Input
                  icon=""
                  onChange={() => {}}
                  placeholder=""
                  type="password"
                  value={oldPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>New Password</p>
                <Input
                  icon=""
                  onChange={() => {}}
                  placeholder=""
                  type="password"
                  value={newPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <p className={styles.inputHeading}>Re-type new Password</p>
                <Input
                  icon=""
                  onChange={() => {}}
                  placeholder=""
                  type="password"
                  value={confirmNewPassword}
                />
              </div>
            </div>

            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>

            <div className={styles.buttonWrapper}>
              <button className={styles.button}>Save</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
