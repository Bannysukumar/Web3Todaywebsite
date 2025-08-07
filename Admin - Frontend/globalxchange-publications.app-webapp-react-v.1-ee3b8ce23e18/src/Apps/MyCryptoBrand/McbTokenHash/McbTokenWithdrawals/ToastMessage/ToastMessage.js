import React from "react";
import { ReactComponent as MailIcon } from "./mailIcon.svg";

import styles from "./toastMessage.module.scss";

function ToastMessage({ icon, textOne, textTwo }) {
  return (
    <div className={styles.toastWrapper}>
      <div className={styles.toastMessage}>
        {icon ? (
          <img src={icon} alt="" className={styles.icon} />
        ) : (
          <MailIcon className={styles.icon} />
        )}
        <div className={styles.name}>
          <div className={styles.textOne}>{textOne}</div>
          <div className={styles.textTwo}>{textTwo}</div>
        </div>
        <svg
          className={styles.closeIcn}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.26912 7.00001L13.7369 1.53217C14.0876 1.18154 14.0878 0.613801 13.737 0.263089C13.3863 -0.0876506 12.8186 -0.0877327 12.4678 0.263061L7.00001 5.7309L1.53217 0.263089C1.18154 -0.0876233 0.613777 -0.0877327 0.263065 0.263034C-0.0876746 0.613746 -0.0877019 1.1814 0.263065 1.53214L5.73085 7.00001L0.263037 12.4678C-0.0868816 12.8177 -0.0868816 13.3871 0.263037 13.7369C0.613722 14.0877 1.18143 14.0877 1.53215 13.7369L6.99995 8.26906L12.4678 13.7369C12.8184 14.0876 13.3862 14.0876 13.7368 13.7369C14.0876 13.3862 14.0877 12.8185 13.7369 12.4677L8.26912 7.00001Z"
            fill="#050505"
          />
        </svg>
      </div>
    </div>
  );
}

export default ToastMessage;
