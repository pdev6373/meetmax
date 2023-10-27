"use client";
import { useState, useEffect, useContext } from "react";
import { Alert, SettingsHeading, SettingsRouteText } from "@/components";
import Image from "next/image";
import styles from "./index.module.css";
import useUserReq from "@/helpers/useUserReq";
import { AuthContext } from "@/context/authContext";
import format from "date-fns/format";
import { ViewingAndSharingType, VisibilityType } from "@/types";

type VisibilityOptionsType = {
  title: "Everyone" | "Followers" | "Only me";
  isSelected: boolean;
  value: VisibilityType;
};

type VisibilityDataType = {
  title: string;
  options: VisibilityOptionsType[];
};

type CurrentLoadingType = "post" | "profile" | "follow";

type FollowOptionOptionType = {
  title: "Everyone" | "Off";
  isSelected: boolean;
  value: boolean;
};

type FollowOptionType = {
  title: string;
  options: FollowOptionOptionType[];
};

export default function ViewingAndSharing({
  everyone,
  followers,
  off,
  onlyMe,
  postVisibilityText,
  profileVisibilityText,
  viewingAndSharing,
  whoCanFollow,
  updateEror,
}: ViewingAndSharingType) {
  const [currentLoading, setCurrentLoading] =
    useState<CurrentLoadingType>("post");
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    updateUser: { loading, makeRequest },
  } = useUserReq();
  const {
    userDetails: {
      setUserDetails,
      userDetails: {
        _id,
        email,
        dateOfBirth,
        firstname,
        lastname,
        gender,
        postVisibility: userPostVisibility,
        profileVisibility: userProfileVisibility,
        canBefollowed,
      },
    },
  } = useContext(AuthContext);

  const [clickedPost, setClickedPost] = useState<VisibilityType | null>(null);
  const [clickedProfile, setClickedProfile] = useState<VisibilityType | null>(
    null
  );
  const [clickedFollow, setClickedFollow] = useState<boolean | null>(null);
  const [postVisibility, setPostVisibility] = useState<VisibilityDataType>({
    title: postVisibilityText,
    options: [
      {
        title: everyone as "Everyone",
        isSelected: false,
        value: "everyone",
      },
      {
        title: followers as "Followers",
        isSelected: false,
        value: "followers",
      },
      {
        title: onlyMe as "Only me",
        isSelected: false,
        value: "me",
      },
    ],
  });

  const [profileVisibility, setProfileVisibility] =
    useState<VisibilityDataType>({
      title: profileVisibilityText,
      options: [
        {
          title: everyone as "Everyone",
          isSelected: false,
          value: "everyone",
        },
        {
          title: followers as "Followers",
          isSelected: false,
          value: "followers",
        },
        {
          title: onlyMe as "Only me",
          isSelected: false,
          value: "me",
        },
      ],
    });

  const [followOption, setFollowOption] = useState<FollowOptionType>({
    title: whoCanFollow,
    options: [
      {
        title: everyone as "Everyone",
        isSelected: false,
        value: true,
      },
      {
        title: off as "Off",
        isSelected: false,
        value: false,
      },
    ],
  });

  useEffect(() => {
    setPostVisibility((prev) => ({
      title: prev.title,
      options: prev.options.map((prevOption) => ({
        title: prevOption.title,
        isSelected: userPostVisibility === prevOption.value || false,
        value: prevOption.value,
      })),
    }));

    setProfileVisibility((prev) => ({
      title: prev.title,
      options: prev.options.map((prevOption) => ({
        title: prevOption.title,
        isSelected: userProfileVisibility === prevOption.value || false,
        value: prevOption.value,
      })),
    }));

    setFollowOption((prev) => ({
      title: prev.title,
      options: prev.options.map((prevOption) => ({
        title: prevOption.title,
        isSelected: canBefollowed === prevOption.value || false,
        value: prevOption.value,
      })),
    }));
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);
  const postVisibilityHandler = async (
    value: VisibilityType | boolean,
    type: CurrentLoadingType
  ) => {
    if (type === "post" && value === userPostVisibility) return;
    if (type === "profile" && value === userProfileVisibility) return;
    if (type === "follow" && value === canBefollowed) return;

    setCurrentLoading(type);
    const payload: any = {
      email,
      lastname,
      firstname,
      dateOfBirth: format(new Date(dateOfBirth!), "yyyy/MM/dd"),
      gender,
      id: _id,
    };

    if (type === "post") payload.postVisibility = value;
    if (type === "profile") payload.profileVisibility = value;
    if (type === "follow") payload.canBefollowed = value;

    const response = await makeRequest(payload);
    if (!response?.success || !response?.data?.success) {
      setAlertMessage(updateEror);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    type === "post"
      ? setPostVisibility((prev) => ({
          title: prev.title,
          options: prev.options.map((prevOption) => ({
            title: prevOption.title,
            isSelected: prevOption.value === value || false,
            value: prevOption.value,
          })),
        }))
      : type === "profile"
      ? setProfileVisibility((prev) => ({
          title: prev.title,
          options: prev.options.map((prevOption) => ({
            title: prevOption.title,
            isSelected: prevOption.value === value || false,
            value: prevOption.value,
          })),
        }))
      : setFollowOption((prev) => ({
          title: prev.title,
          options: prev.options.map((prevOption) => ({
            title: prevOption.title,
            isSelected: prevOption.value === value || false,
            value: prevOption.value,
          })),
        }));
    setUserDetails(response?.data?.data);
  };

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
      <SettingsRouteText>{viewingAndSharing}</SettingsRouteText>
      <SettingsHeading>{viewingAndSharing}</SettingsHeading>
      <div className={styles.options}>
        <div className={styles.option}>
          <p className={styles.title}>{postVisibility.title}</p>

          <div className={styles.radios}>
            {postVisibility.options.map((option) => (
              <div
                key={option.title}
                className={styles.radio}
                onClick={() => {
                  setClickedPost(option.value);
                  postVisibilityHandler(option.value, "post");
                }}
              >
                <Image
                  src={
                    option.isSelected
                      ? "/assets/select.svg"
                      : "/assets/deselect.svg"
                  }
                  alt="option icon"
                  width={16}
                  height={16}
                />
                <p className={styles.optionText}>{option.title}</p>
                {loading &&
                currentLoading === "post" &&
                clickedPost === option.value ? (
                  <Image
                    src={"/assets/spinner.svg"}
                    alt="spinner"
                    width={16}
                    height={16}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <div className={styles.option}>
            <p className={styles.title}>{profileVisibility.title}</p>

            <div className={styles.radios}>
              {profileVisibility.options.map((option) => (
                <div
                  key={option.title}
                  className={styles.radio}
                  onClick={() => {
                    setClickedProfile(option.value);
                    postVisibilityHandler(option.value, "profile");
                  }}
                >
                  <Image
                    src={
                      option.isSelected
                        ? "/assets/select.svg"
                        : "/assets/deselect.svg"
                    }
                    alt="option icon"
                    width={16}
                    height={16}
                  />
                  <p className={styles.optionText}>{option.title}</p>{" "}
                  {loading &&
                  currentLoading === "profile" &&
                  clickedProfile === option.value ? (
                    <Image
                      src={"/assets/spinner.svg"}
                      alt="spinner"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.option}>
            <p className={styles.title}>{followOption.title}</p>

            <div className={styles.radios}>
              {followOption.options.map((option) => (
                <div
                  key={option.title}
                  className={styles.radio}
                  onClick={() => {
                    setClickedFollow(option.value);
                    postVisibilityHandler(option.value, "follow");
                  }}
                >
                  <Image
                    src={
                      option.isSelected
                        ? "/assets/select.svg"
                        : "/assets/deselect.svg"
                    }
                    alt="option icon"
                    width={16}
                    height={16}
                  />
                  <p className={styles.optionText}>{option.title}</p>
                  {loading &&
                  currentLoading === "follow" &&
                  clickedFollow === option.value ? (
                    <Image
                      src={"/assets/spinner.svg"}
                      alt="spinner"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
