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

import tokenSwap from "../../../../../static/images/revenueStreamIcons/tokenSwap.svg";
import moneyMarket from "../../../../../static/images/revenueStreamIcons/moneyMarket.svg";

import changeBond from "../../../../../static/images/icons/changeBond.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";

const Actions = ({ loading, setLoading, path, setPath, step, setStep }) => {
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
    setGlobalMenuAdd,
    setRefetchBrandData,
    refetchBrandData,
    selectedMcbAssetsCrypto,
    setSelectedMcbAssetsCrypto,
  } = useContext(GlobalContex);

  const [bondStatus, setBondStatus] = useState("");

  useEffect(() => {
    setStep("Actions");
    setPath(["Actions"]);
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

  const fullHeightDrawer = (message) => {
    if (message) {
      return (
        <div
          style={{
            height: window.innerHeight - 175,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message}
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: window.innerHeight - 175,
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
              <div style={{ paddingLeft: "15px" }}>Item 1 of Step 1</div>
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
              <div style={{ paddingLeft: "15px" }}>Item 1 of Step 2</div>
            </div>
          </>
        );

      case "Delete Brand":
        return (
          <>
            {!loading ? (
              <div style={{ padding: "0px 30px" }}>
                <div className="sidebarTitle">
                  Are You Sure You Want To Delete This Brand?{" "}
                </div>
                <div className="sidebarCard">
                  <img
                    src={okIcon}
                    alt=""
                    className="coin"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <div style={{ paddingLeft: "15px" }}>Yes</div>
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
                    style={{ width: "18px", height: "18px" }}
                  />
                  <div style={{ paddingLeft: "15px" }}>No, Go Back</div>
                </div>
              </div>
            ) : (
              fullHeightDrawer()
            )}
          </>
        );

      case "Delete Success":
        return (
          <div
            style={{
              padding: "30px",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontWeight: 400 }}>
              You Have Successfully Deleted the Brand{" "}
              <span style={{ fontWeight: 700 }}>""</span>. You Will Be
              Redirected To The Updated Brand List Automatically
            </div>
          </div>
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

      default:
        return (
          <div style={{ padding: "0px 30px" }}>
            <div className="sidebarTitle">What Would You Like To Do? </div>

            <div
              style={{ overflowY: "scroll", height: window.innerHeight - 380 }}
            >
              {/* <div
                className="sidebarCard"
                onClick={() => {
                
                }}
              >
                <img
                  src={tokenSwap}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>Add TokenSwap Path</div>
              </div> */}

              {/* <div
                className="sidebarCard"
                onClick={() => {
                 
                }}
              >
                <img
                  src={deleteApp}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>Remove TokenSwap Path</div>
              </div> */}

              {/* <div
                className="sidebarCard"
                onClick={() => {
                 
                }}
              >
                <img
                  src={tokenSwap}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>
                  Edit TokenSwap Path Fee
                </div>
              </div> */}

              <div
                className="sidebarCard"
                onClick={() => {
                  
                }}
              >
                <img
                  src={moneyMarket}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>
                  Change MoneyMarket IRD
                </div>
              </div>

              <div
                className="sidebarCard"
                onClick={() => {
                  // setStep("Delete Brand");
                  // setPath([...path, "Delete Brand"]);
                }}
              >
                <img
                  src={bondIcon}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>Change Bond IIRD</div>
              </div>

              {/* <div
                className="sidebarCard"
                onClick={() => {
                
                }}
              >
                <img
                  src={deleteApp}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>Remove Coin</div>
              </div> */}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        style={{
          height: "90px",
        }}
      >
        {!loading && step !== "Token Expired" && step !== "Delete Success" ? (
          <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
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
                    selectedMcbAssetsCrypto?.coinImage
                      ? selectedMcbAssetsCrypto?.coinImage
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
                    {selectedMcbAssetsCrypto?.coinName}
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
                  onClick={(e) => setShowSubDraw(false)}
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
              style={{
                display: "flex",
                flexDirection: "row",
                height: "20px",
                paddingTop: "7px",
              }}
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
        ) : (
          ""
        )}
        {conditionalSteps()}
      </div>
      {/* <div
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
                src={selectedMcbDashboardBrand?.brand_logo}
                alt=""
                style={{ width: "28px", height: "28px", borderRadius: "100%" }}
              />
              <div style={{ paddingLeft: "15px" }}>
                <div style={{ fontSize: "22px" }}>
                  {selectedMcbDashboardBrand?.brand_name}
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
      </div> */}
    </>
  );
};

export default Actions;
