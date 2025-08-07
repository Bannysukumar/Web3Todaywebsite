import React from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DefaultStep from "../components/DefaultStep";
import LeftComponent from "../components/LeftComponent";
import RightComponent from "../components/RightComponent";

import Skeleton from "react-loading-skeleton";
// import { GlobalContex } from '../globalContext';

import affLogo from "../assets/images/affLogo.svg";
import preLogo from "../assets/images/preLogo.svg";
import searchLogo from "../assets/images/searchLogo.svg";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../../../RegistrationContext";

import "../App.scss";

const RegisterHomePage = () => {
  const navigate = useNavigate();

  const { setInitialPath, appData, setAppData } =
    useContext(RegistrationContext);

  // useEffect(() => {
  //   if (appUserToken) {
  //     navigate('/Bplanner');
  //   }
  // }, []);

  return (
    <>
      <div className="App">
        {appData !== null && appData !== undefined ? (
          <div className="myGrid">
            <div
              style={{
                background: `#${appData?.color_codes[0]?.primarycolourcode}`,
              }}
            >
              <div className="leftDialogue">
                <span>
                  How Did
                  <br />
                  You Hear
                  <br />
                  {appData?.app_name}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="rightWidth">
                <div>
                  <img
                    src={appData?.data?.color_logo}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="stepOneTitle">How Did You Hear About Us?</div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "30px",
                  }}
                >
                  <div
                    style={{ textAlign: "center" }}
                    onClick={
                      (e) => navigate("affiliate")
                      // navigate("register/affiliate")
                    }
                  >
                    <div
                      className="smallCard"
                      style={{
                        background: `#${appData?.color_codes[0]?.primarycolourcode}`,
                      }}
                    >
                      <img src={affLogo} alt="" />
                    </div>
                    <div style={{ paddingTop: "20px" }}>Affiliate</div>
                  </div>
                  <div
                    style={{ textAlign: "center" }}
                    onClick={(e) => navigate("pre-registered")}
                  >
                    <div
                      className="smallCard"
                      style={{
                        background: `#${appData?.color_codes[0]?.primarycolourcode}`,
                      }}
                    >
                      <img src={preLogo} alt="" />
                    </div>
                    <div style={{ paddingTop: "20px" }}>Pre-Registered</div>
                  </div>
                  <div
                    style={{ textAlign: "center" }}
                    onClick={(e) => navigate("by-myself")}
                  >
                    <div
                      className="smallCard"
                      style={{
                        background: `#${appData?.color_codes[0]?.primarycolourcode}`,
                      }}
                    >
                      <img src={searchLogo} alt="" />
                    </div>
                    <div style={{ paddingTop: "20px" }}>By Myself</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="myGrid">
            <div style={{ lineHeight: "0px" }}>
              <Skeleton
                width="100%"
                height="100vh"
                style={{ borderRadius: "0px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="rightWidth">
                <div>
                  <Skeleton
                    width="100%"
                    height="100px"
                    style={{ borderRadius: "0px" }}
                  />
                </div>
                <div className="stepOneTitle">
                  <Skeleton
                    width="90%"
                    height="20px"
                    style={{ borderRadius: "0px" }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "30px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Skeleton
                      width="138px"
                      height="138px"
                      style={{ borderRadius: "0px" }}
                    />
                    <div style={{ paddingTop: "20px" }}>
                      <Skeleton
                        width="120px"
                        height="10px"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Skeleton
                      width="138px"
                      height="138px"
                      style={{ borderRadius: "0px" }}
                    />
                    <div style={{ paddingTop: "20px" }}>
                      <Skeleton
                        width="120px"
                        height="10px"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Skeleton
                      width="138px"
                      height="138px"
                      style={{ borderRadius: "0px" }}
                    />
                    <div style={{ paddingTop: "20px" }}>
                      <Skeleton
                        width="120px"
                        height="10px"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Version UI */}

        <div className="mobileHome">
          <div className="mobileLogoSection">
            <img
              src={appData?.data?.color_logo}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ padding: "27px" }}>
            <div className="mobileHeader">
              <div
                className="stepTitle"
                style={{
                  color: `#${appData?.color_codes[0]?.primarycolourcode}`,
                }}
              >
                Step 1
              </div>
              <div className="stepSubtitle">How Did You Hear About Us?</div>
            </div>
            <div className="mobileCardWrapper">
              <div
                onClick={
                  (e) => navigate("affiliate")
                  // navigate("register/affiliate")
                }
              >
                <div>Affiliate</div>
                <div>An Existing Affiliate App User Told You</div>
              </div>
              <div
                onClick={
                  (e) => navigate("pre-registered")
                  // navigate("register/pre-registered")
                }
              >
                <div>I Am Pre-Registered</div>
                <div>You Have Already Been Signed Up</div>
              </div>
              <div
                onClick={(e) => navigate("by-myself")}
                // onClick={(e) => navigate("register/by-myself")}
              >
                <div>I Have No Idea</div>
                <div>You Found Us By Yourself</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterHomePage;
