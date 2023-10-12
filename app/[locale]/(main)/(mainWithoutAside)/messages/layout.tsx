import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import { Messages } from "@/components";
import { ONLINE_FRIENDS } from "@/constants";
import Link from "next/link";
import Image from "next/image";

export default function MessagesLayout({ children }: LayoutType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.onlineFriends}>
        {ONLINE_FRIENDS.map((friend, index) => (
          <Link href="" className={styles.onlineFriend} key={index}>
            <div className={styles.friendImageWrapper}>
              <Image
                src={friend.image}
                alt="user image"
                className={styles.friendImage}
                width={50}
                height={50}
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

      <div className={styles.messages}>
        <Messages />
      </div>

      <div className={styles.message}>{children}</div>
    </div>
  );
}
