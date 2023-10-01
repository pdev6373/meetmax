"use client";
import { SIDEBAR } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
import { Logo } from "..";

export default function Sidebar() {
  const pathname = usePathname();

  const isCurrentRoute = (route: string) =>
    pathname === route || (route.length > 1 && pathname.startsWith(route));

  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {SIDEBAR.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.route}
                className={[
                  styles.navLink,
                  isCurrentRoute(nav.route) && styles.navLinkActive,
                ].join(" ")}
              >
                <Image src={nav.icon} alt="nav icon" width={16} height={16} />
                <p
                  className={[
                    styles.navText,
                    isCurrentRoute(nav.route) && styles.navTextActive,
                  ].join(" ")}
                >
                  {nav.name}
                </p>
                {nav.name === "Notification" && (
                  <p className={styles.notificationNumber}>2</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
