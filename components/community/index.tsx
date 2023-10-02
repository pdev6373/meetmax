"use client";
import { COMMUNITIES } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.css";

export default function Community() {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      {COMMUNITIES.find(
        (community) =>
          (pathname === "/my-community" && community.title === "Followers") ||
          pathname.includes(community.title.split(" ").join("-").toLowerCase())
      )?.data?.map((user, index) => (
        <div className={styles.user} key={index}>
          <div className={styles.userDetails}>
            <Image
              src={user.image}
              alt="user"
              width={70}
              height={70}
              className={styles.userImageWeb}
            />
            <Image
              src={user.image}
              alt="user"
              width={50}
              height={50}
              className={styles.userImageMobile}
            />
            <div className={styles.userInfo}>
              <div className={styles.infoTop}>
                <p
                  className={styles.userName}
                >{`${user.lastname} ${user.firstname}`}</p>
                <p className={styles.userProfession}>{user.job}</p>
              </div>

              <div className={styles.social}>
                <Link href="" className={styles.socialLink}>
                  <Image
                    src="/assets/explore.svg"
                    alt="social"
                    width={14}
                    height={14}
                  />
                </Link>
                {user.social.map((social) => (
                  <Link href="" className={styles.socialLink}>
                    <Image
                      key={social}
                      src={`/assets/${social}.svg`}
                      alt="social"
                      width={14}
                      height={14}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.ignoreButton}>Ignore</button>
            <button
              className={
                user.isFollowing ? styles.ignoreButton : styles.followButton
              }
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
