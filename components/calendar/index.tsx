"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import styles from "./index.module.css";
import Image from "next/image";
import { CalendarType, CalendarValueType } from "@/types";
import format from "date-fns/format";

export default function CalendarComponent({
  onClose,
  onSave,
  setValue,
  save,
  cancel,
}: CalendarType) {
  const [calendarValue, onChange] = useState<CalendarValueType>(new Date());

  const calendarSaveHandler = () => {
    setValue(calendarValue);
    onSave();
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        formatShortWeekday={(locale, date) => format(date, "EEEEE")}
        onChange={onChange}
        value={calendarValue}
        className={styles.calendar}
        tileClassName={styles.calendarTile}
        maxDate={new Date()}
        prevLabel={
          <Image
            src="/assets/arrow-right.svg"
            alt="dropdown"
            width={16}
            height={16}
            className={styles.prevLabelIcon}
          />
        }
        nextLabel={
          <Image
            src="/assets/arrow-right.svg"
            alt="dropdown"
            width={16}
            height={16}
          />
        }
        prev2Label={
          <div className={styles.monthNavLeft}>
            <Image
              src="/assets/arrow-right.svg"
              alt="dropdown"
              width={16}
              height={16}
            />
            <Image
              src="/assets/arrow-right.svg"
              alt="dropdown"
              width={16}
              height={16}
              className={styles.monthNavLeftIcon}
            />
          </div>
        }
        next2Label={
          <div className={styles.monthNav}>
            <Image
              src="/assets/arrow-right.svg"
              alt="dropdown"
              width={16}
              height={16}
            />
            <Image
              src="/assets/arrow-right.svg"
              alt="dropdown"
              width={16}
              height={16}
              className={styles.monthNavIcon}
            />
          </div>
        }
      />

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onClose}
          className={[styles.button, styles.cancelButton].join(" ")}
        >
          {cancel}
        </button>
        <button
          type="button"
          onClick={calendarSaveHandler}
          className={[styles.button, styles.saveButton].join(" ")}
        >
          {save}
        </button>
      </div>
    </div>
  );
}
