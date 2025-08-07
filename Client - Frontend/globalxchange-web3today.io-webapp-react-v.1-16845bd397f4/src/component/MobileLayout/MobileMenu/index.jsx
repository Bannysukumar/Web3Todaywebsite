import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./mobileMenu.module.scss";

import logoWhiteIco from "../../../assets/MobileAssets/logoWhite.svg";
import newsIco from "../../../assets/MobileAssets/news.svg";
import marketsIco from "../../../assets/MobileAssets/markets.svg";
import coursesIco from "../../../assets/MobileAssets/courses.svg";
import jobsIco from "../../../assets/MobileAssets/jobs.svg";
import appsIco from "../../../assets/MobileAssets/apps.svg";
import { GlobalContex } from "../../../globalContext";
import userIcon from "../../../assets/images/icons/user.svg";
import Lock from "../../../assets/LockIcon.svg";
// import cryptoIcon from "../../../static/images/mobile/crypto.svg";
// import forexIcon from "../../../static/images/mobile/forex.svg";
// import marketIcon from "../../../static/images/mobile/market.svg";
// import vaultIcon from "../../../static/images/mobile/vault.svg";
// import reloadIcon from "../../../static/images/mobile/reload.svg";
// import plusIcon from "../../../static/images/mobile/plus.svg";
// import logoutIcon from "../../../static/images/mobile/logout.svg";

// import moneyMarketIcon from "../../../static/images/mobile/moneyMarket.svg";
// import bondIcon from "../../../static/images/mobile/bond.svg";
// import dividendIcon from "../../../static/images/mobile/dividend.svg";
// import { AppContext } from "../../../context/AppContext";

const MobileMenu = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const {
    setMobileMenu,
    selectedMobileMenu,
    setSelectedMobileMenu,
    selectedMobileSubMenu,
    setSelectedMobileSubMenu,
    loginData,
  } = useContext(GlobalContex);

  const menuItems = [
    {
      name: "Feed",
      icon: newsIco,
    },
    {
      name: "Markets",
      icon: marketsIco,
    },
    // {
    //   name: "Courses",
    //   icon: coursesIco,
    // },
    // {
    //   name: "Jobs",
    //   icon: jobsIco,
    // },
    // {
    //   name: "Apps",
    //   icon: appsIco,
    // },
  ];

  const newsCategories = ["Articles", "Videos", "WAPPs"];

  // const [selectedMainMenuItem, setSelectedMainMenuItem] = useState(
  //   menuItems[0]
  // );
  // const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(
  //   newsCategories[0]
  // );

  useEffect(() => {
    if (pathname === "/feed/articles") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("Articles");
    } else if (pathname === "/feed/WAPPs") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("WAPPs");
    } else if (pathname === "/feed/") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("Videos");
    } else if (pathname === "/feed/people") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("People");
    } else if (pathname === "/feed/research") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("Research");
    } else if (pathname === "/feed/events") {
      setSelectedMobileMenu("Feed");
      setSelectedMobileSubMenu("Events");
    } else if (pathname === "/savedItems") {
      setSelectedMobileMenu("Profile");
      setSelectedMobileSubMenu("Saved Items");
    }
  }, [pathname]);

  const subMenuSwitch = () => {
    switch (selectedMobileMenu) {
      case "Feed":
        return (
          <>
            <div className={styles.subMenuTitle}>
              <div>{selectedMobileMenu}</div>
            </div>
            {newsCategories.map((item) => {
              return (
                <div
                  onClick={(e) => {
                    // setSelectedMobileSubMenu(item);
                    setMobileMenu(false);
                    history.push(`/feed/${item.toLowerCase()}`);
                  }}
                  className={styles.subMenuItem}
                  style={{
                    fontWeight: selectedMobileSubMenu === item ? 700 : 400,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </>
        );
      case "Markets":
        return (
          <div className={styles.subMenuTitle}>
            <div>{selectedMobileMenu}</div>
          </div>
        );
      case "Courses":
        return (
          <div className={styles.subMenuTitle}>
            <div>{selectedMobileMenu}</div>
          </div>
        );
      case "Jobs":
        return (
          <div className={styles.subMenuTitle}>
            <div>{selectedMobileMenu}</div>
          </div>
        );
      case "Apps":
        return (
          <div className={styles.subMenuTitle}>
            <div>{selectedMobileMenu}</div>
          </div>
        );

      case "Profile":
        return (
          <>
            <div className={styles.profileTitle}>
              {loginData.user.name.length > 15
                ? loginData.user.name.slice(0, 12) + "..."
                : loginData.user.name}
            </div>
            <div>
              {loginData.user.email.length > 25
                ? loginData.user.email.slice(0, 22) + "..."
                : loginData.user.email}
            </div>
            <div className={styles.profileMenuWrapper}>
              <div
                onClick={(e) => {
                  // setSelectedMobileSubMenu(item);
                  setMobileMenu(false);
                  history.push(`/savedItems`);
                }}
                style={{
                  fontWeight:
                    selectedMobileSubMenu === "Saved Items" ? 700 : 400,
                }}
              >
                Saved Items
              </div>
              <div>Connections</div>
              <div>Applications</div>
              <div>Communities</div>
              <div>Alerts</div>
            </div>
            <div className={styles.statsCardContainer}>
              <div
                className={styles.statCardMobile}
                onClick={(e) => {
                  history.push("/scoreboard");
                  setMobileMenu(false);
                }}
              >
                <div>84.1</div>
                <div>Web3Today Score</div>
              </div>
              <div className={styles.statCardMobile}>
                <div>0.0315</div>
                <div>W3T Token Balance</div>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.primaryButton}>Earn More W3T</div>
              <div className={styles.secondaryButton}>Settings</div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.menuWrapper}>
        <div className={styles.mainMenu}>
          <div>
            <div className={styles.logoStyle}>
              {!loginData ? (
                <img
                  src={logoWhiteIco}
                  alt=""
                  onClick={(e) => setMobileMenu(false)}
                />
              ) : (
                <img
                  src={loginData?.user?.profile_img}
                  alt=""
                  onClick={(e) => setMobileMenu(false)}
                  style={{
                    borderRadius: "50%",
                    border: "1px solid #fff",
                    padding: "3px",
                  }}
                />
              )}
            </div>
            {menuItems.map((item) => {
              return (
                <div
                  onClick={(e) => setSelectedMobileMenu(item.name)}
                  className={styles.menuItem}
                  style={{
                    opacity: selectedMobileMenu === item.name ? 1 : 0.5,
                  }}
                >
                  <img src={item.icon} alt="" />
                </div>
              );
            })}
          </div>
          <div>
            {loginData ? (
              <>
                <div
                  onClick={(e) => setSelectedMobileMenu("Profile")}
                  className={styles.menuItem}
                  style={{
                    opacity: selectedMobileMenu === "Profile" ? 1 : 0.5,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                >
                  <img src={userIcon} alt="" />
                </div>

                <div
                  className={styles.menuItem}
                  onClick={(e) => {
                    localStorage.clear();
                    window.location.reload();
                    history.push(`/feed/articles`);
                  }}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    margin: 0,
                  }}
                >
                  <img
                    src={Lock}
                    alt="Logout"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.subMenu}>
          <div>
            <div>{subMenuSwitch()}</div>
          </div>
          {!loginData ? (
            <div>
              <div
                className={styles.loginButton}
                onClick={(e) => {
                  history.push("/login");
                  setMobileMenu(false);
                }}
              >
                Login
              </div>
              <div className={styles.signupButton}>Get Started</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
