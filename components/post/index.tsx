import Image from "next/image";
import styles from "./index.module.css";
import { Reactors } from "..";

export default function Post() {
  const reactions = [
    {
      name: "Like",
      icon: "/assets/liked.svg",
    },
    {
      name: "Comments",
      icon: "/assets/comment.svg",
    },
    {
      name: "Share",
      icon: "/assets/share.svg",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderDetails}>
            <Image src="/assets/user.png" alt="user" width={32} height={32} />
            <div>
              <h3 className={styles.name}>Sepural Gallery</h3>
              <p className={styles.time}>15h. Public</p>
            </div>
          </div>

          <div>
            <Image src="/assets/more.svg" alt="more" width={16} height={16} />
          </div>
        </div>

        <div className={styles.postImageWrapper}>
          <Image src="/assets/post-image.png" alt="post image" fill />
        </div>

        <div className={styles.mainBottom}>
          <Reactors
            images={[
              "/assets/user.png",
              "/assets/user.png",
              "/assets/user.png",
              "/assets/user.png",
            ]}
            noOfReactions="9"
          />

          <div className={styles.bottomTexts}>
            <p className={styles.bottomText}>3 Comments</p>
            <p className={styles.bottomText}>17 Share</p>
          </div>
        </div>
      </div>

      <div className={styles.reactions}>
        {reactions.map((reaction, index) => (
          <div className={styles.reaction} key={index}>
            <Image src={reaction.icon} alt="reaction" width={16} height={16} />
            <p className={styles.reactionName}>{reaction.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <Image src="/assets/user.png" alt="user" width={32} height={32} />
        <div className={styles.inputWrapper}>
          <input
            placeholder="Write a comment..."
            className={styles.commentInput}
          />

          <div className={styles.inputIcons}>
            <Image src="/assets/gif.svg" alt="user" width={16} height={16} />
            <Image src="/assets/image.svg" alt="user" width={16} height={16} />
            <Image src="/assets/emoji.svg" alt="user" width={16} height={16} />
          </div>
        </div>

        <div className={styles.send}>
          <Image src="/assets/send.svg" alt="reaction" width={16} height={16} />
        </div>
      </div>
    </div>
  );
}
