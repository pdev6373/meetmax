"use client";
import { useState, useEffect, useContext } from "react";
import {
  Alert,
  Button,
  Calendar,
  FormBottomText,
  Input,
  Text,
} from "@/components";
import Image from "next/image";
import { GenderType, SignupFormType } from "@/types";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

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
  const { fetchData, loading } = useAxios();
  const {
    fields: { name, password, dateOfBirth, email, gender },
    setFields: { setEmail, setGender, setName, setDateOfBirth, setPassword },
    resetFields,
  } = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorComponentToShow, setErrorComponentToShow] = useState<
    "email" | "name" | "password" | "date" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState<"yes" | "no" | "wait">("wait");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const genders = [male as "Male", female as "Female"];

  useEffect(() => {
    resetFields();
  }, []);

  useEffect(() => {
    setErrorComponentToShow(null);
    setErrorMessage("");
  }, [email, name, password, dateOfBirth, gender]);

  useEffect(() => {
    if (!alertMessage) return;

    setShowAlert("yes");
    const alertTimer = setTimeout(() => setShowAlert("no"), 5000);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertMessage, alertToggle]);

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

    const response = await fetchData({
      url: "/auth/register",
      method: "POST",
      payload: {
        email,
        lastname: name.split(" ")[0],
        firstname: name.split(" ").slice(1).join(" "),
        password,
        dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
        gender: gender,
      },
    });

    if (!response?.success) {
      setAlertMessage("An error occurred");
      toggleAlertHandler();
      return;
    }

    if (response?.success && !response?.data) {
      toggleAlertHandler();
      return;
    }

    if (response?.success && !response?.data?.success) {
      setAlertMessage(response?.data?.message);
      toggleAlertHandler();
      return;
    }

    setAlertMessage("");
    localStorage.setItem(
      "meetmax_email",
      JSON.stringify({ email, type: "signup" })
    );
    router.push("/check-mail");
  };

  const signinHandler = () => "/login";
  const isSelectedGender = (genderVaue: GenderType) => genderVaue == gender;
  const setGenderHandler = (genderValue: GenderType) => setGender(genderValue);
  const togglePasswordHandler = () => setHidePassword((prev) => !prev);
  const calendarInputClickHandler = () => setShowCalendar((prev) => !prev);
  const calendarClosehandler = () => setShowCalendar(false);
  const calendarSavehandler = () => setShowCalendar(false);
  const formattedDate = () => format(dateOfBirth as Date, "dd/MMMMyyyy");
  const toggleAlertHandler = () => setAlertToggle((prev) => !prev);

  return (
    <>
      <Alert open={showAlert} setOpen={setShowAlert}>
        {alertMessage}
      </Alert>
      <form className={styles.form} onSubmit={signupHandler} noValidate>
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
                gender === "Male" ? "/assets/male.svg" : "/assets/female.svg"
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

        <Button type="submit" isLoading={loading}>
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
    </>
  );
}
