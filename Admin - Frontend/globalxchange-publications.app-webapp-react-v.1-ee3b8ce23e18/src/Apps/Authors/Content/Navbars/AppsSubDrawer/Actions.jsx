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

const Actions = ({
  allBonds,
  currenciesData,
  loading,
  setLoading,
  step,
  setStep,
  path,
  setPath,
}) => {
  const navigate = useNavigate();
  const {
    showSubDraw,
    setShowSubDraw,
    selectedListItem,
    setSelectedListItem,
    bondSelected,
    setBondSelected,
    bankerEmail,
    loginData,
    refetchBonds,
    setRefetchBonds,
    selectedMcbDashboardApp,
  } = useContext(GlobalContex);

  const [bondStatus, setBondStatus] = useState("");

  useEffect(() => {
    setStep("Action");
    setPath(["Action"]);
  }, [showSubDraw]);

  const handleBackStep = () => {
    if (path.length > 1) {
      path.splice(-1);
      // console.log(tempPath, "kqjdkjwed");
      setPath([...path]);
      if (path.length > 0) {
        setStep(path[path.length - 1]);
      }
    }
  };

  const handleBreadcrumbClick = (clickedStep) => {
    const foundStepIndex = path.findIndex((o) => o === clickedStep);
    const tempPath = path;
    tempPath.splice(foundStepIndex + 1, tempPath.length);
    setPath([...tempPath]);
    console.log(path, "lwndwed");
  };

  useEffect(() => {
    setStep(path[path.length - 1]);
  }, [path]);

  const changeBondStatus = () => {
    setLoading(true);
    axios
      .post(
        `https://comms.globalxchange.io/coin/iced/banker/custom/bond/update`,
        {
          bond_template_id: bondSelected?.bond_template_id,
          email: bankerEmail,
          token: loginData.idToken,
          update_data: {
            status: bondStatus,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setLoading(true);
          setPath([]);
          setStep("");
          setShowSubDraw(false);
          setRefetchBonds(true);
          // setRefetchData(true);
          // setBondStatus("");
          // setTimeout(() => {
          //   onClose();
          // }, 2000);
        } else {
          setLoading(true);
          setStep("Token Expired");
        }
      });
  };

  const conditionalSteps = () => {
    switch (step) {
      case "step1":
        return (
          <>
            <div className="sidebarTitle">This is the 1st step </div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                setStep("step2");
                setPath([...path, "step2"]);
              }}
            >
              <img src={editApp} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "10px" }}>Item 1 of Step 1</div>
            </div>
          </>
        );

      case "step2":
        return (
          <>
            <div className="sidebarTitle">This is the 2nd step </div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                setStep("step3");
                setPath([...path, "step3"]);
              }}
            >
              <img src={editApp} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "10px" }}>Item 1 of Step 2</div>
            </div>
          </>
        );

      case "Token Expired":
        return (
          <>
            <div className="sidebarTitle">Token Expired. Login Again.</div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <img src={lock} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "10px" }}>Logout</div>
            </div>
          </>
        );

      case "Change Bond Status":
        return (
          <>
            <div className="sidebarTitle">Select New Status </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setBondStatus("active");
                setStep("Verify Status");
                setPath([...path, "Verify Status"]);
              }}
            >
              <img
                src={editApp}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Active</div>
              {bondSelected?.status === "active" ? (
                <div
                  // className="statusIndicator"
                  style={{
                    background: "#18191D",
                    height: "100%",
                    width: "12px",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  &nbsp;
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setBondStatus("inactive");
                setStep("Verify Status");
                setPath([...path, "Verify Status"]);
              }}
            >
              <img
                src={changeBond}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Inactive</div>
              {bondSelected?.status === "inactive" ? (
                <div
                  // className="statusIndicator"
                  style={{
                    background: "#18191D",
                    height: "100%",
                    width: "12px",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  &nbsp;
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        );

      case "Verify Status":
        return (
          <>
            <div
              className="sidebarTitle"
              style={{ fontSize: "16px", fontWeight: 400 }}
            >
              Are You Sure You Want To Change This Bond Offering From "
              {bondSelected?.status}" to “{bondStatus}”?
            </div>
            <div
              className="sidebarCard"
              // onClick={() => {
              //   setBondStatus("active");
              //   setStep("Verify Status");
              //   setPath([...path, "Verify Status"]);
              // }}
              onClick={(e) => changeBondStatus()}
            >
              <img
                src={okIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Yes</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setPath([]);
              }}
            >
              <img
                src={backIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>No, Go Back</div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="sidebarTitle">What Would You Like To See? </div>
            <div
              className="sidebarCard"
              onClick={() => {
                // setStep("Edit Bond Data");
              }}
            >
              <img
                src={editApp}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Edit Bond Data</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Change Bond Status");
                setPath([...path, "Change Bond Status"]);
              }}
            >
              <img
                src={changeBond}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Change Bond Status</div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div
        style={{
          padding: "30px",
          height: "90px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  selectedMcbDashboardApp?.app_icon
                    ? selectedMcbDashboardApp?.app_icon
                    : defaultImg
                }
                alt=""
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "100%",
                }}
              />
              <div style={{ paddingLeft: "10px" }}>
                <div style={{ fontSize: "22px" }}>
                  {selectedMcbDashboardApp?.app_name}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {path.length > 1 ? (
                <div
                  className="backButton icon-imgs"
                  onClick={(e) => handleBackStep()}
                >
                  <img src={back} alt="" />
                </div>
              ) : (
                ""
              )}
              <div
                className="backButton icon-imgs"
                onClick={(e) => {
                  setPath([]);
                  setShowSubDraw(false);
                }}
                style={{
                  marginLeft: "20px",
                }}
              >
                <img src={close} alt="" />
              </div>
            </div>
          </div>

          <div
            className="breadcrumb"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {path?.map((item, index) => {
              return (
                <div>
                  {index !== 0 ? <span>&nbsp;{`->`}&nbsp;</span> : ""}
                  <span
                    onClick={(e) => handleBreadcrumbClick(item)}
                    className={
                      index === path.length - 1 ? "crumbSelected" : "crumbs"
                    }
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {conditionalSteps()}
      </div>
    </>
  );
};

export default Actions;
