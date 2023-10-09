"use client";
import Image from "next/image";
import { Search, SettingsHeading, SettingsRouteText } from "@/components";
import styles from "./page.module.css";

const blockedUsers = [
  {
    image: "/assets/user.png",
    firstname: "David",
    lastname: "Taylor",
    dateBlocked: "26/05/2019",
  },
  {
    image: "/assets/user.png",
    firstname: "Talbo Mendiola",
    lastname: "Leah",
    dateBlocked: "16/05/2019",
  },
  {
    image: "/assets/user.png",
    firstname: "Evangelista",
    lastname: "Janel",
    dateBlocked: "26/05/2019",
  },
  {
    image: "/assets/user.png",
    firstname: "Wasmada Macaan",
    lastname: "Qanciyaha",
    dateBlocked: "26/05/2019",
  },
  {
    image: "/assets/user.png",
    firstname: "David",
    lastname: "Taylor",
    dateBlocked: "26/05/2019",
  },
];

export default function Blocking() {
  return (
    <>
      <SettingsRouteText>Blocking</SettingsRouteText>
      <SettingsHeading>Block users</SettingsHeading>
      <p className={styles.blockingText}>
        Once you block someone, that person can no longer see things you post on
        your timeline, tag you, invite you to events or groups, start a
        conversation with you, or add you as a friend. Note: Does not include
        apps, games or groups you both participate in
      </p>
      <div className={styles.maxWidth}>
        <Search
          placeholder="Type a name"
          onChange={() => {}}
          value=""
          reverse
        />
      </div>
      <SettingsHeading>Block users list</SettingsHeading>

      <div className={[styles.users, styles.maxWidth].join(" ")}>
        {blockedUsers.map((user, index) => (
          <div key={index} className={styles.user}>
            <div className={styles.userMain}>
              <Image
                src={user.image}
                alt="blocked user image"
                width={40}
                height={40}
                className={styles.userImageWeb}
              />
              <Image
                src={user.image}
                alt="blocked user image"
                width={36}
                height={36}
                className={styles.userImage}
              />

              <div className={styles.userTexts}>
                <p
                  className={styles.name}
                >{`${user.lastname} ${user.firstname}`}</p>
                <p className={styles.time}>{`Blocked •${user.dateBlocked}`}</p>
              </div>
            </div>

            <button className={styles.unblockButton}>Unblock</button>
          </div>
        ))}
      </div>
    </>
  );
}
