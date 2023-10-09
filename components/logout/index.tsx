import { LogoutType } from "@/types";
import styles from "./index.module.css";

export default function Logout({ onLogout, onCancelLogout }: LogoutType) {
  return (
    <div className={styles.overlay}>
      <div className={styles.logoutWrapper}>
        <h3 className={styles.logoutHeading}>Logout</h3>
        <p className={styles.logoutText}>Are you sure you want to logout?</p>

        <div className={styles.logoutActions}>
          <button className={styles.logoutCancel} onClick={onCancelLogout}>
            Cancel
          </button>
          <button className={styles.logoutProceed} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
