"use client";
import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import { COMMUNITY_CATEGORIES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CommunityLayout({ children }: LayoutType) {
  const pathname = usePathname();

  const isCurrentRoute = (title: string) =>
    (title.toLowerCase() === "followers" && pathname === "/my-community") ||
    pathname.includes(title.split(" ").join("-").toLowerCase());

  return (
    <div className={styles.wrapper}>
      <nav className={styles.communityCategories}>
        {COMMUNITY_CATEGORIES.map((community) => (
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
            {community.amount ? (
              <div className={styles.titleWrapper}>
                <span className={styles.amount}>{community.amount}</span>
                <span>{community.title}</span>
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
