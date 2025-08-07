import React, { useContext, useEffect, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import classNames from "./settingsModal.module.scss";

import { toast } from "react-toastify";

import appIconDefault from "../../static/images/icons/app_placeholder.png";
import { GlobalContex } from "../../globalContex";

function FilterCoins({
  onClose = () => {},
  onSuccess = () => {},

  setSelectedCoin,
  selectedFilter1,
  allApps,
  selectedApp,
  setSelectedApp,
  setShowCoinModal,
  vaults,
  getVaultData,
  getCoins,
  withBalance,
  setWithBalance,
}) {
  const { loginData } = useContext(GlobalContex);

  const [step, setStep] = useState("");
  const [pin, setPin] = useState("");
  const [query, setQuery] = useState("");
  const [vaultQuery, setVaultQuery] = useState("");

  let filteredApps = allApps
    ? allApps.filter((item) => {
        const lowquery = query.toLowerCase();
        return item.app_name.toLowerCase().indexOf(lowquery) >= 0;
      })
    : "";

  let filteredVaults = vaults
    ? vaults.filter((item) => {
        const lowquery = vaultQuery.toLowerCase();
        return (
          (item.coinName + item.coinSymbol).toLowerCase().indexOf(lowquery) >= 0
        );
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

  const conditionalLogo = () => {
    if (selectedFilter1 === "crypto") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={require("../../static/images/filterIcons/1.svg").default}
            alt=""
            // className={classNames.logo}
            width={60}
          />
          <div style={{ paddingLeft: "10px" }}>
            <div className="asset-name">CRYPTO</div>
            <div style={{ paddingLeft: "2px" }}>CURRENCIES</div>
          </div>
        </div>
      );
    } else if (selectedFilter1 === "forex") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={require("../../static/images/filterIcons/2.svg").default}
            alt=""
            // className={classNames.logo}
            width={60}
          />
          <div style={{ paddingLeft: "10px" }}>
            <div className="asset-name">FOREX</div>
            <div style={{ paddingLeft: "2px" }}>CURRENCIES</div>
          </div>
        </div>
      );
    } else if (selectedFilter1 === "abc") {
      return (
        <img
          src={require("../../static/images/filterIcons/3.svg").default}
          alt=""
          // className={classNames.logo}
          width={200}
        />
      );
    } else if (selectedFilter1 === "def") {
      return (
        <img
          src={require("../../static/images/filterIcons/4.svg").default}
          alt=""
          // className={classNames.logo}
          width={200}
        />
      );
    }
  };

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
        <div className={classNames.settingsCard1}>
          <div className={classNames.inCard}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "11fr 2fr",
                // justifyContent: "space-between",
                // padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  paddingLeft: "150px",
                }}
              >
                {conditionalLogo()}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeft: "1px solid #e7e7e780",
                  padding: "20px",
                }}
              >
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={withBalance}
                    onClick={(e) => {
                      setWithBalance(!withBalance);
                    }}
                  />
                  <span class="slider round"></span>
                </label>
                <div className="withbalance">
                  {withBalance ? "With Balance" : "All Vaults"}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#18191D",
                paddingBottom: "25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // padding: "20px 0px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 4fr 2fr",
                  border: "0.5px solid #E5E5E5",
                  borderWidth: "0.5px 0px 0.5px 0px",
                }}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search your Apps..."
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    height: "60px",
                    width: "250px",
                    fontSize: "18px",
                    fontWeight: "700",
                    padding: "0px 30px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    border: "0.5px solid #E5E5E5",
                    borderWidth: "0px 0.5px 0px 0.5px",
                    // padding: "7.5px 0px",
                    height: "60px",
                    width: 500,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ padding: "0px 10px" }}>
                    <img
                      src={
                        selectedApp.app_icon
                          ? selectedApp.app_icon
                          : appIconDefault
                      }
                      alt=""
                      width={40}
                      style={{
                        padding: "5px",
                        borderRadius: "20px",
                        border: "0.5px solid lightgray",
                        opacity: 1,
                      }}
                    />
                  </div>
                  {filteredApps
                    .filter((o) => o.app_name !== selectedApp.app_name)
                    .map((item, index) => {
                      if (index < 7) {
                        return (
                          <div
                            style={{ padding: "0px 10px", cursor: "pointer" }}
                            onClick={(e) => {
                              setSelectedApp(item);
                              getCoins(item);
                            }}
                          >
                            <img
                              src={
                                item.app_icon ? item.app_icon : appIconDefault
                              }
                              alt=""
                              width={40}
                              style={{
                                padding: "5px",
                                borderRadius: "20px",
                                border: "0.5px solid lightgray",
                                opacity:
                                  selectedApp.app_name === item.app_name
                                    ? 1
                                    : 0.4,
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                </div>
                <input
                  value={vaultQuery}
                  onChange={(e) => setVaultQuery(e.target.value)}
                  type="text"
                  placeholder="Search Your Vaults..."
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    height: "59px",
                    width: "250px",
                    fontSize: "18px",
                    fontWeight: "700",
                    padding: "0px 30px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "#EEEEEE",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 40px",
                width: "100%",
                marginTop: "-25px",
              }}
            >
              <div style={{ width: "170%" }}>Asset</div>
              <div style={{ textAlign: "left", width: "100%" }}>Balance</div>
              <div style={{ textAlign: "left", width: "70%" }}>Value</div>
            </div>
            <div
              style={{
                // padding: "0px 50px",
                overflowY: "scroll",
                height: "390px",
              }}
            >
              {filteredVaults.map((item) => {
                return (
                  <div
                    className="coin-card1"
                    onClick={(e) => {
                      setSelectedCoin(item);
                      getVaultData(item, selectedApp);
                      setShowCoinModal(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "0px",
                        width: "170%",
                      }}
                    >
                      <img src={item.coinImage} alt="" width={30} />
                      &nbsp;&nbsp;&nbsp;{item.coinName}
                    </div>
                    <div style={{ width: "100%", textAlign: "left" }}>
                      {item.coinValue}&nbsp;
                      <span style={{ fontSize: "12px", fontWeight: 400 }}>
                        {item.coinSymbol}
                      </span>
                    </div>
                    <div style={{ width: "70%", textAlign: "left" }}>
                      {item.coinValue_DC}{" "}
                      <span style={{ fontSize: "12px", fontWeight: 400 }}>
                        USD
                      </span>
                    </div>
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

export default FilterCoins;
