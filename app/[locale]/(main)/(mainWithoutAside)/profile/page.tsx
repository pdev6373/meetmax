"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import Link from "next/link";
import styles from "./page.module.css";
import Avatar from "react-avatar-edit";
import { MakePost, Post } from "@/components";

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

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/assets/user.png");
  const [newProfileImage, setNewProfileImage] = useState(undefined);
  const [coverImage, setCoverImage] = useState("/assets/cover-photo.png");
  const [newCoverImage, setNewCoverImage] = useState("");
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

  const closeImageEditor = (editor: "profile-image" | "cover-image") => {
    editor === "profile-image"
      ? setShowProfileImageEditor(false)
      : setShowCoverImageEditor(false);
    setProgress(100);
  };

  const showProfileImageEditorHandler = () => setShowProfileImageEditor(true);

  const saveProfileImageHandler = (preview: any) => {
    setProfileImage(preview);
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
      {showProfileImageEditor || showCoverImageEditor ? (
        <div className={styles.overlay}>
          <div className={styles.avatarEditor}>
            <div className={styles.editorHeader}>
              <p>Edit Photo</p>
              <div
                className={styles.close}
                onClick={() =>
                  closeImageEditor(
                    showProfileImageEditor ? "profile-image" : "cover-image"
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
                  // onCrop={onCropProfileImageEditor}
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
                <div className={styles.rangeWrapper}>
                  <div className={styles.rangeInputWrapper}>
                    <Image
                      src="/assets/minus.svg"
                      alt="minus"
                      width={16}
                      height={16}
                    />
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
                    <Image
                      onClick={() =>
                        setProgress((prev) =>
                          prev < 150
                            ? prev > 145
                              ? 150
                              : Number(prev) + 5
                            : prev
                        )
                      }
                      src="/assets/plus.svg"
                      alt="plus"
                      width={16}
                      height={16}
                    />
                  </div>

                  <p>{`${Math.trunc(progress)}%`}</p>

                  <Image
                    onClick={() => setProgress(100)}
                    className={styles.reset}
                    src="/assets/reset.svg"
                    alt="reset image zoom"
                    width={16}
                    height={16}
                  />
                </div>

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
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.wrapper}>
        <div className={styles.coverPhotoWrapper}>
          <Image src={coverImage} alt="cover photo" fill />

          <label htmlFor="cover-photo" className={styles.uploadButtonMobile}>
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
          />
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
              />
              <Image
                src={profileImage}
                alt="user image"
                width={150}
                height={150}
                className={styles.userImageWeb}
              />

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
            </div>

            <div>
              <p className={styles.userInfoName}>Saleh Ahmed</p>
              <p className={styles.userInfoJob}>UI Designer</p>
            </div>
          </div>

          <Link href="/settings/edit-profile" className={styles.editInfo}>
            Edit basic info
          </Link>
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
            <Link href="/settings/edit-profile" className={styles.editInfo}>
              Edit Details
            </Link>
          </div>

          <div className={styles.profilePost}>
            <MakePost />

            <Post
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
