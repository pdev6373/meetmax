"use client";
import { useState, useEffect, useRef } from "react";
import { ALL_FRIENDS } from "@/constants";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";
import { Switch } from "..";
import { FriendsOptionsType } from "@/types";

export default function Friends() {
  const friendsRef = useRef<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState<boolean | undefined>(
    undefined
  );
  const [options, setOptions] = useState<FriendsOptionsType[]>([
    {
      icon: "/assets/mute.svg",
      text: "Message sounds",
      state: "off",
    },
    {
      icon: "/assets/incoming-call.svg",
      text: "Call sounds",
      state: "off",
    },
    {
      icon: "/assets/active.svg",
      text: "Turn of active status",
      state: "off",
    },
  ]);

  useEffect(() => {
    setHasScrollbar(
      friendsRef.current?.scrollHeight > friendsRef.current?.clientHeight
    );
  }, [friendsRef]);

  const handleShowOptions = () => setShowOptions((prev) => !prev);

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
              onClick={handleShowOptions}
              className={styles.moreIcon}
            />

            {showOptions ? (
              <div className={styles.optionsWrapper}>
                {options.map((option) => (
                  <div className={styles.option} key={option.text}>
                    <div className={styles.optionMain}>
                      <Image
                        src={option.icon}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                      <p className={styles.optionText}>{option.text}</p>
                    </div>

                    <Switch
                      state={option.state}
                      onClick={() =>
                        setOptions((prev) =>
                          prev.map((item) =>
                            item.text !== option.text
                              ? item
                              : {
                                  ...item,
                                  state: option.state === "off" ? "on" : "off",
                                }
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
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
