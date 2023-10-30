"use client";
import { useContext } from "react";
import { LogoutType } from "@/types";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

export default function Logout({
  onCancelLogout,
  logoutText,
  cancelText,
  confirmLogoutText,
}: LogoutType) {
  const { resetFields } = useContext(AuthContext);
  const { fetchData } = useAxios();

  const logout = async () => {
    resetFields();

    try {
      await fetchData({
        url: "/auth/logout",
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.logoutWrapper}>
        <h3 className={styles.logoutHeading}>{logoutText}</h3>
        <p className={styles.logoutText}>{confirmLogoutText}</p>
        <div className={styles.logoutActions}>
          <button className={styles.logoutCancel} onClick={onCancelLogout}>
            {cancelText}
          </button>
          <button className={styles.logoutProceed} onClick={logout}>
            {logoutText}
          </button>
        </div>
      </div>
    </div>
  );
}
