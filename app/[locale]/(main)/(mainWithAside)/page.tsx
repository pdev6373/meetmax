"use client";
import { useState, useEffect, useContext } from "react";
import { Alert, Birthdays, MakePost, Post } from "@/components";
import { ONLINE_FRIENDS } from "@/constants";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { PostContext } from "@/context/postContext";

export default function Home() {
  const {
    actions: {
      getPosts: { loading, makeRequest },
    },
    fields: { posts },
  } = useContext(PostContext);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fetching, setFetching] = useState(true);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    (async () => {
      const response = await makeRequest();
      setFetching(false);

      if (!response?.success || !response?.data?.success) {
        setAlertMessage(response?.data?.message);
        toggleAlertHandler();
        return;
      }
      setAlertMessage("");
    })();
  }, []);

  if (loading || fetching)
    return (
      <div className={styles.spinner}>
        <Image src="/assets/spinner.svg" alt="spinner" width={40} height={40} />
      </div>
    );

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
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
    </>
  );
}
