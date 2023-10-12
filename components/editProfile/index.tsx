"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { Input, Calendar, Text, SettingsRouteText, SettingsHeading } from "..";
import { CalendarValueType, GenderType } from "@/types";
import format from "date-fns/format";

export default function EditProfile() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "email" | "name" | "password" | "date" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(null);
  const [gender, setGender] = useState<GenderType>({
    id: "male",
    label: "Male",
  });

  const formattedDate = () => format(dateOfBirth as Date, "dd/MMMMyyyy");
  const calendarInputClickHandler = () => setShowCalendar((prev) => !prev);
  const isSelectedGender = (genderVaue: GenderType) =>
    genderVaue.id == gender.id;
  const setGenderHandler = (genderValue: GenderType) => setGender(genderValue);

  const genders: GenderType[] = [
    {
      id: "male",
      //  label: male as "Male",
      label: "male" as "Male", // intl, remove this
    },
    {
      id: "female",
      //  label: female as "Female",
      label: "female" as "Female", // same
    },
  ];

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

      <form className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.generalInputs}>
            <div>
              <p className={styles.inputHeader}>Full Name</p>
              <Input
                placeholder="Saleh Ahmed"
                onChange={() => {}}
                type="text"
                value=""
                icon=""
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
                    onClose={() => {}}
                    onSave={() => {}}
                    setValue={() => {}}
                    save={"x"} //from parent, intl
                    cancel={"x"}
                  />
                </div>
                {errorComponentToShow === "date" ? (
                  <div className={styles.calendarError}>
                    <Text type="error">{errorMessage}</Text>
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <p className={styles.inputHeader}>Email</p>
              <Input
                placeholder="yourmail@gmail.com"
                onChange={() => {}}
                type="text"
                value=""
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Bio</p>
              <Input
                placeholder="UI Designer"
                onChange={() => {}}
                type="text"
                value=""
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Phone Number</p>
              <Input
                placeholder="1712 345678"
                onChange={() => {}}
                type="tel"
                value=""
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Website</p>
              <Input
                placeholder="uihut.com"
                onChange={() => {}}
                type="tel"
                value=""
                icon=""
              />
            </div>

            <div>
              <p className={styles.inputHeader}>Gender</p>
              <div className={styles.genderWrapper}>
                <Image
                  src={
                    gender.id === "male"
                      ? "/assets/male.svg"
                      : "/assets/female.svg"
                  }
                  alt="gender"
                  width={16}
                  height={16}
                />

                <div className={styles.genders}>
                  {genders.map((genderInfo) => (
                    <div
                      key={genderInfo.label}
                      className={styles.gender}
                      onClick={() => setGenderHandler(genderInfo)}
                    >
                      <Image
                        src={
                          isSelectedGender(genderInfo)
                            ? "/assets/select.svg"
                            : "/assets/deselect.svg"
                        }
                        alt="radio icon"
                        width={16}
                        height={16}
                      />
                      <input
                        type="radio"
                        value={gender.label}
                        id={genderInfo.id}
                        className="hidden"
                      />
                      <label
                        htmlFor={genderInfo.id}
                        className={styles.genderLabel}
                      >
                        {genderInfo.label}
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
                placeholder="Sylhet, Bangladesh"
                onChange={() => {}}
                type="tel"
                value=""
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
                  placeholder="profile.salehahmed"
                  onChange={() => {}}
                  type="tel"
                  value=""
                  icon=""
                />
              </div>

              <div>
                <p className={styles.inputHeader}>Twitter</p>
                <Input
                  placeholder="profile.salehahmed"
                  onChange={() => {}}
                  type="tel"
                  value=""
                  icon=""
                />
              </div>

              <div>
                <p className={styles.inputHeader}>Instagram</p>
                <Input
                  placeholder="profile.salehahmed"
                  onChange={() => {}}
                  type="tel"
                  value=""
                  icon=""
                />
              </div>

              <div>
                <p className={styles.inputHeader}>LinkedIn</p>
                <Input
                  placeholder="profile.salehahmed"
                  onChange={() => {}}
                  type="tel"
                  value=""
                  icon=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.save}>Save</button>
        </div>
      </form>
    </>
  );
}
