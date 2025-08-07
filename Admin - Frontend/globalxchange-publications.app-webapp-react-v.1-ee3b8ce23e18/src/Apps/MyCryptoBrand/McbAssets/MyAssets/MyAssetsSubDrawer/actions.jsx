import React, { useEffect, useState, useContext } from "react";
import "./subdrawer.scss"
import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import defaultImg from "../../../../../static/images/icons/app_placeholder.png";
import lock from "../../../../../static/images/icons/lock.svg";
import moneyMarket from "../../../../../static/images/revenueStreamIcons/moneyMarket.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";
import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Actions = ({ loading, setLoading, path, setPath, step, setStep, coin, AppsData }) => {

  const {
    showSubDraw,
    setShowSubDraw,
    selectedMcbAssetsCrypto,
    setSelectedMcbAssetsCrypto,
    theCurrency,
    coinIIRD,
    selectedBrandApp,
    setSelectedTab,
    mcbMenu,
    tabSelected,
    setTabSelected
  } = useContext(GlobalContex);

  const [currentFee, setCurrentFee] = useState("")
  const [newFee, setNewFee] = useState("")



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
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
              marginBottom: "20px"
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


  const openloader = () => {
    let body = {
      email: selectedBrandApp?.created_by,
      token: localStorage.getItem("TokenId"),
      app_code: selectedBrandApp?.app_code,
      ird_coins: [coin],
      interest_rate_differential: newFee,
      update: true
    }
    console.log(body, "body")
    if (newFee == "") {
      toast.info("Please enter New MoneyMarket IRD")
    } else {
      setStep("loading")
      axios.post("https://comms.globalxchange.io/gxb/apps/update", body).then(res => {
        // console.log("allassets ", res.data)
        if (res.data.status) {
          setStep("success")
          setNewFee("")
          setTimeout(() => {
            setShowSubDraw(false)
            setStep("default")
            setTabSelected("Crypto")
          }, 1000);
        } else {
          setStep("default")
        }
      })
    }
  }




  const closedraw = () => {
    setShowSubDraw(false)
    setStep("default")
    console.log("status", showSubDraw)
  }

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
              {/* <img src={editApp} alt="" style={{ width: "20px" }} /> */}
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
              {/* <img src={editApp} alt="" style={{ width: "20px" }} /> */}
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
      case "FeesData":
        return <>
          <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            >

              <div>
                <p className="coinsdata" >{coin}</p>
                <div
                  className="breadcrumb"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "20px",
                    marginTop: "-8px",
                    fontSize: "10px"
                  }}
                >
                  <div>
                    <span className="crumbs" onClick={() => setStep("default")}>
                      Actions&nbsp;
                    </span>
                    <span className="crumbs" style={{ fontWeight: 700 }}>
                      {"->"}&nbsp;
                    </span>
                    <span className="crumbSelected" style={{ fontWeight: 700, cursor: "pointer" }}>
                      Change MM IRD
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
          </div >
          <div className="assetfields">
            <p className="assettext">Current MoneyMarket IRD</p>
            {/* <input type="text" placeholder="" className="assetinput" value={coinIIRD[coin] ? (coinIIRD[coin] + "%") : ""} /> */}
            <p>{coinIIRD[coin] ? coinIIRD[coin] + "%" : "---"}</p>
          </div>
          <br />
          <div className="assetfields">
            <p className="assettext">Enter New MoneyMarket IRD</p>
            <input type="number" placeholder="0.00%" className="assetinput" value={newFee} onChange={(e) => setNewFee(e.target.value)} />
          </div>
          <div className="buttonaction">
            <div className="leftbtn">
              <button className="backbtn" onClick={() => setStep("default")}>Go Back</button>
            </div>
            <div className="rightbtn">
              <button className="savebtn" onClick={openloader}>Save Changes</button>
            </div>
          </div>
        </>
      case "loading":
        return fullHeightDrawer(`Updating IRD For ${coin}`)
      case "success":
        return <div className="assetDispText">
          You Have Successfully Updated The MoneyMarket IRD For {coin}. You Will Be Redirected To The Crypto Assets Page.
        </div>
      default:
        return (
          <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            >

              <div>
                <p className="coinsdata" >{coin}</p>
                <div
                  className="breadcrumb"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "20px",
                    marginTop: "-8px",
                    fontSize: "10px"
                  }}
                >
                  <div>
                    <span className="crumbSelected" onClick={() => setStep("default")}>
                      Actions&nbsp;
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
            <div className="sidebarTitle">What Would You Like To See?</div>
            <div
              style={{ overflowY: "scroll", height: window.innerHeight - 380 }}
            >


              <div
                className="sidebarCard"
                onClick={() => (setStep("FeesData"))}
              // onClick={() => (setStep("FeesData"), setCurrentFee("100"))}
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

              {/* <div
                className="sidebarCard"
                onClick={() => {

                }}
              >
                <img
                  src={bondIcon}
                  alt=""
                  className="coin"
                  style={{ width: "18px", height: "18px" }}
                />
                <div style={{ paddingLeft: "15px" }}>Change Bond IIRD</div>
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
          <div style={{ padding: "0px 30px" }}>
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>

                <div>
                  <div style={{ fontSize: "22px" }}>
                    {coin}
                    <div className="breadcrumbdisp">Actions</div>
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
            </div> */}

            {/* <div
              className="breadcrumb"
              style={{
                display: "flex",
                flexDirection: "row",
                height: "20px",
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
            </div> */}
          </div>
        ) : (
          ""
        )}
        {conditionalSteps()}
        <ToastContainer />
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

export default Actions