"use client";
import { useState, useEffect, useContext, useRef, lazy, Suspense } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { Alert, CreatePost, Reactors } from "..";
import {
  PostCommentExtendType,
  PostDetailsType,
  PostReplyType,
  PostType,
  UserType,
} from "@/types";
import { userInitialValues } from "@/constants";
import { format } from "timeago.js";
import { AuthContext } from "@/context/authContext";
import useUserReq from "@/helpers/useUserReq";
import usePostReq from "@/helpers/usePostReq";
import ContentEditable from "react-contenteditable";
import data from "@emoji-mart/data";
import Link from "next/link";
const EmojiPicker = lazy(() => import("@emoji-mart/react"));

type ReplyToBeRepliedType = {
  data: PostReplyType;
  message: string;
  firstname: string;
  lastname: string;
  image: string;
};

export default function Post({
  createdAt,
  id,
  images,
  likes,
  message,
  visibility,
  _id,
  comments,
  postTexts,
  makePostText,
  postFailed,
  postSuccess,
}: PostType) {
  const text = useRef("");
  const commentText = useRef("");
  const editableRef = useRef<any>();
  const replyText = useRef("");
  const replyEditableRef = useRef<any>();
  const {
    getUser: { makeRequest },
    getSomeUsers: { loading: gettingSomeUsers, makeRequest: getSomeUsers },
    followUser: { loading: followingUser, makeRequest: followUser },
    unfollowUser: { loading: unfollowingUser, makeRequest: unfollowUser },
  } = useUserReq();
  const {
    reactToPost: { loading: reactingToPost, makeRequest: reactToPost },
    reactToComment: { loading: reactingToComment, makeRequest: reactToComment },
    reactToReply: { loading: reactingToReply, makeRequest: reactToReply },
    deletePost: { loading: deletingPost, makeRequest: deletePost },
    hidePost: { loading: hidingPost, makeRequest: hidePost },
    commentOnPost: { loading: commentingOnPost, makeRequest: commentOnPost },
    replyCommentOnPost: {
      loading: replyingCommentOnPost,
      makeRequest: replyCommentOnPost,
    },
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
  const [showEmoji, setShowEmoji] = useState(false);
  const [commenters, setCommenters] = useState<UserType[]>([]);
  const [repliers, setRepliers] = useState<UserType[]>([]);
  const [openComments, setOpenComments] = useState(false);
  const [replyToBeShown, setReplyToBeShown] = useState<string | null>(null);
  const [commentToBeReplied, setCommentToBeReplied] =
    useState<PostCommentExtendType | null>(null);
  const [replyToBeReplied, setReplyToBeReplied] =
    useState<ReplyToBeRepliedType | null>(null);
  const [currentReactedComment, setCurrentReactedComment] = useState<
    string | null
  >(null);
  const [currentReactedReply, setCurrentReactedReply] = useState<string | null>(
    null
  );
  const [danger, setDanger] = useState(false);

  const [post, setPost] = useState<PostDetailsType>({
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
    setUser(userInitialValues);
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

    text.current = post.message;
  }, [_id, createdAt, id, images, likes, message, visibility, comments]);

  const getSomeUsersHandler = async () => {
    if (!post?.comments?.length) return;

    const response = await getSomeUsers(
      post?.comments?.map((comment) => comment.id)
    );

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setCommenters(response?.data?.data);
    setAlertMessage("");
  };

  const getRepliers = async () => {
    const repliers: string[] = [];

    post?.comments.forEach((comment) =>
      comment.replies.forEach((reply) => repliers.push(reply.id))
    );

    if (!repliers?.length) return;
    const response = await getSomeUsers(repliers);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setRepliers(response?.data?.data);
    setAlertMessage("");
  };

  useEffect(() => {
    (async () => {
      const response = await makeRequest(post.id);

      if (!response?.success || !response?.data?.success) {
        setDanger(true);
        setAlertMessage(postTexts.error);
        toggleAlertHandler();
        return;
      }

      setDanger(false);
      setUser(response?.data?.data);
      setAlertMessage("");
    })();
    getSomeUsersHandler();
    getRepliers();
  }, [post]);

  useEffect(() => {
    if (!alertMessage) return;

    setTimeout(() => {
      setAlertMessage(alertMessage);
      setShowAlert("yes");
      const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
      return () => {
        clearTimeout(alertTimer);
      };
    }, 700);
  }, [alertMessage, alertToggle]);

  const reactions = [
    {
      name: postTexts.like,
      icon: "/assets/like.svg",
    },
    {
      name: postTexts.comments,
      icon: "/assets/comment.svg",
    },
  ];

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const handleClosePopup = () => setPopupType(null);
  const toggleShowMoreOptions = () => setShowMoreOptions((prev) => !prev);
  const handleDeletePost = async () => {
    const response = await deletePost(post._id);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(postTexts.postDeleteSuccess);
    toggleAlertHandler();
    setShowMoreOptions(false);
    setPopupType(null);
  };
  const handleFollowUser = async () => {
    const response = await followUser(user._id);
    setShowMoreOptions(false);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(postTexts.followSuccess);
    toggleAlertHandler();
  };
  const handleUnfollowUser = async () => {
    const response = await unfollowUser(user._id);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(postTexts.unfollowSuccess);
    toggleAlertHandler();
    setShowMoreOptions(false);
    setPopupType(null);
  };
  const handleRemovePost = () => setIsPostRemoved(true);
  const handleHidePost = async () => {
    const response = await hidePost(post._id);
    setShowMoreOptions(false);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(postTexts.error);
      toggleAlertHandler();

      setDanger(true);
      return;
    }

    setAlertMessage("");
    setDanger(false);
    setIsPostHidden(true);
  };
  const postReactionHandler = async () => {
    const response = await reactToPost(post._id);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage("");
    setPost(response?.data?.data);
  };
  const commentReactionHandler = async (commentId: string) => {
    const response = await reactToComment(post._id, commentId);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      setDanger(true);
      return;
    }

    setAlertMessage("");
    setDanger(false);
    setPost(response?.data?.data);
  };
  const replyReactionHandler = async (commentId: string, replyId: string) => {
    const response = await reactToReply(post._id, commentId, replyId);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      setDanger(true);
      return;
    }

    setAlertMessage("");
    setDanger(false);
    setPost(response?.data?.data);
  };
  const handleCommentOnPost = async () => {
    if (!commentText.current) return;
    const response = await commentOnPost(post._id, commentText);

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(postTexts.commentSuccess);
    toggleAlertHandler();
    setPost(response?.data?.data);
  };
  const handleReplyCommentOnPost = async (
    commentId: string,
    reply: {
      firstname: string;
      lastname: string;
      message: string;
    }
  ) => {
    if (!replyText.current) return;
    const response = await replyCommentOnPost(
      post._id,
      commentId,
      reply,
      replyText
    );

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(postTexts.error);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage("");
    setPost(response?.data?.data);
    setCommentToBeReplied(null);
    setReplyToBeReplied(null);
    setReplyToBeShown(commentId);
  };
  const postTextHandler = () =>
    (commentText.current = editableRef.current.textContent);
  const replyTextHandler = () =>
    (replyText.current = replyEditableRef.current.textContent);

  const moreOptions = [
    {
      icon: "/assets/eyeoff.svg",
      text: postTexts.hidePost,
      action: handleHidePost,
    },
    {
      icon: isFollowing ? "/assets/unfollow.svg" : "/assets/profile.svg",
      text: isFollowing ? postTexts.unfollow : postTexts.follow,
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
      icon: "/assets/delete.svg",
      text: postTexts.deletePostText,
      action: () => {
        setShowMoreOptions(false);
        setPopupType("delete");
      },
    },
    {
      icon: "/assets/edit.svg",
      text: postTexts.editPost,
      action: () => {
        setShowMoreOptions(false);
        text.current = message;
        setShowCreatePostEditor(true);
      },
    },
  ];

  const toBeMapped =
    userDetails?._id === post?.id ? moreOptionsMe : moreOptions;

  if (isPostRemoved) return <></>;
  if (isPostHidden)
    return (
      <div className={styles.hiddenPostWrapper}>
        <div className={styles.hiddenPostMain}>
          <Image src="/assets/eyeoff.svg" alt="close" width={16} height={16} />
          <div>
            <h3 className={styles.hiddenPostHeading}>{postTexts.postHidden}</h3>
            <p className={styles.hiddenPostText}>
              {postTexts.postHiddenDetails}
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
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={danger}>
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
                  ? `${postTexts.unfollow} ${user.lastname} ${user.firstname}`
                  : postTexts.deletePostQuestion}
              </h2>
              <p className={styles.unfollowText}>
                {popupType === "unfollow"
                  ? user.gender === "Male"
                    ? postTexts.confirmUnfollowMale
                    : postTexts.confirmUnfollow
                  : postTexts.confirmDeletePost}
              </p>
              <div className={styles.unfollowActions}>
                <button
                  className={styles.unfollowCancel}
                  onClick={handleClosePopup}
                >
                  {postTexts.cancel}
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
                      postTexts.unfollow
                    )
                  ) : deletingPost ? (
                    <Image
                      src="/assets/spinner.svg"
                      alt="spinner"
                      width={20}
                      height={20}
                    />
                  ) : (
                    postTexts.deleteText
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
            texts={makePostText}
            postFailed={postFailed}
            postSuccess={postSuccess}
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
                    ? postTexts.public
                    : post.visibility === "followers"
                    ? postTexts.friends
                    : postTexts.onlyMe
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
                  {toBeMapped
                    .filter(
                      (item) =>
                        item.icon !== "/assets/profile.svg" ||
                        user?.canBefollowed
                    )
                    .map((option, index, array) => (
                      <div
                        className={[
                          styles.moreOption,
                          !index && styles.moreOptionFirst,
                          array.length === 1 && styles.moreOptionOne,
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
                        {option.text !== postTexts.hidePost && followingUser ? (
                          <Image
                            src="/assets/spinner.svg"
                            alt="spinner"
                            width={20}
                            height={20}
                          />
                        ) : option.text === postTexts.hidePost && hidingPost ? (
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

          {post?.images?.length ? (
            post?.images?.length === 1 ? (
              <div className={styles.postImageWrapper}>
                {post?.images?.map((image, index) => (
                  <Image src={image} alt="post image" fill key={index} />
                ))}
              </div>
            ) : post?.images?.length === 2 ? (
              <div className={styles.postImageContainerPlus}>
                {post?.images?.map((image, index) => (
                  <div className={styles.postImageWrapper} key={index}>
                    <Image src={image} alt="post image" fill />
                  </div>
                ))}
              </div>
            ) : post?.images?.length === 3 ? (
              <div className={styles.postImageContainerPlus}>
                <div className={styles.postImageWrapper}>
                  <Image src={post?.images[2]} alt="post image" fill />
                </div>

                <div className={styles.postTwo}>
                  {post?.images?.slice(0, 2)?.map((image, index) => (
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
              <p className={styles.bottomText}>
                {post?.comments?.length
                  ? post?.comments?.length === 1
                    ? `${post?.comments?.length} ${postTexts.comment}`
                    : `${post?.comments?.length} ${postTexts.comments}`
                  : postTexts.noComments}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.reactions}>
          {reactions.map((reaction, index) => (
            <div className={styles.reaction} key={index}>
              {reaction.name === postTexts.like ? (
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
                        {postTexts.liked}
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
                  onClick={() => setOpenComments((prev) => !prev)}
                >
                  <Image
                    src={reaction.icon}
                    alt="reaction"
                    width={16}
                    height={16}
                  />
                  <p className={styles.reactionName}>{`${
                    !openComments
                      ? `${
                          post?.comments?.length === 1
                            ? postTexts.showComment
                            : postTexts.showComments
                        }`
                      : `${
                          post?.comments?.length === 1
                            ? postTexts.hideComment
                            : postTexts.hideComments
                        }`
                  }`}</p>
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
                placeholder={postTexts.writeAComment}
                className={styles.commentInput}
              />

              <div className={styles.inputIconsWrapper}>
                <div
                  className={styles.inputIcons}
                  onClick={() => setShowEmoji((prev) => !prev)}
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

          {showEmoji ? (
            <div className={styles.emojiWrapper}>
              <Suspense fallback={<></>}>
                <EmojiPicker
                  showSkinTones={false}
                  onEmojiSelect={(emoji: any) => {
                    if (!emoji?.native) return;

                    commentText.current = commentText?.current + emoji?.native;
                    editableRef.current.textContent =
                      editableRef?.current?.textContent + emoji?.native;
                  }}
                  theme="dark"
                  previewPosition="none"
                  data={data}
                  onClickOutside={() => setShowEmoji(false)}
                />
              </Suspense>
            </div>
          ) : (
            <></>
          )}
        </div>

        {post?.comments?.length && openComments ? (
          <div className={styles.comments}>
            {post?.comments
              ?.map((comment) => {
                const commenter = commenters?.find(
                  (commenter) => commenter._id === comment.id
                );

                if (!commenter?._id) return <></>;

                return (
                  <div className={styles.commentWrapper}>
                    <div className={styles.comment}>
                      <>
                        <Image
                          src={
                            commenter?.profilePicture ||
                            "/assets/no-profile.svg"
                          }
                          alt="profile"
                          width={24}
                          height={24}
                          className={styles.commentUserProfile}
                        />
                        <Image
                          src={
                            commenter?.profilePicture ||
                            "/assets/no-profile.svg"
                          }
                          alt="profile"
                          width={32}
                          height={32}
                          className={styles.commentUserProfileWeb}
                        />
                      </>

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

                            {comment.replies.length ? (
                              <div
                                className={[
                                  styles.commentMore,
                                  replyToBeShown === comment._id &&
                                    styles.rotateDropdown,
                                ].join(" ")}
                                onClick={() =>
                                  setReplyToBeShown((prev) =>
                                    prev === comment._id ? null : comment._id
                                  )
                                }
                              >
                                <Image
                                  src="/assets/dropdown.svg"
                                  alt="dropdown"
                                  width={14}
                                  height={14}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                          <p className={styles.commentMessage}>
                            {comment.message}
                          </p>
                        </div>

                        <div className={styles.commentAction}>
                          <p
                            className={[
                              styles.commentLikeAction,
                              comment.likes.includes(userDetails._id) &&
                                styles.commentLikeActionLiked,
                            ].join(" ")}
                            onClick={() => {
                              commentReactionHandler(comment._id);
                              setCurrentReactedComment(comment._id);
                            }}
                          >
                            {reactingToComment &&
                            currentReactedComment === comment._id ? (
                              <Image
                                src={"/assets/spinner.svg"}
                                alt="spinner"
                                width={20}
                                height={20}
                              />
                            ) : comment.likes.includes(userDetails._id) ? (
                              postTexts.liked
                            ) : (
                              postTexts.like
                            )}
                          </p>
                          <p
                            className={styles.commentReplyAction}
                            onClick={() => {
                              setCommentToBeReplied({
                                ...comment,
                                image: commenter?.profilePicture,
                              });
                              setReplyToBeReplied(null);
                            }}
                          >
                            {postTexts.reply}
                          </p>
                        </div>
                      </div>
                    </div>

                    {commentToBeReplied?._id === comment._id ? (
                      <div className={styles.commentReply}>
                        <div className={styles.comment}>
                          <>
                            <Image
                              src={
                                userDetails?.profilePicture ||
                                "/assets/no-profile.svg"
                              }
                              alt="profile"
                              width={24}
                              height={24}
                              className={styles.commentUserProfile}
                            />
                            <Image
                              src={
                                userDetails?.profilePicture ||
                                "/assets/no-profile.svg"
                              }
                              alt="profile"
                              width={32}
                              height={32}
                              className={styles.commentUserProfileWeb}
                            />
                          </>

                          <div className={styles.commentMainWrapper}>
                            <div className={styles.commentMain}>
                              <div className={styles.commentMainTop}>
                                <p className={styles.commentName}>
                                  {postTexts.you}
                                </p>

                                <div className={styles.commentMore}>
                                  <Image
                                    src="/assets/close.svg"
                                    alt="more"
                                    width={16}
                                    height={16}
                                    onClick={() => setCommentToBeReplied(null)}
                                  />
                                </div>
                              </div>

                              <div className={styles.commentReplyHeader}>
                                <h3 className={styles.commentReplyHeading}>
                                  {`${postTexts.replyingTo} ${commenter.lastname} ${commenter.firstname}`}
                                </h3>
                                <p className={styles.commentReplyHeadingText}>
                                  {comment.message}
                                </p>
                              </div>

                              <div className={styles.inputWrapperOuter}>
                                <div className={styles.inputWrapper}>
                                  <ContentEditable
                                    innerRef={replyEditableRef}
                                    html={replyText.current}
                                    onChange={replyTextHandler}
                                    placeholder={postTexts.writeAComment}
                                    className={styles.commentInput}
                                  />
                                </div>

                                <div
                                  className={styles.send}
                                  onClick={() =>
                                    handleReplyCommentOnPost(comment._id, {
                                      lastname: commenter?.lastname,
                                      firstname: commenter?.firstname,
                                      message: comment.message,
                                    })
                                  }
                                >
                                  <Image
                                    src={
                                      replyingCommentOnPost
                                        ? "/assets/spinner.svg"
                                        : "/assets/send.svg"
                                    }
                                    alt="reaction"
                                    width={16}
                                    height={16}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {comment?.replies?.length &&
                    replyToBeShown === comment._id ? (
                      <div className={styles.commentReplyWrapper}>
                        {comment?.replies?.map((reply) => {
                          const replier = repliers?.find(
                            (replier) => replier._id === reply.id
                          );

                          if (!replier?._id) return <></>;

                          return (
                            <div className={styles.commentReply}>
                              <div className={styles.comment}>
                                <>
                                  <Image
                                    src={
                                      replier?.profilePicture ||
                                      "/assets/no-profile.svg"
                                    }
                                    alt="profile"
                                    width={24}
                                    height={24}
                                    className={styles.commentUserProfile}
                                  />
                                  <Image
                                    src={
                                      replier?.profilePicture ||
                                      "/assets/no-profile.svg"
                                    }
                                    alt="profile"
                                    width={32}
                                    height={32}
                                    className={styles.commentUserProfileWeb}
                                  />
                                </>

                                <div className={styles.commentMainWrapper}>
                                  <div className={styles.commentMain}>
                                    <div className={styles.commentMainTop}>
                                      <div>
                                        <p
                                          className={styles.commentName}
                                        >{`${replier.lastname} ${replier.firstname}`}</p>
                                        <p className={styles.commentTime}>
                                          {format(reply.createdAt)}
                                        </p>
                                      </div>

                                      {/* <div className={styles.commentMore}>
                                      <Image
                                        src="/assets/more.svg"
                                        alt="more"
                                        width={16}
                                        height={16}
                                      />
                                    </div> */}
                                    </div>

                                    <div className={styles.commentReplyHeader}>
                                      <h3
                                        className={styles.commentReplyHeading}
                                      >
                                        {`${postTexts.replyingTo} ${reply.repliedComment.lastname} ${reply.repliedComment.firstname}`}
                                      </h3>
                                      <p
                                        className={
                                          styles.commentReplyHeadingText
                                        }
                                      >
                                        {reply.repliedComment.message}
                                      </p>
                                    </div>

                                    <p className={styles.commentMessage}>
                                      {reply.message}
                                    </p>
                                  </div>

                                  <div className={styles.commentAction}>
                                    <p
                                      className={[
                                        styles.commentLikeAction,
                                        reply.likes.includes(userDetails._id) &&
                                          styles.commentLikeActionLiked,
                                      ].join(" ")}
                                      onClick={() => {
                                        setCurrentReactedReply(reply._id);
                                        replyReactionHandler(
                                          comment._id,
                                          reply._id
                                        );
                                      }}
                                    >
                                      {reactingToReply &&
                                      currentReactedReply === reply._id ? (
                                        <Image
                                          src={"/assets/spinner.svg"}
                                          alt="spinner"
                                          width={20}
                                          height={20}
                                        />
                                      ) : reply.likes.includes(
                                          userDetails._id
                                        ) ? (
                                        postTexts.liked
                                      ) : (
                                        postTexts.like
                                      )}
                                    </p>
                                    <p
                                      className={styles.commentReplyAction}
                                      onClick={() => {
                                        setReplyToBeReplied({
                                          data: reply,
                                          lastname: replier.lastname,
                                          firstname: replier.firstname,
                                          message: reply.message,
                                          image: replier?.profilePicture,
                                        });
                                        setCommentToBeReplied(null);
                                      }}
                                    >
                                      {postTexts.reply}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {replyToBeReplied?.data?._id === reply._id ? (
                                <div className={styles.comment}>
                                  <>
                                    <Image
                                      src={
                                        userDetails?.profilePicture ||
                                        "/assets/no-profile.svg"
                                      }
                                      alt="profile"
                                      width={24}
                                      height={24}
                                      className={styles.commentUserProfile}
                                    />
                                    <Image
                                      src={
                                        userDetails?.profilePicture ||
                                        "/assets/no-profile.svg"
                                      }
                                      alt="profile"
                                      width={32}
                                      height={32}
                                      className={styles.commentUserProfileWeb}
                                    />
                                  </>

                                  <div className={styles.commentMainWrapper}>
                                    <div className={styles.commentMain}>
                                      <div className={styles.commentMainTop}>
                                        <p className={styles.commentName}>
                                          {postTexts.you}
                                        </p>

                                        <div className={styles.commentMore}>
                                          <Image
                                            src="/assets/close.svg"
                                            alt="more"
                                            width={16}
                                            height={16}
                                            onClick={() =>
                                              setReplyToBeReplied(null)
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className={styles.commentReplyHeader}
                                      >
                                        <h3
                                          className={styles.commentReplyHeading}
                                        >
                                          {`${postTexts.replyingTo} ${replyToBeReplied.lastname} ${replyToBeReplied.firstname}`}
                                        </h3>
                                        <p
                                          className={
                                            styles.commentReplyHeadingText
                                          }
                                        >
                                          {replyToBeReplied.message}
                                        </p>
                                      </div>

                                      <div className={styles.inputWrapperOuter}>
                                        <div className={styles.inputWrapper}>
                                          <ContentEditable
                                            innerRef={replyEditableRef}
                                            html={replyText.current}
                                            onChange={replyTextHandler}
                                            placeholder={
                                              postTexts.writeAComment
                                            }
                                            className={styles.commentInput}
                                          />
                                        </div>

                                        <div
                                          className={styles.send}
                                          onClick={() =>
                                            handleReplyCommentOnPost(
                                              comment._id,
                                              {
                                                firstname:
                                                  replyToBeReplied.firstname,
                                                lastname:
                                                  replyToBeReplied.lastname,
                                                message:
                                                  replyToBeReplied.message,
                                              }
                                            )
                                          }
                                        >
                                          <Image
                                            src={
                                              replyingCommentOnPost
                                                ? "/assets/spinner.svg"
                                                : "/assets/send.svg"
                                            }
                                            alt="reaction"
                                            width={16}
                                            height={16}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
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
