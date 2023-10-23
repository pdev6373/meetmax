"use client";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { ReactorsType, UserType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";
import useUserReq from "@/helpers/useUserReq";

export default function Reactors({ post }: ReactorsType) {
  const {
    getSomeUsers: { loading, makeRequest },
  } = useUserReq();

  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await makeRequest(post.likes.slice(0, 3));
      console.log(response);
      setImages(
        response?.data?.data.map((data: UserType) => data.profilePicture)
      );
    })();
  }, [post]);

  return (
    <div className={styles.reactors}>
      {images?.map((image, index) => (
        <Fragment key={index}>
          <Image
            src={image || "/assets/no-profile.svg"}
            alt="image"
            width={18}
            height={18}
            className={[styles.imageMobile, !index && styles.first].join(" ")}
          />
          <Image
            src={image || "/assets/no-profile.svg"}
            alt="image"
            width={22}
            height={22}
            key={index}
            className={[styles.imageWeb, !index && styles.first].join(" ")}
          />
        </Fragment>
      ))}

      {post?.likes?.length > 3 ? (
        <p className={styles.reactorsNumber}>{`+${
          Number(post.likes.length) - 3
        }`}</p>
      ) : (
        <></>
      )}
    </div>
  );
}
