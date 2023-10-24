"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { CreatePostType, PostViewType } from "@/types";
import Image from "next/image";
import ContentEditable from "react-contenteditable";
import { Alert, Button } from "..";
import usePostReq from "@/helpers/usePostReq";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";

const postView: PostViewType[] = [
  {
    type: "Friends",
    value: "followers",
  },
  {
    type: "Public",
    value: "everyone",
  },
  {
    type: "Only me",
    value: "me",
  },
];

export default function CreatePost({
  onClose,
  postText,
  view,
  postId,
  type = "new",
  setPost,
}: CreatePostType) {
  const text = useRef<any>();
  const editableRef = useRef<any>();
  const {
    createPost: { loading, makeRequest },
    updatePost: { loading: updatingPost, makeRequest: updatePost },
  } = usePostReq();
  const {
    userDetails: {
      userDetails: { postVisibility },
    },
  } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState<PostViewType>(
    view
      ? postView.find((pView) => pView.value === view)!
      : postView.find((view) => view.value === postVisibility)!
  );
  const [showOptions, setShowOptions] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [danger, setDanger] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    editableRef.current.textContent = postText.current;
    text.current = postText.current;
  }, []);

  const postTextHandler = (e: any) => {
    // text.current = e.target.value;
    text.current = editableRef.current.textContent;
  };

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const handleClose = () => {
    postText.current = "";
    text.current = "";
    onClose(false);
  };
  const handleShowOptions = () => setShowOptions((prev) => !prev);
  const handleImageRemove = (removeImage: File) =>
    setImages((prev) => prev.filter((image) => image !== removeImage));
  const handleSetCurrentView = (val: PostViewType) => {
    setShowOptions(false);
    setCurrentView(val);
  };
  const handleSelectImage = (e: any) => {
    var input = e.target.files;
    const neededImagesAmount = 3 - images.length;
    const fileLength =
      input.length > neededImagesAmount ? neededImagesAmount : input.length;

    for (let i = 0; i < fileLength; i++) {
      setImages((prev) => [...prev, input[i]]);
    }
  };

  const handlePost = async () => {
    if (!text.current && !images.length) return;
    const payload: any = {
      message: text,
      images,
      visibility: currentView.value,
    };
    if (postId) payload.postId = postId;

    const response =
      type === "new" ? await makeRequest(payload) : await updatePost(payload);

    setAlertMessage(response?.data?.message);
    toggleAlertHandler();

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      return;
    }

    setDanger(false);
    setPost && setPost(response?.data?.data);
    handleClose();
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={danger}>
        {alertMessage}
      </Alert>
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
                    {currentView?.type}
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
                    {postView.map((view, index) => (
                      <div
                        key={index}
                        className={styles.showOption}
                        onClick={(e) => handleSetCurrentView(view)}
                      >
                        <Image
                          src={
                            currentView?.type === view.type
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
              <ContentEditable
                innerRef={editableRef}
                html={text.current}
                onChange={postTextHandler}
                placeholder="What’s happening?"
                className={styles.mainInput}
              />
            </div>

            {images.length ? (
              images.length === 1 ? (
                <div className={styles.selectedImages}>
                  {images.map((image, index) => (
                    <div className={styles.selectedImageWrapper} key={index}>
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

                      <Image
                        src={URL.createObjectURL(image)}
                        alt="post image"
                        fill
                      />
                    </div>
                  ))}
                </div>
              ) : images.length === 2 ? (
                <div className={styles.selectedImagesPlus}>
                  {images.map((image, index) => (
                    <div className={styles.selectedImageWrapper} key={index}>
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

                      <Image
                        src={URL.createObjectURL(image)}
                        alt="post image"
                        fill
                      />
                    </div>
                  ))}
                </div>
              ) : (
                images.length === 3 && (
                  <div className={styles.selectedImagesPlus}>
                    <div className={styles.selectedImageWrapper}>
                      <div
                        className={styles.removeImage}
                        onClick={() => handleImageRemove(images[2])}
                      >
                        <Image
                          src="/assets/close.svg"
                          alt="remove image"
                          width={16}
                          height={16}
                        />
                      </div>

                      <Image
                        src={URL.createObjectURL(images[2])}
                        alt="post image"
                        fill
                      />
                    </div>

                    <div className={styles.postTwo}>
                      {images.slice(0, 2).map((image, index) => (
                        <div
                          className={styles.selectedImageWrapper}
                          key={index}
                        >
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

                          <Image
                            src={URL.createObjectURL(image)}
                            alt="post image"
                            fill
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )
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
                  <p className={styles.imageUploadText}>Add Photo</p>
                </label>
              ) : (
                <div></div>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="enter your image"
                id="post-image"
                multiple
                value=""
                className={styles.fileInput}
                onChange={(e: any) => handleSelectImage(e)}
              />

              <Button
                disabled={!text.current}
                type="submit"
                isLoading={type === "new" ? loading : updatingPost}
                onClick={handlePost}
                variation="small"
              >
                {type === "new" ? "Post" : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
