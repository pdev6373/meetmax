"use client";
import { useState, useEffect } from "react";
import { Button, Calendar, FormBottomText, Input, Text } from "@/components";
import Image from "next/image";
import { CalendarValueType, GenderType, SignupFormType } from "@/types";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import styles from "./index.module.css";

export default function SignupForm({
  emailPlaceholder,
  namePlaceholder,
  passwordPlaceholder,
  dateOfBirthPlaceholder,
  male,
  female,
  hasAccountText,
  signinText,
  signupText,
  defaultError,
  emailError,
  namesError,
  passwordError,
  save,
  cancel,
}: SignupFormType) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(null);
  const [gender, setGender] = useState<GenderType>({
    id: "male",
    label: "Male",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "email" | "name" | "password" | "date" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [email, name, password, dateOfBirth]);

  const genders: GenderType[] = [
    {
      id: "male",
      label: male as "Male",
    },
    {
      id: "female",
      label: female as "Female",
    },
  ];

  const signupHandler = async (e: any) => {
    e?.preventDefault();

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

    if (!name) {
      setErrorComponentToShow("name");
      setErrorMessage(defaultError);
      return;
    }

    if (name.trim().split(" ").length < 2) {
      setErrorComponentToShow("name");
      setErrorMessage(namesError);
      return;
    }

    if (!password) {
      setErrorComponentToShow("password");
      setErrorMessage(defaultError);
      return;
    }

    if (password.length < 8) {
      setErrorComponentToShow("password");
      setErrorMessage(passwordError);
      return;
    }

    if (!dateOfBirth) {
      setErrorComponentToShow("date");
      setErrorMessage(defaultError);
      return;
    }

    router.push("/check-mail");
  };

  const signinHandler = () => "/login";
  const isSelectedGender = (genderVaue: GenderType) =>
    genderVaue.id == gender.id;
  const setGenderHandler = (genderValue: GenderType) => setGender(genderValue);
  const togglePasswordHandler = () => setHidePassword((prev) => !prev);
  const calendarInputClickHandler = () => setShowCalendar((prev) => !prev);
  const calendarClosehandler = () => setShowCalendar(false);
  const calendarSavehandler = () => setShowCalendar(false);
  const formattedDate = () => format(dateOfBirth as Date, "dd/MMMMyyyy");

  return (
    <form className={styles.form} onSubmit={signupHandler}>
      <div className={styles.formMain}>
        <Input
          type="email"
          icon="/assets/@.svg"
          onChange={setEmail}
          placeholder={emailPlaceholder}
          value={email}
          errorComponent={
            errorComponentToShow === "email" ? (
              <Text type="error">{errorMessage}</Text>
            ) : null
          }
        />
        <Input
          type="text"
          icon="/assets/person.svg"
          onChange={setName}
          placeholder={namePlaceholder}
          value={name}
          errorComponent={
            errorComponentToShow === "name" ? (
              <Text type="error">{errorMessage}</Text>
            ) : null
          }
        />
        <Input
          type={hidePassword ? "password" : "text"}
          icon="/assets/lock.svg"
          actionIcon={hidePassword ? "/assets/eyeoff.svg" : "/assets/eye.svg"}
          onChange={setPassword}
          placeholder={passwordPlaceholder}
          value={password}
          onActionIconClick={togglePasswordHandler}
          errorComponent={
            errorComponentToShow === "password" ? (
              <Text type="error">{errorMessage}</Text>
            ) : null
          }
        />

        {/* <div className={styles.bottomInputs}> */}
        <div className={styles.calendarWrapper}>
          <div
            onClick={calendarInputClickHandler}
            className={styles.calendarInput}
          >
            <Image
              src="/assets/calendar.svg"
              alt="calendar"
              width={16}
              height={16}
            />
            <p
              className={[
                styles.calendarBox,
                !dateOfBirth && styles.noDate,
              ].join(" ")}
            >
              {dateOfBirth ? formattedDate() : dateOfBirthPlaceholder}
            </p>
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
          {errorComponentToShow === "date" ? (
            <div className={styles.calendarError}>
              <Text type="error">{errorMessage}</Text>
            </div>
          ) : null}
        </div>

        <div className={styles.genderWrapper}>
          <Image
            src={
              gender.id === "male" ? "/assets/male.svg" : "/assets/female.svg"
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
                <label htmlFor={genderInfo.id} className={styles.genderLabel}>
                  {genderInfo.label}
                </label>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>

      <Button type="submit" onClick={signupHandler}>
        {signupText}
      </Button>

      <FormBottomText
        mainform
        text={hasAccountText}
        onActionTextClick={signinHandler}
        actionType="link"
        actionText={signinText}
      />
    </form>
  );
}
