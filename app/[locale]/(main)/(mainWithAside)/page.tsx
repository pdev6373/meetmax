"use client";
import { useState, useEffect } from "react";
import { Birthdays, MakePost, Post } from "@/components";
import { ONLINE_FRIENDS } from "@/constants";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAxiosPrivate } from "@/hooks";
import { PostsType } from "@/types";

export default function Home() {
  const { fetchData, loading } = useAxiosPrivate();
  const [posts, setPosts] = useState<PostsType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData({
        url: "/post",
        method: "GET",
      });

      setPosts(response?.data?.data);

      console.log(response);
    })();
  }, []);

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

      <MakePost />

      {posts?.map((post) => (
        <Post
          createdAt={post.createdAt}
          id={post.id}
          images={post.images}
          likes={post.likes}
          message={post.message}
        />
      ))}

      {/* <RecentEvent /> */}
      {/* <Birthdays /> */}
    </div>
  );
}
