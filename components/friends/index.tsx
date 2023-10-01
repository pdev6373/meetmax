"use client";
import { useState, useEffect, useRef } from "react";
import { ALL_FRIENDS } from "@/constants";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";

export default function Friends() {
  const friendsRef = useRef<any>(null);
  const [hasScrollbar, setHasScrollbar] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setHasScrollbar(
      friendsRef.current?.scrollHeight > friendsRef.current?.clientHeight
    );
  }, [friendsRef]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Friends</h3>

        {typeof hasScrollbar !== "undefined" && (
          <div
            className={[styles.more, hasScrollbar && styles.moreMargin].join(
              " "
            )}
          >
            <Image
              src="/assets/more-dim.svg"
              alt="friend"
              width={16}
              height={16}
            />
          </div>
        )}
      </div>

      <div className={styles.friends} ref={friendsRef}>
        {ALL_FRIENDS.map((friend, index) => (
          <Link href="" className={styles.friend} key={index}>
            <div className={styles.friendDetails}>
              <Image src={friend.image} alt="friend" width={40} height={40} />
              <p
                className={styles.friendName}
              >{`${friend.lastname} ${friend.firstname}`}</p>
            </div>

            {friend.lastSeen === "now" ? (
              <div className={styles.active}></div>
            ) : (
              <p className={styles.friendLastSeen}>{friend.lastSeen}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
