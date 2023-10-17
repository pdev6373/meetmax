"use client";
import { useContext } from "react";
import { LogoutType } from "@/types";
import styles from "./index.module.css";
import { AuthContext } from "@/context/authContext";
import { useAxios } from "@/hooks";

export default function Logout({ onCancelLogout }: LogoutType) {
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
        <h3 className={styles.logoutHeading}>Logout</h3>
        <p className={styles.logoutText}>Are you sure you want to logout?</p>

        <div className={styles.logoutActions}>
          <button className={styles.logoutCancel} onClick={onCancelLogout}>
            Cancel
          </button>
          <button className={styles.logoutProceed} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
