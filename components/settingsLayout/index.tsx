"use client";
import { SettingsTextsType } from "@/types";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logout } from "@/components";

type MainLayoutType = {
  children: JSX.Element;
  locale: string;
  texts: SettingsTextsType;
};

export default function SettingsLayout({
  children,
  locale,
  texts,
}: MainLayoutType) {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const navs = [
    {
      name: texts.editProfile,
      icon: "/assets/profile.svg",
      route: "/edit-profile",
    },
    {
      name: texts.language,
      icon: "/assets/language.svg",
      route: "/language",
    },
    // {
    //   name: "Blocking",
    //   icon: "/assets/block.svg",
    //   route: "/blocking",
    // },
    // {
    //   name: "Notification",
    //   icon: "/assets/notification.svg",
    //   route: "/notification",
    // },
    {
      name: texts.passwordAndSecurity,
      icon: "/assets/security.svg",
      route: "/password-and-security",
    },
    // {
    //   name: "Activity Log",
    //   icon: "/assets/clock.svg",
    //   route: "/activity-log",
    // },
    {
      name: texts.viewingAndSharing,
      icon: "/assets/eye.svg",
      route: "/viewing-and-sharing",
    },
  ];

  const logoutPopupHandler = () => setShowLogout(true);
  const cancelLogoutHandler = () => setShowLogout(false);

  return (
    <>
      {showLogout && (
        <Logout
          onCancelLogout={cancelLogoutHandler}
          cancelText={texts.cancelText}
          confirmLogoutText={texts.logoutConfirmationText}
          logoutText={texts.logoutText}
        />
      )}
      <div className={styles.wrapper}>
        <nav
          className={[
            styles.nav,
            pathname !== `/${locale}/settings` && styles.navHidden,
          ].join(" ")}
        >
          <ul className={styles.navList}>
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  href={`/settings/${nav.route}`}
                  className={styles.navItem}
                >
                  <Image src={nav.icon} alt="nav icon" width={16} height={16} />

                  <p
                    className={[
                      styles.navText,
                      (pathname === `/${locale}/settings${nav.route}` ||
                        (pathname === `/${locale}/settings` &&
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
                      (pathname === `/${locale}/settings${nav.route}` ||
                        (pathname === `/${locale}/settings` &&
                          nav.route == "/edit-profile")) &&
                        styles.arrowVisible,
                    ].join(" ")}
                  />
                </Link>
              </li>
            ))}

            <li onClick={logoutPopupHandler} className={styles.logout}>
              <div className={styles.navItem}>
                <Image
                  src="/assets/logout.svg"
                  alt="nav icon"
                  width={16}
                  height={16}
                />
                <p
                  className={[
                    styles.navText,
                    pathname === `/${locale}/settings/logout` &&
                      styles.navTextActive,
                  ].join(" ")}
                >
                  {texts.logoutText}
                </p>
              </div>
            </li>
          </ul>
        </nav>

        <div
          className={[
            styles.main,
            pathname === `/${locale}/settings` && styles.mainNoDisplay,
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </>
  );
}
