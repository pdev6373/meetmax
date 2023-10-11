"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import ContentEditable from "react-contenteditable";
import styles from "./index.module.css";
import { CreatePost } from "..";

export default function MakePost() {
  const text = useRef("");
  const [showPostOptions, setShowPostOptions] = useState(false);

  const actions = [
    // {
    //   icon: "/assets/video.svg",
    //   text: "Live",
    //   action: () => {},
    // },
    {
      icon: "/assets/picture.svg",
      text: "Add Photo",
      action: () => {},
    },
    // {
    //   icon: "/assets/smile.svg",
    //   text: "Feeling",
    //   action: () => {},
    // },
  ];

  const postTextHandler = (e: any) => (text.current = e.target.value);

  return (
    <div className={styles.wrapper}>
      {showPostOptions && (
        <CreatePost
          onClose={setShowPostOptions}
          postText={text}
          setPostText={postTextHandler}
        />
      )}
      <div className={styles.header}>
        <Image
          src="/assets/user.png"
          alt="user"
          width={32}
          height={32}
          className={styles.userMobile}
        />
        <Image
          src="/assets/user.png"
          alt="user"
          width={42}
          height={42}
          className={styles.userDesktop}
        />

        <ContentEditable
          html={text.current}
          onChange={postTextHandler}
          placeholder="What’s happening?"
          className={styles.input}
        />
      </div>

      <div className={styles.actionsWrapper}>
        <div className={styles.actions}>
          {actions.map((action) => (
            <div
              key={action.text}
              className={styles.action}
              onClick={() => setShowPostOptions(true)}
            >
              <Image src={action.icon} alt="post icon" width={16} height={16} />
              <p className={styles.actionText}>{action.text}</p>
            </div>
          ))}
        </div>

        <button className={styles.actionButton}>Post</button>
      </div>
    </div>
  );
}
