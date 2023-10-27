"use client";
import { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import ContentEditable from "react-contenteditable";
import styles from "./index.module.css";
import { Alert, Button, CreatePost } from "..";
import { AuthContext } from "@/context/authContext";
import usePostReq from "@/helpers/usePostReq";
import { MakePostTextsType } from "@/types";

export default function MakePost({
  profileId,
  texts,
}: {
  profileId?: string;
  texts: MakePostTextsType;
}) {
  const {
    createPost: { loading, makeRequest },
  } = usePostReq();
  const text = useRef("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [danger, setDanger] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);

  const editableRef = useRef<any>();

  const actions = [
    {
      icon: "/assets/picture.svg",
      text: texts.addPhoto,
      action: () => {},
    },
  ];

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const postTextHandler = (e: any) => {
    // text.current = e.target.value;
    text.current = editableRef.current.textContent;
  };
  const handlePost = async () => {
    if (!text.current) return;
    const response = await makeRequest({ message: text, profileId });
    setAlertMessage(response?.data?.message);
    toggleAlertHandler();

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      return;
    }

    setDanger(false);
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={danger}>
        {alertMessage}
      </Alert>
      <div className={styles.wrapper}>
        {showPostOptions && (
          <CreatePost
            onClose={setShowPostOptions}
            postText={text}
            profileId={profileId}
            texts={texts}
          />
        )}
        <div className={styles.header}>
          <Image
            src={userDetails?.profilePicture || "/assets/no-profile.svg"}
            alt="user"
            width={32}
            height={32}
            className={styles.userMobile}
          />
          <Image
            src={userDetails?.profilePicture || "/assets/no-profile.svg"}
            alt="user"
            width={42}
            height={42}
            className={styles.userDesktop}
          />

          <ContentEditable
            innerRef={editableRef}
            html={text.current}
            onChange={postTextHandler}
            placeholder={texts.whatsHappening}
            className={styles.input}
          />
        </div>

        <div className={styles.actionsWrapper}>
          <div className={styles.actions}>
            {actions.map((action) => (
              <div
                key={action.text}
                className={styles.action}
                onClick={() => setShowPostOptions(true)}
              >
                <Image
                  src={action.icon}
                  alt="post icon"
                  width={16}
                  height={16}
                />
                <p className={styles.actionText}>{action.text}</p>
              </div>
            ))}
          </div>

          <Button
            disabled={!text.current}
            onClick={handlePost}
            type="submit"
            isLoading={loading}
            variation="small"
          >
            {texts.postText}
          </Button>
        </div>
      </div>
    </>
  );
}
