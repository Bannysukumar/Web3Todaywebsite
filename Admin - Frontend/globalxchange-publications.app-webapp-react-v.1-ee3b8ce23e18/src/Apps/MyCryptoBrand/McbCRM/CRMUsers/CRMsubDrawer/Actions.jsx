import React, { useContext, useEffect, useState } from "react";
import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import editApp from "../../../../../static/images/clipIcons/appData.svg";
import userIcon from "../../../../../static/images/clipIcons/userIcon.svg";
import deleteApp from "../../../../../static/images/clipIcons/delete.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import plusIcon from "../../../../../static/images/clipIcons/plus.svg";
import closeIcon from "../../../../../static/images/clipIcons/no.svg";
import defaultImg from "../../../../../static/images/icons/app_placeholder.png";
import lock from "../../../../../static/images/icons/lock.svg";

import changeBond from "../../../../../static/images/icons/changeBond.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";

const Actions = ({ step, setStep, path, setPath }) => {
  const {
    showSubDraw,
    setShowSubDraw,
    theCurrency,
    setTheCurrency,
    selectedBrandApp,
    refreshCall,
    setRefreshCall,
    theAsset,
    setTheAsset,
    crmUser,
    crmData,
    setCrmData,
  } = useContext(GlobalContex);

  const closedraw = () => {
    setShowSubDraw(false);
    setStep("default");
    console.log("status", showSubDraw);
  };
  let disp;
  if (step === "loading" || step === "success") {
    disp = "none";
  } else {
    disp = "";
  }

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
            Updating Brand List...
          </div>
        </div>
      );
    }
  };

  const openloader = () => {
    setStep("loading");
    let body = {
      email: crmUser?.userData?.email,
      app_code: selectedBrandApp?.app_code,
    };
    console.log("expunge ", body);
    axios
      .post("https://comms.globalxchange.io/gxb/apps/expunge/user", body)
      .then((res) => {
        if (res.data.status) {
          setStep("success");
          setTimeout(() => {
            setShowSubDraw(false);
            setStep("default");
          }, 1000);
          axios
            .get(
              `https://comms.globalxchange.io/coin/vault/service/users/holdings/data/get?app_code=${selectedBrandApp?.app_code}`
            )
            .then(({ data }) => {
              // let data = res.data.users;
              // let output = data.slice(0, 30);
              setCrmData(data.users);
            });
        } else if (res.data.message === "jwt expired") {
          setStep("Token Expired");
        } else {
          setStep("default");
        }
      });
  };

  const ConditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(
          `Removing ${crmUser?.userData?.name} From ${selectedBrandApp.app_code}`
        );
      case "Token Expired":
        return (
          <div style={{ padding: "30px", height: "90px" }}>
            <div className="sidebarTitle">Token Expired. Login Again.</div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <img src={lock} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "15px" }}>Logout</div>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="assetDispText">
            You Have Successfully Removed {crmUser?.userData?.name} From{" "}
            {selectedBrandApp.app_code}. You Will Be Redirected Back To The CRM
            Page
          </div>
        );
      case "removeuser":
        return (
          <>
            <div style={{ margin: "0px 30px" }}>
              <p>
                Are You Sure You Want To Remove {crmUser?.userData?.name} From
                Your App?
              </p>
            </div>
            <div className="boxdisp" onClick={openloader}>
              Yes I Am Sure
            </div>
            <br />
            <div className="boxdisp" onClick={() => setStep("default")}>
              Nevermind
            </div>
          </>
        );
      default:
        return (
          <>
            <div style={{ margin: "0px 30px" }}>
              <p>What Would You Like To Do?</p>
            </div>
            <div className="boxdisp" onClick={() => setStep("removeuser")}>
              Remove User From App
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <div style={{ padding: "0px 30px", paddingTop: "30px", display: disp }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <img
                src={
                  crmUser?.userData?.profile_img
                    ? crmUser?.userData?.profile_img
                    : defaultImg
                }
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  marginRight: "15px",
                }}
              />
            </div>
            <div>
              <p className="coinsdata"> {crmUser?.userData?.name}</p>
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
                <div></div>
                <span
                  className="crumbSelected"
                  style={{ fontWeight: 700, cursor: "pointer" }}
                  onClick={() => setStep("default")}
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
      <br style={{ display: disp }} />
      {ConditionalSteps()}
      <ToastContainer />
    </div>
  );
};

export default Actions;
