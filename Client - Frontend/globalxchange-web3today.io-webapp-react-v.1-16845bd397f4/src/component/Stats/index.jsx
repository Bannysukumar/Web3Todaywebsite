import React, { useContext, useEffect, useState } from "react";

import classNames from "./stats.module.scss";

//assets
import MainIco from "../../assets/mainico1.svg";
import { GlobalContex } from "../../globalContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Stats = () => {
  const { loginData, userProfile, stopCounter, userLoginHandler } =
    useContext(GlobalContex);
  const location = useLocation();
  const [appBalance, setAppBalance] = useState("");
  const [appBalanceLoading, setAppBalanceLoading] = useState(false);

  useEffect(() => {
    setAppBalanceLoading(true);
    console.log(userProfile, "userProfile stats");

    axios
      .get(
        `https://publications.apimachine.com/articleread/finalpoints?user_id=${userProfile?._id}&publication_id=638dd769b257b3715a8fbe07`
      )
      .then((response) => {
        console.log(response?.data?.updatedPoints, "app balance response");
        setAppBalance(response?.data?.updatedPoints);
        setAppBalanceLoading(false);
      })
      .catch((error) => {
        console.log(error?.message, "app balance error");
        setAppBalanceLoading(false);
      });
  }, [userProfile]);

  return (
    <div className={classNames.stats}>
      <div className={classNames.statsMain}>
        <div className={classNames.title}>
          <img src={MainIco} alt="MainIco" />
          <span>Web3Tokens (W3T)</span>
        </div>
        <div className={classNames.para}>
          Web3Tokens accumulate when you learn, share and build your Web3
          future. They are derived from your Web3 Score and can be cashed our
          for INR.
        </div>
        <div className={classNames.balanceContainer}>
          <span>Balance:</span>
          <span>
            {appBalanceLoading ? (
              <Skeleton width={80} height={25} />
            ) : appBalance ? (
              appBalance
            ) : (
              "0.00"
            )}
          </span>
        </div>
        <div className={classNames.goToApp}>
          <p style={{textAlign:"center"}}
            onClick={(e) => {
              // history.push("/register");
              window.open(`https://app.web3today.io`, "_blank");
            }}
          >
            Go&nbsp;To&nbsp;App
          </p>
        </div>
        <div
          className={classNames.loginBtn}
          onClick={(e) => {
            if (location.pathname.includes("/feed/article/") && loginData) {
              stopCounter();
              localStorage.clear();
              window.location.reload();
            } else {
              localStorage.clear();
              window.location.reload();
            }
            userLoginHandler();
          }}
        >
          <span className={classNames.loginBtnText}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
