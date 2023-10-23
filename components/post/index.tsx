"use client";
import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { Alert, CreatePost, Reactors } from "..";
import { PostType, UserType } from "@/types";
import { userInitialValues } from "@/constants";
import { format } from "timeago.js";
import { AuthContext } from "@/context/authContext";
import useUserReq from "@/helpers/useUserReq";
import usePostReq from "@/helpers/usePostReq";
import ContentEditable from "react-contenteditable";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function Post({
  createdAt,
  id,
  images,
  likes,
  message,
  visibility,
  _id,
  comments,
}: PostType) {
  const text = useRef("");
  const commentText = useRef("");
  const editableRef = useRef<any>();
  const {
    getUser: { makeRequest },
    getSomeUsers: { loading: gettingSomeUsers, makeRequest: getSomeUsers },
    followUser: { loading: followingUser, makeRequest: followUser },
    unfollowUser: { loading: unfollowingUser, makeRequest: unfollowUser },
  } = useUserReq();
  const {
    reactToPost: { loading: reactingToPost, makeRequest: reactToPost },
    deletePost: { loading: deletingPost, makeRequest: deletePost },
    hidePost: { loading: hidingPost, makeRequest: hidePost },
    commentOnPost: { loading: commentingOnPost, makeRequest: commentOnPost },
  } = usePostReq();
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isPostHidden, setIsPostHidden] = useState(false);
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [popupType, setPopupType] = useState<"delete" | "unfollow" | null>(
    null
  );
  const [showCreatePostEditor, setShowCreatePostEditor] = useState(false);
  const [user, setUser] = useState<UserType>(userInitialValues);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [commenters, setCommenters] = useState<UserType[]>([]);

  const [post, setPost] = useState<PostType>({
    _id,
    createdAt,
    id,
    images,
    likes,
    message,
    visibility,
    comments,
  });
  const isFollowing = userDetails?.following?.includes(id);

  useEffect(() => {
    setPost({
      _id,
      createdAt,
      id,
      images,
      likes,
      message,
      visibility,
      comments,
    });

    (async () => {
      const response = await makeRequest(post.id);
      if (!response?.success || !response?.data?.success) {
        setAlertMessage(response?.data?.message);
        toggleAlertHandler();
        return;
      }

      setUser(response?.data?.data);
      setAlertMessage("");
    })();

    text.current = post.message;
  }, [_id, createdAt, id, images, likes, message, visibility, comments]);

  const getSomeUsersHandler = async () => {
    if (!post?.comments?.length) return;

    const response = await getSomeUsers(
      post?.comments?.map((comment) => comment.id)
    );

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setCommenters(response?.data?.data);
    setAlertMessage("");

    console.log("comm", response);
  };

  useEffect(() => {
    getSomeUsersHandler();
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const reactions = [
    {
      name: "Like",
      icon: "/assets/like.svg",
    },
    {
      name: "Comments",
      icon: "/assets/comment.svg",
    },
  ];

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const handleClosePopup = () => setPopupType(null);
  const toggleShowMoreOptions = () => setShowMoreOptions((prev) => !prev);
  const handleDeletePost = async () => {
    const response = await deletePost(post._id);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setPost(response?.data?.data);
    setAlertMessage("");
    setShowMoreOptions(false);
    setPopupType(null);
  };
  const handleFollowUser = async () => {
    const response = await followUser(user._id);
    setShowMoreOptions(false);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
  };
  const handleUnfollowUser = async () => {
    const response = await unfollowUser(user._id);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    setShowMoreOptions(false);
    setPopupType(null);
  };
  const handleRemovePost = () => setIsPostRemoved(true);
  const handleHidePost = async () => {
    const response = await hidePost(post._id);
    setShowMoreOptions(false);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    setIsPostHidden(true);
  };
  const postReactionHandler = async () => {
    const response = await reactToPost(post._id);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setPost(response?.data?.data);
    setAlertMessage("");
  };
  const handleCommentOnPost = async () => {
    if (!commentText.current) return;
    const response = await commentOnPost(post._id, commentText);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
  };
  const postTextHandler = (e: any) =>
    (commentText.current = editableRef.current.textContent);

  const moreOptions = [
    {
      icon: "/assets/eyeoff.svg",
      text: "Hide Post",
      action: handleHidePost,
    },
    {
      icon: isFollowing ? "/assets/unfollow.svg" : "/assets/profile.svg",
      text: isFollowing ? "Unfollow" : "Follow",
      action: () => {
        if (isFollowing) {
          setShowMoreOptions(false);
          setPopupType("unfollow");
        } else {
          handleFollowUser();
        }
      },
    },
  ];

  const moreOptionsMe = [
    {
      icon: "assets/delete.svg",
      text: "Delete post",
      action: () => {
        setShowMoreOptions(false);
        setPopupType("delete");
      },
    },
    {
      icon: "assets/edit.svg",
      text: "Edit post",
      action: () => {
        setShowMoreOptions(false);
        text.current = message;
        setShowCreatePostEditor(true);
      },
    },
  ];

  const toBeMapped = userDetails?._id === post.id ? moreOptionsMe : moreOptions;

  if (isPostRemoved) return <></>;
  if (isPostHidden)
    return (
      <div className={styles.hiddenPostWrapper}>
        <div className={styles.hiddenPostMain}>
          <Image src="/assets/eyeoff.svg" alt="close" width={16} height={16} />
          <div>
            <h3 className={styles.hiddenPostHeading}>Post Hidden</h3>
            <p className={styles.hiddenPostText}>
              You won’t see this post in your Timeline.
            </p>
          </div>
        </div>

        <div className={styles.hiddenPostRemove} onClick={handleRemovePost}>
          <Image src="/assets/close.svg" alt="close" width={16} height={16} />
        </div>
      </div>
    );

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>

      {showMoreOptions ? (
        <div
          className={styles.closeOverlay}
          onClick={() => setShowMoreOptions(false)}
        ></div>
      ) : (
        <></>
      )}
      {popupType ? (
        <>
          <div className={styles.overlay}>
            <div className={styles.unfollowWrapper}>
              <h2 className={styles.unfollowHeading}>
                {popupType === "unfollow"
                  ? `Unfollow ${user.lastname} ${user.firstname}`
                  : "Delete Post?"}
              </h2>
              <p className={styles.unfollowText}>
                {popupType === "unfollow"
                  ? `You wont be able to see some of ${
                      user.gender === "Male" ? "his" : "her"
                    } posts once unfollowed.`
                  : "Are you sure you want to delete this post?, This action cannot be reversed"}
              </p>
              <div className={styles.unfollowActions}>
                <button
                  className={styles.unfollowCancel}
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  className={styles.unfollowProceed}
                  onClick={
                    popupType === "unfollow"
                      ? handleUnfollowUser
                      : handleDeletePost
                  }
                >
                  {popupType === "unfollow" ? (
                    unfollowingUser ? (
                      <Image
                        src="/assets/spinner.svg"
                        alt="spinner"
                        width={20}
                        height={20}
                      />
                    ) : (
                      "Unfollow"
                    )
                  ) : deletingPost ? (
                    <Image
                      src="/assets/spinner.svg"
                      alt="spinner"
                      width={20}
                      height={20}
                    />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className={styles.wrapper}>
        {showCreatePostEditor && (
          <CreatePost
            onClose={setShowCreatePostEditor}
            postText={text}
            view={post.visibility}
            type="edit"
            postId={post._id}
            setPost={setPost}
          />
        )}

        <div className={styles.main}>
          <div className={styles.mainHeader}>
            <div className={styles.mainHeaderDetails}>
              <Image
                src={user?.profilePicture || "/assets/no-profile.svg"}
                alt="user"
                width={32}
                height={32}
                className={styles.posterImageMobile}
              />
              <Image
                src={user?.profilePicture || "/assets/no-profile.svg"}
                alt="user"
                width={50}
                height={50}
                className={styles.posterImageWeb}
              />
              <div>
                <h3
                  className={styles.name}
                >{`${user.lastname} ${user.firstname}`}</h3>
                <p className={styles.time}>{`${format(post.createdAt)}. ${
                  post.visibility === "everyone"
                    ? "Public"
                    : post.visibility === "followers"
                    ? "Friends"
                    : "Only me"
                }`}</p>
              </div>
            </div>

            <div className={styles.moreWrapper}>
              <div
                className={styles.moreOptionsIcon}
                onClick={toggleShowMoreOptions}
              >
                <Image
                  src="/assets/more.svg"
                  alt="more"
                  width={16}
                  height={16}
                />
              </div>

              {showMoreOptions ? (
                <div className={styles.moreOptionsWrapper}>
                  {toBeMapped.map((option, index) => (
                    <div
                      className={[
                        styles.moreOption,
                        !index && styles.moreOptionFirst,
                      ].join(" ")}
                      onClick={option.action}
                      key={index}
                    >
                      <Image
                        src={option.icon}
                        alt="action"
                        width={16}
                        height={16}
                      />
                      <p className={styles.moreOptionText}>{option.text}</p>
                      {option.text !== "Hide Post" && followingUser ? (
                        <Image
                          src="/assets/spinner.svg"
                          alt="spinner"
                          width={20}
                          height={20}
                        />
                      ) : option.text === "Hide Post" && hidingPost ? (
                        <Image
                          src="/assets/spinner.svg"
                          alt="spinner"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {post?.message?.length ? (
            <p className={styles.postText}>{post.message}</p>
          ) : (
            <></>
          )}

          {post.images?.length ? (
            post.images.length === 1 ? (
              <div className={styles.postImageWrapper}>
                {post.images?.map((image, index) => (
                  <Image src={image} alt="post image" fill key={index} />
                ))}
              </div>
            ) : post.images.length === 2 ? (
              <div className={styles.postImageContainerPlus}>
                {post.images?.map((image, index) => (
                  <div className={styles.postImageWrapper} key={index}>
                    <Image src={image} alt="post image" fill />
                  </div>
                ))}
              </div>
            ) : post.images.length === 3 ? (
              <div className={styles.postImageContainerPlus}>
                <div className={styles.postImageWrapper}>
                  <Image src={post.images[2]} alt="post image" fill />
                </div>

                <div className={styles.postTwo}>
                  {post.images.slice(0, 2)?.map((image, index) => (
                    <div className={styles.postImageWrapper} key={index}>
                      <Image src={image} alt="post image" fill />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <div className={styles.mainBottom}>
            {post?.likes?.length ? <Reactors post={post} /> : <></>}
            <div className={styles.bottomTexts}>
              <p className={styles.bottomText}>{`${
                post?.comments?.length || "No"
              } ${post?.comments?.length === 1 ? "Comment" : "Comments"}`}</p>
            </div>
          </div>
        </div>

        <div className={styles.reactions}>
          {reactions.map((reaction, index) => (
            <div className={styles.reaction} key={index}>
              {reaction.name === "Like" ? (
                <>
                  {post?.likes?.includes(userDetails._id) ? (
                    <button
                      className={styles.reactionButton}
                      onClick={postReactionHandler}
                    >
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
                        Liked
                      </p>
                      {reactingToPost ? (
                        <Image
                          src="/assets/spinner.svg"
                          alt="spinner"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <></>
                      )}
                    </button>
                  ) : (
                    <button
                      className={styles.reactionButton}
                      onClick={postReactionHandler}
                    >
                      <Image
                        src={reaction.icon}
                        alt="reaction"
                        width={16}
                        height={16}
                      />
                      <p className={styles.reactionName}>{reaction.name}</p>
                      {reactingToPost ? (
                        <Image
                          src="/assets/spinner.svg"
                          alt="spinner"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <></>
                      )}
                    </button>
                  )}
                </>
              ) : post?.comments?.length ? (
                <button
                  className={[
                    styles.reactionButton,
                    styles.reactionButtonComment,
                  ].join(" ")}
                >
                  <Image
                    src={reaction.icon}
                    alt="reaction"
                    width={16}
                    height={16}
                  />
                  <p className={styles.reactionName}>{reaction.name}</p>
                </button>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <Image
            src={userDetails?.profilePicture || "/assets/no-profile.svg"}
            alt="user"
            width={32}
            height={32}
            className={styles.bottomUserImage}
          />
          <Image
            src={userDetails?.profilePicture || "/assets/no-profile.svg"}
            alt="user"
            width={38}
            height={38}
            className={styles.bottomUserImageWeb}
          />

          <div className={styles.inputWrapperOuter}>
            <div className={styles.inputWrapper}>
              <ContentEditable
                innerRef={editableRef}
                html={commentText.current}
                onChange={postTextHandler}
                placeholder="Write a comment..."
                className={styles.commentInput}
              />

              <div className={styles.inputIconsWrapper}>
                <div
                  className={styles.inputIcons}
                  onClick={() => setShowEmojis((prev) => !prev)}
                >
                  <Image
                    src="/assets/emoji.svg"
                    alt="user"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>

            <div className={styles.send} onClick={handleCommentOnPost}>
              <Image
                src={
                  commentingOnPost ? "/assets/spinner.svg" : "/assets/send.svg"
                }
                alt="reaction"
                width={16}
                height={16}
              />
            </div>
          </div>

          {showEmojis ? (
            <div className={styles.emojiWrapper}>
              <Picker
                onEmojiSelect={console.log("Hekko")}
                theme="dark"
                previewPosition="none"
                data={data}
                onClickOutside={() => setShowEmojis(false)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        {comments?.length ? (
          <div className={styles.comments}>
            {comments
              ?.map((comment) => {
                const commenter = commenters?.find(
                  (commenter) => commenter._id === comment.id
                );

                if (!commenter?._id) return <></>;

                return (
                  <div className={styles.commentWrapper}>
                    <div className={styles.comment}>
                      <Image
                        src={"/assets/no-profile.svg"}
                        alt="profile"
                        width={24}
                        height={24}
                        className={styles.commentUserProfile}
                      />

                      <div className={styles.commentMainWrapper}>
                        <div className={styles.commentMain}>
                          <div className={styles.commentMainTop}>
                            <div>
                              <p
                                className={styles.commentName}
                              >{`${commenter.lastname} ${commenter.firstname}`}</p>
                              <p className={styles.commentTime}>
                                {format(comment.createdAt)}
                              </p>
                            </div>

                            <div className={styles.commentMore}>
                              <Image
                                src="/assets/more.svg"
                                alt="more"
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>

                          <p className={styles.commentMessage}>
                            {comment.message}
                          </p>
                        </div>

                        <div className={styles.commentAction}>
                          <p className={styles.commentLikeAction}>Like</p>
                          <p className={styles.commentReplyAction}>Reply</p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.commentReply}>
                      <div className={styles.comment}>
                        <Image
                          src={"/assets/no-profile.svg"}
                          alt="profile"
                          width={24}
                          height={24}
                          className={styles.commentUserProfile}
                        />

                        <div className={styles.commentMainWrapper}>
                          <div className={styles.commentMain}>
                            <div className={styles.commentMainTop}>
                              <div>
                                <p
                                  className={styles.commentName}
                                >{`${commenter.lastname} ${commenter.firstname}`}</p>
                                <p className={styles.commentTime}>
                                  {format(comment.createdAt)}
                                </p>
                              </div>

                              <div className={styles.commentMore}>
                                <Image
                                  src="/assets/more.svg"
                                  alt="more"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>

                            {/* <p className={styles.commentMessage}>
                              {comment.message}
                            </p> */}
                            <div className={styles.commentReplyHeader}>
                              <h3 className={styles.commentReplyHeading}>
                                Replying to Swapan Bala
                              </h3>
                              <p className={styles.commentReplyHeadingText}>
                                Looks amazing and breathtaking. Been there,
                                beautiful!
                              </p>
                            </div>

                            <div className={styles.inputWrapperOuter}>
                              <div className={styles.inputWrapper}>
                                <ContentEditable
                                  innerRef={editableRef}
                                  html={commentText.current}
                                  onChange={postTextHandler}
                                  placeholder="Write a comment..."
                                  className={styles.commentInput}
                                />

                                <div className={styles.inputIconsWrapper}>
                                  <div
                                    className={styles.inputIcons}
                                    onClick={() =>
                                      setShowEmojis((prev) => !prev)
                                    }
                                  >
                                    <Image
                                      src="/assets/emoji.svg"
                                      alt="user"
                                      width={16}
                                      height={16}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div
                                className={styles.send}
                                onClick={handleCommentOnPost}
                              >
                                <Image
                                  src={
                                    commentingOnPost
                                      ? "/assets/spinner.svg"
                                      : "/assets/send.svg"
                                  }
                                  alt="reaction"
                                  width={16}
                                  height={16}
                                />
                              </div>

                              {showEmojis ? (
                                <div className={styles.emojiWrapper}>
                                  <Picker
                                    onEmojiSelect={console.log("Hekko")}
                                    theme="dark"
                                    previewPosition="none"
                                    data={data}
                                    onClickOutside={() => setShowEmojis(false)}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>

                          <div className={styles.commentAction}>
                            <p className={styles.commentLikeAction}>Like</p>
                            <p className={styles.commentReplyAction}>Reply</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
