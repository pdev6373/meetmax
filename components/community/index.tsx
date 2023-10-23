"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.css";
import { UserType } from "@/types";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useAxiosPrivate } from "@/hooks";
import { Alert } from "..";

export default function Community() {
  const pathname = usePathname();
  const {
    userDetails: { userDetails, setUserDetails },
  } = useContext(AuthContext);
  const { fetchData, loading } = useAxiosPrivate();
  const [community, setCommunity] = useState<UserType[]>([]);
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fetchingCommunity, setFetchingCommunity] = useState(true);
  const [toBeHidden, setToBeHidden] = useState("");
  const [hidden, setHidden] = useState<string[]>([]);

  const fetchCommunity = async (
    type: "followers" | "following" | "recommended",
    showGlobalLoading: boolean
  ) => {
    setFetchingCommunity(showGlobalLoading);
    const response = await fetchData({
      url: `/user/${type}/${userDetails._id}`,
      method: "GET",
    });
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }
    setHidden([]);
    setAlertMessage("");
    setCommunity(response.data.data);
  };

  const fetchUserDetails = async () => {
    const response = await fetchData({
      url: `/user/${userDetails._id}`,
      method: "GET",
    });

    if (!response?.success || !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setHidden([]);
    setAlertMessage("");
    setUserDetails(response.data.data);
  };

  const fetchCommunityOption = (showGlobalLoading = true) =>
    pathname === "/my-community"
      ? fetchCommunity("followers", showGlobalLoading)
      : pathname.includes("/my-community/following")
      ? fetchCommunity("following", showGlobalLoading)
      : fetchCommunity("recommended", showGlobalLoading);

  useEffect(() => {
    setHidden([]);
    fetchCommunityOption();
    fetchUserDetails();
  }, [pathname]);

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const actionHandler = async (id: string, action: "follow" | "unfollow") => {
    setFetchingCommunity(false);
    setToBeHidden(id);
    (async () => {
      const response = await fetchData({
        url: action === "follow" ? "/user/follow-user" : "/user/unfollow-user",
        method: "PATCH",
        payload:
          action === "follow"
            ? {
                id: userDetails._id,
                followId: id,
              }
            : {
                id: userDetails._id,
                unfollowId: id,
              },
      });

      if (!response?.success || !response?.data?.success) {
        setAlertMessage(response?.data?.message);
        toggleAlertHandler();
        return;
      }

      fetchCommunityOption(false);
      setHidden((prev) => [...prev, id]);
      setAlertMessage("");
      setUserDetails(response?.data?.data);
    })();
  };

  if (loading && fetchingCommunity)
    return (
      <div className={styles.loader}>
        <Image src="/assets/spinner.svg" alt="loading" width={40} height={40} />
      </div>
    );

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
      <div className={styles.wrapper}>
        {community
          ?.filter(
            (user) => !hidden.includes(user._id) || pathname === "/my-community"
          )
          ?.map((user, index, array) => (
            <div
              className={[
                styles.user,
                array.length === 1 && styles.userOne,
              ].join(" ")}
              key={index}
            >
              <div className={styles.userDetails}>
                <Link href={`/profile/${user._id}`}>
                  <Image
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "/assets/no-profile.svg"
                    }
                    alt="user"
                    width={70}
                    height={70}
                    className={styles.userImageWeb}
                  />
                  <Image
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "/assets/no-profile.svg"
                    }
                    alt="user"
                    width={50}
                    height={50}
                    className={styles.userImageMobile}
                  />
                </Link>

                <div className={styles.userInfo}>
                  <Link
                    href={`/profile/${user._id}`}
                    className={styles.infoTop}
                  >
                    <p
                      className={styles.userName}
                    >{`${user.lastname} ${user.firstname}`}</p>
                    <p className={styles.userProfession}>{user.bio}</p>
                  </Link>

                  <div className={styles.social}>
                    {user.website ? (
                      <a
                        target="_blank"
                        href={user.website}
                        className={styles.socialLink}
                        title="website link"
                      >
                        <Image
                          src="/assets/explore.svg"
                          alt="website link"
                          width={14}
                          height={14}
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.socialLinks.facebook ? (
                      <a
                        target="_blank"
                        href={user.socialLinks.facebook}
                        className={styles.socialLink}
                        title="facebook link"
                      >
                        <Image
                          src="/assets/facebook.svg"
                          alt="facebook link"
                          width={14}
                          height={14}
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.socialLinks.twitter ? (
                      <a
                        target="_blank"
                        href={user.socialLinks.twitter}
                        className={styles.socialLink}
                        title="twitter link"
                      >
                        <Image
                          src="/assets/twitter.svg"
                          alt="twitter link"
                          width={14}
                          height={14}
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.socialLinks.instagram ? (
                      <a
                        target="_blank"
                        href={user.socialLinks.instagram}
                        className={styles.socialLink}
                        title="instagram link"
                      >
                        <Image
                          src="/assets/instagram.svg"
                          alt="instagram link"
                          width={14}
                          height={14}
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.socialLinks.linkedin ? (
                      <a
                        target="_blank"
                        href={user.socialLinks.linkedin}
                        className={styles.socialLink}
                        title="linkedin link"
                      >
                        <Image
                          src="/assets/linkedin.svg"
                          alt="linkedin link"
                          width={18}
                          height={18}
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  disabled={loading && user._id === toBeHidden}
                  type="button"
                  onClick={() => {
                    user.followers.includes(userDetails._id)
                      ? actionHandler(user._id, "unfollow")
                      : actionHandler(user._id, "follow");
                  }}
                  className={
                    user.followers.includes(userDetails._id)
                      ? styles.ignoreButton
                      : styles.followButton
                  }
                >
                  {loading && user._id === toBeHidden ? (
                    <Image
                      src="/assets/spinner.svg"
                      alt="spinner"
                      width={24}
                      height={24}
                    />
                  ) : user.followers.includes(userDetails._id) ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
