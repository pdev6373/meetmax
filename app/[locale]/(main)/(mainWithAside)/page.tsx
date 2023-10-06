"use client";
import { Birthdays, MakePost, Post, RecentEvent } from "@/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
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
        noOfShare="29"
        postImages={["/assets/post-image.png"]}
        posterImage="/assets/user.png"
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
        noOfShare="29"
        postImages={[
          "/assets/post-image.png",
          "/assets/post-image.png",
          "/assets/post-image.png",
        ]}
        posterImage="/assets/user.png"
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
        noOfShare="29"
        postImages={["/assets/post-image.png", "/assets/post-image.png"]}
        posterImage="/assets/user.png"
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
        noOfShare="29"
        postImages={["/assets/post-image.png"]}
        posterImage="/assets/user.png"
      />
    </div>
  );
}
