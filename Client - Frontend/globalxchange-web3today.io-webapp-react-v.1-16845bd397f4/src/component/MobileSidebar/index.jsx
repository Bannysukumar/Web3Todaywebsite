import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "./mobilesidebar.module.scss";

//assets
import MainIco1 from "../../assets/mainico.svg";
import upIco from "../../assets/NewHomePage/up.svg";
import downIco from "../../assets/NewHomePage/down.svg";
import MenuIco from "../../assets/MobileAssets/menu.svg";
import MainIco from "../../assets/mainico1.svg";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import searchIco from "../../assets/NavImages/thesearch.svg";
import { Link } from "react-router-dom";
import { GlobalContex } from "../../globalContext";
import { useLocation } from "react-router-dom";
import { APP_CODE } from "../../config/appConfig";
import { useLoadAppDetails } from "../../queryHooks";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { APP_USER_TOKEN } from "../../config/index";
import { LoadingAnimation } from "../../component/LoadingAnimation";
import info from "../../assets/images/login/info.svg";

import {
  loginFunc,
  registerOnApp,
  useRequestLoginChallenge,
} from "../../queryHooks/api";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AliceCarousel from "react-alice-carousel";

const MobileSidebarMenu = () => {
  const {
    appName,
    appCode,
    appLogo,
    appFullLogo,
    appColorCode,
    mobileMenu,
    setMobileMenu,
    selectedMobileMenu,
    setSelectedMobileMenu,
    loginData,
    userLoginHandler,
    stopCounter,
    setLoginData,
    setBankerEmail,
    setHideArrow,
    setUserIdWeb3TodayAccount,
    setWeb3UserId,
    selectedStory,
    setRegisterUser,
  } = useContext(GlobalContex);

  const location = useLocation();
  const history = useHistory();
  const [loginMobile, setLoginMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const { appByCode: appLoginByCode, appByCodeLoading: loginByCodeLoading } =
    useLoadAppDetails(APP_CODE);

  const { mutate: registerApp } = useMutation(registerOnApp, {});

  const defaultApp = useMemo(
    () => ({
      appName,
      appLogo,
      appFullLogo,
      appColor: appColorCode,
    }),
    [appCode, appName, appLogo, appFullLogo, appColorCode]
  );

  const handleLogin = () => {
    axios
      .post(`https://gxauth.apimachine.com/gx/user/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        axios
          .get(`https://publications.apimachine.com/userprofile`)
          .then(({ data }) => {
            const found = data.data.find((o) => o.email === email);

            if (res.data.status) {
              // registerUserToApp();
              // registerEmailForEntpreneur();
              setLoading(false);
              setLoginData(res.data);
              localStorage.setItem("bankerEmailNew", res?.data?.user.email);
              localStorage.setItem("TokenId", res?.data?.idToken);
              localStorage.setItem("loginData", JSON.stringify(res.data));
              setBankerEmail(res?.data?.user?.email);
              if (found) {
                console.log(found._id, "checking the found data");
                axios
                  .post("https://publications.apimachine.com/dailypoints", {
                    user_id: found._id,
                    publication_id: "638dd769b257b3715a8fbe07",
                  })
                  .then((res) => {
                    console.log(res, "checking the response of daily points");
                  });
                history.push("/feed/articles");
                localStorage.setItem("userProfile", JSON.stringify(found));
              } else {
                setHideArrow(true);
                // history.push("/settings/myprofile");
              }
              setMobileMenu(false);
            }
          });
      });
    setIsLoading(false);
  };

  function getUserIdWeb3Today() {
    axios
      .get(
        `https://publications.apimachine.com/userprofile?email=${
          email ? email : ""
        }`
      )
      .then((response) => {
        // console.log(response?.data, 'user_id');
        if (response?.data?.status) {
          setUserIdWeb3TodayAccount(true);
        } else {
          // history.push("/settings");
          setUserIdWeb3TodayAccount(false);
        }
        localStorage.setItem("web3UserId", response?.data?.data[0]?._id);
        setWeb3UserId(response?.data?.data[0]?._id);
      })
      .catch((error) => {
        console.log(error?.message, "user_id message");
      });
  }

  const handleLoginSuccess = (data) => {
    // console.log(data, 'login data');
    handleLogin();
    getUserIdWeb3Today();
    localStorage.setItem("accessToken web3today", data?.accessToken);
    userLoginHandler(email, data.accessToken, data.idToken);
    registerApp({ email, app_code: APP_CODE });
    registerApp({ email, app_code: "ice" });
    Cookies.set(APP_USER_TOKEN, data.idToken);
    setMessage("");
  };

  const [allPrices, setAllPrices] = useState([]);

  const appresponsive = {
    0: {
      items: 5,
    },
    512: {
      items: 7,
    },
  };

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then(({ data }) => {
        setAllPrices(data.coins);
      });
  }, []);

  const apps = allPrices?.map((item, id) => {
    return (
      <span
        style={{
          width: "190px",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-between",
          // alignItems: "center",
          borderRight: "1px solid var(--bordercolor-main)",
          // padding: "0px 20px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        <span style={{ fontWeight: 800 }}>{item.coinSymbol}</span>
        <img
          src={item?._24hrchange > 0 ? upIco : downIco}
          alt=""
          style={{ width: "8px", height: "8px", margin: "0px 8px" }}
        />
        <span>${item?.usd_price?.toFixed(4)}</span>
        <span
          style={{
            paddingLeft: "8px",
            color: item?._24hrchange > 0 ? "green" : "red",
          }}
        >
          {item?._24hrchange?.toFixed(2)}%
        </span>
      </span>
    );
  });

  const {
    isLoading: isLoggingIn,
    mutate: attemptLogin,
    data: loginAttemptResponse,
  } = useMutation(loginFunc, {
    onSuccess: (data) => {
      setIsLoading(true);
      if (data.status) {
        setUserNotFound(false);
        setIncorrectCredentials(false);
        handleLoginSuccess(data);
      } else if (!data?.status && data?.message === "User not Found!") {
        setTempEmail(email);
        setUserNotFound(true);
      } else if (
        !data?.status &&
        data?.message === "Incorrect username or password."
      ) {
        setIncorrectCredentials(true);
      }
    },
  });

  const {
    mutate: requestLoginChallenge,
    isLoading: isRequestingLoginChallenge,
    isSuccess: isRequestLoginChallengeSuccess,
    data: requestLoginChallengeResponse,
  } = useRequestLoginChallenge();

  return (
    <div className={classNames.mobileSidebarMenu}>
      {/* <div className={classNames.mobileNavbar}>
        <div onClick={() => setMobileMenu(false)}>
          <AiOutlineClose />
        </div>
        <Link
          to="/feed/articles"
          onClick={() => {
            setSelectedMobileMenu("Feed");
            setMobileMenu(false);
          }}
        >
          <img src={MainIco1} alt="MainIco1" />
        </Link>
        <div>
          <img src={searchIco} alt="searchIco" />
        </div>
      </div> */}
      <div className={classNames.section1Parent}>
        <div className={classNames.sectionBorder}></div>
        <div className={classNames.section1}>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={false}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={appresponsive}
            items={apps}
            autoPlay
            keyboardNavigation={true}
          />
        </div>
      </div>
      <div
        className={classNames.navContainer}
        style={{ filter: selectedStory ? "blur(70px)" : "none" }}
      >
        <div className={classNames.navContainerLeft}>
          <div onClick={(e) => setMobileMenu((prev) => !prev)}>
            {/* <img
              src={MenuIco}
              alt=""
              style={{ width: "25px", height: "25px" }}
            /> */}
            <AiOutlineClose style={{ width: "25px", height: "25px" }} />
          </div>
          <Link
            to="/feed/articles"
            onClick={() => {
              setSelectedMobileMenu("Feed");
              setMobileMenu(false);
            }}
          >
            <img
              src={MainIco}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        </div>
        <div className={classNames.navContainerRight}>
          <div>
            <img
              src={searchIco}
              alt=""
              style={{ width: "25px", height: "25px" }}
            />
          </div>
          <div
          style={{display : localStorage.getItem("bankerEmailNew") ? "none" : ""}}
            className={classNames.navContainerRightBtn}
            onClick={(e) => {
              history.push("/login");
              // setRegisterUser("");
              setMobileMenu((prev) => !prev);
            }}
          >
            Start Earning
          </div>
        </div>
      </div>

      {loginMobile == "loginemail" ? (
        <div className={classNames.loginMobile}>
          <div className={classNames.title}>Tracking Login</div>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(event) => setEmail(event?.target?.value)}
          />
          <div className={classNames.mainBtns}>
            <div
              className={classNames.nextBtn}
              onClick={() => setLoginMobile("loginpass")}
              style={{
                pointerEvents: email ? "" : "none",
                opacity: email ? "" : "0.5",
              }}
            >
              Next
            </div>
          </div>
        </div>
      ) : loginMobile == "loginpass" ? (
        <div className={classNames.loginMobile}>
          <div className={classNames.title}>Tracking Login</div>
          <input
            placeholder="Enter Your Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
          />
          {userNotFound && (
            <div
              style={{
                background: "#FFFDF2",
                borderRadius: "15px",
                padding: "1rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: "405",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "90%",
              }}
            >
              <div>
                <img src={info} alt="" />
              </div>
              <div>
                Sorry but we are not able to find a user with the email{" "}
                {tempEmail}.
              </div>
            </div>
          )}

          {incorrectCredentials && (
            <div
              style={{
                background: "#FFFDF2",
                borderRadius: "15px",
                padding: "1rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: "405",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "90%",
              }}
            >
              <div>
                <img src={info} alt="" />
              </div>
              <div>
                The credentials you entered are incorrect. Please try again or
                reset your password.
              </div>
            </div>
          )}
          <div className={classNames.mainBtns}>
            <div
              className={classNames.nextBtn}
              style={{
                pointerEvents: password ? "" : "none",
                opacity: password ? "" : "0.5",
              }}
              onClick={() => {
                setForgotPasswordError("");
                setPasswordChanged(false);
                if (appLoginByCode) {
                  attemptLogin({ email, password });
                }
              }}
            >
              Next
            </div>
            <div
              className={classNames.backBtn}
              onClick={() => setLoginMobile("loginemail")}
            >
              Go Back
            </div>
          </div>
        </div>
      ) : (
        <div className={classNames.options}>
          <Link
            to="/feed/articles"
            className={
              selectedMobileMenu == "Feed" ? classNames.selectedOption : ""
            }
            onClick={() => {
              setSelectedMobileMenu("Feed");
              setMobileMenu(false);
            }}
          >
            Feed
          </Link>
          {/* <Link
            to="/feed/videos"
            className={
              selectedMobileMenu == "Videos" ? classNames.selectedOption : ""
            }
            onClick={() => {
              setSelectedMobileMenu("Videos");
              setMobileMenu(false);
            }}
          >
            Videos
          </Link> */}
          <Link
            to="/feed/wapps"
            className={
              selectedMobileMenu == "WAPPS" ? classNames.selectedOption : ""
            }
            onClick={() => {
              setSelectedMobileMenu("WAPPS");
              setMobileMenu(false);
            }}
          >
            WAPPS
          </Link>
          {/* <Link
            to="/markets/crypto"
            className={
              selectedMobileMenu == "Markets" ? classNames.selectedOption : ""
            }
            onClick={() => {
              setSelectedMobileMenu("Markets");
              setMobileMenu(false);
            }}
            style={{ pointerEvents: "none", opacity: "0.5" }}
          >
            Markets
          </Link> */}
          <Link
            className={
              selectedMobileMenu == "Commercials"
                ? classNames.selectedOption
                : ""
            }
            to="/earn/ads"
            // style={{ pointerEvents: "none", opacity: "0.5" }}
            onClick={() => {
              setSelectedMobileMenu("Commercials");
              setMobileMenu(false);
            }}
          >
            Earn
          </Link>
        </div>
      )}

      <div
        className={classNames.mainBtns}
        style={{ display: loginMobile ? "none" : "" }}
      >
        {loginData ? (
          <Link
            to="#"
            onClick={() => {
              console.log(loginData, "oginData ?");
              setMobileMenu(false);
              // window.open("https://app.web3today.io/", "_blank");
            }}
          >
            {"Tracking - " + loginData?.user?.email}
          </Link>
        ) : (
          <Link
            to="/login"
            // onClick={() => {
            //   console.log(loginData, "oginData ?");
            //   // setMobileMenu(false);
            //   setLoginMobile("loginemail");
            //   // window.open("https://app.web3today.io/", "_blank");
            // }}
            onClick={(e) => {
              // history.push("/login");
              setRegisterUser("");
              setMobileMenu((prev) => !prev);
            }}
          >
            Login
          </Link>
        )}
        {loginData ? (
          <Link
            to="#"
            onClick={(e) => {
              if (location.pathname.includes("/feed/article/") && loginData) {
                stopCounter();
                localStorage.clear();
                window.location.reload();
              } else {
                localStorage.clear();
                window.location.reload();
              }
              userLoginHandler();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link
            to="#"
            onClick={() => {
              setMobileMenu(false);
              window.open("https://app.web3today.io/", "_blank");
            }}
          >
            Get Started
          </Link>
        )}
      </div>

      {(isChanging || isLoggingIn || isRequestingLoginChallenge) && (
        <div className="loading-component">
          <LoadingAnimation icon={defaultApp?.appLogo} width={200} />
        </div>
      )}
    </div>
  );
};

export default MobileSidebarMenu;
