"use client";
import { useState, useEffect, useRef } from "react";
import { MakePost, Post } from "@/components";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import Link from "next/link";
import Avatar from "react-avatar-edit";
import styles from "./index.module.css";
import { ProfileType } from "@/types";

const userDetails = [
  {
    icon: "/assets/explore.svg",
    text: "uihut.com",
  },
  {
    icon: "/assets/person.svg",
    text: "Male",
  },
  {
    icon: "/assets/birthday.svg",
    text: "Born June 18,2001",
  },
  {
    icon: "/assets/location.svg",
    text: "Sylhet, Bangladesh",
  },
  {
    icon: "/assets/facebook.svg",
    text: "Facebook salehahmed",
  },
  {
    icon: "/assets/twitter.svg",
    text: "Twitter salehahmed",
  },
  {
    icon: "/assets/instagram.svg",
    text: "Instagram Saleh_ahmed",
  },
  {
    icon: null,
    text: "52,844 Followers",
  },
  {
    icon: null,
    text: "2,564 Following",
  },
];

export default function Profile({ isMine = false }: ProfileType) {
  const [croppedProfileImage, setCroppedProfileImage] = useState("");
  const [profileImage, setProfileImage] = useState("/assets/user.png");
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [coverImage, setCoverImage] = useState("/assets/cover-photo.png");
  const [newCoverImage, setNewCoverImage] = useState("");
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showProfileImageEditor, setShowProfileImageEditor] = useState(false);
  const [showCoverImageEditor, setShowCoverImageEditor] = useState(false);
  const [progress, setProgress] = useState(100);

  const [imageDimension, setImageDimension] = useState({
    width: 0,
    height: 0,
  });

  const editorRef = useRef<any>(null);
  const coverImageEditorRef = useRef<any>(null);

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

  const selectCoverImageHandler = (e: any) => {
    let fReader = new FileReader();

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
      return;
    }

    if (editor === "profile-image") {
      setShowProfileImageEditor(false);
      setCroppedProfileImage("");
      setNewProfileImage(undefined);
      return;
    }

    setShowProfileImage(false);
  };

  const showProfileImageHandler = () => setShowProfileImage(true);
  const showProfileImageEditorHandler = () => setShowProfileImageEditor(true);
  const cropProfileImageHandler = (preview: any) =>
    setCroppedProfileImage(preview);

  const saveProfileImageHandler = () => {
    if (!croppedProfileImage) {
      closeImageEditor("profile-image");
      return;
    }

    setProfileImage(croppedProfileImage);
    setCroppedProfileImage("");
    setNewProfileImage(undefined);
    closeImageEditor("profile-image");
  };

  const saveCoverImageHandler = () => {
    setCoverImage(
      coverImageEditorRef.current.getImageScaledToCanvas().toDataURL()
    );
    setNewCoverImage("");
    closeImageEditor("cover-image");
  };

  return (
    <>
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
                <p className={styles.avatarHeading}>Edit Photo</p>
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
                  src={profileImage}
                  alt="profile Image"
                  width={180}
                  height={180}
                  className={styles.profileDisplayWeb}
                />
                <Image
                  src={profileImage}
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
                    label="Choose an image"
                    labelStyle={{
                      color: "#edeff1",
                      cursor: "pointer",
                      display: "block",
                    }}
                    closeIconColor="transparent"
                    onCrop={cropProfileImageHandler}
                    src={newProfileImage}
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
                        title="image size"
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

                  <button
                    className={styles.saveButton}
                    onClick={
                      showProfileImageEditor
                        ? saveProfileImageHandler
                        : saveCoverImageHandler
                    }
                  >
                    Save
                  </button>
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
          <Image src={coverImage} alt="cover photo" fill />

          {isMine ? (
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
                <p className={styles.uploadCoverPhotoText}>Edit Cover Photo</p>
              </label>

              <input
                title="edit cover photo"
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
                src="/assets/user.png"
                alt="user image"
                width={84}
                height={84}
                className={styles.userImageMobile}
                onClick={showProfileImageHandler}
              />
              <Image
                src={profileImage}
                alt="user image"
                width={150}
                height={150}
                className={styles.userImageWeb}
                onClick={showProfileImageHandler}
              />

              {isMine ? (
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
              <p className={styles.userInfoName}>Saleh Ahmed</p>
              <p className={styles.userInfoJob}>UI Designer</p>
            </div>
          </div>

          {isMine ? (
            <Link href="/settings/edit-profile" className={styles.editInfo}>
              Edit basic info
            </Link>
          ) : (
            // <button
            //   className={[styles.editInfo, styles.followButton].join(" ")}
            // >
            //   Follow
            // </button>

            <div className={styles.buttonWrapper}>
              <Link
                href="/message/id"
                className={[styles.editInfo, styles.messageButton].join(" ")}
              >
                Message
              </Link>
              <button
                className={[styles.editInfo, styles.unfollowButton].join(" ")}
              >
                Unfollow
              </button>
            </div>
          )}
        </div>

        <div className={styles.profileBody}>
          <div className={styles.intro}>
            <h3 className={styles.introHeading}>INTRO</h3>
            <div className={styles.introMain}>
              {userDetails.map((details) => (
                <div key={details.text} className={styles.introItem}>
                  {details.icon ? (
                    <Image
                      src={details.icon}
                      alt="datails icon"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <></>
                  )}
                  <p className={styles.introText}>{details.text}</p>
                </div>
              ))}
            </div>
            {isMine ? (
              <Link href="/settings/edit-profile" className={styles.editInfo}>
                Edit Details
              </Link>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.profilePost}>
            <MakePost />

            <Post
              isMine={isMine}
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
              // noOfShare="29"
              postImages={["/assets/post-image.png"]}
              posterImage="/assets/user.png"
              isFollowing={true}
            />

            <Post
              isMine={isMine}
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
              // noOfShare="29"
              postImages={[
                "/assets/post-image.png",
                "/assets/post-image.png",
                "/assets/post-image.png",
              ]}
              posterImage="/assets/user.png"
              isFollowing={true}
            />

            <Post
              isMine={isMine}
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
              // noOfShare="29"
              postImages={["/assets/post-image.png", "/assets/post-image.png"]}
              posterImage="/assets/user.png"
              isFollowing={true}
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
              // noOfShare="29"
              postImages={["/assets/post-image.png"]}
              posterImage="/assets/user.png"
              isFollowing={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
