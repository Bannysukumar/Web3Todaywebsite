import React, { useState, lazy, Suspense, useEffect, useContext } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import MainLandingPage from "./component/MainLandingPageOld/MainLandingPage";
import "./App.scss";
import styles from "./assets/scss/main.module.scss";
import { CStartupProvider } from "./component/MainLandingPageOld/cs-context/CSContext";
import HomepageOld from "./Pages/HomePageOld/homepage";
import Articles from "./Pages/Articles/articles";
import DevPage from "./Pages/DevPage/devpage";
import MainPage from "./Pages/Mainpage/mainpage";
import HomePage from "./Pages/HomePage";
import RegistrationContextProvider from "./RegistrationContext";
import RegisterHomePage from "./Pages/Registration/pages/HomePage";
import FirstPage from "./Pages/Registration/pages/FirstPage";
import ArticlePage from "./Pages/ArticlePage";
import MarketsPage from "./Pages/MarketsPage";
import VideoPage from "./Pages/VideoPage";
import LoginPage from "./Pages/LoginPage";
import { GlobalContex } from "./globalContext";
import Lock from "./assets/LockIcon.svg";
import { ReactComponent as Collapse_img } from "./assets/images/icons/collapse.svg";
import { ReactComponent as Collapse1_img } from "./assets/images/icons/collapse1.svg";
import ScoreBoard from "./Pages/ScoreBoard";
import useWindowDimensions from "./services/WindowSize";
import MobileMenu from "./component/MobileLayout/MobileMenu";
import MyProfile from "./Pages/MyProfile";
import Settings from "./Pages/Settings";
import SavedItems from "./Pages/SavedItems";
import MobileSidebarMenu from "./component/MobileSidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Ads from "./Pages/Player";
import Login from "./component/OverlayLogin/Login";
import CategoryPage from "./Pages/HomePage/CategoryPage";
import AuthorPage from "./Pages/HomePage/AuthorPage";
import CreatorsMobile from "./component/MobileLayout/Creators";
import TopicsMobile from "./component/MobileLayout/Topics";
import Stats from "./component/Stats";
import Ambassadors from "./Pages/Ambassadors";
import AmbassadorsForm from "./component/Ambassadors/Form";
import CaseStudyPage from "./Pages/CaseStudy";
import CaseStudySingle from "./Pages/CaseStudySingle";
import SupernovaAmbassadors from "./Pages/SupernovaAmbassadors";
import SupernovaAmbassadorsMain from "./Pages/SupernovaAmbassadors/SupernovaAmbassadors";
import CaseStudyPageSupernova from "./Pages/CaseStudyPage";
import CryptoCoinDetailed from "./Pages/MarketsPage/Crypto/tabs";
import WappPage from "./Pages/Wapp";
import WappDetailed from "./Pages/Wapp/Crypto/tabs";
function App() {
  const history = useHistory();
  const location = useLocation();
  const { width, height } = useWindowDimensions();
  const {
    setShowPopup,
    loginData,
    statsOpened,
    setStatsOpened,
    collapse,
    setCollapse,
    selectedApp,
    mobileMenu,
    hideArrow,
    userProfile,
    setUserProfile,
    registerUser,
    setRegisterUser,
    setGlobalColors,
    websiteTitle,
    websiteDescription,
  } = useContext(GlobalContex);

  useEffect(() => {
    document
      .querySelectorAll("*")
      .forEach((element) =>
        element.addEventListener("scroll", ({ target }) => setShowPopup(false))
      );

    // window.addEventListener("scroll", handlePopup);
    return () =>
      window.removeEventListener("scroll", ({ target }) => setShowPopup(false));
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      // Retrieve color values from local storage
      const textColor = localStorage.getItem("textColorPublication");
      const fontColorSelected = localStorage.getItem("fontColorSelected");
      const primaryColor = localStorage.getItem("primaryColorPublication");
      const font = localStorage.getItem("fontPublication");
      const navPic = localStorage.getItem("globalNavImgPublication");
      const highlightColor = localStorage.getItem("highlightColor");
      const themeMain = localStorage.getItem("themeMain");
      const themeInside = localStorage.getItem("themeInside");
      const borderColor = localStorage.getItem("borderColor");
      if (textColor && primaryColor && font) {
        // console.log(navPic, "navPic");
        setGlobalColors(
          textColor,
          primaryColor,
          font,
          navPic,
          fontColorSelected,
          highlightColor,
          themeMain,
          themeInside,
          borderColor
        );
      }
    };
    window.addEventListener("load", handleLoad);
    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    let body = document.querySelector("body");
    if (statsOpened) {
      body.style.overflow = "hidden";
    } else if (registerUser !== "loginclosed" && !loginData) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [registerUser, loginData, statsOpened]);

  console.log(location.pathname.slice(0, 9), "App.js");

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{websiteTitle}</title>
          <meta name="description" content={websiteDescription} />
        </Helmet>
        {collapse ? <div className={styles.overlay}>&nbsp;</div> : ""}
        <RegistrationContextProvider>
          {!mobileMenu ? (
            <>
              <div
                className="App"
                style={{
                  maxWidth:
                    location?.pathname == "/ventures" ||
                    location?.pathname.slice(0, 9) == "/register"
                      ? "none"
                      : "",
                }}
              >
                {/* {loginData || registerUser ? (
                ""
              ) : ( */}
                <div
                  style={{
                    // display: loginData || registerUser ? "none" : "",
                    position: "fixed",
                    // inset: "0",
                    top: "109px",
                    bottom: "0",
                    left: statsOpened ? "0" : "150%",
                    zIndex: "5",
                    transition: "all ease-in 0.4s",
                  }}
                >
                  {statsOpened == "ambassadorsForm" ? (
                    <AmbassadorsForm />
                  ) : (
                    <Stats />
                  )}
                  <div
                    onClick={() => {
                      setStatsOpened(false);
                    }}
                    style={{
                      position: "absolute",
                      inset: "0",
                      zIndex: "1",
                      top: "-109px",
                      background: "#ffffff01",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    // display: loginData || registerUser ? "none" : "",
                    position: "fixed",
                    // inset: "0",
                    top: "109px",
                    bottom: "0",
                    left:
                      registerUser == "closeLogin" && !loginData
                        ? "150%"
                        : registerUser !== "loginclosed" && !loginData
                        ? "0"
                        : "150%",
                    zIndex: "5",
                    transition: "all ease-in 0.4s",
                  }}
                >
                  <Login />
                  <div
                    onClick={() => {
                      setRegisterUser("loginclosed");
                    }}
                    style={{
                      position: "absolute",
                      inset: "0",
                      zIndex: "1",
                      top: "-109px",
                      background: "#ffffff01",
                    }}
                  ></div>
                </div>
                {/* )} */}
                {loginData && width > 700 ? (
                  <div className={styles.loggedInContainer}>
                    <div
                      className={styles.profilePic}
                      style={{ width: "50px", height: "50px" }}
                    >
                      <img
                        src={
                          userProfile
                            ? userProfile?.profile_pic
                            : loginData?.user?.profile_img
                        }
                        alt="profile"
                      />
                    </div>
                    <div
                      className={styles.logout}
                      onClick={(e) => {
                        localStorage.clear();
                        window.location.reload();
                        history.push("/feed/articles");
                      }}
                    >
                      <img src={Lock} alt="Logout" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route
                    exact
                    path="/ventures"
                    component={SupernovaAmbassadorsMain}
                  />
                  {/* <Route
                  exact
                  path="/scoreboard"
                  component={loginData ? ScoreBoard : HomePage}
                /> */}
                  <Route exact path="/scoreboard">
                    {!loginData ? (
                      <Redirect to="/feed/articles" />
                    ) : (
                      <ScoreBoard />
                    )}
                  </Route>
                  <Route exact path="/settings">
                    {!loginData ? (
                      <Redirect to="/feed/articles" />
                    ) : (
                      <Settings />
                    )}
                  </Route>
                  <Route exact path="/settings/myprofile">
                    {!loginData ? (
                      <Redirect to="/feed/articles" />
                    ) : (
                      <MyProfile />
                    )}
                  </Route>

                  <Route exact path="/savedItems" component={HomePage} />
                  {/* <Route exact path="/createProfile" component={CreateProfile} /> */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/feed/articles" component={HomePage} />
                  <Route exact path="/feed/videos" component={HomePage} />

                  <Route
                    exact
                    path="/casestudies/:casestudy"
                    component={CaseStudyPageSupernova}
                  />
                  <Route
                    exact
                    path="/feed/casestudies"
                    component={CaseStudyPage}
                  />
                  <Route exact path="/creators" component={CreatorsMobile} />
                  <Route exact path="/topics" component={TopicsMobile} />
                  <Route
                    exact
                    path="/feed/:category/articles"
                    component={CategoryPage}
                  />
                  <Route
                    exact
                    path="/feed/:category/videos"
                    component={CategoryPage}
                  />
                  <Route
                    exact
                    path="/feed/:category/reports"
                    component={CategoryPage}
                  />
                  <Route
                    exact
                    path="/:authoremail/article"
                    component={AuthorPage}
                  />
                  <Route
                    exact
                    path="/:authoremail/video"
                    component={AuthorPage}
                  />
                  <Route
                    exact
                    path="/:authoremail/followers"
                    component={AuthorPage}
                  />
                  {/* <Route exact path="/feed/WAPPs" component={HomePage} /> */}
                  <Route exact path="/feed/WAPPs" component={WappPage} />
                  <Route
                    exact
                    path="/feed/WAPPs/:wappid"
                    component={WappDetailed}
                  />
                  <Route exact path="/feed/people" component={HomePage} />
                  <Route exact path="/feed/research" component={HomePage} />
                  <Route exact path="/feed/events" component={HomePage} />
                  {/* <Route exact path="/markets" component={MarketsPage} /> */}
                  <Route exact path="/markets/crypto" component={MarketsPage} />
                  <Route
                    exact
                    path="/markets/crypto/:cryptocoin"
                    component={CryptoCoinDetailed}
                  />

                  <Route exact path="/markets/forex" component={MarketsPage} />
                  <Route
                    exact
                    path="/markets/regulation"
                    component={MarketsPage}
                  />
                  <Route exact path="/markets/people" component={MarketsPage} />
                  <Route
                    exact
                    path="/markets/research"
                    component={MarketsPage}
                  />
                  <Route exact path="/markets/events" component={MarketsPage} />
                  <Route exact path="/page1" component={DevPage} />
                  <Route exact path="/page2" component={MainPage} />
                  <Route exact path="/page3" component={HomepageOld} />
                  <Route exact path="/articles" component={Articles} />
                  {/* <Route
              exact
              path="/:country"
              render={() => (
                <CStartupProvider>
                  <MainLandingPage />
                </CStartupProvider>
              )}
            /> */}
                  <Route exact path="/earn/ads/:name/:video" component={Ads} />
                  <Route exact path="/earn/ads/:name" component={Ads} />
                  <Route exact path="/earn/ads" component={Ads} />
                  <Route
                    exact
                    path={`/feed/article/:id`}
                    component={ArticlePage}
                  />
                  <Route
                    exact
                    path={`/feed/casestudies/:caseid`}
                    component={CaseStudySingle}
                  />
                  <Route exact path={`/feed/video/:id`} component={VideoPage} />
                  <Route exact path="/register" component={RegisterHomePage} />
                  <Route
                    exact
                    path="/register/affiliate"
                    component={FirstPage}
                  />
                  <Route
                    exact
                    path="/register/affiliate/:id"
                    component={FirstPage}
                  />
                  <Route
                    exact
                    path="/register/pre-registered"
                    component={FirstPage}
                  />
                  <Route
                    exact
                    path="/register/pre-registered/:id"
                    component={FirstPage}
                  />
                  <Route
                    exact
                    path="/register/by-myself"
                    component={FirstPage}
                  />
                  <Route
                    exact
                    path="/register/by-myself/:id"
                    component={FirstPage}
                  />
                  <Route exact path="/*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </div>
              {loginData && width > 700 ? (
                <div
                  style={{ left: collapse ? "268px" : "68px" }}
                  className={styles.collapseButton}
                  onClick={(e) => setCollapse(!collapse)}
                >
                  {collapse ? (
                    <Collapse_img fill={"#4B2A91"} stroke="none" />
                  ) : (
                    <Collapse1_img fill={"#4B2A91"} stroke="none" />
                  )}
                </div>
              ) : (
                ""
              )}
              {loginData && width > 700 ? (
                collapse ? (
                  <div className={styles.sideDraw}>
                    <div className={styles.leftSide}>
                      <div>
                        <div
                          className={styles.profilePic}
                          onClick={(e) => {
                            setCollapse(!collapse);
                            history.push("/feed/articles");
                          }}
                        >
                          <img
                            src={
                              userProfile
                                ? userProfile?.profile_pic
                                : loginData?.user?.profile_img
                            }
                            alt="profile"
                          />
                        </div>
                        <div className={styles.nameStyle}>
                          {userProfile
                            ? userProfile?.first_name
                            : loginData.user.name.length > 15
                            ? loginData.user.name.slice(0, 12) + "..."
                            : loginData.user.name}
                        </div>
                        <div className={styles.emailStyle}>
                          {userProfile
                            ? userProfile?.email
                            : loginData.user.email.length > 25
                            ? loginData.user.email.slice(0, 22) + "..."
                            : loginData.user.email}
                        </div>
                        <div className={styles.menuWrapper}>
                          <div
                            className={styles.menuItem}
                            onClick={(e) => {
                              setCollapse(!collapse);
                              history.push("/savedItems");
                            }}
                          >
                            Saved Items
                          </div>
                          <div className={styles.menuItem}>Connections</div>
                          <div className={styles.menuItem}>Applications</div>
                          <div className={styles.menuItem}>Communities</div>
                          <div className={styles.menuItem}>Alerts</div>
                        </div>
                        <div
                          className={styles.statWrapper}
                          onClick={(e) => {
                            history.push("/scoreboard");
                            setCollapse(!collapse);
                          }}
                          style={{
                            borderBottom: "1px solid var(--bordercolor-main)",
                            padding: "17px 0px",
                          }}
                        >
                          <div className={styles.numberStyle}>0.00</div>
                          <div className={styles.numberLableStyle}>
                            Web3Today Score
                          </div>
                        </div>
                        <div
                          className={styles.statWrapper}
                          style={{
                            borderBottom: "1px solid var(--bordercolor-main)",
                            padding: "17px 0px",
                          }}
                        >
                          <div className={styles.numberStyle}>0.00</div>
                          <div className={styles.numberLableStyle}>
                            W3T Token Balance
                          </div>
                        </div>
                      </div>
                      <div className={styles.buttonGroup}>
                        <div className={styles.primaryButton}>
                          Earn More W3T
                        </div>
                        <div
                          className={styles.secondaryButton}
                          onClick={(e) => {
                            setCollapse(!collapse);
                            // history.push("/settings");
                          }}
                        >
                          Settings
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightSide}>&nbsp;</div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          ) : (
            // <MobileMenu />
            <MobileSidebarMenu />
          )}
        </RegistrationContextProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
