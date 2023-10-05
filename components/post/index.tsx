"use client";
import Image from "next/image";
import styles from "./index.module.css";
import { Reactors } from "..";
import { PostType } from "@/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Post({
  firstname,
  lastname,
  date,
  type,
  posterImage,
  noOfReactions,
  noOfComments,
  noOfShare,
  postImages,
  postText,
  likes,
}: PostType) {
  const reactions = [
    {
      name: "Like",
      icon: "/assets/like.svg",
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
            <Image
              src={posterImage}
              alt="user"
              width={32}
              height={32}
              className={styles.posterImageMobile}
            />
            <Image
              src={posterImage}
              alt="user"
              width={50}
              height={50}
              className={styles.posterImageWeb}
            />
            <div>
              <h3 className={styles.name}>{`${lastname} ${firstname}`}</h3>
              <p className={styles.time}>{`${date}. ${type}`}</p>
            </div>
          </div>

          <div>
            <Image src="/assets/more.svg" alt="more" width={16} height={16} />
          </div>
        </div>

        {postText?.length && <p className={styles.postText}>{postText}</p>}

        {postImages?.length &&
          (postImages.length === 1 ? (
            <div className={styles.postImageWrapper}>
              {postImages?.map((image, index) => (
                <Image src={image} alt="post image" fill key={index} />
              ))}
            </div>
          ) : postImages.length === 2 ? (
            <div className={styles.postImageContainerPlus}>
              {postImages?.map((image, index) => (
                <div className={styles.postImageWrapper} key={index}>
                  <Image src={image} alt="post image" fill />
                </div>
              ))}
            </div>
          ) : postImages.length === 3 ? (
            <div className={styles.postImageContainerPlus}>
              <div className={styles.postImageWrapper}>
                <Image src={postImages[2]} alt="post image" fill />
              </div>

              <div className={styles.postTwo}>
                {postImages.slice(0, 2)?.map((image, index) => (
                  <div className={styles.postImageWrapper} key={index}>
                    <Image src={image} alt="post image" fill />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          ))}

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
            <p className={styles.bottomText}>{`${noOfComments} Comments`}</p>
            <p className={styles.bottomText}>{`${noOfShare} Share`}</p>
          </div>
        </div>
      </div>

      <div className={styles.reactions}>
        {reactions.map((reaction, index) => (
          <div className={styles.reaction} key={index}>
            {reaction.name === "Like" ? (
              <>
                {likes.some(
                  (like) => like.email === "adebayoluborode@gmail.com"
                ) ? (
                  <>
                    <Image
                      src="/assets/liked.svg"
                      alt="reaction"
                      width={16}
                      height={16}
                    />
                    <p
                      className={[
                        styles.reactionName,
                        styles.reactionNameReacted,
                      ].join(" ")}
                    >
                      {reaction.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Image
                      src={reaction.icon}
                      alt="reaction"
                      width={16}
                      height={16}
                    />
                    <p className={styles.reactionName}>{reaction.name}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <Image
                  src={reaction.icon}
                  alt="reaction"
                  width={16}
                  height={16}
                />
                <p className={styles.reactionName}>{reaction.name}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <Image
          src="/assets/user.png"
          alt="user"
          width={32}
          height={32}
          className={styles.bottomUserImage}
        />
        <Image
          src="/assets/user.png"
          alt="user"
          width={38}
          height={38}
          className={styles.bottomUserImageWeb}
        />
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
