// Package Imports
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// CSS Imports
import classNames from "./signInPage.module.scss";
import "./mobile.scss";
import "./login.scss";

// Context Imports
import { GlobalContex } from "../../globalContext";

// Image Imports

//cPage/Component Imports
import LoadingAnimation from "../../globalComponents/LoadingAnimation";
import GlobalSidebar from "../../globalComponents/GlobalSidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  // const navigate = useNavigate();
  const {
    selectedApp,
    selectedBrandApp,
    setSelectedApp,
    loginData,
    setLoginData,
    globalMenu,
    setBankerEmail,
    hideArrow,
    setHideArrow,
  } = useContext(GlobalContex);
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [twoFaPin, setTwoFaPin] = useState("");
  const [footerLoading, setFooterLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [message, setMessage] = useState("");
  const [resetDetails, setResetDetails] = useState("");
  const [numCode, setNumCode] = useState("");

  const [appli, setAppli] = useState();

  var OperID = JSON.parse(localStorage.getItem("opeID")) || "";
  console.log(OperID, "checking checking checking dynamic operatorsID data...");

  const registerUserToApp = () => {
    axios
      .post(`https://comms.globalxchange.io/gxb/apps/register/user`, {
        email: email,
        app_code: "mycryptobrand",
        fromAppCreation: true,
      })
      .then((res) => {
        if (res.data.message === "success") {
          console.log("User Registered To App", "statusUpdate");
        } else {
          console.log("User Already Registered To App", "statusUpdate");
        }
      });
  };

  const registerEmailForEntpreneur = () => {
    axios
      .post(`https://comms.globalxchange.io/gxb/app/gxlive/user/signup`, {
        email: email,
      })
      .then((res) => {
        if (res.data.message === "Successfully Signed Up") {
          console.log("Email Register For Entpreneur", "statusUpdate");
        } else {
          console.log(
            "Email Already Registered For Entpreneur",
            "statusUpdate"
          );
        }
      });
  };

  const loginbtn = () => {
    if (password === Confirmpassword) {
      let body = { newPassword: password, ...resetDetails };
      setLoading(true);
      axios
        .post(
          `https://gxauth.apimachine.com/gx/user/auth/login/challenge`,
          body
        )
        .then((res) => {
          if (res.data.status) {
            registerUserToApp();
            registerEmailForEntpreneur();
            setLoading(false);
            setLoginData(res.data);
            localStorage.setItem("bankerEmailNew", res?.data?.user.email);
            localStorage.setItem("TokenId", res?.data?.idToken);
            localStorage.setItem("loginData", JSON.stringify(res.data));
            setBankerEmail(res?.data?.user?.email);
          } else {
            setLoading(false);
            toast.info(res.data.message);
          }
        });
    } else {
      setPassword("");
      setConfirmPassword("");
      toast.info("Passwords do not match");
    }
  };

  const handleLogin = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (!password) {
        toast.info("Please Enter Password !!!");
        setMessage("Please Enter Password !!!");
      } else {
        setLoading(true);
        // if (selectedApp?.appName === "Authors") {
        //   axios.get(`https://publications.apimachine.com/publisher?email=${email}`).then((res) => {
        //     setLoading(false)
        //     if (res.data.total_count === 0) {
        //       toast.info("You are not an Author");
        //       return
        //     }
        //   })
        // }
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
                  registerUserToApp();
                  registerEmailForEntpreneur();
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
                        console.log(
                          res,
                          "checking the response of daily points"
                        );
                      });
                    history.push("/feed/articles");
                    localStorage.setItem("userProfile", JSON.stringify(found));
                  } else {
                    setHideArrow(true);
                    history.push("/settings/myprofile");
                  }
                } else if (
                  res.data.challengeName === "NEW_PASSWORD_REQUIRED" &&
                  res.data.resetPassword &&
                  res.data.message === "Reset User Password!"
                ) {
                  setLoading(false);
                  setStep("Force Reset Password");
                  setMessage(
                    "For Security Reasons You Need To Change Your Password"
                  );
                  setPassword("");
                  setResetDetails({
                    email: res.data.email,
                    username: res.data.username,
                    authChallenge_id: res.data.authChallenge_id,
                    challengeName: res.data.challengeName,
                    session: res.data.session,
                  });
                } else if (
                  res.data.challengeName === "SOFTWARE_TOKEN_MFA" &&
                  res.data.mfa &&
                  res.data.message === "Enter the Authenticator Code!"
                ) {
                  setLoading(false);
                  setStep("2FA auth");
                  setMessage("Please Enter Your 2 Factor Authentication");
                  setResetDetails({
                    email: res.data.email,
                    username: res.data.username,
                    authChallenge_id: res.data.authChallenge_id,
                    challengeName: res.data.challengeName,
                    session: res.data.session,
                  });
                } else {
                  setLoading(false);
                  setStep("");
                  toast.info(res.data.message);
                  setMessage(
                    "You Have Entered Incorrect Login Credentials. Please Try Again"
                  );
                }

                // setLoading(false);
                // setStep("");
                // toast.info(res.data.message);
                // setMessage(
                //   "Incorrect Credential or Unregistered Email. Please Try Again"
                // );
              });
          });
      }
    } else {
      toast.info("Enter Valid Email");
      setMessage("Enter Valid Email");
    }
    //     }
    //   })
    // }
    //Register User For App

    //Register Email For Entpreneur

    // console.log(email, "Mugil is testing the email...");
  };

  const mfalogin = () => {
    let body = { totp_code: numCode, ...resetDetails };
    setLoading(true);
    axios
      .post(`https://gxauth.apimachine.com/gx/user/auth/login/challenge`, body)
      .then((res) => {
        if (res.data.status) {
          registerUserToApp();
          registerEmailForEntpreneur();
          setLoading(false);
          setLoginData(res.data);
          localStorage.setItem("bankerEmailNew", res?.data?.user.email);
          localStorage.setItem("TokenId", res?.data?.idToken);
          localStorage.setItem("loginData", JSON.stringify(res.data));
          setBankerEmail(res?.data?.user?.email);
        } else {
          setLoading(false);
          toast.info(res.data.message);
        }
      });
    // console.log("mfa-login " , body)
  };

  const frgtstep = () => {
    setStep("Forgot Password");
    setMessage("");
  };

  const verifybtn = () => {
    let body = {
      email: email,
      app_code: selectedApp?.appName,
    };
    setLoading(true);
    axios
      .post(
        `https://gxauth.apimachine.com/gx/user/password/forgot/request`,
        body
      )
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
          setStep("ConfirmCode");
          setMessage(`Please Enter The 6 Digit Code Sent To ${email}`);
          setPassword("");
        } else {
          setLoading(false);
          toast.info(res.data.message);
        }
      });
    // console.log("Verifybtn ", body)
  };

  const passwordchange = () => {
    if (password === Confirmpassword) {
      let body = {
        email: email,
        code: numCode,
        newPassword: password,
      };
      setLoading(true);
      axios
        .post(
          `https://gxauth.apimachine.com/gx/user/password/forgot/confirm`,
          body
        )
        .then((res) => {
          if (res.data.status) {
            setLoading(false);
            toast.success(res.data.message);
            setEmail("");
            setPassword("");
            setNumCode("");
            setMessage("");
            setStep("default");
          } else {
            setLoading(false);
            toast.info(res.data.message);
          }
        });
    } else {
      toast.info("Passwords do not match");
    }
  };

  const conditionalSteps = () => {
    switch (step) {
      case "Force Reset Password":
        return (
          <>
            <br />
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputLogin"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div
              onClick={() => (
                setStep("Confirm Password"),
                setMessage("Please Confirm The Password You Just Entered")
              )}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Next
            </div>
          </>
        );
      case "Confirm Password":
        return (
          <>
            <br />
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={Confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="inputLogin"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div
              onClick={loginbtn}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Change Password
            </div>
          </>
        );
      case "Enter New Password":
        return (
          <>
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputLogin"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div
              onClick={() => (
                setStep("Enter Confirm Password"),
                setMessage("Please Confirm The Password You Just Entered")
              )}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Next
            </div>
            <p className="forgotbtn">
              Go Back To{" "}
              <span className="clickbtn" onClick={() => setStep("default")}>
                Login
              </span>
            </p>
          </>
        );
      case "Enter Confirm Password":
        return (
          <>
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={Confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="inputLogin"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div
              onClick={passwordchange}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Change Password
            </div>
            <p className="forgotbtn">
              Go Back To{" "}
              <span className="clickbtn" onClick={() => setStep("default")}>
                Login
              </span>
            </p>
          </>
        );
      case "ConfirmCode":
        return (
          <>
            <br />
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={numCode}
                  onChange={(e) => setNumCode(e.target.value)}
                  className="inputLogin"
                  type="number"
                  placeholder="Six Digit Code"
                />
              </div>
            </div>
            <div
              onClick={() => setStep("Enter New Password")}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Next
            </div>
            <p className="forgotbtn">
              Go Back To{" "}
              <span className="clickbtn" onClick={() => setStep("default")}>
                Login
              </span>
            </p>
          </>
        );
      case "2FA auth":
        return (
          <>
            <br />
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={numCode}
                  onChange={(e) => setNumCode(e.target.value)}
                  className="inputLogin"
                  type="number"
                  placeholder="Six Digit Code"
                />
              </div>
            </div>
            <div
              onClick={mfalogin}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Next
            </div>
          </>
        );
      case "Forgot Password":
        return (
          <>
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputLogin"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
            <div
              className="btnLogin"
              onClick={verifybtn}
              style={{ background: selectedApp?.appColor }}
            >
              Verify Email
            </div>
            <p className="forgotbtn">
              Go Back To{" "}
              <span className="clickbtn" onClick={() => setStep("default")}>
                Login
              </span>
            </p>
          </>
        );
      default:
        return (
          <>
            <br />
            <p>{message}</p>
            <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputLogin"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div style={{ paddingTop: "50px" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputLogin"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div
              onClick={handleLogin}
              className="btnLogin"
              style={{ background: selectedApp?.appColor }}
            >
              Login
            </div>
            <p className="forgotbtn">
              Forgot Password?{" "}
              <span className="clickbtn" onClick={frgtstep}>
                Click Here
              </span>
            </p>
          </>
        );
    }
  };

  return (
    <>
      <div className="desktopWrapper" style={{ display: "flex" }}>
        <GlobalSidebar globalMenu={globalMenu} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              paddingLeft: "15%",
            }}
          >
            {loading ? (
              <LoadingAnimation logoAnim />
            ) : (
              <>
                <div style={{ width: "50%" }}>
                  <div style={{ width: "80%" }}>
                    <img
                      style={{ width: "100%" }}
                      src={selectedApp?.appFullLogo}
                      alt=""
                      className={classNames.logo}
                    />
                  </div>
                  {conditionalSteps()}
                </div>
              </>
            )}
          </div>

          <div
            className="heroText"
            style={{
              background: selectedApp?.appColor,
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              {selectedApp?.appData?.split("/")[0]}
              <br /> {selectedApp?.appData?.split("/")[1]}
              <br /> {selectedApp?.appData?.split("/")[2]}
              <div
                className="clickButton"
                style={{ marginTop: "70px" }}
                onClick={(e) => history.push("/register")}
              >
                Click Here
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mobileWrapper"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* <div style={{ position: "absolute", top: 0 }}>
          <div>
            <div
              style={{
                minHeight: loginData
                  ? window.innerHeight - 110
                  : window.innerHeight,
                overflowY: "scroll",
                display: "flex",
                width: "100vw",
                justifyContent: "space-between",
              }}
            >
              {globalMenu.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="globalItem"
                    style={{
                      opacity: selectedApp?.appName === item.appName ? 1 : 0.3,
                    }}
                    onClick={(e) => {
                      if (item.name === "MyCryptoBrand") {
                        setSelectedApp(item);
                        // navigate(`/${item.appName}`);
                      }
                    }}
                  >
                    <img src={item?.appLogo} alt="" style={{ width: "30px" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
        {loading ? (
          <LoadingAnimation logoAnim mobile={true} />
        ) : (
          <>
            <div style={{ width: "70%" }}>
              <div style={{ width: "80%" }}>
                <img
                  style={{ width: "100%" }}
                  src={selectedApp?.appFullLogo}
                  alt=""
                  className={classNames.logo}
                />
              </div>
              <div style={{ paddingTop: "50px", paddingBottom: "60px" }}>
                <div>
                  <input
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputLogin"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div style={{ paddingTop: "50px" }}>
                  <input
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputLogin"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div
              onClick={handleLogin}
              className="btnLogin"
              style={{ background: selectedApp?.appColor, width: "70%" }}
            >
              Login
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;

// if (res.data.operators.length == 0) {
//   localStorage.setItem(
//     "selectedsingleapplication",
//     JSON.stringify({
//       app_code: "",
//       app_icon: "",
//       app_name: "",
//       created_by: "",
//       date: "",
//       timestamp: "",
//       users_count: "",
//       _id: "",
//     })
//   );
// } else {
//   setAppli(res.data.operators[0].app_data[0]);
//   localStorage.setItem(
//     "selectedsingleapplication",
//     JSON.stringify(res.data.operators[0].app_data[0])
//   );
// }
