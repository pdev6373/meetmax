import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { EditProfile } from "@/components";

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

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <div>
        <nav>
          <ul>
            {navs.map((nav) => (
              <li>
                <Link href={nav.route} className={styles.navItem}>
                  <Image src={nav.icon} alt="nav icon" width={16} height={16} />
                  <p className={styles.navText}>{nav.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <EditProfile />
    </div>
  );
}
