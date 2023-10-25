"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
import { Logo, Logout } from "..";
import { SidebarTextsType } from "@/types";

type SidenavType = {
  locale: string;
  texts: SidebarTextsType;
};

export default function Sidenav({ locale, texts }: SidenavType) {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const SIDEBAR = [
    {
      name: texts.feedText,
      route: "/",
      icon: "/assets/dashboard.svg",
    },
    {
      name: texts.communityText,
      route: "/my-community",
      icon: "/assets/community.svg",
    },
    // {
    //   name: "Messages",
    //   route: "/messages",
    //   icon: "/assets/message.svg",
    // },
    {
      name: texts.notificationText,
      route: "/notification",
      icon: "/assets/notification.svg",
    },
    // {
    //   name: "Explore",
    //   route: "/explore",
    //   icon: "/assets/explore.svg",
    // },
    {
      name: texts.profileText,
      route: "/profile",
      icon: "/assets/profile.svg",
    },
    {
      name: texts.settingsText,
      route: "/settings",
      icon: "/assets/settings.svg",
    },
    {
      name: texts.logoutText,
      route: null,
      icon: "/assets/logout.svg",
    },
  ];

  const isCurrentRoute = (route: string) =>
    `${pathname}/` === `/${locale}${route}` ||
    (route.length > 1 && pathname.startsWith(`/${locale}${route}`));
  const logoutPopupHandler = () => setShowLogout(true);
  const cancelLogoutHandler = () => setShowLogout(false);

  return (
    <>
      {showLogout && (
        <Logout
          onCancelLogout={cancelLogoutHandler}
          logoutText={texts.logoutText}
          cancelText={texts.cancelText}
          confirmLogoutText={texts.logoutConfirmationText}
        />
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
