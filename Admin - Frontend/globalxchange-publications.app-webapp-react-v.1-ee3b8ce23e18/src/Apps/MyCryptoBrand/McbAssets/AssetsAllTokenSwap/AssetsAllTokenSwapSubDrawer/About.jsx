import React, { useContext, useEffect } from "react";
import "./subdrawer.scss";
import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import { calcLength } from "framer-motion";

const About = ({ step, setStep }) => {
  const {
    showSubDraw,
    setShowSubDraw,
    theCurrency,
    setTheCurrency,
    selectedBrandApp,
  } = useContext(GlobalContex);

  const openloader = () => {
    setStep("loading");
    let body = {
      app_code: selectedBrandApp?.app_code,
      path_ids: [theCurrency.path_id],
    };
    axios
      .post(
        "https://comms.globalxchange.io/gxb/apps/configure/payment/paths",
        body
      )
      .then((res) => {
        // console.log("allassets ", res.data)
        if (res.data.status) {
          setStep("success");
          setTimeout(() => {
            setShowSubDraw(false);
            setStep("default");
          }, 1000);
        } else {
          setStep("default");
        }
      });
  };

  const fullHeightDrawer = (message) => {
    if (message) {
      return (
        <div
          style={{
            height: window.innerHeight - 123,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {message}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: window.innerHeight - 123,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
            }}
          >
            Updaing Brand List...
          </div>
        </div>
      );
    }
  };

  const closedraw = () => {
    setShowSubDraw(false);
    console.log("status", showSubDraw);
  };

  const ConditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(
          `Adding ${theCurrency?.from_currency} To ${theCurrency?.to_currency} Path To Assets.io`
        );
      case "success":
        return (
          <div className="assetDispText">
            You Have Successfully Added A {theCurrency?.from_currency} To{" "}
            {theCurrency?.to_currency} Path To Assets.io. You Will Be Redirected
            To Your TokenSwap Paths Page.
          </div>
        );
      default:
        return (
          <>
            <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className="coinsdata">
                    {theCurrency?.from_currency} To {theCurrency?.to_currency}
                  </p>
                  <div
                    className="breadcrumb"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "20px",
                      marginTop: "-8px",
                      fontSize: "10px",
                    }}
                  >
                    <div>
                      <span
                        className="crumbSelected"
                        style={{ fontWeight: 700 }}
                      >
                        About
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="backButton icon-imgs"
                  style={{
                    marginLeft: "20px",
                  }}
                  onClick={closedraw}
                >
                  <img src={close} alt="" />
                </div>
              </div>
            </div>
            <div style={{ margin: "0px 30px" }}>
              <p>What Would You Like To Do?</p>
            </div>
            <div className="boxdisp" onClick={openloader}>
              Add To My App
            </div>
          </>
        );
    }
  };

  return <>{ConditionalSteps()}</>;
};

export default About;
