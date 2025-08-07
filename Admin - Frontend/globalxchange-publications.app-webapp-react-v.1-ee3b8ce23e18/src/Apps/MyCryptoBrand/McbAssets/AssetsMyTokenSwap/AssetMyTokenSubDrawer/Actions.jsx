import React, { useContext, useState, useEffect } from "react";
import "./subdrawer.scss"
import close from "../../../../../static/images/icons/close1.svg";
import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";

const Actions = ({ step, setStep, path, setPath }) => {
    const { showSubDraw, setShowSubDraw, theCurrency, setTheCurrency, selectedBrandApp , refreshCall , setRefreshCall } = useContext(GlobalContex);
    const [fixedFee, setFixedFee] = useState("")
    const [tradeFee, setTradeFee] = useState("")

    useEffect(() => {
        setStep("About");
        setPath(["About"]);
    }, [showSubDraw]);


    const openloader = () => {
        setStep("loading")
        let body = {
            email: selectedBrandApp?.created_by,
            token: localStorage.getItem("TokenId"),
            app_code: selectedBrandApp?.app_code,
            path_id: theCurrency.path_id,
            fixed_fee: fixedFee,
            trade_fee: tradeFee
        }
        console.log("body --> ", JSON.stringify(body))
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
                                <p className="coinsdata" >{theCurrency?.to_currency} To {theCurrency?.from_currency}</p>
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
                                    <p className="coinsdata" >{theCurrency?.to_currency} To {theCurrency?.from_currency}</p>
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
        </div>
    )
}

export default Actions