import React, { useContext, useEffect } from "react";
import "./subdrawer.scss";
import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import defaultImg from "../../../../../static/images/icons/app_placeholder.png";
import { calcLength } from "framer-motion";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import lock from "../../../../../static/images/icons/lock.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { click } from "@testing-library/user-event/dist/click";

const Actions = ({ step, setStep }) => {
    const { showSubDraw, setShowSubDraw, theCurrency, setTheCurrency, selectedBrandApp, selectedSubs,
        setSelectedSubs, bankerEmail, loginData } = useContext(GlobalContex);
    const [payCurrency, setPayCurrency] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const [path, setPath] = useState(["Actions"])


    useEffect(() => {
        setStep("default");
        setPath(["Actions"]);
    }, []);

    const closedraw = () => {
        setShowSubDraw(false)
        setStep("default")
        console.log("status", showSubDraw)
        setPath(["Actions"])
    }

    let thedisp

    if (step === "loading" || step === "success") {
        thedisp = "none"
    } else {
        thedisp = ""
    }

    // console.log("thedrawer-subs", selectedSubs)



    // "Buy License Via Monthly Subscription",
    // "Buy License Via Annual Subscription",
    // "Buy License Via Lifetime Subscription",
    // "Buy License Via Staking"


    const handleBreadcrumbClick = (clickedStep) => {
        console.log(clickedStep, "theclicked")
        if (clickedStep === "Actions") {
            setStep("default")
            setPath(["Actions"])
        }
        if (clickedStep === "Select App") {
            setStep("Select App")
            setPath(["Actions", "Select App"])
        }
        // const foundStepIndex = path.findIndex((o) => o === clickedStep);
        // const tempPath = path;
        // tempPath.splice(foundStepIndex + 1, tempPath.length);
        // setPath([...tempPath]);
        // console.log(path, "lwndwed");
    };

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

    const currenciesData = () => {
        setDataLoading(true)
        setStep("Select Asset")
        setPath([...path, "Select Asset"])
        let body = {
            app_code: selectedSubs?.app_code,
            email: bankerEmail,
            post_app_prices: true,
            with_balances: true,
            orderby_dsc: true,
        }
        axios
            .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, body)
            .then((res) => {
                setDataLoading(false);
                if (res.data.status) {
                    console.log(res.data, "paycurrency-data");
                    setPayCurrency(res.data.coins_data)
                    // let data = res.data.users;
                    // let output = data.slice(0, 30);
                    // setSubscriptionData(res.data.products);
                }
            });
    }

    const fullHeightDrawer = (message) => {
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
                    {message ? message : "Updating Brand list"}
                </div>
            </div>
        );
    }


    const paycoin = (e) => {
        let body = {
            email: bankerEmail,
            token: loginData.idToken,
            product_id: selectedSubs?.product_id,
            billing_method: "monthly",
            pay_with_coin: e.currentTarget.id,
            app_code: selectedSubs?.app_code,
            profile_id: payCurrency?.profile_id
        }
        console.log("paycoin-data ", JSON.stringify(body))
        setStep("loading")
        axios.post("https://comms.globalxchange.io/gxb/product/buy", body).then(res => {
            setPath(["Actions"])
            if (res.data.status) {
                setStep("success")
                setTimeout(() => {
                    setShowSubDraw(false)
                    setStep("default")
                }, 1000);
            } else {
                setStep("default")
                toast.info(res.data.message)
            }
        })
    }

    const conditionalSteps = () => {
        let selectOption = [
            {
                name: "Buy License Via Monthly Subscription",
                enabled: selectedSubs?.monthly
            },
            {
                name: "Buy License Via Annual Subscription",
                enabled: selectedSubs?.annual
            },
            {
                name: "Buy License Via Lifetime Subscription",
                enabled: selectedSubs?.lifetime
            },
            {
                name: "Buy License Via Staking",
                enabled: selectedSubs?.staking_allowed
            }
        ]
        switch (step) {
            case "Select App":
                return <>
                    <div style={{ margin: "0px 30px" }}>
                        <p>Which App Are You Paying From?</p>
                    </div>
                    <div className="scrollheight">
                        <div className="boxdisp" onClick={currenciesData}>
                            {selectedSubs?.client_app}
                        </div>
                    </div>
                </>
            case "Select Asset":
                return <>
                    <div style={{ margin: "0px 30px" }}>
                        <p>Which App Are You Paying From?</p>
                    </div>
                    <div className="scrollheight">
                        {!dataLoading ?
                            payCurrency.length > 0 ? (
                                payCurrency.map((item) => {
                                    return (
                                        <>
                                            <div className="boxdisp boxcurrency" id={item.coinSymbol} onClick={paycoin}>
                                                <div className="boxcurrency">
                                                    <img src={item.coinImage} alt="currency-image" height="30px" width="30px" />
                                                    <p className="paytext">{item.coinName}</p>
                                                </div>
                                                <div>
                                                    <p className="payprice">{item.coinValue}</p>
                                                </div>
                                            </div>
                                            <br />
                                        </>
                                    )
                                })
                            )
                                : (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: window.innerHeight - 375,
                                        }}
                                    >
                                        No Coins Found
                                    </div>
                                )

                            : Array(4).fill("").map((item) => {
                                return (
                                    <>
                                        <div className="boxdisp boxcurrency">
                                            <div className="boxcurrency">
                                                <Skeleton
                                                    className="dp"
                                                    circle
                                                    width={30}
                                                    height={30}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                <Skeleton width={100} />
                                            </div>
                                            <div>
                                                <Skeleton width={100} />
                                            </div>
                                        </div>
                                        <br />
                                    </>
                                )
                            })
                        }
                    </div>

                </>
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
            case "loading":
                return fullHeightDrawer(`Buying ${selectedSubs?.product_name}`)
            case "success":
                return <div className="assetDispText" style={{ display: "table-cell", verticalAlign: "middle" }}>
                    You Have Successfully Bought Subscription for <span style={{ fontWeight: 700 }}>{selectedSubs?.product_name}</span> . You Will Be Redirected Back To The GXT MarketPlace.
                </div>
            default:
                return <>
                    <div style={{ margin: "0px 30px" }}>
                        <p>What Would You Like To Do?</p>
                    </div>
                    <div className="scrollheight">
                        {selectOption.map((item) => {
                            return (
                                <>
                                    <div className="boxdisp"
                                        id={item.name}
                                        onClick={item.name === "Buy License Via Monthly Subscription" ? () => (setStep("Select App"), setPath([...path, "Select App"]))
                                            : ""}
                                        style={{ opacity: item.enabled ? 1 : 0.3 }}
                                    >
                                        {item.name}
                                    </div>
                                    <br />
                                </>
                            )
                        })}
                    </div>
                </>
        }
    }



    return (
        <>
            <div style={{ padding: "0px 30px", paddingTop: "30px", display: thedisp }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                >

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            <img
                                src={selectedSubs.product_icon ? selectedSubs.product_icon : defaultImg}
                                alt=""
                                style={{
                                    borderRadius: "50%",
                                    width: "45px",
                                    height: "45px",
                                }}
                            // className={classNames.icon}
                            />
                        </div>
                        <div style={{ paddingLeft: "7px" }}>
                            <p className="subsdata">{selectedSubs.product_name}</p>
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
                                    {path.map((item, index) => {
                                        return (
                                            <>
                                                {index !== 0 ? <span>&nbsp;{`->`}&nbsp;</span> : ""}
                                                <span className={
                                                    index === path.length - 1 ? "crumbSelected" : "crumbs"
                                                }
                                                    onClick={(e) => handleBreadcrumbClick(item)}>
                                                    {item}
                                                </span>
                                            </>
                                        )
                                    })}
                                </div>
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
                            style={{
                                marginLeft: "10px",
                            }}
                            onClick={closedraw}
                        >
                            <img src={close} alt="" />
                        </div>
                    </div>
                </div>
            </div >
            <br />
            {conditionalSteps()}
            <ToastContainer />
        </>
    )

}

export default Actions