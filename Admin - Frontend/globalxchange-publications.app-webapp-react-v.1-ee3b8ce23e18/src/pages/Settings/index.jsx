import React, { useContext } from "react";
import { GlobalContex } from "../../globalContext";
import styles from "./settings.module.scss";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { loginData, userProfile } = useContext(GlobalContex);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <div className={styles.header}>My Settings</div>
          <div className={styles.breadcrumb}>Select An Option</div>
        </div>

        <div className={styles.profilePicture}>
          <img
            src={
              userProfile
                ? userProfile?.profile_pic
                : loginData.user.profile_img
            }
            alt=""
          />
        </div>
      </div>
      <div className={styles.settingsGrid}>
        <div
          className={styles.settingsItem}
          onClick={(e) => {
            navigate("/settings/myprofile");
          }}
        >
          <div>My Profile</div>
          <div>Edit Your Profile Data</div>
        </div>
        <div className={styles.settingsItem}>
          <div>Theme</div>
          <div>Change Display Theme</div>
        </div>
        <div className={styles.settingsItem}>
          <div>Privacy</div>
          <div>Change Your Visibility</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
