"use client";
import { useState } from "react";
import { NOTIFICATIONS } from "@/constants";
import Image from "next/image";
import styles from "./page.module.css";

export default function Notification() {
  const [showDot, setShowDot] = useState(true);
  const markAllAsReadHandler = () => setShowDot(false);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.heading}>Notification</h3>
        <button className={styles.markAsRead} onClick={markAllAsReadHandler}>
          Mark as read
        </button>
      </header>

      <div className={styles.notifications}>
        {NOTIFICATIONS.map((notification) => (
          <div className={styles.notification}>
            <div className={styles.notificationMain}>
              <Image
                src={`/assets/${
                  notification.type === "comment"
                    ? "comment-notification"
                    : notification.type === "follow"
                    ? "follow"
                    : "like-notification"
                }.svg`}
                alt="notification icon"
                width={16}
                height={16}
              />

              <div className={styles.notificationContent}>
                <Image
                  src={notification.image}
                  alt="notification image"
                  width={32}
                  height={32}
                  className={styles.notificationImage}
                />
                <Image
                  src={notification.image}
                  alt="notification image"
                  width={40}
                  height={40}
                  className={styles.notificationImageWeb}
                />
                <div>
                  <h3 className={styles.notificationTitle}>
                    {notification.title}
                  </h3>
                  <p className={styles.notificationTime}>{notification.time}</p>
                </div>
              </div>
            </div>

            <div className={styles.right}>
              {notification?.action ? (
                notification.action.isFollowing ? (
                  <button className={styles.followed}>Followed</button>
                ) : (
                  <button className={styles.followBack}>Follow Back</button>
                )
              ) : showDot ? (
                <div className={styles.dot}></div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
