"use client";
import { useState } from "react";
import { CreatePostType, PostViewType } from "@/types";
import styles from "./index.module.css";
import Image from "next/image";

const postView: PostViewType[] = [
  {
    type: "Friends",
    value: "friends",
  },
  {
    type: "Public",
    value: "public",
  },
  {
    type: "Only me",
    value: "only-me",
  },
];

export default function CreatePost({ onClose }: CreatePostType) {
  const [currentView, setCurrentView] = useState(postView[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleClose = () => onClose(false);
  const handleShowOptions = () => setShowOptions((prev) => !prev);
  const handleImageRemove = (removeImage: string) =>
    setImages((prev) => prev.filter((image) => image !== removeImage));
  const handleSetCurrentView = (val: PostViewType) => {
    setShowOptions(false);
    setCurrentView(val);
  };
  const handleSelectImage = (e: any) => {
    var input = e.target;
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setImages((prev) => [...prev, event?.target?.result as string]);
    };
  };
  const handlePost = async () => {
    onClose(false);
  };

  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.heading}>
              <div className={styles.backArrowWrapper} onClick={handleClose}>
                <Image
                  src="/assets/back-arrow.svg"
                  alt="drop down"
                  width={16}
                  height={16}
                />
              </div>
              <h3 className={styles.headingText}>Create a post</h3>
            </div>

            <div className={styles.headerMain}>
              <p className={styles.visibleText}>Visible for</p>

              <div className={styles.currenShowOptionWrapper}>
                <div
                  className={styles.currenShowOption}
                  onClick={handleShowOptions}
                >
                  <p className={styles.currenShowOptionValue}>
                    {currentView.type}
                  </p>
                  <Image
                    src="/assets/dropdown.svg"
                    alt="drop down"
                    width={10}
                    height={10}
                    className={styles.viewDropdown}
                  />
                  <Image
                    src="/assets/dropdown.svg"
                    alt="drop down"
                    width={16}
                    height={16}
                    className={styles.viewDropdownWeb}
                  />
                </div>

                {showOptions && (
                  <div className={styles.showOptions}>
                    {postView.map((view) => (
                      <div
                        className={styles.showOption}
                        onClick={(e) => handleSetCurrentView(view)}
                      >
                        <Image
                          src={
                            currentView.type === view.type
                              ? "/assets/select.svg"
                              : "/assets/deselect.svg"
                          }
                          alt="select"
                          width={16}
                          height={16}
                        />
                        <p className={styles.viewType}>{view.type}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.closeIcon} onClick={handleClose}>
                <Image
                  src="/assets/close.svg"
                  alt="close"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.mainContent}>
              <Image
                src="/assets/user.png"
                alt="user"
                width={32}
                height={32}
                className={styles.postUser}
              />
              <Image
                src="/assets/user.png"
                alt="user"
                width={42}
                height={42}
                className={styles.postUserWeb}
              />
              <div
                contentEditable
                className={styles.mainInput}
                placeholder="What’s happening?"
              ></div>
            </div>

            {images.length ? (
              <div className={styles.selectedImages}>
                {images.map((image) => (
                  <div className={styles.selectedImageWrapper}>
                    <div
                      className={styles.removeImage}
                      onClick={() => handleImageRemove(image)}
                    >
                      <Image
                        src="/assets/close.svg"
                        alt="remove image"
                        width={16}
                        height={16}
                      />
                    </div>
                    <Image src={image} alt="post image" fill />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            <div className={styles.bottom}>
              {images.length < 3 ? (
                <label htmlFor="post-image" className={styles.imageUpload}>
                  <Image
                    src="/assets/picture.svg"
                    alt="post icon"
                    width={16}
                    height={16}
                  />
                  <p className={styles.imageUploadText}>Photo</p>
                </label>
              ) : (
                <div></div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="enter your image"
                id="post-image"
                value=""
                className={styles.fileInput}
                onChange={(e: any) => handleSelectImage(e)}
              />

              <button className={styles.post} onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
