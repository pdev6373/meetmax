"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import styles from "./index.module.css";

type Layout = {
  children: JSX.Element;
  locale: string;
  recommendedText: string;
  follower: string;
  followers: string;
  following: string;
};

export default function CommunityLayout({
  children,
  locale,
  follower,
  followers,
  following,
  recommendedText,
}: Layout) {
  const pathname = usePathname();
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);

  const isCurrentRoute = (title: string) =>
    (title === followers && pathname === `/${locale}/my-community`) ||
    (pathname.includes("following") && title === following) ||
    (pathname.includes("recommended") && title === recommendedText);

  const communities = [
    {
      title: followers as "Followers",
      amount: userDetails?.followers?.length,
    },
    {
      title: following as "Following",
      amount: userDetails?.following?.length,
    },
    {
      title: recommendedText as "Recommended",
      amount: null,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <nav className={styles.communityCategories}>
        {communities.map((community) => (
          <Link
            key={community.title}
            href={
              community.title === followers
                ? "/my-community"
                : community.title === following
                ? "/my-community/following"
                : "/my-community/recommended"
            }
            className={[
              styles.communityCategory,
              isCurrentRoute(community.title) && styles.communityCategoryActive,
            ].join(" ")}
          >
            {typeof community.amount === "number" ? (
              <div className={styles.titleWrapper}>
                <span className={styles.amount}>
                  {community.amount > 0 ? community.amount : community.amount}
                </span>

                <span>
                  {community.amount === 1
                    ? community.title === followers
                      ? follower
                      : community.title
                    : community.title}
                </span>
              </div>
            ) : (
              community.title
            )}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
