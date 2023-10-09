import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";

const navs = [
  {
    name: "Edit Profile",
    icon: "/assets/profile.svg",
    route: "edit-profile",
  },
  {
    name: "Language",
    icon: "/assets/language.svg",
    route: "language",
  },
  {
    name: "Blocking",
    icon: "/assets/block.svg",
    route: "blocking",
  },
  {
    name: "Notification",
    icon: "/assets/notification.svg",
    route: "notification",
  },
  {
    name: "Password & Security",
    icon: "/assets/security.svg",
    route: "password-and-security",
  },
  {
    name: "Activity Log",
    icon: "/assets/clock.svg",
    route: "activity-log",
  },
  {
    name: "Viewing & Sharing",
    icon: "/assets/eye.svg",
    route: "viewing-and-sharing",
  },
];

export default function MainLayout({ children }: LayoutType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.main}>
          <div className={styles.mainInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}
