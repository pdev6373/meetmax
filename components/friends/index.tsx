"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";
import { Alert, Button, Switch } from "..";
import { FriendsOptionsType, UserType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useAxiosPrivate } from "@/hooks";
import { GeneralContext } from "@/context/generalContext";
import { useRouter } from "next/navigation";

export default function Friends({
  error,
  friendsText,
  value,
  noFriends,
  connectWithOthers,
}: {
  error: string;
  friendsText: string;
  value: string;
  noFriends: string;
  connectWithOthers: string;
}) {
  const friendsRef = useRef<any>(null);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [friends, setFriends] = useState<UserType[]>();
  const { fetchData, loading } = useAxiosPrivate();
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const [hasScrollbar, setHasScrollbar] = useState<boolean | undefined>(
    undefined
  );
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const {
    fields: { refetchToggle },
  } = useContext(GeneralContext);
  const [options, setOptions] = useState<FriendsOptionsType[]>([
    {
      icon: "/assets/mute.svg",
      text: "Message sounds",
      state: "off",
    },
    {
      icon: "/assets/incoming-call.svg",
      text: "Call sounds",
      state: "off",
    },
    {
      icon: "/assets/active.svg",
      text: "Turn of active status",
      state: "off",
    },
  ]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  useEffect(() => {
    setHasScrollbar(
      friendsRef.current?.scrollHeight > friendsRef.current?.clientHeight
    );
  }, [friendsRef]);

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    (async () => {
      const response = await fetchData({
        url: `/user/followers/${userDetails._id}`,
        method: "GET",
      });

      if (!response?.success || !response?.data?.success) {
        setAlertMessage(error);
        toggleAlertHandler();
        return;
      }

      setAlertMessage("");
      setFriends(response.data.data);
    })();
  }, [refetchToggle]);

  // const handleShowOptions = () => setShowOptions((prev) => !prev);

  if (loading)
    return (
      <div className={styles.loader}>
        <Image src="/assets/spinner.svg" alt="spinner" width={40} height={40} />
      </div>
    );

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={true}>
        {alertMessage}
      </Alert>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3 className={styles.heading}>{friendsText}</h3>

          {typeof hasScrollbar !== "undefined" && (
            <div
              className={[styles.more, hasScrollbar && styles.moreMargin].join(
                " "
              )}
            >
              {/* <Image
                src="/assets/more-dim.svg"
                alt="friend"
                width={16}
                height={16}
                onClick={handleShowOptions}
                className={styles.moreIcon}
              /> */}

              {showOptions ? (
                <div className={styles.optionsWrapper}>
                  {options.map((option) => (
                    <div className={styles.option} key={option.text}>
                      <div className={styles.optionMain}>
                        <Image
                          src={option.icon}
                          alt="icon"
                          width={16}
                          height={16}
                        />
                        <p className={styles.optionText}>{option.text}</p>
                      </div>

                      <Switch
                        state={option.state}
                        onClick={() =>
                          setOptions((prev) =>
                            prev.map((item) =>
                              item.text !== option.text
                                ? item
                                : {
                                    ...item,
                                    state:
                                      option.state === "off" ? "on" : "off",
                                  }
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>

        <div className={styles.friends} ref={friendsRef}>
          {(() => {
            const filteredFriends = friends?.filter(
              (friend) =>
                friend?.firstname
                  ?.toLowerCase()
                  ?.trim()
                  ?.includes(value?.toLowerCase()?.trim()) ||
                friend?.lastname
                  ?.toLowerCase()
                  ?.trim()
                  ?.includes(value?.toLowerCase()?.trim()) ||
                `${friend?.lastname} ${friend?.firstname}`
                  ?.toLowerCase()
                  ?.trim()
                  ?.includes(value?.toLowerCase()?.trim())
            );

            if (!filteredFriends?.length)
              return (
                <div className={styles.noFriends}>
                  <Image
                    src="/assets/no-post.png"
                    alt="no post"
                    width={256}
                    height={192}
                  />
                  <p className={styles.noPost}>• {noFriends} •</p>
                  <div className={styles.viewRecommended}>
                    <Button
                      type="submit"
                      onClick={() => router.push("/my-community/recommended")}
                      variation="small"
                    >
                      {connectWithOthers}
                    </Button>
                  </div>
                </div>
              );

            return filteredFriends?.map((friend, index) => (
              <Link
                href={`/profile/${friend._id}`}
                className={styles.friend}
                key={index}
              >
                <div className={styles.friendDetails}>
                  <div className={styles.profileWrapper}>
                    <Image
                      src={friend?.profilePicture || "/assets/no-profile.svg"}
                      alt="friend"
                      width={40}
                      height={40}
                      className={styles.friendImage}
                    />
                    {friend?.profileVisibility === "me" ||
                    (friend?.profileVisibility === "followers" &&
                      !friend?.followers.includes(userDetails._id)) ? (
                      <div className={styles.profileLock}>
                        <Image
                          src="/assets/lock.svg"
                          alt="lock"
                          width={10}
                          height={10}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p
                    className={styles.friendName}
                  >{`${friend.lastname} ${friend.firstname}`}</p>
                </div>

                {/* {friend.lastSeen === "now" ? (
                <div className={styles.active}></div>
              ) : (
                <p className={styles.friendLastSeen}>{friend.lastSeen}</p>
              )} */}
              </Link>
            ));
          })()}
        </div>
      </div>
    </>
  );
}
