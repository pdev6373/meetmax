"use client";
import { useState } from "react";
import { Friends, OnlineFriends, Search } from "..";
import styles from "./index.module.css";

export default function Aside() {
  const [search, setSearch] = useState("");

  return (
    <aside className={styles.aside}>
      <div className={styles.paddingRight}>
        <Search
          placeholder="Search Friends!"
          onChange={setSearch}
          value={search}
        />
      </div>
      <div className={styles.paddingRight}>
        <OnlineFriends />
      </div>
      <Friends />
    </aside>
  );
}
