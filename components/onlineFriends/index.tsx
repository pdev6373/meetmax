"use client";
import { useState, useRef } from "react";
import { ONLINE_FRIENDS } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export default function OnlineFriends() {
  const friendsRef = useRef<any>(null);
  const [translateValue, setTranslateValue] = useState(0);

  const transformHandler = (direction: "foward" | "backward") =>
    setTranslateValue((prev) =>
      direction === "foward"
        ? prev - 18.5185 - 8.641975
        : prev + 18.5185 + 8.641975
    );

  return (
    <div className={styles.wrapper}>
      {translateValue < 0 ? (
        <div
          className={styles.scrollRightWrapper}
          onClick={() => transformHandler("backward")}
        >
          <div className={styles.scrollRight}>
            <Image
              src="/assets/scroll-left.svg"
              alt="scroll left"
              width={10}
              height={10}
              className={styles.rotateArrow}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div
        className={[
          styles.onlineFriends,
          translateValue < 0 && styles.onlineFriendsLeftMargin,
          translateValue > -100 && styles.onlineFriendsRightMargin,
        ].join(" ")}
      >
        <div
          className={styles.onlineFriendsInner}
          style={{
            gap: "8.641975%",
            transform: `translateX(${translateValue}%)`,
          }}
          ref={friendsRef}
        >
          {ONLINE_FRIENDS.map((friend, index) => (
            <Link
              href=""
              className={styles.onlineFriend}
              key={index}
              style={{ width: "18.5185%" }}
            >
              <div className={styles.friendImageWrapper}>
                <Image
                  src={friend.image}
                  alt="user image"
                  className={styles.friendImage}
                  fill
                />
              </div>

              <p className={styles.friendName}>
                {friend.firstname.split(" ")[0].length > 7
                  ? `${friend.firstname.split(" ")[0].slice(0, 5)}..`
                  : friend.firstname.split(" ")[0]}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {translateValue > -100 && (
        <div
          className={styles.scrollLeftWrapper}
          onClick={() => transformHandler("foward")}
        >
          <div className={styles.scrollLeft}>
            <Image
              src="/assets/scroll-left.svg"
              alt="scroll left"
              width={10}
              height={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}
