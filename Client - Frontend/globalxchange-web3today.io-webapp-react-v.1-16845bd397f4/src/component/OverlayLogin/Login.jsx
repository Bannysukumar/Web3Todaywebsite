import React, { useState, useContext, useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import Skeleton from "react-loading-skeleton";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { LoadingAnimation } from "../../component/LoadingAnimation";
import classNames from "./signInPage.module.scss";
import "./login.scss";
import jwt_decode from "jwt-decode";
import styles from "./login.module.scss";
import googleIcon from "../../assets/images/login/google.svg";
import info from "../../assets/images/login/info.svg";
import { toast, ToastContainer } from "react-toastify";

import emailIcon from "../../assets/images/login/email.svg";
import emailChainIcon from "../../assets/images/login/emailChain.svg";
import affiliateIcon from "../../assets/images/login/affiliate.svg";
import affUsernameIcon from "../../assets/images/login/affUsername.svg";
import appleIcon from "../../assets/images/login/apple.svg";
import playStoreIcon from "../../assets/images/login/androids.svg";
import mobilelogo from "../../static/images/appSpecific/iconLogo.svg";
import ios from "../../assets/images/login/ios.svg";
import android from "../../assets/images/login/android.svg";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import * as qs from "qs";

import {
  loginFunc,
  registerOnApp,
  useRequestLoginChallenge,
  initiateForgotPassword,
  completeForgotPassword,
} from "../../queryHooks/api";
import { globalMenu } from "../../queryHooks/constants";
import { setBackgroundColor } from "../../queryHooks/helpers";
import { APP_CODE } from "../../config/appConfig";
import Cookies from "js-cookie";
import { APP_USER_TOKEN } from "../../config/index";
import { useLoadAppDetails } from "../../queryHooks";
import useWindowDimensions from "../../utils/WindowSize";
import axios from "axios";
import OtpInput from "react-otp-input";
import { GlobalContex } from "../../globalContext";
import EarningOpportunity from "./EarningOpportunity";

function Login() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordStep, setResetPasswordStep] = useState(0);
  const [requestChallengeResponse, setRequestChallengeResponse] = useState({});
  const [twoFactorStep, setTwoFactorStep] = useState(0);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [message, setMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState("1");
  const [sixDigitPin, setSixDigitPin] = useState("");
  const [confirmPassword1, setConfirmPassword1] = useState("");
  const [confirmPassword2, setConfirmPassword2] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [moreInfoStep, setMoreInfoStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const { appByCode: appLoginByCode, appByCodeLoading: loginByCodeLoading } =
    useLoadAppDetails(APP_CODE);



  const history = useHistory();

  const {
    appName,
    appCode,
    appLogo,
    appFullLogo,
    appColorCode,
    websiteTitle,
    websiteDescription,
    appDetailsLoading,
    showMoreInfo,
    setShowMoreInfo,
    setUserIdWeb3TodayAccount,
    userLoginHandler,
    setWeb3UserId,
    loginData,
    setLoginData,
    setBankerEmail,
    setHideArrow,
    registerUser,
    setRegisterUser,
    ownerEmail
  } = useContext(GlobalContex);

  const [selectedApp, setSelectedApp] = useState(globalMenu(appName)[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(true);

  const [affEmail, setAffEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [idToken, setIdToken] = useState("");
  const [cognitoData, setCognitoData] = useState({});
  const [tempEmail, setTempEmail] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const [loggedinBeforeStep, setLoggedinBeforeStep] = useState(0);

  const [mobileStep, setMobileStep] = useState(0);
  const [affUsername, setAffUsername] = useState("");
  const [affData, setAffData] = useState({});
  const [mobileLoading, setMobileLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [available, setAvailable] = useState(false);
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const [otpMisMatch, setOtpMisMatch] = useState(false);
  const [appLinks, setAppLinks] = useState(null);
  const [fromSso, setFromSso] = useState(false);

  //set web3 news login
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [resetDetails, setResetDetails] = useState("");

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
                handleUserProfile(res?.data?.user?.email, res?.data)
              }
            }
          });
      });
    setIsLoading(false);
  };

  const handleLoginSuccess = (data) => {
    // console.log(data, 'login data');
    handleLogin();
    getUserIdWeb3Today();
    setRegisterUser("closeLogin");
    localStorage.setItem("accessToken web3today", data?.accessToken);
    userLoginHandler(email, data.accessToken, data.idToken);
    registerApp({ email, app_code: APP_CODE });
    registerApp({ email, app_code: "ice" });
    Cookies.set(APP_USER_TOKEN, data.idToken);
    setMessage("");
  };

  function getUserIdWeb3Today() {
    axios
      .get(
        `https://publications.apimachine.com/userprofile?email=${email ? email : ""
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

  const handleLoginSuccess1 = (data, email) => {
    // console.log(
    //   email,
    //   data?.access_token,
    //   data?.id_token,
    //   'knadklnawlkdhklqwhdwql'
    // );
    axios
      .get(`https://publications.apimachine.com/userprofile?email=${email}`)
      .then((res) => {
        if (res.data.status) {
          getUserIdWeb3Today();
          setWeb3UserId(res?.data?.data[0]?._id)
          axios
            .post("https://publications.apimachine.com/dailypoints", {
              user_id: res.data.data[0]._id,
              publication_id: "638dd769b257b3715a8fbe07",
            })
            .then((res) => {
              console.log(res, "checking the response of daily points");
            });
          history.push("/feed/articles");
          localStorage.setItem("userProfile", JSON.stringify(res.data.data[0]));
        } else {
          handleUserProfile(email)
        }
      })
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    localStorage.setItem("accessToken web3today", data?.id_token);
    localStorage.setItem("bankerEmailNew", email);
    localStorage.setItem("TokenId", data.id_token);
    userLoginHandler(email, data.access_token, data.id_token);
    registerApp({ email, app_code: APP_CODE });
    registerApp({ email, app_code: "ice" });
    Cookies.set(APP_USER_TOKEN, data.id_token);
    setMessage("");
  };

  const handleUserProfile = (email, data) => {
    // console.log(fullName, email, "user-profilee")
    console.log(data, "loginIn-User")
    axios
      .post(`https://publications.apimachine.com/userprofile`, {
        username: fullName ? fullName : data?.user ? data?.user?.username : email?.split("@")[0],
        email: email,
        user_type: "Reader",
        publication: "638dd769b257b3715a8fbe07"
      })
      .then((res) => {
        if (res.data.status) {
          setWeb3UserId(res?.data?.data?._id)
          axios
            .post(`https://publications.apimachine.com/userpublication`, {
              user_id: res?.data?.data?._id,
              email: email,
              publication_ids: ["638dd769b257b3715a8fbe07"]
            })
            .then((pointsRes) => {
              if (pointsRes.data.status) {
                localStorage.setItem("userProfile", JSON.stringify(res?.data?.data));
                getUserIdWeb3Today();
                axios
                  .post("https://publications.apimachine.com/dailypoints", {
                    user_id: res?.data?.data?._id,
                    publication_id: "638dd769b257b3715a8fbe07",
                  })
                  .then((res) => {
                    console.log(res, "checking the response of daily points");
                  });
                setTimeout(() => {
                  toast.success("Logged In Successfully")
                  setRegisterUser("loginclosed");
                  history.push("/feed/articles");
                }, 2000)
              }
            })
        } else {
          toast.error(res.data.message)
        }
      });
  }

  const { mutate: registerApp } = useMutation(registerOnApp, {});

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

  useEffect(() => {
    if (
      isRequestLoginChallengeSuccess &&
      requestLoginChallengeResponse?.data?.status
    ) {
      handleLoginSuccess(requestLoginChallengeResponse?.data);
    }
  }, [isRequestLoginChallengeSuccess]);

  const isResetPassword =
    loginAttemptResponse?.message === "Reset User Password!" &&
    loginAttemptResponse?.resetPassword &&
    loginAttemptResponse?.challengeName === "NEW_PASSWORD_REQUIRED";

  const isTwoFactorEnabled =
    loginAttemptResponse?.message === "Enter the Authenticator Code!" &&
    loginAttemptResponse?.mfa &&
    loginAttemptResponse?.challengeName === "SOFTWARE_TOKEN_MFA";

  useEffect(() => {
    if (loginAttemptResponse?.message === "Incorrect username or password.") {
      setMessage(
        "You Have Entered Incorrect Login Credentials. Please Try Again"
      );
    } else if (isResetPassword) {
      setMessage("For Security Reasons You Need To Change Your Password");
      setRequestChallengeResponse({
        authChallenge_id: loginAttemptResponse?.authChallenge_id,
        email: loginAttemptResponse?.email,
        username: loginAttemptResponse?.username,
        challengeName: loginAttemptResponse?.challengeName,
        session: loginAttemptResponse?.session,
      });
      setResetPasswordStep(1);
    } else if (isTwoFactorEnabled) {
      setMessage("Please Enter Your 2 Factor Authentication");
      setRequestChallengeResponse({
        authChallenge_id: loginAttemptResponse?.authChallenge_id,
        email: loginAttemptResponse?.email,
        username: loginAttemptResponse?.username,
        challengeName: loginAttemptResponse?.challengeName,
        session: loginAttemptResponse?.session,
      });
      setTwoFactorStep(1);
    }
  }, [loginAttemptResponse]);

  const defaultApp = useMemo(
    () => ({
      appName,
      appLogo,
      appFullLogo,
      appColor: appColorCode,
    }),
    [appCode, appName, appLogo, appFullLogo, appColorCode]
  );

  const rightSideContent = globalMenu(appName).filter(
    (item) => selectedApp.appName === item.appName
  )?.[0]?.content;
  const arrayOfContent = rightSideContent?.split(" ");

  const joinedContent = arrayOfContent && (
    <div>
      {arrayOfContent[0]} <br /> {arrayOfContent[1]} {arrayOfContent[2]}
      <br />
      {appName}
    </div>
  );

  useEffect(() => {
    //removed currently
    // const favIcon = document.getElementById("fav-icon");
    // favIcon.href = defaultApp?.appLogo;

    if (defaultApp) {
      setSelectedApp(defaultApp);
    } else {
      setSelectedApp(globalMenu(appName)[0]);
    }
  }, [defaultApp]);

  const handleRegisterClick = () => {
    Cookies.remove("app_user_token");
  };

  const backgroundColor = setBackgroundColor(selectedApp?.appColor);

  const initializeForgotPassword = () => {
    setIsChanging(true);
    let obj = {
      email,
      app_code: APP_CODE,
    };
    initiateForgotPassword(obj).then((response) => {
      let result = response.data;
      setIsChanging(false);

      if (result.status) {
        setForgotPasswordStep("2");
        setForgotPasswordError("");
      } else {
        setForgotPasswordError(result.message);
      }
    });
  };

  const completeForgotPass = () => {
    setIsChanging(true);
    let obj = {
      email,
      code: sixDigitPin,
      newPassword: confirmPassword2,
    };
    completeForgotPassword(obj).then((response) => {
      let result = response.data;
      setIsChanging(false);

      if (result.status && result.message === "Password Succesfully changed") {
        setPasswordChanged(true);
        setForgotPasswordError();
      } else {
        setForgotPasswordError(result.message);
      }
      setForgotPasswordStep("1");
      setForgotPassword(false);
      setShowPassword(false);
      setEmail("");
      setPassword("");
      setSixDigitPin("");
      setConfirmPassword1("");
      setConfirmPassword2("");
    });
  };

  useEffect(() => {
    console.log(window.location.search.includes("code"), "thewindow")
    if (window.location.search.includes("code")) {
      handleSSOCallback();
    }
  }, []);

  // const deleteSSOUser = (username) => {
  //   axios.post(`https://gxauth.apimachine.com/gx/user/cognito/delete`, {
  //     cognito_username: username,
  //   });
  // };

  const checkDB = (email, username, cogData, authorizationCode) => {
    axios
      .post(`https://gxauth.apimachine.com/gx/user/email/exist`, {
        email: email,
      })
      .then(({ data }) => {
        if (data.status) {
          if (data?.data?.sso_g) {
            if (window.innerWidth > 600) {
              handleLoginSuccess1(cogData, email);
            } else {
              // userLoginHandler(email, cogData.access_token, cogData.id_token);
              registerApp({ email, app_code: APP_CODE });
              registerApp({ email, app_code: "ice" });
              // Cookies.set(APP_USER_TOKEN, cogData.id_token);
              setMobileStep(12);

              // const loginData = {
              //   email: email,
              //   app_code: APP_CODE,
              //   access_token: cogData.access_token,
              //   id_token: cogData.id_token,
              // };
              // const encoded = JSON.stringify(loginData);
              // const params = new URLSearchParams(loginData).toString();

              const url = `web3today://Landing/data?email=${email}&idToken=${cogData.id_token}&accessToken=${cogData.access_token}`;
              window.location.href = url;
            }
          } else {
            // deleteSSOUser(username);
            toast("This Email has already been used.");
            history.push("/")
          }
        } else {
          if (window.innerWidth > 600) {
            setShowMoreInfo(true);
            history.push("/")
          } else {
            setMobileStep(2);
            setFromSso(true);
          }
        }
      });
  };

  const saveToDB = () => {
    // console.log(affData)
    axios
      .post(`https://gxauth.apimachine.com/gx/user/sso/signup`, {
        email: cognitoData?.email,
        ref_affiliate:
          window.innerWidth > 600
            ? affEmail
            : affData?.hardCoded[0]?.data?.affiliate_id, // reference/upline affiliate-id
        app_code: "web3today",
        client_app: "",
        user_full_name: fullName,
        token: cognitoData?.data?.id_token,
      })
      .then(({ data }) => {
        console.log(data, "data");
        if (data.status) {
          if (window.innerWidth > 600) {
            handleLoginSuccess1(cognitoData.data, cognitoData.email);
          } else {
            registerApp({ email: cognitoData.email, app_code: APP_CODE });
            registerApp({ email: cognitoData.email, app_code: "ice" });
            // Cookies.set(APP_USER_TOKEN, cogData.id_token);
            setMobileStep(12);
            setTimeout(() => {
              toast.success("Logged In Successfully")
              setRegisterUser("loginclosed");
              history.push("/feed/articles");
            }, 2000)
          }
        } else {
          toast(data?.message);
        }
      });
  };

  const handleSSOCallback = async () => {
    setIsLoading(true);

    const authorizationCode = new URLSearchParams(window.location.search).get(
      "code"
    );

    // console.log(authorizationCode)

    try {
      var authCode =
        "NjRmcGZnNjl1MWZlNnZjNHBnYWxodGp1MHM6OWN1cDI2OHVqNnNxOG04MjRmMGFxdDNjNm42bWsxOWZsMWR2OGFhNWdya29icmszN2lz";
      // var requestData = qs.stringify({
      //   grant_type: 'authorization_code',
      //   code: authorizationCode,
      //   redirect_uri: 'https://app.web3today.io',
      // });

      var requestData = qs.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: "https://web3today.io",
        client_id: "kch0jkervipp30ve614cou33",
      });

      console.log(requestData, "kjbefkjwebfkjwhefkwhkkjwbfkejwbfkjwe");
      axios
        .post(
          `https://gxnitrossso.auth.us-east-2.amazoncognito.com/oauth2/token`,
          requestData
        )
        .then(({ data }) => {
          // console.log(data, 'data getting from cognito');
          const decoded = jwt_decode(data.id_token);
          setCognitoData({
            email: decoded.email,
            data: data,
          });
          checkDB(
            decoded.email,
            decoded["cognito:username"],
            data,
            authorizationCode
          );
          // handleLoginSuccess1(data, decoded.email);
          // localStorage.setItem('nvestBankLoginAccount', decoded.email);
          // localStorage.setItem('nvestBankIdToken', data.id_token);
          // localStorage.setItem('nvestBankAccessToken', data.access_token);
          // userLoginHandler(decoded.email, data.access_token, data.id_token);
          // registerApp({ email: decoded.email, app_code: APP_CODE });
          // Cookies.set(APP_USER_TOKEN, data.idToken);
          // history.push('/play');
          // setMessage('');
          // localStorage.setItem('decoded', JSON.stringify(decoded));

          // localStorage.setItem('responseData', JSON.stringify(data));
          // localStorage.setItem('access_token', data.access_token);
          // localStorage.setItem('id_token', data.id_token);
          // const accessToken = data.access_token;
          // const email = data.email;
        });
    } catch (err) {
      console.error(
        "Error exchanging authorization code for access token:",
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const conditionalForm = () => {
    if (forgotPassword && forgotPasswordStep === "1") {
      return (
        <>
          <input
            value={email}
            onChange={(e) => {
              setMessage("");
              setEmail(e.target.value.toLowerCase());
            }}
            type="email"
            placeholder="Email"
            className={styles.input1}
          />
          <div
            className={styles.loginButton}
            onClick={() => {
              setForgotPasswordError("");
              setPasswordChanged(false);
              if (email) {
                initializeForgotPassword();
              }
            }}
          >
            Verify Email
          </div>
        </>
      );
    } else if (forgotPassword && forgotPasswordStep === "2") {
      return (
        <>
          <div
            className="errorMessagePara"
            style={{ width: "50%", paddingBottom: "20px" }}
          >
            Please Enter The 6 Digit Code Sent To {email}
          </div>
          <input
            value={sixDigitPin}
            onChange={(e) => setSixDigitPin(e.target.value)}
            className={styles.input1}
            placeholder="Six Digit Code"
            maxLength={6}
            minLength={6}
          />
          <div
            className={styles.loginButton}
            onClick={() => {
              if (sixDigitPin.length === 6) {
                setForgotPasswordStep("3");
              }
            }}
          >
            Next
          </div>
        </>
      );
    } else if (forgotPassword && forgotPasswordStep === "3") {
      return (
        <>
          <div
            className="errorMessagePara"
            style={{ width: "50%", paddingBottom: "20px" }}
          >
            Please Enter Your New Password
          </div>
          <input
            value={confirmPassword1}
            onChange={(e) => setConfirmPassword1(e.target.value)}
            className={styles.input1}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <div
            className={styles.loginButton}
            onClick={() => {
              setForgotPasswordStep("4");
            }}
          >
            Next
          </div>
        </>
      );
    } else if (forgotPassword && forgotPasswordStep === "4") {
      return (
        <>
          <div
            className="errorMessagePara"
            style={{ width: "50%", paddingBottom: "20px" }}
          >
            Please Confirm The Password You Just Entered
          </div>
          <input
            value={confirmPassword2}
            onChange={(e) => setConfirmPassword2(e.target.value)}
            className={styles.input1}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <div
            className={styles.loginButton}
            style={
              appLoginByCode
                ? backgroundColor
                : { opacity: 0.25, pointerEvents: "none" }
            }
            onClick={() => {
              if (confirmPassword1 === confirmPassword2) {
                completeForgotPass();
              } else {
                setForgotPasswordError("Password doesn't Match");
              }
            }}
          >
            Change Password
          </div>
        </>
      );
    } else if (resetPasswordStep === 1 && isResetPassword) {
      return (
        <>
          <div>
            {message && <p style={{ fontSize: "15px" }}>{message}</p>}
            <div>
              <input
                value={password}
                onChange={(e) => {
                  setMessage("");
                  setPassword(e.target.value);
                }}
                className={styles.input1}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
            </div>
          </div>
          <div
            // className="btnLogin"
            // style={backgroundColor}
            className={styles.loginButton}
            onClick={() => setResetPasswordStep(2)}
          >
            Next
          </div>
        </>
      );
    } else if (resetPasswordStep === 2 && isResetPassword) {
      return (
        <>
          <div>
            <p style={{ fontSize: "15px" }}>
              Please Confirm The Password You Just Entered
            </p>
            <div className="pt-5 pb-5 passwordWrap">
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setMessage("");
                  setConfirmPassword(e.target.value);
                }}
                className={styles.input1}
                // className="inputLogin"
                // type={showPassword ? 'text' : 'password'}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div
            // className="btnLogin"
            // style={backgroundColor}
            className={styles.loginButton}
            onClick={() => {
              requestLoginChallenge({
                authChallenge_id: requestChallengeResponse?.authChallenge_id,
                email: requestChallengeResponse?.email,
                username: requestChallengeResponse?.username,
                challengeName: requestChallengeResponse?.challengeName,
                session: requestChallengeResponse?.session,
                newPassword: confirmPassword,
              });
            }}
          >
            Change Password
          </div>
        </>
      );
    } else if (twoFactorStep === 1 && isTwoFactorEnabled) {
      return (
        <div>
          <p style={{ fontSize: "15px" }}>
            Please Enter Your 2 Factor Authentication
          </p>
          <div className="pt-5 pb-5 passwordWrap">
            <input
              value={twoFactorCode}
              onChange={(e) => {
                setMessage("");
                setTwoFactorCode(e.target.value);
              }}
              className={styles.input1}
              // className="inputLogin"
              type={showPassword ? "text" : "password"}
              placeholder="Six Digit Code"
            />
          </div>
          <div
            className={styles.loginButton}
            // className="btnLogin"
            // style={backgroundColor}
            onClick={() => {
              requestLoginChallenge({
                authChallenge_id: requestChallengeResponse?.authChallenge_id,
                email: requestChallengeResponse?.email,
                username: requestChallengeResponse?.username,
                challengeName: requestChallengeResponse?.challengeName,
                session: requestChallengeResponse?.session,
                totp_code: twoFactorCode,
              });
            }}
          >
            Confirm
          </div>
        </div>
      );
    } else {
      // setRegisterUser("");
      if (registerUser == "EarningOpportunity") {
        return <EarningOpportunity />;
      } else if (showMoreInfo) {
        return conditionalMoreInfo();
      } else {
        return (
          <>
            <div
              className={styles.input2}
              style={{ padding: "0", position: "relative", border: "none" }}
            >
              <input
               style={{
                width: "100%",
                height: "100%",
                paddingLeft: "23px",
                position: "relative",
              }}
                type="email"
                placeholder="Email"
                className={styles.input1}
                value={email}
                onChange={(e) => {
                  setMessage("");
                  setEmail(e.target.value.toLowerCase());
                }}
              />
            </div>
            <div
              className={styles.input2}
              style={{ padding: "0", position: "relative", border: "none" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input2}
                style={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: "23px",
                  position: "relative",
                }}
                value={password}
                onChange={(e) => {
                  setMessage("");
                  setPassword(e.target.value);
                }}
              />
              {showPassword ? (
                <AiFillEye
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    transform: "translate(-50%,-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <AiFillEyeInvisible
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    transform: "translate(-50%,-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>

            <div
              className={styles.forgotPassword}
              onClick={() => {
                setForgotPassword(!forgotPassword);
              }}
              style={{
                paddingBottom: userNotFound
                  ? "1.5rem"
                  : incorrectCredentials
                    ? "1.5rem"
                    : "0",
              }}
            >
              Forgot Password
            </div>

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
                  width: "70%",
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
                  width: "70%",
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

            <div
              className={styles.loginButton}
              onClick={() => {
                setForgotPasswordError("");
                setPasswordChanged(false);
                if (appLoginByCode) {
                  attemptLogin({ email, password });
                }
              }}
            >
              Login
            </div>
            <div
              className={styles.googleLogin}
              style={{
                opacity: "0.75",
                // pointerEvents: "none",
                cursor: "pointer",
                display: "none",
              }}
              onClick={() => {
                // window.open(
                //   `https://gxnitrossso.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://app.web3today.io&response_type=CODE&client_id=kch0jkervipp30ve614cou33&scope=email+openid+phone`
                // );
                window.open("https://app.web3today.io");
              }}
            >
              <img
                src={googleIcon}
                alt=""
                style={{ width: "2vh", height: "2vh", marginRight: "4%" }}
              />
              <div>Continue With Google</div>
            </div>
            <div style={{display: width > 600 ? "" : "none"}}
              className={styles.googleLogin}
              onClick={() => {
                window.open(
                  `https://gxnitrossso.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://web3today.io&response_type=CODE&client_id=kch0jkervipp30ve614cou33&scope=email+openid+phone`
                );
              }}
            >
              <img
                src={googleIcon}
                alt=""
                style={{ width: '2vh', height: '2vh', marginRight: '4%' }}
              />
              <div>Login With Google</div>
            </div>
            <div
              className={styles.googleLogin}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setRegisterUser("EarningOpportunity");
              }}
            >
              <div>Go Back</div>
            </div>
            <div
              style={{
                fontSize: "1rem",
                marginTop: "1.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                handleRegisterClick();
                setRegisterUser("register");
                window.open("https://web3today.io/register");
              }}
            >
              Click Here To Register
            </div>
            {/* <div
              onClick={(e) => handleRegisterClick()}
              className={styles.forgotPassword}
              style={{ textAlign: 'center', paddingTop: '4%' }}
            >
              Click Here To Register With Email
            </div> */}
          </>
        );
      }
    }
  };

  const conditionalMoreInfo = () => {
    if (moreInfoStep === 0) {
      return (
        <>
          <div
            // className={styles.forgotPassword}
            style={{
              textAlign: 'left',
              fontSize: '20px',
              marginTop: '-4%',
              marginBottom: '5%',
              fontWeight: '400',
              textAlign: 'center',
              width: '70%',
              lineHeight: '1.5',
              marginBottom: '4rem',
            }}
          >
            You have successfully verified your Google account. Please fill out
            the remaining information to complete your registration
          </div>

          <input
            type="text"
            placeholder="Your Full Name"
            className={styles.input2}
            value={fullName}
            onChange={(e) => {
              setMessage('');
              setFullName(e.target.value);
            }}
          />

          <div
            className={styles.loginButton}
            onClick={() => {
              if (fullName) {
                setMoreInfoStep(1);
              } else {
                setMessage('Please Fill All The Fields');
              }
            }}
          >
            Next Step
          </div>

          {/* <div
            onClick={(e) => handleRegisterClick()}
            className={styles.forgotPassword}
            style={{ textAlign: 'center', paddingTop: '4%' }}
          >
            Click Here To Register With Email
          </div> */}
        </>
      );
    } else if (moreInfoStep === 1) {
      return (
        <>
          <div
            className={styles.forgotPassword}
            style={{
              textAlign: 'left',
              fontSize: '20px',
              marginTop: '-4%',
              marginBottom: '5%',
              fontWeight: '400',
              textAlign: 'center',
              width: '70%',
              lineHeight: '1.5',
              marginBottom: '4rem',
            }}
          >
            Enter The Email Or Username Of The Person Who Referred You?
          </div>
          <input
            disabled={affUsername.length > 0 || checked ? true : false}
            type="email"
            placeholder="Affiliate’s Email"
            className={styles.input1}
            value={affEmail}
            onChange={(e) => {
              setAffUsername('');
              setAffEmail(e.target.value.toLowerCase());
            }}
          />
          <div className={styles.seperateBorder}>&nbsp;OR&nbsp;</div>
          <input
            disabled={affEmail.length > 0 || checked ? true : false}
            type="text"
            placeholder="Affiliate’s Username"
            className={styles.input2}
            value={affUsername}
            onChange={(e) => {
              setAffEmail('');
              setAffUsername(e.target.value);
            }}
          />
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              paddingTop: '30px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              disabled={affEmail.length > 0 || affUsername.length > 0}
              style={{ width: '20px', height: '20px' }}
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              checked={checked}
              onChange={(e) => {
                setAffEmail('');
                setAffUsername('');
                setChecked(e.target.checked);
              }}
            />
            <label for="vehicle1" style={{ margin: 0 }}>
              &nbsp;&nbsp; Click Here If You Got Here By Yourself
            </label>
          </div>
          <div
            className={styles.loginButton}
            onClick={() => {
              if (affEmail.length > 0 || affUsername.length > 0 || checked) {
                if (affEmail.length > 0) {
                  getAffDataEmail(affEmail);
                } else if (affUsername.length > 0) {
                  getAffDataUsername(affUsername);
                } else {
                  getAffDataEmail(ownerEmail);
                }
              } else {
                toast('Fill required fields');
              }
            }}
          >
            {mobileLoading
              ? 'Loading...'
              : checked
                ? 'Finish Registration'
                : 'Next Step'}
          </div>
          <div
            className={styles.loginButton}
            style={{ marginTop: '20px', backgroundColor: '#E73625' }}
            onClick={() => {
              setMoreInfoStep(0);
            }}
          >
            Go Back
          </div>
          {/* <div
            onClick={(e) => handleRegisterClick()}
            className={styles.forgotPassword}
            style={{ textAlign: 'center', paddingTop: '4%' }}
          >
            Click Here To Register With Email
          </div> */}
        </>
      );
    } else if (moreInfoStep === 2) {
      return (
        <>
          <div
            className={styles.forgotPassword}
            style={{
              textAlign: 'left',
              fontSize: '20px',
              marginTop: '-4%',
              marginBottom: '5%',
              fontWeight: '400',
              textAlign: 'center',
              width: '70%',
              lineHeight: '1.5',
              marginBottom: '4rem',
            }}
          >
            Is This The Person Who Referred You?
          </div>
          <div className={styles.optionCards} style={{ width: '70%' }}>
            <img
              src={affData?.dynamic[0]?.data?.profile_img}
              alt=""
              style={{
                width: '5vh',
                height: '5vh',
                marginRight: '4%',
                borderRadius: '50%',
              }}
            />
            <div className={styles.dataStyle}>
              <div>{affData?.hardCoded[0]?.data?.username}</div>
              <div style={{ fontWeight: 400, fontSize: '14px' }}>
                {affData?.email}
              </div>
            </div>
          </div>

          <div
            className={styles.loginButton}
            onClick={() => {
              saveToDB();
            }}
          >
            Next Step
          </div>
          <div
            className={styles.loginButton}
            style={{ marginTop: '20px', backgroundColor: '#E73625' }}
            onClick={() => {
              setMoreInfoStep(1);
            }}
          >
            No Its Not
          </div>
          {/* <div
            onClick={(e) => handleRegisterClick()}
            className={styles.forgotPassword}
            style={{ textAlign: 'center', paddingTop: '4%' }}
          >
            Click Here To Register With Email
          </div> */}
        </>
      );
    }
  };
  const conditionalLoggedInBefore = () => {
    switch (loggedinBeforeStep) {
      case "can't login":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.rightlabel}>Logged In Before</div>
              <div className={styles.rightlabel}>Back</div>
            </div>
            <div className={styles.rightCardnoHover} style={{ height: "100%" }}>
              <div className={styles.rightCardTitle}>
                Im An Existing Web3Today User But I Can’t Login
              </div>
              <div className={styles.rightCardSubTitle}>
                We apologize for that. Click here and lets find out why you are
                not able to login to your Web3Today Account.
              </div>

              <div
                className={styles.rightCardTitle}
                style={{
                  fontSize: "1.8vh",
                  paddingTop: "10%",
                  paddingBottom: "5%",
                }}
              >
                When are you getting your issue?
              </div>
              <div className={styles.options}>When trying to login</div>
              <div
                className={styles.options}
                onClick={(e) => setLoggedinBeforeStep("reset password")}
              >
                When trying to reset password
              </div>
              <div className={styles.options}>
                When trying to enter the 2FA code
              </div>
            </div>
          </>
        );
        break;
      case "reset password":
        return (
          <>
            <div className={styles.rightlabel}>Logged In Before</div>
            <div className={styles.rightCardnoHover} style={{ height: "100%" }}>
              <div className={styles.rightCardTitle}>
                Im An Existing Web3Today User But I Can’t Login
              </div>
              <div className={styles.rightCardSubTitle}>
                We apologize for that. Click here and lets find out why you are
                not able to login to your Web3Today Account.
              </div>

              <div
                className={styles.options}
                style={{ marginTop: "5%" }}
                onClick={(e) => setLoggedinBeforeStep("can't login")}
              >
                When trying to reset password
              </div>
              <div
                className={styles.rightCardTitle}
                style={{
                  fontSize: "1.7vh",
                  paddingTop: "5%",
                  paddingBottom: "5%",
                }}
              >
                What’s happening when you try to reset your password?
              </div>
              <div
                className={styles.options}
                onClick={(e) => setLoggedinBeforeStep("not getting email")}
              >
                Im not getting the email
              </div>
            </div>
          </>
        );
        break;
      case "not getting email":
        return (
          <>
            <div className={styles.rightlabel}>Logged In Before</div>
            <div className={styles.rightCardnoHover} style={{ height: "100%" }}>
              <div className={styles.rightCardTitle}>
                Im An Existing Web3Today User But I Can’t Login
              </div>
              <div className={styles.rightCardSubTitle}>
                We apologize for that. Click here and lets find out why you are
                not able to login to your Web3Today Account.
              </div>

              <div
                className={styles.options}
                style={{ marginTop: "5%" }}
                onClick={(e) => setLoggedinBeforeStep("can't login")}
              >
                When trying to reset password
              </div>
              <div
                onClick={(e) => setLoggedinBeforeStep("reset password")}
                className={styles.options}
              // style={{ marginTop: '5%' }}
              >
                Im not getting the email
              </div>
              <div
                className={styles.rightCardTitle}
                style={{
                  fontSize: "1.7vh",
                  paddingTop: "5%",
                  paddingBottom: "5%",
                }}
              >
                Pick a solution
              </div>
              <div className={styles.optionsDisabled} style={{ opacity: 0.5 }}>
                Switch to login with Google which doesn’t need a password
              </div>
              <div
                className={styles.options}
                onClick={(e) => {
                  window.open("https://t.me/shorupan", "_blank");
                }}
              >
                Request an administrative reset
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className={styles.rightlabel}>Never Logged In Before</div>
            <div
              className={styles.rightCardActive}
              onClick={(e) => {
                handleRegisterClick();
                history.push("register/pre-registered");
              }}
            >
              <div className={styles.rightCardTitle}>
                I Was Pre-Registered By An Web3Today Affiliate
              </div>
              <div className={styles.rightCardSubTitle}>
                This means you have already received an email with your
                temporary login credentials for Web3Today.{" "}
              </div>
            </div>
            <div className={styles.rightCardActive}>
              <div className={styles.rightCardTitle}>
                I Used To Be A DGG.ai User
              </div>
              <div className={styles.rightCardSubTitle}>
                All DGG.ai users were made honorary members of Web3Today and
                should have received an email with their Web3Today temporary
                login credentials.
              </div>
            </div>
            <div
              className={styles.rightCardActive}
              onClick={(e) => {
                handleRegisterClick();
                history.push(`/register/affiliate`);
              }}
            >
              <div className={styles.rightCardTitle}>
                I Am New And I Want To Register
              </div>
              <div className={styles.rightCardSubTitle}>
                That is awesome news. We are thrilled to have you. Please click
                here and you can complete your registration in minutes.
              </div>
            </div>
            <div className={styles.rightlabel} style={{ marginTop: "10%" }}>
              Logged In Before
            </div>
            <div
              className={styles.rightCardActive}
              onClick={(e) => setLoggedinBeforeStep("can't login")}
            >
              <div className={styles.rightCardTitle}>
                Im An Existing Web3Today User But I Can’t Login
              </div>
              <div className={styles.rightCardSubTitle}>
                We apologize for that. Click here and lets find out why you are
                not able to login to your Web3Today Account.
              </div>
            </div>
          </>
        );
        break;
    }
  };

  const getAffDataEmail = async (email) => {
    setMobileLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/user/profile/data/get?email=${email}`
      )
      .then(({ data }) => {
        setMobileLoading(false);
        if (data.status) {
          setAffData(data.usersData[0]);
          if (window.innerWidth < 700) {
            setMobileStep(6);
          } else {
            if (affEmail || affUsername) {
              setMoreInfoStep(2);
            } else {
              saveToDB();
            }
          }
        } else {
          toast("Email Not Found")
        }
      });
  };
  const getAffDataUsername = async (name) => {
    setMobileLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/user/profile/data/get?username=${name}`
      )
      .then(({ data }) => {
        setMobileLoading(false);
        if (data.status) {
          setAffData(data.usersData[0]);
          if (window.innerWidth < 700) {
            setMobileStep(6);
          } else {
            setMoreInfoStep(2);
          }
        } else {
          toast("User Not Found")
        }
      });
  };

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/user/profile/data/get`, {
        params: {
          email: userEmail,
        },
      })
      .then(({ data }) => {
        if (data.count === 1) {
          setAvailable(false);
        } else {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(userEmail)) {
            setAvailable(true);
          } else {
            setAvailable(false);
          }
        }
      });
  }, [userEmail]);

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/user/profile/data/get`, {
        params: {
          username: userUsername,
        },
      })
      .then(({ data }) => {
        if (data.status || data.count === 1) {
          setAvailable(false);
        } else {
          setAvailable(true);
        }
      });
  }, [userUsername]);

  useEffect(() => {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (strongPassword.test(userPassword)) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [userPassword]);

  const handleCreateAccount = () => {
    setMobileLoading(true);
    axios
      .post(`https://gxauth.apimachine.com/gx/user/signup`, {
        username: userUsername,
        email: userEmail,
        password: userPassword,
        ref_affiliate: affUsername,
        account_type: "Personal",
        signedup_app: "web3today",
      })
      .then(({ data }) => {
        if (data.status) {
          setMobileStep(11);
          setMobileLoading(false);
        }
      });
  };

  const confirmEmail = () => {
    axios
      .post(`https://gxauth.apimachine.com/gx/user/confirm`, {
        email: userEmail,
        code: userOtp,
      })
      .then(({ data }) => {
        if (data.status) {
          setMobileStep(12);
        } else {
          setMobileStep(11);
          setOtpMisMatch(true);
        }
      });
  };

  const getAppLinks = () => {
    axios
      .get(
        `https://comms.globalxchange.io/gxb/apps/mobile/app/links/logs/get?app_code=web3today`
      )
      .then(({ data }) => {
        if (data.status) {
          setAppLinks(data.logs[0]);
        }
      });
  };

  useEffect(() => {
    getAppLinks();
  }, []);

  const conditionalMobileUI = () => {
    switch (mobileStep) {
      case 1:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>How Do You Want To Register</div>
            <div
              className={styles.optionCards}
              onClick={() => {
                window.open(
                  "https://gxnitrossso.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://web3today.io&response_type=CODE&client_id=kch0jkervipp30ve614cou33&scope=email+openid+phone"
                );
              }}
            >
              <img
                src={googleIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>Login With Google</div>
            </div>
            <div
              className={styles.optionCards}
              onClick={(e) => setMobileStep(2)}
            >
              <img
                src={emailIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>Personal Email</div>
            </div>
            <div className={styles.optionCards} style={{ opacity: 0.5 }}>
              <img
                src={emailChainIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>EmailChains</div>
            </div>
            <div className={styles.buttonWrapper}>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(0)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>How Did You Hear About Us?</div>
            <div
              className={styles.optionCards}
              onClick={(e) => setMobileStep(3)}
            >
              <img
                src={affiliateIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>Affiliate</div>
            </div>

            <div
              className={styles.buttonWrapper}
              onClick={(e) => setMobileStep(1)}
            >
              <div className={styles.backButton}>Go Back</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Which one do you know?</div>
            <div
              className={styles.optionCards}
              onClick={(e) => setMobileStep(4)}
            >
              <img
                src={emailIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>Affiliate’s Email</div>
            </div>

            <div
              className={styles.optionCards}
              onClick={(e) => setMobileStep(5)}
            >
              <img
                src={affUsernameIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>Affiliate’s Username</div>
            </div>

            <div
              className={styles.buttonWrapper}
              onClick={(e) => setMobileStep(2)}
            >
              <div className={styles.backButton}>Go Back</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter your affiliates email</div>
            <div className={styles.optionCards}>
              <input
                type="text"
                placeholder="Ex. Danny@gmail.com"
                value={affEmail}
                onChange={(e) => setAffEmail(e.target.value.toLowerCase())}
              />
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => getAffDataEmail(affEmail)}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(3)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>
              Enter your affiliates username
            </div>
            <div className={styles.optionCards}>
              <input
                type="text"
                placeholder="Ex. Danny"
                value={affUsername}
                onChange={(e) => setAffUsername(e.target.value)}
              />
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => getAffDataUsername(affUsername)}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(3)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Confirm Affiliate</div>
            <div
              className={styles.optionCards}
              onClick={(e) => setMobileStep(7)}
            >
              <img
                src={affData?.dynamic[0]?.data?.profile_img}
                alt=""
                style={{
                  width: "5vh",
                  height: "5vh",
                  marginRight: "4%",
                  borderRadius: "50%",
                }}
              />
              <div className={styles.dataStyle}>
                <div>{affData?.hardCoded[0]?.data?.username}</div>
                <div style={{ fontWeight: 400, fontSize: "14px" }}>
                  {affData?.email}
                </div>
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (fromSso) {
                    setMobileStep(13);
                  } else {
                    setMobileStep(7);
                  }
                }}
              >
                Yes It Is
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(4)}
              >
                No Its Not
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter your email</div>
            <div className={styles.optionCards}>
              <input
                type="text"
                placeholder="Ex. Danny@gmail.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value.toLowerCase())}
              />
              <div>
                {available && userEmail.length > 0 ? (
                  <div className={styles.greenDot}></div>
                ) : (
                  <div className={styles.redDot}></div>
                )}
              </div>
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (available) {
                    setMobileStep(8);
                    setAvailable(false);
                  }
                }}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(6)}
              >
                Go Back
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter your username</div>
            <div className={styles.optionCards}>
              <input
                type="text"
                placeholder="Ex. Danny"
                value={userUsername}
                onChange={(e) => setUserUsername(e.target.value)}
              />
              <div>
                {available && userUsername.length > 0 ? (
                  <div className={styles.greenDot}></div>
                ) : (
                  <div className={styles.redDot}></div>
                )}
              </div>
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (available) {
                    setMobileStep(9);
                    setAvailable(false);
                  }
                }}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(7)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter your password</div>
            <div className={styles.optionCards}>
              <input
                type="password"
                placeholder="*************"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <div>
                {available && userPassword.length > 0 ? (
                  <div className={styles.greenDot}></div>
                ) : (
                  <div className={styles.redDot}></div>
                )}
              </div>
            </div>
            <div
              onClick={(e) => setShowPasswordChecklist(!showPasswordChecklist)}
            >
              {showPasswordChecklist ? (
                <ul
                  className={styles.passwordChecklist}
                  onClick={(e) =>
                    setShowPasswordChecklist(!showPasswordChecklist)
                  }
                >
                  <li>Minimum One Capital Letter</li>
                  <li>Minimum One Special Character</li>
                  <li>Minimum seven characters</li>
                </ul>
              ) : (
                <div className={styles.checklistLabel}>Password Checklist</div>
              )}
            </div>
            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (available) {
                    setMobileStep(10);
                    setAvailable(false);
                  }
                }}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(8)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Confirm your password</div>
            <div className={styles.optionCards}>
              <input
                type="password"
                placeholder="*************"
                value={userConfirmPassword}
                onChange={(e) => setUserConfirmPassword(e.target.value)}
              />
              <div>
                {userPassword === userConfirmPassword ? (
                  <div className={styles.greenDot}></div>
                ) : (
                  <div className={styles.redDot}></div>
                )}
              </div>
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (userPassword === userConfirmPassword) {
                    handleCreateAccount();
                  }
                }}
              >
                Continue
              </div>
              <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(9)}
              >
                Go Back
              </div>
            </div>
          </div>
        );
      case 11:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter OTP</div>
            <OtpInput
              value={userOtp}
              onChange={setUserOtp}
              numInputs={6}
              separator={<span>&nbsp;&nbsp;&nbsp;</span>}
              shouldAutoFocus
              containerStyle={styles.otpInputWrapper}
              inputStyle={styles.otpInput}
            />
            {otpMisMatch ? (
              <div style={{ color: "red" }}>Invalid OTP</div>
            ) : null}
            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  if (userOtp === 6) {
                    confirmEmail();
                  }
                }}
              >
                Continue
              </div>
              <div className={styles.backButton} style={{ opacity: 0.5 }}>
                Resend Code
              </div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle} style={{ textAlign: "center" }}>
              Your Web3Today account has been successfully created and verified.{" "}
            </div>
            <div className={styles.pageTitle} style={{ textAlign: "center" }}>
              Which type of phone do you have?
            </div>
            <div
              className={styles.optionCards}
              onClick={() => {
                window.open(appLinks.ios_app_link);
              }}
            >
              <img
                src={appleIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>An iPhone</div>
            </div>
            <div
              className={styles.optionCards}
              onClick={() => {
                window.open(appLinks.android_app_link);
              }}
            >
              <img
                src={playStoreIcon}
                alt=""
                style={{ width: "2.8vh", height: "2.8vh", marginRight: "4%" }}
              />
              <div>An Android</div>
            </div>
          </div>
        );
      case 13:
        return (
          <div className={styles.stepContainer}>
            <div className={styles.pageTitle}>Enter Full Name</div>
            <div className={styles.optionCards}>
              <input
                type="text"
                placeholder="Ex. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  saveToDB();
                }}
              >
                Continue
              </div>
              {/* <div
                className={styles.backButton}
                onClick={(e) => setMobileStep(6)}
              >
                Go Back
              </div> */}
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.stepContainer}>
            <div
              style={{
                padding: "0px 40px",
                paddingBottom: "40px",
                paddingTop: "0px",
              }}
            >
              <img src={mobilelogo} alt="" style={{ width: "100%" }} />
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "100",
                textAlign: "center",
              }}
            >
              If you want to use Web3Today on your phone, you will have to
              download one of our beta mobile applications. Click your phone
              type below.
            </p>
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
              <button
                onClick={() => {
                  window.open(appLinks.ios_app_link, "_blank");
                }}
                className="mobile-register"
                style={{ border: "0.5px solid var(--bordercolor-main)" }}
              >
                <img src={ios} alt="ios" />
              </button>
              <button
                onClick={() => {
                  window.open(appLinks.android_app_link, "_blank");
                }}
                className="mobile-register"
                style={{ border: "0.5px solid var(--bordercolor-main)" }}
              >
                <img src={android} alt="android" />
              </button>
            </div>
            <div className={styles.buttonWrapper1}>
              <div
                className={styles.continueButton}
                onClick={(e) => {
                  setMobileStep(1);
                }}
              >
                Click Here To Register
              </div>
            </div>
          </div>
        );
        break;
    }
  };

  return (
    <>
      {width > 328 || width > height ? (
        <div className={styles.mainGrid}>
          <div className={styles.leftSide}>
            {(isChanging || isLoggingIn || isRequestingLoginChallenge) && (
              <div className="loading-component">
                <LoadingAnimation icon={defaultApp?.appLogo} width={200} />
              </div>
            )}
            <div
              className={styles.leftForm}
              style={{
                paddingBottom: registerUser == "EarningOpportunity" ? "0" : "",
              }}
            >
              {appDetailsLoading ? (
                <Skeleton className="mb-5" style={{ height: 50 }} />
              ) : registerUser == "EarningOpportunity" ? (
                ""
              ) : (
                <img
                  src={selectedApp?.appFullLogo}
                  alt="Full Logo"
                  className={classNames.logo}
                  style={{ width: "70%", paddingBottom: "6%" }}
                  onClick={() => {
                    setRegisterUser("loginclosed");
                    history.push("/feed/articles");
                  }}
                />
              )}

              {conditionalForm()}
            </div>
          </div>
          <div className={styles.rightSide}>
            {/* {conditionalLoggedInBefore()} */}
            {/* <img
              src={bgImg}
              alt=""
              style={{ height: '100%', objectFit: 'contain' }}
            /> */}
          </div>
        </div>
      ) : (
        <>
          {mobileLoading ||
            (isLoading && (
              <div className={styles.loadingComponent}>
                <LoadingAnimation icon={defaultApp?.appLogo} width={200} />
              </div>
            ))}
          <div>
            <div className={styles.mobileLogo}>
              <img
                src={appFullLogo}
                alt="Full Logo"
                onClick={(e) => setMobileStep(0)}
              />
            </div>
            <div style={{ padding: "0px 20px" }}>{conditionalMobileUI()}</div>
          </div>
        </>
      )}
      {/* <ToastContainer
        position="top-center"
        autoClose={7000}
        style={{ top: 170, width: '680px' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  );
}

export default Login;
