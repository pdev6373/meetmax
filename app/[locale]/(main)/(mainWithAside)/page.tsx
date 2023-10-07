"use client";
import { Birthdays, MakePost, Post } from "@/components";
import { ONLINE_FRIENDS } from "@/constants";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.onlineFriends}>
        {ONLINE_FRIENDS.map((friend, index) => (
          <Link href="" className={styles.onlineFriend} key={index}>
            <Image
              src={friend.image}
              alt="user image"
              className={styles.friendImage}
              width={50}
              height={50}
            />

            <p className={styles.friendName}>
              {friend.firstname.split(" ")[0].length > 7
                ? `${friend.firstname.split(" ")[0].slice(0, 5)}..`
                : friend.firstname.split(" ")[0]}
            </p>
          </Link>
        ))}
      </div>

      <MakePost />
      <Post
        lastname="Sepural"
        firstname="Gallery"
        date="15h"
        type="Public"
        likes={[
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
        ]}
        noOfComments="10"
        // noOfShare="29"
        postImages={["/assets/post-image.png"]}
        posterImage="/assets/user.png"
        isFollowing={true}
      />
      {/* <RecentEvent /> */}
      <Birthdays />

      <Post
        lastname="Sepural"
        firstname="Gallery"
        date="15h"
        type="Public"
        likes={[
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
        ]}
        noOfComments="10"
        // noOfShare="29"
        postImages={[
          "/assets/post-image.png",
          "/assets/post-image.png",
          "/assets/post-image.png",
        ]}
        posterImage="/assets/user.png"
        isFollowing={true}
      />

      <Post
        lastname="Sepural"
        firstname="James"
        date="15h"
        type="Public"
        likes={[
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
        ]}
        noOfComments="10"
        // noOfShare="29"
        postImages={["/assets/post-image.png", "/assets/post-image.png"]}
        posterImage="/assets/user.png"
        isFollowing={true}
      />

      <Post
        lastname="Peter"
        firstname="Gallery"
        date="15h"
        type="Public"
        postText="If you think adventure is dangerous, try routine, it’s lethal Paulo Coelho! Good morning all friends."
        likes={[
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
          {
            email: "adebayoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "Peter",
            image: "/assets/user.png",
          },
          {
            email: "taiwoluborode@gmail.com",
            lastname: "Oluborode",
            firstname: "James",
            image: "/assets/user.png",
          },
        ]}
        noOfComments="10"
        // noOfShare="29"
        postImages={["/assets/post-image.png"]}
        posterImage="/assets/user.png"
        isFollowing={true}
      />
    </div>
  );
}
