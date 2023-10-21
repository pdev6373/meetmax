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
} from "..";
import { CalendarValueType, EditProfileType, GenderType } from "@/types";
import format from "date-fns/format";
import { AuthContext } from "@/context/authContext";
import { useAxiosPrivate } from "@/hooks";

export default function EditProfile({
  defaultError,
  emailError,
  namesError,
  save,
  cancel,
  male,
  female,
}: EditProfileType) {
  const { fetchData, loading } = useAxiosPrivate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    | "email"
    | "phoneNumber"
    | "fullname"
    | "linkedin"
    | "instagram"
    | "twitter"
    | "facebook"
    | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);
  const [fullname, setFullname] = useState(
    `${userDetails.lastname} ${userDetails.firstname}`
  );
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(
    new Date(userDetails.dateOfBirth!)
  );
  const [email, setEmail] = useState(userDetails.email);
  const [bio, setBio] = useState(userDetails.bio);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber);
  const [website, setWebsite] = useState(userDetails.website);
  const [gender, setGender] = useState(userDetails.gender);
  const [location, setLocation] = useState(userDetails.location);
  const [facebook, setFacebook] = useState(userDetails.socialLinks.facebook);
  const [instagram, setInstagram] = useState(userDetails.socialLinks.instagram);
  const [linkedin, setLinkedin] = useState(userDetails.socialLinks.linkedin);
  const [twitter, setTwitter] = useState(userDetails.socialLinks.twitter);
  const genders: GenderType[] = [male as "Male", female as "Female"];

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [
    email,
    fullname,
    bio,
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

    if (!email) {
      setErrorComponentToShow("email");
      setErrorMessage(defaultError);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorComponentToShow("email");
      setErrorMessage(emailError);
      return;
    }

    if (
      phoneNumber &&
      !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
        phoneNumber
      )
    ) {
      setErrorComponentToShow("phoneNumber");
      setErrorMessage(emailError);
      return;
    }

    if (
      facebook &&
      !/^https:\/\/(?:www\.)?facebook\.com\/(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/i.test(
        facebook
      )
    ) {
      setErrorComponentToShow("facebook");
      setErrorMessage(emailError);
      return;
    }

    if (
      twitter &&
      !/^https:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i.test(twitter)
    ) {
      setErrorComponentToShow("twitter");
      setErrorMessage(emailError);
      return;
    }

    if (
      instagram &&
      !/^https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?/i.test(instagram)
    ) {
      setErrorComponentToShow("instagram");
      setErrorMessage(emailError);
      return;
    }

    if (
      linkedin &&
      !/^https:\/\/(?:www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/i.test(linkedin)
    ) {
      setErrorComponentToShow("linkedin");
      setErrorMessage(emailError);
      return;
    }

    const response = await fetchData({
      url: "/user",
      method: "PATCH",
      payload: {
        email,
        lastname: fullname.split(" ")[0],
        firstname: fullname.split(" ").slice(1).join(" "),
        dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
        gender: gender,
        id: userDetails._id,
        bio,
        phoneNumber,
        website,
        location,
        socialLinks: {
          facebook,
          linkedin,
          twitter,
          instagram,
        },
      },
    });
  };

  const cancelButtonHandler = () => {
    setEmail(userDetails.email);
    setFullname(`${userDetails.lastname} ${userDetails.firstname}`);
    setBio(userDetails.bio);
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
      <SettingsRouteText>Edit Profile</SettingsRouteText>
      <SettingsHeading>Edit Profile</SettingsHeading>

      <div className={styles.imageWrapper}>
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
      </div>

      <form className={styles.form} onSubmit={userUpdateHandler} noValidate>
        <div className={styles.inputs}>
          <div className={styles.generalInputs}>
            <div>
              <p className={styles.inputHeader}>Full Name</p>
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
              <p className={styles.inputHeader}>Birthday</p>
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
                    save={save} //from parent, intl
                    cancel={cancel}
                  />
                </div>
              </div>
            </div>

            <div>
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
            </div>

            <div>
              <p className={styles.inputHeader}>Bio</p>
              <Input
                placeholder={userDetails.bio || "Enter your bio"}
                onChange={setBio}
                type="text"
                value={bio}
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Phone Number</p>
              <Input
                placeholder={
                  userDetails.phoneNumber || "Enter your phone number"
                }
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
              <p className={styles.inputHeader}>Website</p>
              <Input
                placeholder={userDetails.website || "Enter your website"}
                onChange={setWebsite}
                type="text"
                value={website}
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Gender</p>
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
              <p className={styles.inputHeader}>Location</p>
              <Input
                placeholder={userDetails.location || "Enter your location"}
                onChange={setLocation}
                type="text"
                value={location}
                icon=""
              />
            </div>
          </div>

          <div className={styles.socialInputsWrapper}>
            <h3 className={styles.socialHeading}>Social link</h3>

            <div className={styles.socialInputs}>
              <div>
                <p className={styles.inputHeader}>Facebook</p>
                <Input
                  placeholder={facebook || "https://facebook.com/your-username"}
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
                <p className={styles.inputHeader}>Twitter</p>
                <Input
                  placeholder={twitter || "https://twitter.com/your-username"}
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
                <p className={styles.inputHeader}>Instagram</p>
                <Input
                  placeholder={
                    instagram || "https://instagram.com/your-username"
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
                <p className={styles.inputHeader}>LinkedIn</p>
                <Input
                  placeholder={
                    linkedin || "https://linkedin.com/in/your-username"
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
