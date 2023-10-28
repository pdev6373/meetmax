"use client";
import { Search } from "..";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
// import { ALL_FRIENDS as MESSAGES } from "@/constants";

export default function Messages() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <Search placeholder="Search" onChange={() => {}} value="" />
      </div>

      <div>
        {/* {MESSAGES.map((message, index) => (
          <Link href="/messages/id" className={styles.message} key={index}>
            <div className={styles.messageMain}>
              <Image src={message.image} alt="friend" width={40} height={40} />
              <div>
                <p
                  className={styles.name}
                >{`${message.lastname} ${message.firstname}`}</p>
                <p className={styles.lastMessage}>
                  Thanks buddy, you to, i really really appreciate what you did
                  for me yesterday
                </p>
              </div>
            </div>

            <div className={styles.messageAside}>
              <p className={styles.time}>{message.lastSeen}</p>
              <p className={styles.messageNo}>1</p>
            </div>
          </Link>
        ))} */}
      </div>
    </section>
  );
}
