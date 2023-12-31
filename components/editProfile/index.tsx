"use client";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import {
  Input,
  Calendar,
  Text,
  SettingsRouteText,
  SettingsHeading,
  Button,
  Alert,
} from "..";
import { CalendarValueType, EditProfileType, GenderType } from "@/types";
import format from "date-fns/format";
import { AuthContext } from "@/context/authContext";
import useUserReq from "@/helpers/useUserReq";

export default function EditProfile({
  defaultError,
  namesError,
  save,
  cancel,
  male,
  female,
  anErrorOccurred,
  bio,
  birthday,
  editProfile,
  enterYourBio,
  enterYourLocation,
  enterYourPhoneNumber,
  enterYourWebsite,
  facebookText,
  fullName,
  genderText,
  instagramText,
  linkError,
  locationText,
  phoneNumberText,
  phoneNumberError,
  websiteError,
  yourUsername,
  socialLink,
  successText,
  linkedinText,
  twitterText,
  websiteText,
}: EditProfileType) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    // | "email"
    | "phoneNumber"
    | "fullname"
    | "linkedin"
    | "instagram"
    | "twitter"
    | "facebook"
    | "website"
    | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const {
    updateUser: { loading, makeRequest },
  } = useUserReq();
  const [fullname, setFullname] = useState(
    `${userDetails.lastname} ${userDetails.firstname}`
  );
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(
    new Date(userDetails.dateOfBirth!)
  );
  // const [email, setEmail] = useState(userDetails.email);
  const [userBio, setUserBio] = useState(userDetails.bio);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber);
  const [website, setWebsite] = useState(userDetails.website);
  const [gender, setGender] = useState<"Male" | "Female" | null>(
    userDetails.gender === "Male" ? (male as "Male") : (female as "Female")
  );
  const [location, setLocation] = useState(userDetails.location);
  const [facebook, setFacebook] = useState(userDetails.socialLinks.facebook);
  const [instagram, setInstagram] = useState(userDetails.socialLinks.instagram);
  const [linkedin, setLinkedin] = useState(userDetails.socialLinks.linkedin);
  const [twitter, setTwitter] = useState(userDetails.socialLinks.twitter);
  const genders: GenderType[] = [male as "Male", female as "Female"];
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [danger, setDanger] = useState(false);

  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  useEffect(() => {
    if (!alertMessage) return;

    setAlertMessage(alertMessage);
    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [
    // email,
    fullname,
    userBio,
    dateOfBirth,
    phoneNumber,
    website,
    location,
    facebook,
    instagram,
    twitter,
    linkedin,
    gender,
  ]);

  const userUpdateHandler = async (e: any) => {
    e?.preventDefault();

    if (!fullname) {
      setErrorComponentToShow("fullname");
      setErrorMessage(defaultError);
      return;
    }

    if (fullname.trim().split(" ").length < 2) {
      setErrorComponentToShow("fullname");
      setErrorMessage(namesError);
      return;
    }

    // if (!email) {
    //   setErrorComponentToShow("email");
    //   setErrorMessage(defaultError);
    //   return;
    // }

    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    //   setErrorComponentToShow("email");
    //   setErrorMessage(emailError);
    //   return;
    // }

    if (
      phoneNumber &&
      !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
        phoneNumber
      )
    ) {
      setErrorComponentToShow("phoneNumber");
      setErrorMessage(phoneNumberError);
      return;
    }

    if (website && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(website)) {
      setErrorComponentToShow("website");
      setErrorMessage(websiteError);
      return;
    }

    if (
      facebook &&
      !/^https:\/\/(?:www\.)?facebook\.com\/(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/i.test(
        facebook
      )
    ) {
      setErrorComponentToShow("facebook");
      setErrorMessage(linkError);
      return;
    }

    if (
      twitter &&
      !/^https:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i.test(twitter)
    ) {
      setErrorComponentToShow("twitter");
      setErrorMessage(linkError);
      return;
    }

    if (
      instagram &&
      !/^https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?/i.test(instagram)
    ) {
      setErrorComponentToShow("instagram");
      setErrorMessage(linkError);
      return;
    }

    if (
      linkedin &&
      !/^https:\/\/(?:www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/i.test(linkedin)
    ) {
      setErrorComponentToShow("linkedin");
      setErrorMessage(linkError);
      return;
    }

    const response = await makeRequest({
      email: userDetails?.email,
      lastname: fullname.split(" ")[0],
      firstname: fullname.split(" ").slice(1).join(" "),
      dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
      gender: gender === male ? "Male" : "Female",
      id: userDetails._id,
      bio: userBio,
      phoneNumber,
      website,
      location,
      socialLinks: {
        facebook,
        linkedin,
        twitter,
        instagram,
      },
    });

    if (!response?.success || !response?.data?.success) {
      setDanger(true);
      setAlertMessage(anErrorOccurred);
      toggleAlertHandler();
      return;
    }

    setDanger(false);
    setAlertMessage(successText);
    toggleAlertHandler();
  };

  const cancelButtonHandler = () => {
    // setEmail(userDetails.email);
    setFullname(`${userDetails.lastname} ${userDetails.firstname}`);
    setUserBio(userDetails.bio);
    setDateOfBirth(new Date(userDetails.dateOfBirth!));
    setPhoneNumber(userDetails.phoneNumber);
    setWebsite(userDetails.website);
    setLocation(userDetails.location);
    setFacebook(userDetails.socialLinks.facebook);
    setInstagram(userDetails.socialLinks.instagram);
    setTwitter(userDetails.socialLinks.twitter);
    setLinkedin(userDetails.socialLinks.linkedin);
    setGender(userDetails.gender);
  };
  const formattedDate = () => format(dateOfBirth as Date, "dd/MMMMyyyy");
  const calendarInputClickHandler = () => setShowCalendar((prev) => !prev);
  const calendarClosehandler = () => setShowCalendar(false);
  const calendarSavehandler = () => setShowCalendar(false);
  const isSelectedGender = (genderVaue: GenderType) => genderVaue == gender;
  const setGenderHandler = (genderValue: GenderType) => setGender(genderValue);

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert} isDanger={danger}>
        {alertMessage}
      </Alert>
      <SettingsRouteText>{editProfile}</SettingsRouteText>
      <SettingsHeading>{editProfile}</SettingsHeading>

      {/* <div className={styles.imageWrapper}>
        <Image
          src="/assets/user.png"
          alt="user"
          width={80}
          height={80}
          className={styles.userImage}
        />
        <Image
          src="/assets/user.png"
          alt="user"
          width={104}
          height={104}
          className={styles.userImageWeb}
        />
        <div className={styles.uploadImage}>
          <Image src="/assets/upload.svg" alt="user" width={16} height={16} />
        </div>
      </div> */}

      <form className={styles.form} onSubmit={userUpdateHandler} noValidate>
        <div className={styles.inputs}>
          <div className={styles.generalInputs}>
            <div>
              <p className={styles.inputHeader}>{fullName}</p>
              <Input
                placeholder={`${userDetails.lastname} ${userDetails.firstname}`}
                onChange={setFullname}
                type="text"
                value={fullname}
                icon=""
                errorComponent={
                  errorComponentToShow === "fullname" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
            </div>

            <div>
              <p className={styles.inputHeader}>{birthday}</p>
              <div className={styles.calendarWrapper}>
                <div
                  onClick={calendarInputClickHandler}
                  className={styles.calendarInput}
                >
                  <p
                    className={[
                      styles.calendarBox,
                      !dateOfBirth && styles.noDate,
                    ].join(" ")}
                  >
                    {dateOfBirth ? formattedDate() : "18/06/2001"}
                  </p>
                  <Image
                    src="/assets/calendar.svg"
                    alt="calendar"
                    width={16}
                    height={16}
                  />
                </div>

                <div
                  className={[
                    styles.calendar,
                    showCalendar && styles.showCalendar,
                  ].join(" ")}
                >
                  <Calendar
                    onClose={calendarClosehandler}
                    onSave={calendarSavehandler}
                    setValue={setDateOfBirth}
                    save={save}
                    cancel={cancel}
                  />
                </div>
              </div>
            </div>

            {/* <div>
              <p className={styles.inputHeader}>Email</p>
              <Input
                placeholder={userDetails.email}
                onChange={setEmail}
                type="email"
                value={email}
                icon=""
                errorComponent={
                  errorComponentToShow === "email" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
            </div> */}

            <div>
              <p className={styles.inputHeader}>{bio}</p>
              <Input
                placeholder={userDetails.bio || enterYourBio}
                onChange={setUserBio}
                type="text"
                value={userBio}
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>{phoneNumberText}</p>
              <Input
                placeholder={userDetails.phoneNumber || enterYourPhoneNumber}
                onChange={setPhoneNumber}
                type="tel"
                value={phoneNumber}
                icon=""
                errorComponent={
                  errorComponentToShow === "phoneNumber" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
            </div>

            <div>
              <p className={styles.inputHeader}>{websiteText}</p>
              <Input
                placeholder={userDetails.website || enterYourWebsite}
                onChange={setWebsite}
                type="text"
                value={website}
                icon=""
                errorComponent={
                  errorComponentToShow === "website" ? (
                    <Text type="error">{errorMessage}</Text>
                  ) : null
                }
              />
            </div>

            <div>
              <p className={styles.inputHeader}>{genderText}</p>
              <div className={styles.genderWrapper}>
                <Image
                  src={
                    gender === "Male"
                      ? "/assets/male.svg"
                      : "/assets/female.svg"
                  }
                  alt="gender"
                  width={16}
                  height={16}
                />

                <div className={styles.genders}>
                  {genders.map((gender) => (
                    <div
                      key={gender}
                      className={styles.gender}
                      onClick={() => setGenderHandler(gender)}
                    >
                      <Image
                        src={
                          isSelectedGender(gender)
                            ? "/assets/select.svg"
                            : "/assets/deselect.svg"
                        }
                        alt="radio icon"
                        width={16}
                        height={16}
                      />
                      <input
                        type="radio"
                        value={gender}
                        id={gender}
                        className="hidden"
                      />
                      <label htmlFor={gender} className={styles.genderLabel}>
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                {/* </div> */}
              </div>
            </div>

            <div>
              <p className={styles.inputHeader}>{locationText}</p>
              <Input
                placeholder={userDetails.location || enterYourLocation}
                onChange={setLocation}
                type="text"
                value={location}
                icon=""
              />
            </div>
          </div>

          <div className={styles.socialInputsWrapper}>
            <h3 className={styles.socialHeading}>{socialLink}</h3>

            <div className={styles.socialInputs}>
              <div>
                <p className={styles.inputHeader}>{facebookText}</p>
                <Input
                  placeholder={
                    facebook || `https://facebook.com/${yourUsername}`
                  }
                  onChange={setFacebook}
                  type="text"
                  value={facebook}
                  icon=""
                  errorComponent={
                    errorComponentToShow === "facebook" ? (
                      <Text type="error">{errorMessage}</Text>
                    ) : null
                  }
                />
              </div>

              <div>
                <p className={styles.inputHeader}>{twitterText}</p>
                <Input
                  placeholder={twitter || `https://twitter.com/${yourUsername}`}
                  onChange={setTwitter}
                  type="text"
                  value={twitter}
                  icon=""
                  errorComponent={
                    errorComponentToShow === "twitter" ? (
                      <div className={styles.calendarError}>
                        <Text type="error">{errorMessage}</Text>
                      </div>
                    ) : null
                  }
                />
              </div>

              <div>
                <p className={styles.inputHeader}>{instagramText}</p>
                <Input
                  placeholder={
                    instagram || `https://instagram.com/${yourUsername}`
                  }
                  onChange={setInstagram}
                  type="text"
                  value={instagram}
                  icon=""
                  errorComponent={
                    errorComponentToShow === "instagram" ? (
                      <div className={styles.calendarError}>
                        <Text type="error">{errorMessage}</Text>
                      </div>
                    ) : null
                  }
                />
              </div>

              <div>
                <p className={styles.inputHeader}>{linkedinText}</p>
                <Input
                  placeholder={
                    linkedin || `https://linkedin.com/in/${yourUsername}`
                  }
                  onChange={setLinkedin}
                  type="text"
                  value={linkedin}
                  icon=""
                  errorComponent={
                    errorComponentToShow === "linkedin" ? (
                      <div className={styles.calendarError}>
                        <Text type="error">{errorMessage}</Text>
                      </div>
                    ) : null
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={cancelButtonHandler}
          >
            {cancel}
          </button>
          <Button type="submit" isLoading={loading} variation="small">
            {save}
          </Button>
        </div>
      </form>
    </>
  );
}
