"use client";
import { useState, useEffect, useContext } from "react";
import { CreatePostType, PostViewType } from "@/types";
import styles from "./index.module.css";
import Image from "next/image";
import ContentEditable from "react-contenteditable";
import { useAxiosPrivate } from "@/hooks";
import { AuthContext } from "@/context/authContext";
import { Alert, Button } from "..";

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

export default function CreatePost({
  onClose,
  postText,
  setPostText,
}: CreatePostType) {
  const [currentView, setCurrentView] = useState(postView[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const { fetchData, loading } = useAxiosPrivate();

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
    onClose(false);
  };
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
    console.log("Hello");
    console.log(postText);

    const response = await fetchData({
      url: `/post`,
      method: "POST",
      payload: {
        id: userDetails._id,
        message: postText.current,
      },
    });

    console.log(response);

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    // setCommunity(response.data.data);

    handleClose();
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
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
                    {postView.map((view, index) => (
                      <div
                        key={index}
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
              <ContentEditable
                html={postText.current}
                onChange={setPostText}
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

                      <Image src={image} alt="post image" fill />
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

                      <Image src={image} alt="post image" fill />
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

                      <Image src={images[2]} alt="post image" fill />
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

                          <Image src={image} alt="post image" fill />
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
                accept="image/*"
                placeholder="enter your image"
                id="post-image"
                value=""
                className={styles.fileInput}
                onChange={(e: any) => handleSelectImage(e)}
              />

              <Button
                type="submit"
                isLoading={loading}
                onClick={handlePost}
                variation="small"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
