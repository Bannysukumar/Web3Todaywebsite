import React, { useContext, useEffect, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import classNames from "./settingsModal.module.scss";

import { toast } from "react-toastify";

import userIcon from "../../static/images/icons/user.svg";
import affilIcon from "../../static/images/icons/affiliate.svg";
import bondIcon from "../../static/images/icons/bondIcon.svg";
import appIcon from "../../static/images/icons/app.svg";

import { GlobalContex } from "../../globalContex";

function FilterApps({
  onClose = () => {},
  onSuccess = () => {},
  logoParam,
  allCoins,
  selectedCoin,
  setSelectedCoin,
  showAppModal,
  setShowAppModal,
  openCoinFilter,
  setOpenCoinFilter,
  selectedFilter1,
  setSelectedFilter1,
  allApps,
  setAllApps,
  selectedApp,
  setSelectedApp,
  getCoins,
}) {
  const { loginData } = useContext(GlobalContex);

  const [step, setStep] = useState("");
  const [pin, setPin] = useState("");
  const [query, setQuery] = useState("");

  const filters = [
    {
      name: "User",
      icon: userIcon,
    },
    {
      name: "Affiliate",
      icon: affilIcon,
    },
    {
      name: "Bond Offering",
      icon: bondIcon,
    },
    {
      name: "Bond Contract",
      icon: bondIcon,
    },
    {
      name: "Bond",
      icon: bondIcon,
    },
    {
      name: "App",
      icon: appIcon,
    },
  ];

  useEffect(() => {
    console.log(allApps, "kjbwedkjwebf");
  }, []);

  let filteredApps = allApps
    ? allApps.filter((item) => {
        const lowquery = query.toLowerCase();
        return item?.app_name.toLowerCase().indexOf(lowquery) >= 0;
      })
    : "";

  useEffect(() => {
    if (pin === "9605") {
      setStep("AdminBankers");
    } else if (pin.length === 4) {
      toast.error("Invalid Pin");
      setPin("");
    }
  }, [pin]);

  return (
    <>
      <div className={classNames.settingsModal}>
        <div
          className={classNames.overlayClose}
          onClick={() => {
            try {
              onClose();
            } catch (error) {}
          }}
        />
        <div className={classNames.settingsCard}>
          <div className={classNames.inCard}>
            {/* <img
              src={logoParam || FULL_LOGO}
              alt=""
              className={classNames.logo}
            /> */}
            <div style={{ padding: "20px 50px" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#18191D",
                  paddingBottom: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "50px",
                }}
              >
                Select One Of Your Apps
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search Currencies..."
                style={{
                  border: "0.5px solid #E5E5E5",
                  borderRadius: "15px",
                  height: "60px",
                  width: "100%",
                  padding: "0px 30px",
                }}
              />
            </div>

            <div
              style={{
                padding: "0px 50px",
                overflowY: "scroll",
                // height: "450px",
                height: "350px",
              }}
            >
              {filteredApps?.map((item) => {
                return (
                  <div
                    className="coin-card"
                    style={{ padding: "0px", paddingLeft: "30px" }}
                    onClick={(e) => {
                      setSelectedApp(item);
                      // setSelectedCoin(item);
                      setShowAppModal(false);
                      getCoins(item);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // paddingLeft: "20px",
                      }}
                    >
                      <img src={item.app_icon} alt="" width={30} />
                      &nbsp;&nbsp;&nbsp;{item?.app_name}
                    </div>
                    {selectedApp?.app_name === item?.app_name ? (
                      <div
                        style={{
                          background: "#18191D",
                          borderRadius: "0px 20px 20px 0px",
                          height: "100%",
                          // marginLeft: "-70px",
                        }}
                      >
                        &nbsp; &nbsp;
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className={classNames.footerBtns}>
            <div
              className={classNames.btnSettings}
              onClick={() => {
                // setSelectedCoin(null);
                setFilter1(false);
                setSelectedFilter1(null);
              }}
            >
              <span>Clear Filter</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default FilterApps;
