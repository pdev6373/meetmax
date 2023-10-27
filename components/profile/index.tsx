"use client";
import { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import { Alert, Button, MakePost, Post } from "@/components";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import Link from "next/link";
import Avatar from "react-avatar-edit";
import styles from "./index.module.css";
import { ProfileType } from "@/types";
import { AuthContext } from "@/context/authContext";
import useUserReq from "@/helpers/useUserReq";
import usePostReq from "@/helpers/usePostReq";
import { PostContext } from "@/context/postContext";
import { userInitialValues } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import format from "date-fns/format";

const convertToFile = async (
  dataUrl: string,
  pictureName: string,
  pictureType: string
) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  let newFile = new File([blob], pictureName, { type: pictureType });
  return newFile;
};

export default function Profile({
  id,
  born,
  chooseAnImage,
  editBasicInfo,
  editCoverPhoto,
  editDetails,
  editPhoto,
  facebook,
  female,
  follow,
  follower,
  followers,
  following,
  instagram,
  intro,
  linkedin,
  male,
  save,
  twitter,
  unfollow,
  noPostYet,
  noPostYetFollower,
  createPost,
  imageSize,
  makePostTexts,
  postTexts,
  error,
  postFailed,
  postSuccess,
}: ProfileType) {
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const {
    fields: { posts },
  } = useContext(PostContext);
  const {
    uploadProfilePicture: { loading, makeRequest },
    uploadCoverPicture: {
      loading: uploadingCoverPicture,
      makeRequest: uploadCoverPicture,
    },
    getUser: { loading: gettingUser, makeRequest: getUser },
    unfollowUser: { loading: unfollowingUser, makeRequest: unfollowUser },
    followUser: { loading: followingUser, makeRequest: followUser },
  } = useUserReq();
  const {
    getProfilePosts: {
      loading: gettingProfilePosts,
      makeRequest: getProfilePosts,
    },
  } = usePostReq();
  const [croppedProfileImage, setCroppedProfileImage] = useState("");
  const [selectedProfileDetails, setSelectedProfileDetails] = useState({
    name: "",
    type: "",
  });
  const [selectedCoverDetails, setSelectedCoverDetails] = useState({
    name: "",
    type: "",
  });

  const [newCoverImage, setNewCoverImage] = useState("");
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileImageEditor, setShowProfileImageEditor] = useState(false);
  const [showCoverImageEditor, setShowCoverImageEditor] = useState(false);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [progress, setProgress] = useState(100);
  const [user, setUser] = useState(id ? userInitialValues : userDetails);
  const [alternate, setAlternate] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [imageDimension, setImageDimension] = useState({
    width: 0,
    height: 0,
  });

  const editorRef = useRef<any>(null);
  const coverImageEditorRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        setUser(userDetails);
        return;
      }
      const response = await getUser(id);

      setUser(response?.data?.data);
    })();
  }, [alternate, pathname]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () =>
        editorRef &&
        setImageDimension({
          width: editorRef.current?.clientWidth,
          height: Math.ceil(editorRef.current?.clientWidth * 0.32738),
        })
    );
  }, []);

  useEffect(() => {
    setImageDimension({
      width: editorRef.current?.clientWidth,
      height: Math.ceil(editorRef.current?.clientWidth * 0.32738),
    });
  }, [showProfileImageEditor, showCoverImageEditor, editorRef]);

  useEffect(() => {
    if (!alertMessage) return;

    setAlertMessage(alertMessage);
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const selectCoverImageHandler = (e: any) => {
    let fReader = new FileReader();

    setSelectedCoverDetails({
      name: e.target.files[0].name,
      type: e.target.files[0].type,
    });

    fReader.readAsDataURL(e.target.files[0]);
    fReader.onloadend = (event) =>
      setNewCoverImage(event?.target?.result as string);
    setShowCoverImageEditor(true);
  };

  const closeImageEditor = (
    editor: "profile-image" | "cover-image" | "profile-display"
  ) => {
    if (editor === "cover-image") {
      setShowCoverImageEditor(false);
      setNewCoverImage("");
      setProgress(100);
      setSelectedCoverDetails({
        name: "",
        type: "",
      });
      return;
    }

    if (editor === "profile-image") {
      setShowProfileImageEditor(false);
      setCroppedProfileImage("");
      setSelectedProfileDetails({
        name: "",
        type: "",
      });
      return;
    }

    setShowProfileImage(false);
  };

  const showProfileImageHandler = () => setShowProfileImage(true);
  const showProfileImageEditorHandler = () => setShowProfileImageEditor(true);
  const uploadCoverImageHandler = async () => {
    const image = await convertToFile(
      coverImageEditorRef.current.getImageScaledToCanvas().toDataURL(),
      selectedCoverDetails.name,
      selectedCoverDetails.type
    );

    const response = await uploadCoverPicture(image);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(error);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    setSelectedProfileDetails({
      name: "",
      type: "",
    });
    closeImageEditor("cover-image");
    setNewCoverImage("");
    closeImageEditor("cover-image");
    setAlternate((prev) => !prev);
  };

  const getProfilePostsHandler = async (id: string) => {
    const response = await getProfilePosts(id);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(error);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
  };

  useEffect(() => {
    getProfilePostsHandler(id || userDetails?._id);
  }, []);

  const cropProfileImageHandler = (preview: any) =>
    setCroppedProfileImage(preview);

  const profilePhotoUploadHandler = async () => {
    const image = await convertToFile(
      croppedProfileImage,
      selectedProfileDetails.name,
      selectedProfileDetails.type
    );

    const response = await makeRequest(image);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    setCroppedProfileImage("");
    setSelectedProfileDetails({
      name: "",
      type: "",
    });
    closeImageEditor("profile-image");
    setAlternate((prev) => !prev);
  };

  const profilePhotoSetHandler = async (
    elem: File | ChangeEvent<HTMLInputElement>
  ) => {
    if (!elem) return;
    const selectedImage = elem as File;

    setSelectedProfileDetails({
      name: selectedImage.name,
      type: selectedImage.type,
    });
  };

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const [userData, setUserData] = useState<{
    fullname: string;
    bio: string;
    intro: {
      name: string;
      icon: string | null;
      value: string | any;
    }[];
  }>({
    fullname: "",
    bio: "",
    intro: [
      {
        icon: "",
        name: "",
        value: "",
      },
    ],
  });

  const unfollowUserHandler = async () => {
    if (!id) return;
    const response = await unfollowUser(id);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(error);
      toggleAlertHandler();
      return;
    }

    setAlternate((prev) => !prev);
    setAlertMessage("");
  };

  const followUserHandler = async () => {
    if (!id) return;
    const response = await followUser(id);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(error);
      toggleAlertHandler();
      return;
    }

    setAlternate((prev) => !prev);
    setAlertMessage("");
  };

  useEffect(() => {
    setUserData({
      fullname: `${user?.lastname} ${user?.firstname}`,
      bio: user?.bio,
      intro: [
        {
          name: "website",
          icon: "/assets/explore.svg",
          value: user?.website ? new URL(user?.website).hostname : null,
        },
        {
          name: "gender",
          icon: "/assets/person.svg",
          value: user?.gender === "Female" ? female : male,
        },
        {
          name: "birthday",
          icon: "/assets/birthday.svg",
          value: user?.dateOfBirth
            ? `${born} ${format(new Date(user.dateOfBirth), "MMMM dd,yyyy")}`
            : null,
        },
        {
          name: "location",
          icon: "/assets/location.svg",
          value: user?.location,
        },
        {
          name: "facebook",
          icon: "/assets/facebook.svg",
          value: user.socialLinks.facebook
            ? `${facebook} ${
                user.socialLinks.facebook.match(
                  /^https:\/\/(?:www\.)?facebook\.com\/(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/
                )![1]
              }`
            : null,
        },
        {
          name: "twitter",
          icon: "/assets/twitter.svg",
          value: user.socialLinks.twitter
            ? `${twitter} ${
                user.socialLinks.twitter.match(
                  /^https:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
                )![1]
              }`
            : null,
        },
        {
          name: "instagram",
          icon: "/assets/instagram.svg",
          value: user.socialLinks.instagram
            ? `${instagram} ${
                user.socialLinks.instagram.match(
                  /^https:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)\/?/
                )![1]
              }`
            : null,
        },
        {
          name: "linkedin",
          icon: "/assets/linkedin.svg",
          value: user.socialLinks.linkedin
            ? `${linkedin} ${
                user.socialLinks.linkedin.match(
                  /^https:\/\/(?:www\.)?linkedin\.com\/in\/([A-Za-z0-9_-]+)\/?$/
                )![1]
              }`
            : null,
        },
        {
          name: "followers",
          icon: null,
          value: `${user?.followers?.length} ${
            user?.followers?.length === 1 ? follower : followers
          }`,
        },
        {
          name: "following",
          icon: null,
          value: `${user?.following?.length} ${following}`,
        },
      ],
    });
  }, [user]);

  if (gettingUser)
    return (
      <div className={styles.loadingData}>
        <Image src="/assets/spinner.svg" alt="spinner" width={48} height={48} />
      </div>
    );

  if (
    !(userDetails?._id === user?._id && !id) &&
    ((user?.profileVisibility === "me" && user?._id !== userDetails?._id) ||
      (user?.profileVisibility === "followers" &&
        !user?.followers?.some((follower) => follower === userDetails?._id)))
  )
    return (
      <div className={styles.profileNotVisible}>
        <Image
          src="/assets/no-profile.png"
          alt="no post"
          width={370}
          height={246.5}
          className={styles.noPostWeb}
        />
        <Image
          src="/assets/no-profile.png"
          alt="no post"
          width={246.67}
          height={164.3}
          className={styles.noPostMobile}
        />
        {user.profileVisibility === "me" ? (
          <p className={styles.noPost}>• Profile locked to everyone •</p>
        ) : (
          <p className={styles.noPost}>• Profile locked to non-followers •</p>
        )}
      </div>
    );

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>

      {showProfileImageEditor || showCoverImageEditor || showProfileImage ? (
        <div className={styles.overlay}>
          <div
            className={[
              styles.avatarEditor,
              showCoverImageEditor && styles.coverEditor,
            ].join(" ")}
          >
            <div className={styles.editorHeader}>
              {!showProfileImage ? (
                <p className={styles.avatarHeading}>{editPhoto}</p>
              ) : (
                <div></div>
              )}
              <div
                className={styles.close}
                onClick={() =>
                  closeImageEditor(
                    showProfileImageEditor
                      ? "profile-image"
                      : showCoverImageEditor
                      ? "cover-image"
                      : "profile-display"
                  )
                }
              >
                <Image
                  src="/assets/close.svg"
                  alt="close avatar editor"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            {showProfileImage ? (
              <div className={styles.profileImageDisplay}>
                <Image
                  src={user?.profilePicture || "/assets/no-profile.svg"}
                  alt="profile Image"
                  width={180}
                  height={180}
                  className={styles.profileDisplayWeb}
                />
                <Image
                  src={user?.profilePicture || "/assets/no-profile.svg"}
                  alt="profile Image"
                  width={120}
                  height={120}
                  className={styles.profileDisplayMobile}
                />
              </div>
            ) : (
              <div className={styles.editorMain} ref={editorRef}>
                {showProfileImageEditor ? (
                  <Avatar
                    width={imageDimension.width}
                    height={imageDimension.height}
                    shadingColor="#949cab"
                    backgroundColor="#949cab"
                    shadingOpacity={0.4}
                    exportSize={600}
                    label={chooseAnImage}
                    labelStyle={{
                      color: "#edeff1",
                      cursor: "pointer",
                      display: "block",
                    }}
                    closeIconColor="transparent"
                    onCrop={cropProfileImageHandler}
                    onFileLoad={profilePhotoSetHandler}
                    exportAsSquare
                  />
                ) : (
                  <AvatarEditor
                    ref={coverImageEditorRef}
                    image={newCoverImage}
                    width={imageDimension.width}
                    height={imageDimension.height}
                    border={0}
                    color={[0, 0, 0, 0]}
                    scale={progress / 100}
                    className={styles.editorStyle}
                  />
                )}

                <div className={styles.editorMainBottom}>
                  {!showCoverImageEditor ? (
                    <div></div>
                  ) : (
                    <div className={styles.rangeWrapper}>
                      <input
                        title={imageSize}
                        min={0}
                        max={150}
                        type="range"
                        defaultValue={100}
                        className={styles.imageSize}
                        style={{
                          background: `linear-gradient(to right, #edeff1 ${
                            (progress * 100) / 150
                          }%, #959eae ${(progress * 100) / 150}%)`,
                        }}
                        onInput={(e: any) => setProgress(e.target.value)}
                      />

                      <p className={styles.rangePercentage}>{`${Math.trunc(
                        progress
                      )}%`}</p>
                    </div>
                  )}

                  <Button
                    onClick={
                      showProfileImageEditor
                        ? profilePhotoUploadHandler
                        : uploadCoverImageHandler
                    }
                    type="submit"
                    disabled={loading || uploadingCoverPicture}
                    isLoading={loading || uploadingCoverPicture}
                    variation="small"
                  >
                    {save}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.wrapper}>
        <div className={styles.coverPhotoWrapper}>
          <Image
            src={user?.coverPicture || "/assets/cover-photo.png"}
            alt="cover photo"
            fill
          />

          {!id ? (
            <>
              <label
                htmlFor="cover-photo"
                className={styles.uploadButtonMobile}
              >
                <Image
                  src="/assets/upload.svg"
                  alt="upload cover photo"
                  width={16}
                  height={16}
                />
              </label>

              <label htmlFor="cover-photo" className={styles.uploadButton}>
                <Image
                  src="/assets/upload.svg"
                  alt="upload cover photo"
                  width={16}
                  height={16}
                />
                <p className={styles.uploadCoverPhotoText}>{editCoverPhoto}</p>
              </label>

              <input
                title={editCoverPhoto}
                type="file"
                accept="image/*"
                id="cover-photo"
                className={styles.coverImageInput}
                onChange={(e: any) => selectCoverImageHandler(e)}
                onClick={(e: any) => (e.target.value = null)}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userInfoMain}>
            <div className={styles.userImageWrapper}>
              <Image
                src={user?.profilePicture || "/assets/no-profile.svg"}
                alt="user image"
                width={84}
                height={84}
                className={styles.userImageMobile}
                onClick={showProfileImageHandler}
              />
              <Image
                src={user?.profilePicture || "/assets/no-profile.svg"}
                alt="user image"
                width={150}
                height={150}
                className={styles.userImageWeb}
                onClick={showProfileImageHandler}
              />

              {!id ? (
                <div
                  className={styles.profileImageUploadIcon}
                  onClick={showProfileImageEditorHandler}
                >
                  <Image
                    src="/assets/upload.svg"
                    alt="upload cover photo"
                    width={16}
                    height={16}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              <p className={styles.userInfoName}>{userData?.fullname}</p>
              <p className={styles.userInfoJob}>{userData?.bio}</p>
            </div>
          </div>

          {!id ? (
            <Link href="/settings/edit-profile" className={styles.editInfo}>
              {editBasicInfo}
            </Link>
          ) : userDetails?.following.includes(id) ? (
            <div className={styles.buttonWrapper}>
              {/* <Link
                href="/message/id"
                className={[styles.editInfo, styles.messageButton].join(" ")}
              >
                Message
              </Link> */}
              <button
                onClick={unfollowUserHandler}
                className={[styles.editInfo, styles.unfollowButton].join(" ")}
              >
                {unfollowingUser ? (
                  <Image
                    src="/assets/spinner.svg"
                    alt="spinner"
                    width={22}
                    height={22}
                  />
                ) : (
                  unfollow
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={followUserHandler}
              className={[styles.editInfo, styles.followButton].join(" ")}
            >
              {followingUser ? (
                <Image
                  src="/assets/spinner.svg"
                  alt="spinner"
                  width={22}
                  height={22}
                />
              ) : (
                follow
              )}
            </button>
          )}
        </div>

        <div className={styles.profileBody}>
          <div className={styles.intro}>
            <h3 className={styles.introHeading}>{intro}</h3>
            <div className={styles.introMain}>
              {userData?.intro
                ?.filter((data) => data.value)
                ?.map((details) => (
                  <div key={details.name} className={styles.introItem}>
                    {details.icon ? (
                      details.icon === "/assets/linkedin.svg" ? (
                        <Image
                          src={details.icon}
                          alt="datails icon"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Image
                          src={details.icon}
                          alt="datails icon"
                          width={16}
                          height={16}
                        />
                      )
                    ) : (
                      <></>
                    )}
                    <p className={styles.introText}>{details.value}</p>
                  </div>
                ))}
            </div>
            {!id ? (
              <Link href="/settings/edit-profile" className={styles.editInfo}>
                {editDetails}
              </Link>
            ) : (
              <></>
            )}
          </div>

          {gettingProfilePosts ? (
            <div className={styles.profileLoader}>
              <Image
                src="/assets/spinner.svg"
                alt="spinner"
                width={48}
                height={48}
              />
            </div>
          ) : (
            <div className={styles.profilePost}>
              {/* <MakePost profileId={id} /> */}

              {posts?.length ? (
                posts?.map((post) => (
                  <Post
                    createdAt={post.createdAt}
                    id={post.id}
                    _id={post._id}
                    images={post.images}
                    likes={post.likes}
                    message={post.message}
                    visibility={post.visibility}
                    comments={post.comments}
                    makePostText={makePostTexts}
                    postTexts={postTexts}
                    postFailed={postFailed}
                    postSuccess={postSuccess}
                  />
                ))
              ) : (
                <div className={styles.noPostWrapper}>
                  <Image
                    src="/assets/no-post.png"
                    alt="no post"
                    width={384}
                    height={288}
                    className={styles.noPostWeb}
                  />
                  <Image
                    src="/assets/no-post.png"
                    alt="no post"
                    width={256}
                    height={192}
                    className={styles.noPostMobile}
                  />
                  <p className={styles.noPost}>{`${
                    id ? `• ${noPostYetFollower} •` : `• ${noPostYet} •`
                  }`}</p>
                  {!id ? (
                    <div className={styles.createPostWrapper}>
                      <Button
                        type="submit"
                        onClick={() => router.push("/")}
                        variation="small"
                      >
                        {createPost}
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
