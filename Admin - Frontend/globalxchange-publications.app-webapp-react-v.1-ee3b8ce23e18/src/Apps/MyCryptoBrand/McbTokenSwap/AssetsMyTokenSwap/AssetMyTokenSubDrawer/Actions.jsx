import React, { useContext, useState, useEffect } from "react";
import "./subdrawer.scss"
import close from "../../../../../static/images/icons/close1.svg";
import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import lock from "../../../../../static/images/icons/lock.svg";

const Actions = ({ step, setStep, path, setPath }) => {
    const { showSubDraw, setShowSubDraw, theCurrency, setTheCurrency, selectedBrandApp, refreshCall, setRefreshCall, theAsset, setTheAsset } = useContext(GlobalContex);
    const [fixedFee, setFixedFee] = useState("")
    const [tradeFee, setTradeFee] = useState("")
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        setStep("About");
        setPath(["About"]);
    }, [showSubDraw]);


    const openloader = () => {
        if (!fixedFee) {
            setFixedFee(0)
        }
        if (!tradeFee) {
            setTradeFee(0)
        }
        let body = {
            email: selectedBrandApp?.created_by,
            token: localStorage.getItem("TokenId"),
            app_code: selectedBrandApp?.app_code,
            path_id: theCurrency.path_id,
            fixed_fee: fixedFee,
            trade_fee: tradeFee
        }
        setStep("loading")
        axios.post("https://comms.globalxchange.io/gxb/apps/path/fee/set", body).then(res => {
            // console.log("allassets ", res.data)
            if (res.data.status) {
                setStep("success")
                setRefreshCall(true)
                setFixedFee("")
                setTradeFee("")
                setTimeout(() => {
                    setShowSubDraw(false)
                    setStep("default")
                }, 1000);
                setDataLoading(true);
                axios.get(`https://comms.globalxchange.io/gxb/apps/path/fees/get?app_code=${selectedBrandApp?.app_code}&select_type=instant`).then(res => {
                    console.log("assetsData ", res.data.Apps)
                    if (res.data.status) {
                        setDataLoading(false);
                        if (res.data.Apps.length > 0) {
                            setTheAsset(res.data.Apps[0].pathDetail)
                        } else {
                            setTheAsset([])
                        }
                    } else {
                        setDataLoading(false);
                        setTheAsset([])
                    }
                })
            } else if (res.data.message === "jwt expired") {
                setStep("Token Expired");
            } else {
                setStep("default")
            }
        })
    }

    const closedraw = () => {
        setShowSubDraw(false)
        setStep("default")
        console.log("status", showSubDraw)
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


    const ConditionalSteps = () => {
        switch (step) {
            case "loading":
                return fullHeightDrawer(`Updating Fees For Path`)
            case "success":
                return <div className="assetDispText">
                    You Have Successfully Updated The Fee For A {theCurrency?.from_currency} To {theCurrency?.to_currency} TokenSwap Path. You Will Be Redirected To Your TokenSwap Paths Page
                </div>
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
            case "ChangeFees":
                return <>
                    <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        >

                            <div>
                                <p className="coinsdata" >{theCurrency?.from_currency} To {theCurrency?.to_currency}</p>
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
                                            About&nbsp;
                                        </span>
                                        <span className="crumbs" style={{ fontWeight: 700 }}>
                                            {"->"}&nbsp;
                                        </span>
                                        <span className="crumbSelected" style={{ fontWeight: 700, cursor: "pointer" }}>
                                            Change Fees
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
                        <p className="assettext">New Fixed Fee</p>
                        <input type="number" placeholder="$0.00" className="assetinput" value={fixedFee} onChange={(e) => setFixedFee(e.target.value)} />
                    </div>
                    <br />
                    <div className="assetfields">
                        <p className="assettext">New Variable Fee</p>
                        <input type="number" placeholder="0.00%" className="assetinput" value={tradeFee} onChange={(e) => setTradeFee(e.target.value)} />
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
            default:
                return (
                    <>
                        <div style={{ padding: "0px 30px", paddingTop: "30px" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            >

                                <div>
                                    <p className="coinsdata" >{theCurrency?.from_currency} To {theCurrency?.to_currency}</p>
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
                                            <span className="crumbSelected" style={{ fontWeight: 700 }}>
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
                        </div >
                        <div style={{ margin: "0px 30px" }}>
                            <p>What Would You Like To Do?</p>
                        </div>
                        <div className="boxdisp" onClick={() => setStep("ChangeFees")}>
                            Change Fees
                        </div>
                        <br />
                        <div className="boxdisp">
                            Remove Path
                        </div>
                    </>
                )
        }
    }






    return (
        <div>
            {ConditionalSteps()}
            <ToastContainer />
        </div>
    )
}

export default Actions