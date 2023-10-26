"use client";
import { useState, useEffect, useContext } from "react";
import { Search, Sidebar } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { SidebarTextsType } from "@/types";

type MainLayoutType = {
  children: JSX.Element;
  locale: string;
  sidenavTexts: SidebarTextsType;
  placeHolderText: string;
};

export default function MainLayout({
  children,
  locale,
  sidenavTexts,
  placeHolderText,
}: MainLayoutType) {
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(false);
  const [search, setSearch] = useState("");
  const {
    accessToken: { accessToken },
    userDetails: { userDetails },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    setShowComponent(true);
  }, [accessToken]);

  if (!showComponent) return <></>;

  return (
    <div className={styles.wrapper}>
      <Sidebar locale={locale} texts={sidenavTexts} />

      <div className={styles.body}>
        <header className={styles.header}>
          <Image
            src={userDetails?.profilePicture || "/assets/no-profile.svg"}
            alt="profile picture"
            width={32}
            height={32}
            className={styles.profileMobile}
          />

          <div className={styles.search}>
            <Search
              onChange={setSearch}
              placeholder={placeHolderText}
              value={search}
            />
          </div>
          <div className={styles.searchMobile}>
            <Search
              onChange={setSearch}
              placeholder="Search here..."
              value={search}
            />
          </div>

          <Link href="/messages" className={styles.messageIconWrapper}>
            <Image
              src="/assets/message.svg"
              alt="message"
              width={18}
              height={18}
              className={styles.message}
            />

            <Image
              src="/assets/message.svg"
              alt="messsage"
              width={24}
              height={24}
              className={styles.messageDesktop}
            />
          </Link>

          <div className={styles.profile}>
            <p
              className={styles.profileName}
            >{`${userDetails.lastname} ${userDetails.firstname}`}</p>
            <Image
              src={userDetails?.profilePicture || "/assets/no-profile.svg"}
              className={styles.profilePics}
              alt="profile picture"
              width={42}
              height={42}
            />
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
