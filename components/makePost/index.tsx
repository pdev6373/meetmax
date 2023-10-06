"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { CreatePost } from "..";

export default function MakePost() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [showPostOptions, setShowPostOptions] = useState(false);

  const actions = [
    // {
    //   icon: "/assets/video.svg",
    //   text: "Live",
    //   action: () => {},
    // },
    {
      icon: "/assets/picture.svg",
      text: "Photo",
      action: () => {},
    },
    // {
    //   icon: "/assets/smile.svg",
    //   text: "Feeling",
    //   action: () => {},
    // },
  ];

  const searchHandler = (e: any) => setSearch(e.target.value);

  return (
    <div className={styles.wrapper}>
      {true && <CreatePost />}
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
        <div
          contentEditable
          placeholder="What’s happening?"
          onChange={(e) => searchHandler(e)}
          className={styles.input}
        >
          {search}
        </div>
      </div>

      <div className={styles.actionsWrapper}>
        <div className={styles.actions}>
          {actions.map((action) => (
            <>
              <div
                // htmlFor="image-input"
                key={action.text}
                className={styles.action}
                onClick={() => setShowPostOptions(true)}
              >
                <Image
                  src={action.icon}
                  alt="post icon"
                  width={16}
                  height={16}
                />
                <p className={styles.actionText}>{action.text}</p>
              </div>

              {/* <input
                id="image-input"
                type="file"
                value={images}
                placeholder="Select an image"
                accept="image/*"
                onChange={(e: any) =>
                  setImages((prev) => [...prev, e.target.value])
                }
                className={styles.fileInput}
              /> */}
            </>
          ))}
        </div>

        <button className={styles.actionButton}>Post</button>
      </div>
    </div>
  );
}
