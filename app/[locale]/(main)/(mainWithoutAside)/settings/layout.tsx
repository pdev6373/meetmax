"use client";
import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navs = [
  {
    name: "Edit Profile",
    icon: "/assets/profile.svg",
    route: "/edit-profile",
  },
  {
    name: "Language",
    icon: "/assets/language.svg",
    route: "/language",
  },
  {
    name: "Blocking",
    icon: "/assets/block.svg",
    route: "/blocking",
  },
  {
    name: "Notification",
    icon: "/assets/notification.svg",
    route: "/notification",
  },
  {
    name: "Password & Security",
    icon: "/assets/security.svg",
    route: "/password-and-security",
  },
  {
    name: "Activity Log",
    icon: "/assets/clock.svg",
    route: "/activity-log",
  },
  {
    name: "Viewing & Sharing",
    icon: "/assets/eye.svg",
    route: "/viewing-and-sharing",
  },
];

export default function MainLayout({ children }: LayoutType) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <nav
        className={[
          styles.nav,
          pathname !== "/settings" && styles.navHidden,
        ].join(" ")}
      >
        <ul className={styles.navList}>
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link href={`/settings/${nav.route}`} className={styles.navItem}>
                <Image src={nav.icon} alt="nav icon" width={16} height={16} />
                <p
                  className={[
                    styles.navText,
                    (pathname === `/settings${nav.route}` ||
                      (pathname === `/settings` &&
                        nav.route == "/edit-profile")) &&
                      styles.navTextActive,
                  ].join(" ")}
                >
                  {nav.name}
                </p>
                <Image
                  src="/assets/arrow-right.svg"
                  alt="nav arrow"
                  width={16}
                  height={16}
                  className={[
                    styles.arrowHidden,
                    (pathname === `/settings${nav.route}` ||
                      (pathname === `/settings` &&
                        nav.route == "/edit-profile")) &&
                      styles.arrowVisible,
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.main}>{children}</div>
    </div>
  );
}