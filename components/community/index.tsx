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

export default function Community() {
  const pathname = usePathname();
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const { fetchData, loading } = useAxiosPrivate();
  const [community, setCommunity] = useState<UserType[]>([]);

  const fetchCommunity = async (
    type: "followers" | "following" | "recommended"
  ) => {
    const response = await fetchData({
      url:
        type === "followers"
          ? `/user/followers/${userDetails._id}`
          : type === "following"
          ? `/user/following/${userDetails._id}`
          : `/user/recommended/${userDetails._id}`,
      method: "GET",
    });

    setCommunity(response.data.data);
  };

  useEffect(() => {
    pathname === "/my-community"
      ? fetchCommunity("followers")
      : pathname.includes("/my-community/following")
      ? fetchCommunity("following")
      : fetchCommunity("recommended");
  }, [pathname]);

  const unfollowHandler = async () => {};

  const followHandler = async (id: string) => {
    const followUser = async () => {
      const response = await fetchData({
        url: "/user/follow-user",
        method: "PATCH",
        payload: {
          id: userDetails._id,
          followId: id,
        },
      });

      console.log(response);

      // setRecommended(response.data.data);
    };

    followUser();
  };

  if (loading)
    return (
      <div className={styles.loader}>
        <Image src="/assets/spinner.svg" alt="loading" width={40} height={40} />
      </div>
    );

  return (
    <div className={styles.wrapper}>
      {community?.map((user, index) => (
        <div
          className={[
            styles.user,
            community.length === 1 && styles.userOne,
          ].join(" ")}
          key={index}
        >
          <div className={styles.userDetails}>
            <Link href={`/profile/${user._id}`}>
              <Image
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/profile-male.png"
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
                    : "/assets/profile-male.png"
                }
                alt="user"
                width={50}
                height={50}
                className={styles.userImageMobile}
              />
            </Link>

            <div className={styles.userInfo}>
              <Link href={`profile/${user._id}`} className={styles.infoTop}>
                <p
                  className={styles.userName}
                >{`${user.lastname} ${user.firstname}`}</p>
                <p className={styles.userProfession}>{user.bio}</p>
              </Link>

              <div className={styles.social}>
                <Link href="" className={styles.socialLink}>
                  <Image
                    src="/assets/explore.svg"
                    alt="social"
                    width={14}
                    height={14}
                  />
                </Link>

                {user.socialLinks.facebook ? (
                  <Link href="" className={styles.socialLink}>
                    <Image
                      src="/assets/facebook.svg"
                      alt="facebook link"
                      width={14}
                      height={14}
                    />
                  </Link>
                ) : (
                  <></>
                )}
                {user.socialLinks.twitter ? (
                  <Link href="" className={styles.socialLink}>
                    <Image
                      src="/assets/twitter.svg"
                      alt="twitter link"
                      width={14}
                      height={14}
                    />
                  </Link>
                ) : (
                  <></>
                )}
                {user.socialLinks.instagram ? (
                  <Link href="" className={styles.socialLink}>
                    <Image
                      src="/assets/instagram.svg"
                      alt="instagram link"
                      width={14}
                      height={14}
                    />
                  </Link>
                ) : (
                  <></>
                )}
                {user.socialLinks.linkedin ? (
                  <Link href="" className={styles.socialLink}>
                    <Image
                      src="/assets/linkedin.svg"
                      alt="linkedin link"
                      width={14}
                      height={14}
                    />
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {/* <button className={styles.ignoreButton}>Ignore</button> */}
            <button
              onClick={
                pathname.includes("/my-community/recommended")
                  ? () => followHandler(user._id)
                  : unfollowHandler
              }
              className={
                pathname === "/my-community"
                  ? styles.ignoreButton
                  : styles.followButton
              }
            >
              {pathname === "/my-community" ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
