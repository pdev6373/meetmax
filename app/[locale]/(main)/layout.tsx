"use client";
import { LayoutType } from "@/types";
import { Search, Sidebar } from "@/components";
import styles from "./layout.module.css";
import { useState } from "react";
import Image from "next/image";

export default function MainLayout({ children }: LayoutType) {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.search}>
            <Search
              onChange={setSearch}
              placeholder="Search for something here..."
              value={search}
            />
          </div>

          <div className={styles.profile}>
            <p className={styles.profileName}>Saleh Ahmed</p>
            <Image
              src="/assets/profile-photo.png"
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
