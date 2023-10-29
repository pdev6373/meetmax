"use client";
import { useState, useEffect, useContext, Fragment } from "react";
import { Alert, Birthdays, MakePost, Post } from "@/components";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import usePostReq from "@/helpers/usePostReq";
import { PostContext } from "@/context/postContext";
import { usePathname } from "next/navigation";
import { MakePostTextsType, PostTextsType, UserType } from "@/types";
import { GeneralContext } from "@/context/generalContext";
import { useAxiosPrivate } from "@/hooks";
import { AuthContext } from "@/context/authContext";

type PostsType = {
  makePostText: MakePostTextsType;
  postTexts: PostTextsType;
  postError: string;
  postFailed: string;
  postSuccess: string;
  error: string;
};

export default function Posts({
  makePostText,
  postTexts,
  postError,
  postFailed,
  postSuccess,
  error,
}: PostsType) {
  const {
    getPosts: { loading, makeRequest },
  } = usePostReq();
  const {
    fields: { posts },
  } = useContext(PostContext);
  const {
    fields: { search, refetchToggle },
  } = useContext(GeneralContext);

  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);

  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fetching, setFetching] = useState(true);
  const pathname = usePathname();
  const [friends, setFriends] = useState<UserType[]>();
  const { fetchData, loading: fetchingFriends } = useAxiosPrivate();

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
      const response = await fetchData({
        url: `/user/followers/${userDetails._id}`,
        method: "GET",
      });

      if (!response?.success || !response?.data?.success) {
        setAlertMessage(error);
        toggleAlertHandler();
        return;
      }

      setAlertMessage("");
      setFriends(response.data.data);
    })();
  }, [refetchToggle, userDetails?._id]);

  useEffect(() => {
    (async () => {
      const response = await makeRequest();
      setFetching(false);

      if (!response?.success || !response?.data?.success) {
        setAlertMessage(postError);
        toggleAlertHandler();
        return;
      }
      setAlertMessage("");
    })();
  }, [pathname]);

  if (loading || fetching || fetchingFriends)
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
        {friends?.length ? (
          <div className={styles.onlineFriends}>
            {friends?.map((friend, index) => (
              <Link
                href={`/profile/${friend?._id}`}
                className={styles.onlineFriend}
                key={index}
              >
                <div className={styles.friendImageWrapper}>
                  <Image
                    src={friend?.profilePicture || "/assets/no-profile.svg"}
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
        ) : (
          <></>
        )}

        <div className={styles.makePostWrapper}>
          <MakePost
            texts={makePostText}
            postFailed={postFailed}
            postSuccess={postSuccess}
          />
        </div>

        {posts
          ?.filter((post) =>
            post?.message
              ?.toLowerCase()
              ?.trim()
              ?.includes(search?.toLowerCase()?.trim())
          )
          ?.map((post) => (
            <Fragment key={post._id}>
              <Post
                createdAt={post.createdAt}
                id={post.id}
                _id={post._id}
                images={post.images}
                likes={post.likes}
                message={post.message}
                visibility={post.visibility}
                comments={post.comments}
                postTexts={postTexts}
                makePostText={makePostText}
                postFailed={postFailed}
                postSuccess={postSuccess}
              />
            </Fragment>
          ))}

        {/* <RecentEvent /> */}
        {/* <Birthdays /> */}
      </div>
    </>
  );
}
