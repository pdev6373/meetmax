"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.css";
import { UserType } from "@/types";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useAxiosPrivate } from "@/hooks";
import { Alert, Button } from "..";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CommunityType = {
  unfollow: string;
  follow: string;
  locale: string;
  noFollower: string;
  noFollowing: string;
  connectWithOthers: string;
  websiteLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  facebookLink: string;
  error: string;
};

export default function Community({
  unfollow,
  follow,
  locale,
  noFollower,
  noFollowing,
  connectWithOthers,
  facebookLink,
  instagramLink,
  linkedinLink,
  twitterLink,
  websiteLink,
  error,
}: CommunityType) {
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
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const fetchCommunity = async (
    type: "followers" | "following" | "recommended",
    showGlobalLoading: boolean
  ) => {
    setFetchingCommunity(showGlobalLoading);
    setFetching(true);
    const response = await fetchData({
      url: `/user/${type}/${userDetails._id}`,
      method: "GET",
    });

    setFetching(false);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(error);
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
      setAlertMessage(error);
      toggleAlertHandler();
      return;
    }

    setHidden([]);
    setAlertMessage("");
    setUserDetails(response.data.data);
  };

  const fetchCommunityOption = (showGlobalLoading = true) =>
    pathname === `/${locale}/my-community`
      ? fetchCommunity("followers", showGlobalLoading)
      : pathname.includes(`${locale}/my-community/following`)
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
        setAlertMessage(error);
        toggleAlertHandler();
        return;
      }

      fetchCommunityOption(false);
      setHidden((prev) => [...prev, id]);
      setAlertMessage("");
      setUserDetails(response?.data?.data);
    })();
  };

  if ((loading && fetchingCommunity) || fetching)
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
      {community?.length ? (
        <div className={styles.wrapper}>
          {community
            ?.filter(
              (user) =>
                !hidden.includes(user._id) || pathname === "/my-community"
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
                  <Link
                    href={`/profile/${user._id}`}
                    className={styles.profileImage}
                  >
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
                    {user.profileVisibility === "me" ||
                    (user.profileVisibility === "followers" &&
                      !user.followers.includes(userDetails._id)) ? (
                      <div className={styles.profileLock}>
                        <Image
                          src="/assets/lock.svg"
                          alt="lock"
                          width={12}
                          height={12}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
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

                    {user.website ||
                    user.socialLinks.facebook ||
                    user.socialLinks.twitter ||
                    user.socialLinks.instagram ||
                    user.socialLinks.linkedin ? (
                      <div className={styles.social}>
                        {user.website ? (
                          <a
                            target="_blank"
                            href={user.website}
                            className={styles.socialLink}
                            title={websiteLink}
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
                            title={facebookLink}
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
                            title={twitterLink}
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
                            title={instagramLink}
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
                            title={linkedinLink}
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
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                {user.canBefollowed ||
                user.followers.includes(userDetails._id) ? (
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
                        unfollow
                      ) : (
                        follow
                      )}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.noFollower}>
          <Image
            src="/assets/no-post.png"
            alt="no post"
            width={384}
            height={288}
            className={styles.noFollowerWeb}
          />
          <Image
            src="/assets/no-post.png"
            alt="no post"
            width={256}
            height={192}
            className={styles.noFollowerMobile}
          />
          <p className={styles.noPost}>{`${
            pathname === `/${locale}/my-community`
              ? `• ${noFollower} •`
              : `• ${noFollowing} •`
          }`}</p>
          {pathname === `/${locale}/my-community/following` ? (
            <div className={styles.viewRecommended}>
              <Button
                type="submit"
                onClick={() => router.push("/my-community/recommended")}
                variation="small"
              >
                {connectWithOthers}
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
