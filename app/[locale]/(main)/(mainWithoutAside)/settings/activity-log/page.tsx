"use client";
import { useState } from "react";
import { Calendar, SettingsHeading, SettingsRouteText } from "@/components";
import Image from "next/image";
import styles from "./page.module.css";

const activities = [
  {
    image: "/assets/user.png",
    title: "You Liked Pabel’s post",
    visibility: "Public",
  },
  {
    image: "/assets/user.png",
    title: "You Commented on Nabil’s post",
    visibility: "Public",
  },
  {
    image: "/assets/user.png",
    title: "You Mentioned Pabel’s on your post",
    visibility: "Public",
  },
  {
    image: "/assets/user.png",
    title: "You Mentioned Pabel’s on Daniel’s post",
    visibility: "Public",
  },
  {
    image: "/assets/user.png",
    title: "You Followed John",
    visibility: "Only me • Hidden from Profile",
  },
];

export default function ActivityLog() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <SettingsRouteText>Activity Log</SettingsRouteText>
      <SettingsHeading>Activity Log</SettingsHeading>
      <div className={styles.dateWrapper}>
        <p className={styles.dateHeading}>Date:</p>
        <div
          className={styles.currentDateWrapper}
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <p className={styles.currentDate}>18/06/2001</p>
          <Image
            src="/assets/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
          />
        </div>

        <div
          className={[
            styles.calendar,
            showCalendar && styles.showCalendar,
          ].join(" ")}
        >
          <Calendar
            onClose={() => {}}
            onSave={() => {}}
            setValue={() => {}}
            save={"x"}
            cancel={"x"}
          />
        </div>
      </div>

      <div className={styles.activities}>
        {activities.map((activity) => (
          <div className={styles.activity}>
            <Image
              src={activity.image}
              alt="activity image"
              width={36}
              height={36}
              className={styles.userMobile}
            />
            <Image
              src={activity.image}
              alt="activity image"
              width={40}
              height={40}
              className={styles.userWeb}
            />
            <div>
              <h3 className={styles.title}>{activity.title}</h3>
              <p className={styles.body}>{activity.visibility}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
