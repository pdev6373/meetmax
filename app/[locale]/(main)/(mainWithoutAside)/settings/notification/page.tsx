"use client";
import { useState } from "react";
import Image from "next/image";
import { SettingsHeading, SettingsRouteText, Switch } from "@/components";
import styles from "./page.module.css";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      icon: "/assets/like-notification.svg",
      name: "Like",
      isActive: true,
    },
    {
      icon: "/assets/comment-notification.svg",
      name: "Comment",
      isActive: true,
    },
    {
      icon: "/assets/follow.svg",
      name: "Mention",
      isActive: true,
    },
    {
      icon: "/assets/post.svg",
      name: "Post",
      isActive: false,
    },
    {
      icon: "/assets/follow.svg",
      name: "Follow",
      isActive: false,
    },
  ]);

  return (
    <>
      <SettingsRouteText>Notifications</SettingsRouteText>
      <SettingsHeading>Notifications</SettingsHeading>
      <p className={styles.heading}>What Notifications You Receive</p>
      <div className={styles.notifications}>
        {notifications.map((notification) => (
          <div className={styles.notification} key={notification.name}>
            <div className={styles.notificationMain}>
              <Image
                src={notification.icon}
                alt="notification icon"
                width={16}
                height={16}
              />
              <p className={styles.notificationText}>{notification.name}</p>
            </div>

            <Switch
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((prevNotification) =>
                    prevNotification.name !== notification.name
                      ? prevNotification
                      : {
                          ...prevNotification,
                          isActive: !notification.isActive,
                        }
                  )
                )
              }
              state={notification.isActive ? "on" : "off"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
