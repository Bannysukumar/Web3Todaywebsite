import React from "react";
import { useState } from "react";
// import NavBar from "../../../../global-dashboard-components/src/globalComponents/NavBar";
import Skeleton from "react-loading-skeleton";
import "./vaults.scss";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { GlobalContex } from "../../globalContext";
import FilterCoins from "./FilterCoins";
import FilterApps from "./FilterApps";
import { useRef } from "react";
import NavBar from "../NavBar";

const VaultPage = () => {
  const { bankerEmail } = useContext(GlobalContex);
  const tabs = ["All", "Active", "Expired", "Redeemed"];
  const listInnerRef = useRef();
  const [tabSelected, setTabSelected] = useState("All");
  const [selectedFilter1, setSelectedFilter1] = useState("crypto");

  const [allApps, setAllApps] = useState([]);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [vaults, setVaults] = useState([]);

  const [vaultData, setVaultData] = useState(null);
  const [vaultDataLoading, setVaultDataLoading] = useState(false);

  const [skipState, setSkipState] = useState(0);
  const [countState, setCountState] = useState(0);
  const [endOfdata, setEndOfData] = useState(false);
  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const [noTxns, setNoTxns] = useState(false);
  const [txnData, setTxnData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [withBalance, setWithBalance] = useState(true);

  const FormatNumber = (value, prec) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: prec,
      minimumFractionDigits: prec,
    }).format(isNaN(value) ? 0 : value);
  };

  //Vault Values, All Apps & All Coins

  useEffect(() => {
    if (selectedApp) {
      getCoins(selectedApp);
    }
  }, [withBalance]);

  const getApps = () => {
    setDataLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/gxb/apps/registered/user?email=${bankerEmail}`
      )
      .then((res) => {
        // console.log(res.data, "kqjbdkjewd");
        setAllApps(res.data.userApps);
        setSelectedApp({
          app_code: "bankerapp",
          app_icon:
            "https://drivetest.globalxchange.io/gxsharepublic/?full_link=kamal.brain.stream/9aaf078edbeaf4e7c2339f654da23d89",
          app_name: "Banker",
          profile_id: "banku1449a147d6f77t1602030128183",
        });
        getCoins({
          app_code: "bankerapp",
          app_icon:
            "https://drivetest.globalxchange.io/gxsharepublic/?full_link=kamal.brain.stream/9aaf078edbeaf4e7c2339f654da23d89",
          app_name: "Banker",
          profile_id: "banku1449a147d6f77t1602030128183",
        });
      });
  };
  const getCoins = (app) => {
    setDataLoading(true);
    axios
      .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, {
        app_code: app?.app_code,
        email: bankerEmail,
        type: selectedFilter1 === "crypto" ? "crypto" : "fiat",
        displayCurrency: "",
        // post_app_prices: true,
        with_balances: withBalance,
      })
      .then((res) => {
        if (res.data.status) {
          setVaults(res.data.coins_data);
          setSelectedCoin(res?.data?.coins_data[0]);
          getVaultData(res?.data?.coins_data[0], app);
        }
      });
  };
  const getVaultData = (coin, app) => {
    setDataLoading(true);
    axios
      .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, {
        app_code: app?.app_code,
        email: bankerEmail,
        // type: selectedFilter1 === "crypto" ? "crypto" : "fiat",
        displayCurrency: "",
        // post_app_prices: true,
        include_coins: [coin?.coinSymbol],
      })
      .then((res) => {
        // console.log(res.data.coins_data[0], "hwefwe");
        setVaultData(res.data.coins_data[0]);
        getTxns(coin, app);
      });
  };

  const getTxns = (coin, app) => {
    setDataLoading(true);
    // console.log(coin, "kwjbdkwe");
    if (coin !== null) {
      setTxnData([]);
      axios
        .post(`https://comms.globalxchange.io/coin/vault/service/txns/get`, {
          app_code: app.app_code,
          email: bankerEmail,
          coin: conditionalCoin(coin),
        })
        .then((res) => {
          if (res.data?.txns?.length > 0) {
            setEndOfData(false);
            setTxnData([...res.data.txns]);
            setDataLoading(false);
            setSkipState(res.data.skip);
            setCountState(res.data.count);
            setNoTxns(false);
          } else {
            setDataLoading(false);
            setEndOfData(true);
            setNoTxns(true);
          }
        });
    }
  };

  const getNewTxns = () => {
    setMoreDataLoading(true);
    console.log(
      skipState,
      countState,
      Number(skipState) + Number(countState),
      "ndkjwblcwbelc"
    );
    axios
      .post(`https://comms.globalxchange.io/coin/vault/service/txns/get`, {
        app_code: selectedApp.app_code,
        email: bankerEmail,
        coin: selectedCoin.coinSymbol,
        skip: Number(skipState) + Number(countState),
      })
      .then((res) => {
        if (res.data.count === 0) {
          setEndOfData(true);
        }
        setTxnData([...txnData, ...res.data.txns]);
        setMoreDataLoading(false);
        setDataLoading(false);
        console.log(res.data, "qkdbwkdbw");
        setSkipState(res.data.skip);
        setCountState(res.data.count);
      });
  };

  const fetchVaultData = () => {
    setDataLoading(true);
    getApps();
  };

  useEffect(() => {
    fetchVaultData();
  }, [bankerEmail, selectedFilter1]);

  //Txns

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // console.log("reached bottom", scrollTop, clientHeight, scrollHeight);
      if (Math.trunc(scrollTop) + clientHeight === scrollHeight) {
        if (!endOfdata && !moreDataLoading) {
          console.log(skipState, countState, "reached bottom");
          getNewTxns();
        }
      }
    }
  };

  const conditionalCoin = (coin) => {
    if (selectedFilter1 === "forex" && selectedCoin !== null) {
      if (coin) {
        return coin.coinSymbol;
      } else {
        return "USD";
      }
    } else {
      if (coin) {
        return coin.coinSymbol;
      } else {
        return "BTC";
      }
    }
  };

  const ExtraFilter = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "250px",
          padding: "0px 20px",
          paddingRight: "20px",
        }}
      >
        <img
          onClick={(e) => setSelectedFilter1("crypto")}
          className="filter1"
          style={{
            cursor: "pointer",
            opacity: selectedFilter1 === "crypto" ? 1 : 0.4,
          }}
          src={require("../../static/images/filterIcons/1.svg").default}
          alt=""
          width={25}
        />
        <img
          onClick={(e) => setSelectedFilter1("forex")}
          className="filter1"
          style={{
            cursor: "pointer",
            opacity: selectedFilter1 === "forex" ? 1 : 0.4,
          }}
          src={require("../../static/images/filterIcons/2.svg").default}
          alt=""
          width={25}
        />
        <img
          className="filter1"
          style={{
            cursor: "pointer",
            opacity: selectedFilter1 === "abc" ? 1 : 0.4,
          }}
          src={require("../../static/images/filterIcons/3.svg").default}
          alt=""
          width={25}
        />
        <img
          className="filter1"
          style={{
            cursor: "pointer",
            opacity: selectedFilter1 === "abc" ? 1 : 0.4,
          }}
          src={require("../../static/images/filterIcons/4.svg").default}
          alt=""
          width={20}
        />
      </div>
    );
  };

  return (
    <>
      <div>
        <NavBar
          tabs={tabs}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
          enabledFilters={[true, true, false, false, false]}
          customFilters={<ExtraFilter />}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px",
            height: "100px",
          }}
        >
          {!dataLoading ? (
            vaultData !== null && vaultData !== undefined ? (
              <div>
                <div className="vault-label">{vaultData?.coinName} Vault</div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <div className="vault-price">
                    {vaultData
                      ? selectedFilter1 === "forex"
                        ? vaultData?.coinValue?.toFixed(2)
                        : vaultData?.coinValue?.toFixed(4)
                      : ""}
                  </div>
                  <div className="vault-price-subtitle">
                    &nbsp;${vaultData ? vaultData.coinValue_DC : "0.000"}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="vault-label">{vaultData?.coinName} Vault</div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <div className="vault-price">
                    {selectedFilter1 === "forex" ? "0.00" : "0.0000"}
                  </div>
                  <div className="vault-price-subtitle">&nbsp;$0.00</div>
                </div>
              </div>
            )
          ) : (
            <div className="userDetail">
              <Skeleton width={100} style={{ height: "20px" }} />
              <div style={{ display: "flex", alignItems: "end" }}>
                <Skeleton width={150} style={{ height: "20px" }} />
                <Skeleton width={80} style={{ marginLeft: "5px" }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="dropdown-selector"
              onClick={(e) => setShowAppModal(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={selectedApp?.app_icon} alt="" width={15} />{" "}
                &nbsp;&nbsp;
                <div>{selectedApp?.app_name}</div>
              </div>

              <img
                src={
                  require("../../static/images/icons/caret-down.svg").default
                }
                alt=""
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div
              className="dropdown-selector"
              onClick={(e) => {
                if (!dataLoading) {
                  setShowCoinModal(true);
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: dataLoading ? 0.2 : 1,
                }}
              >
                <img src={selectedCoin?.coinImage} alt="" width={17} />{" "}
                &nbsp;&nbsp;
                <div>{selectedCoin?.coinName}</div>
              </div>
              <img
                src={
                  require("../../static/images/icons/caret-down.svg").default
                }
                alt=""
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <button className="deposit-button">Deposit</button>
            &nbsp;&nbsp;&nbsp;
            <button className="withdraw-button">Withdraw</button>
          </div>
        </div>
        <div className="vaultsGrid">
          <div>Transactions</div>
          <div>Credit</div>
          <div>Debit</div>
          <div>Balance</div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            height: window.innerHeight - 265,
          }}
          onScroll={onScroll}
          ref={listInnerRef}
        >
          {!dataLoading ? (
            txnData?.length > 0 ? (
              txnData.map((item, index) => {
                return (
                  <>
                    <div className="vaultsUsersGrid">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          {item.deposit ? (
                            <img
                              className="imgshadow"
                              src={
                                require("../../static/images/icons/withdraw.svg")
                                  .default
                              }
                              alt=""
                            />
                          ) : (
                            <img
                              className="imgshadow"
                              src={
                                require("../../static/images/icons/deposit.svg")
                                  .default
                              }
                              alt=""
                            />
                          )}
                        </div>
                        <div style={{ paddingLeft: "17px" }}>
                          <div
                            style={{
                              // fontSize: "13px",
                              fontWeight: "700",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div className="title">
                              {item.txn_metadata?.transfer_for
                                ? item.txn_metadata.transfer_for
                                : `${selectedCoin?.coinName} ${
                                    item.deposit ? "Deposit" : "Withdraw"
                                  }`}
                            </div>
                            <div
                              style={{ display: "flex", paddingLeft: "20px" }}
                            >
                              <div className="notes">Deposit</div>
                              <div style={{ paddingLeft: "10px" }}>
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={
                                    require("../../static/images/icons/edit.svg")
                                      .default
                                  }
                                  onMouseOver={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/edit_hover.svg").default)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/edit.svg").default)
                                  }
                                  alt=""
                                />
                              </div>
                              <div style={{ paddingLeft: "10px" }}>
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={
                                    require("../../static/images/icons/arrow.svg")
                                      .default
                                  }
                                  onMouseOver={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/arrow_hover.svg").default)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/arrow.svg").default)
                                  }
                                  alt=""
                                />
                              </div>
                              <div style={{ paddingLeft: "10px" }}>
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={
                                    require("../../static/images/icons/chat.svg")
                                      .default
                                  }
                                  onMouseOver={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/chat_hover.svg").default)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.src =
                                      require("../../static/images/icons/chat.svg").default)
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="subtitle"
                            style={{
                              fontSize: "10px",
                              fontWeight: 400,
                              textAlign: "left",
                            }}
                          >
                            {new Date(item.date).toUTCString()}
                          </div>
                        </div>
                      </div>
                      <div
                        className="title"
                        style={{
                          color: "#50C7AD",
                        }}
                      >
                        {item.deposit ? FormatNumber(item.amount, 4) : "0.0000"}
                      </div>
                      <div className="title" style={{ color: "#EA0F0F" }}>
                        {item.withdraw
                          ? FormatNumber(item.amount, 4)
                          : "0.0000"}
                      </div>
                      <div
                        className="title"
                        style={{
                          textAlign: "right",
                          color: "#18191D",
                          fontWeight: 700,
                        }}
                      >
                        {FormatNumber(item.updated_balance, 4)}
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  There are no transactions
                </div>
              </div>
            )
          ) : (
            Array(10)
              .fill("")
              .map((item, i) => {
                return (
                  <div
                    className="vaultsUsersGrid post"
                    style={{
                      width: "100%",
                      borderBottom: "solid 0.5px #EEEEEE",
                    }}
                  >
                    <div
                      className="user"
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Skeleton
                        className="dp"
                        circle
                        width={50}
                        height={50}
                        style={{ marginRight: "20px" }}
                      />
                      <div className="userDetail">
                        <Skeleton
                          width={250}
                          style={{ marginBottom: "10px" }}
                        />
                        <Skeleton width={180} />
                      </div>
                    </div>
                    <div>
                      <Skeleton width={120} />
                    </div>
                    <div>
                      <Skeleton width={120} />
                    </div>
                    <div>
                      <Skeleton width={120} />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
      {showAppModal ? (
        <FilterApps
          onClose={() => setShowAppModal(false)}
          onSuccess={() => setShowAppModal(false)}
          showAppModal={showAppModal}
          setShowAppModal={setShowAppModal}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedFilter1={selectedFilter1}
          setSelectedFilter1={setSelectedFilter1}
          allApps={allApps}
          setAllApps={setAllApps}
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          getCoins={getCoins}
        />
      ) : (
        ""
      )}
      {showCoinModal ? (
        <FilterCoins
          onClose={() => setShowCoinModal(false)}
          onSuccess={() => setShowCoinModal(false)}
          showCoinModal={showCoinModal}
          setShowCoinModal={setShowCoinModal}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedFilter1={selectedFilter1}
          setSelectedFilter1={setSelectedFilter1}
          allApps={allApps}
          setAllApps={setAllApps}
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          vaults={vaults}
          setVaults={setVaults}
          getVaultData={getVaultData}
          getApps={getApps}
          getCoins={getCoins}
          withBalance={withBalance}
          setWithBalance={setWithBalance}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default VaultPage;
