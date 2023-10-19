"use client";
import { useContext } from "react";
import { LayoutType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import styles from "./layout.module.css";

export default function CommunityLayout({ children }: LayoutType) {
  const pathname = usePathname();
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);

  const isCurrentRoute = (title: string) =>
    (title.toLowerCase() === "followers" && pathname === "/my-community") ||
    pathname.includes(title.split(" ").join("-").toLowerCase());

  const communities = [
    {
      title: "Followers",
      amount: userDetails?.followers?.length,
    },
    {
      title: "Following",
      amount: userDetails?.following?.length,
    },
    {
      title: "Recommended",
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
              community.title.toLowerCase() === "followers"
                ? "/my-community"
                : `/my-community/${community.title
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`
            }
            className={[
              styles.communityCategory,
              isCurrentRoute(community.title) && styles.communityCategoryActive,
            ].join(" ")}
          >
            {typeof community.amount === "number" ? (
              <div className={styles.titleWrapper}>
                <span className={styles.amount}>
                  {community.amount > 0 ? community.amount : "No"}
                </span>
                <span>
                  {community.amount === 1
                    ? community.title === "Followers"
                      ? "Follower"
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
