"use client";
import { useState, useEffect, useRef } from "react";
import { LayoutType } from "@/types";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import Link from "next/link";
import styles from "./layout.module.css";

export default function MainLayout({ children }: LayoutType) {
  const [coverImage, setCoverImage] = useState("/assets/cover-photo.png");
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isCoverImageChanged, setIsCoverImageChanged] = useState(false);
  const [avatarEditorDimension, setAvatarEditorDimension] = useState({
    width: 0,
    height: 0,
  });
  const avatarRef = useRef<any>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    isCoverImageChanged && setShowAvatarEditor(true);
  }, [coverImage]);

  useEffect(() => {
    setAvatarEditorDimension({
      width: avatarRef.current?.clientWidth,
      height: avatarRef.current?.clientWidth * 0.3257,
    });
  }, [showAvatarEditor, avatarRef]);

  const handleSelectImage = (e: any) => {
    let fReader = new FileReader();

    fReader.readAsDataURL(e.target.files[0]);
    fReader.onloadend = (event) =>
      setCoverImage(event?.target?.result as string);
    setIsCoverImageChanged(true);
  };

  const closeAvatarEditorHandler = () => setShowAvatarEditor(false);
  const saveImageHandler = () => {
    if (editorRef) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editorRef.current.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      console.log(editorRef.current);
    }
  };

  return (
    <>
      {showAvatarEditor ? (
        <div className={styles.overlay}>
          <div className={styles.avatarEditor}>
            <div className={styles.editorHeader}>
              <p>Edit Photo</p>
              <div className={styles.close} onClick={closeAvatarEditorHandler}>
                <Image
                  src="/assets/close.svg"
                  alt="close avatar editor"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            <div className={styles.editorMain} ref={avatarRef}>
              <AvatarEditor
                ref={editorRef}
                image={coverImage}
                width={avatarEditorDimension.width}
                height={avatarEditorDimension.height}
                border={0}
                color={[0, 0, 0, 0]}
                scale={progress / 100}
                className={styles.editorStyle}
              />

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
                      src="/assets/plus.svg"
                      alt="plus"
                      width={16}
                      height={16}
                    />
                  </div>

                  <p>{`${Math.trunc(progress)}%`}</p>
                </div>

                <button
                  className={styles.saveButton}
                  onClick={saveImageHandler}
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

          <label htmlFor="cover-photo" className={styles.uploadButton}>
            <Image
              src="/assets/upload.svg"
              alt="upload cover photo"
              width={26}
              height={26}
            />
            <p className={styles.uploadCoverPhotoText}>Edit Cover Photo</p>
          </label>

          <input
            type="file"
            accept="image/*"
            id="cover-photo"
            className={styles.coverImageInput}
            onChange={(e: any) => handleSelectImage(e)}
          />
        </div>

        <div className={styles.userInfo}>
          <div>
            <div>
              <div className={styles.userImageWrapper}>
                <Image
                  src="/assets/user.png"
                  alt="user image"
                  width={84}
                  height={84}
                />

                <Image
                  src="/assets/upload.svg"
                  alt="upload cover photo"
                  width={26}
                  height={26}
                  className={styles.profileImageUploadIcon}
                />
              </div>
            </div>

            <p>Saleh Ahmed</p>
            <p>UI Designer</p>
          </div>

          <Link href="/settings/edit-profile" className={styles.editInfo}>
            Edit basic info
          </Link>
        </div>
      </div>
    </>
  );
}
