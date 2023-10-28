"use client";
import { useContext, useState } from "react";
import { Friends, Search } from "..";
import styles from "./index.module.css";
import { GeneralContext } from "@/context/generalContext";

export default function Aside({
  friendsText,
  searchFriendsText,
  error,
}: {
  friendsText: string;
  searchFriendsText: string;
  error: string;
}) {
  const {
    fields: { friendsSearch },
    setFields: { setFriendsSearch },
  } = useContext(GeneralContext);

  return (
    <aside className={styles.aside}>
      <div className={styles.paddingRight}>
        <Search
          placeholder={searchFriendsText}
          onChange={setFriendsSearch}
          value={friendsSearch}
        />
      </div>
      {/* <div className={styles.paddingRight}>
        <OnlineFriends />
      </div> */}
      <Friends error={error} friendsText={friendsText} value={friendsSearch} />
    </aside>
  );
}
