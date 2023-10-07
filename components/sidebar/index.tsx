"use client";
import { useState } from "react";
import { SIDEBAR } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "..";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const isCurrentRoute = (route: string) =>
    pathname === route || (route.length > 1 && pathname.startsWith(route));
  const logoutPopupHandler = () => setShowLogout(true);
  const cancelLogoutHandler = () => setShowLogout(false);
  const logoutHandler = async () => {
    router.replace("/login");
    setShowLogout(false);
  };

  return (
    <>
      {showLogout && (
        <div className={styles.overlay}>
          <div className={styles.logoutWrapper}>
            <h3 className={styles.logoutHeading}>Logout</h3>
            <p className={styles.logoutText}>
              Are you sure you want to logout?
            </p>

            <div className={styles.logoutActions}>
              <button
                className={styles.logoutCancel}
                onClick={cancelLogoutHandler}
              >
                Cancel
              </button>
              <button className={styles.logoutProceed} onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {SIDEBAR.map((nav) => (
              <li key={nav.name} className={styles.sideNavList}>
                {nav.route ? (
                  <Link
                    href={nav.route}
                    className={[
                      styles.navLink,
                      isCurrentRoute(nav.route) &&
                        !showLogout &&
                        styles.navLinkActive,
                    ].join(" ")}
                  >
                    <Image
                      src={nav.icon}
                      alt="nav icon"
                      width={14}
                      height={14}
                      className={styles.navIconSmall}
                    />
                    <Image
                      src={nav.icon}
                      alt="nav icon"
                      width={16}
                      height={16}
                      className={styles.navIcon}
                    />
                    <p
                      className={[
                        styles.navText,
                        isCurrentRoute(nav.route) &&
                          !showLogout &&
                          styles.navTextActive,
                      ].join(" ")}
                    >
                      {nav.name}
                    </p>
                    {nav.name === "Notification" && (
                      <p className={styles.notificationNumber}>2</p>
                    )}
                  </Link>
                ) : (
                  <div
                    onClick={logoutPopupHandler}
                    className={[
                      styles.navLink,
                      showLogout && styles.navLinkActive,
                    ].join(" ")}
                  >
                    <Image
                      src={nav.icon}
                      alt="nav icon"
                      width={14}
                      height={14}
                      className={styles.navIconSmall}
                    />
                    <Image
                      src={nav.icon}
                      alt="nav icon"
                      width={16}
                      height={16}
                      className={styles.navIcon}
                    />
                    <p
                      className={[
                        styles.navText,
                        showLogout && styles.navTextActive,
                      ].join(" ")}
                    >
                      {nav.name}
                    </p>
                    {nav.name === "Notification" && (
                      <p className={styles.notificationNumber}>2</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
