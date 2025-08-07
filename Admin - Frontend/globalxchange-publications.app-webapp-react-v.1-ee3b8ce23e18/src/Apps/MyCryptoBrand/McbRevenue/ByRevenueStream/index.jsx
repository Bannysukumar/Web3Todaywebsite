import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import "./revenueStream.scss";

import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import back from "../../../../static/images/icons/back.svg";
import close from "../../../../static/images/icons/close1.svg";

import tokenSwap from "../../../../static/images/revenueStreamIcons/tokenSwap.svg";
import moneyMarket from "../../../../static/images/revenueStreamIcons/moneyMarket.svg";
import externalWithdrawals from "../../../../static/images/revenueStreamIcons/externalWithdrawals.svg";
import otc from "../../../../static/images/revenueStreamIcons/otc.svg";
import bondArbitrage from "../../../../static/images/revenueStreamIcons/bondArbitrage.svg";
import terminal from "../../../../static/images/revenueStreamIcons/terminal.svg";
import marketsVerse from "../../../../static/images/revenueStreamIcons/marketsVerse.svg";
import eCommerce from "../../../../static/images/revenueStreamIcons/eCommerce.svg";
import p2pLoans from "../../../../static/images/revenueStreamIcons/p2pLoans.svg";

import withdrawImg from "../../../../static/images/revenueStreamIcons/withdraw.svg";
import depositImg from "../../../../static/images/revenueStreamIcons/deposit.svg";

const ByRevenueStream = () => {
  const { loginData, selectedBrandApp } = useContext(GlobalContex);
  const [crmData, setCrmData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [revenueByStreamData, setRevenueByStreamData] = useState([]);
  const [revenueByStreamData1, setRevenueByStreamData1] = useState([]);

  const [step, setStep] = useState(null);
  const [selectedRevenueStream, setSelectedRevenueStream] = useState(null);

  const [individualStreamData, setindividualStreamData] = useState([]);
  const [individualStreamData1, setindividualStreamData1] = useState([]);

  const [selectedVault, setSelectedVault] = useState([]);
  const [vaultTransactions, setVaultTransactions] = useState([]);

  const byRevenueStreamArr = [
    {
      streamName: "TokenSwap",
      streamIcon: tokenSwap,
      streamCode: "trade",
    },
    {
      streamName: "MoneyMarkets",
      streamIcon: moneyMarket,
      streamCode: "liquidIRD",
    },
    {
      streamName: "External Withdrawals",
      streamIcon: externalWithdrawals,
      streamCode: "withdraw",
    },
    {
      streamName: "OTC",
      streamIcon: otc,
      streamCode: "fund",
    },
    {
      streamName: "Bond Arbitrage",
      streamIcon: bondArbitrage,
      streamCode: "connectedBondSpread",
    },
    {
      streamName: "Terminal",
      streamIcon: terminal,
      streamCode: "terminal",
    },
    {
      streamName: "MarketsVerse",
      streamIcon: marketsVerse,
      streamCode: "investment",
    },
    {
      streamName: "E-Commerce",
      streamIcon: eCommerce,
      streamCode: "product",
    },
    {
      streamName: "P2P Loans",
      streamIcon: p2pLoans,
      streamCode: "bondCoinsIRD",
    },
    {
      streamName: "Bonds Fees (Outdated)",
      streamIcon: bondArbitrage,
      streamCode: "icedIRD",
    },
  ];

  useEffect(() => {
    setDataLoading(true);
    const endpoints = [
      `https://comms.globalxchange.io/coin/app/dividend/vault/earnings/analytics/get?app_code=${selectedBrandApp?.app_code}`,
      `https://comms.globalxchange.io/coin/app/dividend/vault/balances/get?app_code=${selectedBrandApp?.app_code}`,
    ];

    axios.all(endpoints.map((item) => axios.get(item))).then((res) => {
      setRevenueByStreamData(res[0].data?.perVaultType);
      setRevenueByStreamData1(res[1].data?.earningsVault);
      setDataLoading(false);
    });
  }, [selectedBrandApp]);

  useEffect(() => {
    setDataLoading(true);
    const endPoints1 = [
      `https://comms.globalxchange.io/coin/app/dividend/vault/balances/get?app_code=${selectedBrandApp?.app_code}`,
      `https://comms.globalxchange.io/coin/app/dividend/vault/earnings/analytics/get?app_code=${selectedBrandApp?.app_code}`,
    ];

    axios.all(endPoints1.map((item) => axios.get(item))).then((res) => {
      const found = res[0].data?.earningsVault.find(
        (o) => o.vaultName === selectedRevenueStream?.streamCode
      );
      if (found) {
        setindividualStreamData(found.coinVaults);
        const found1 = res[1].data?.perVaultType.find(
          (o) => o._id === selectedRevenueStream?.streamCode
        );
        if (found1) {
          setindividualStreamData1(found1.perCoin);
          setDataLoading(false);
        }
      }
    });
  }, [selectedRevenueStream]);

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/coin/app/dividend/vault/txns/get?app_code=${selectedBrandApp?.app_code}&source_txn_type=${selectedVault?.revenueCode}&coin=${selectedVault?.vaultSymbol}&skip=0&limit=100`
      )
      .then((res) => {
        setVaultTransactions(res.data?.txns);
        setDataLoading(false);
      });
  }, [selectedVault]);

  const getRevenueVaults = (item) => {
    if (revenueByStreamData) {
      const found = revenueByStreamData?.find((o) => o._id === item.streamCode);
      if (found) {
        return found?.coinsCount;
      } else {
        return 0;
      }
    }
  };

  const getRevenueTxns = (item) => {
    if (revenueByStreamData) {
      const found = revenueByStreamData?.find((o) => o._id === item.streamCode);
      if (found) {
        return found?.txnsCount;
      } else {
        return 0;
      }
    }
  };

  const getRevenueEarnings = (item) => {
    if (revenueByStreamData) {
      const found = revenueByStreamData?.find((o) => o._id === item.streamCode);
      if (found) {
        return found?.amount_usd.toFixed(2);
      } else {
        return 0;
      }
    }
  };

  const getRevenueBalance = (item) => {
    if (revenueByStreamData1) {
      const found = revenueByStreamData1?.find(
        (o) => o.vaultName === item.streamCode
      );
      if (found) {
        return found?.totalValueUSD.toFixed(2);
      } else {
        return 0;
      }
    }
  };

  const getVaultData = (item, type) => {
    if (individualStreamData1) {
      const found = individualStreamData1?.find(
        (o) => o._id === item.coinSymbol
      );

      if (found) {
        if (type === "transaction") {
          return found?.txnsCount;
        } else if (type === "allTimeEarning") {
          return found?.amount?.toFixed(5);
        } else if (type === "allTimeEarningUSD") {
          return found?.amount_usd?.toFixed(2);
        }
      } else {
        return 0;
      }
    }
  };

  const conditionalTxnType = (item) => {
    // console.log(item, "kwbedkwjefw");
    if (item === "Dividend Payout") {
      return "Dividend Payout";
    } else if (item === "App Admin Withdrawal") {
      return "App Owner";
    } else {
      return `${selectedVault?.revenueName} Revenue`;
    }
  };

  const defaultStep = () => {
    return (
      <>
        <div className="desktopWrapper">
          <div style={{ width: "100%" }}>
            <div
              className="listGrid"
              style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 0.2fr" }}
            >
              <div>Stream</div>
              <div>Vaults</div>
              <div>Transactions</div>
              <div>All Time Earnings</div>
              <div>Current Balance</div>
            </div>
          </div>
          <div
            style={{
              // display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              height: window.innerHeight - 175,
              overflowY: "scroll",
            }}
          >
            {!dataLoading ? (
              byRevenueStreamArr?.length > 0 ? (
                byRevenueStreamArr?.map((item) => {
                  return (
                    <div
                      onClick={(e) => {
                        setStep("step1");
                        setSelectedRevenueStream({
                          streamIcon: item.streamIcon,
                          streamName: item.streamName,
                          streamCode: item.streamCode,
                          transactions: getRevenueTxns(item),
                          alltimeEarning: getRevenueEarnings(item),
                          currentBalance: getRevenueBalance(item),
                        });
                      }}
                      className="listDataGrid"
                      style={{
                        gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 0.2fr",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item?.streamIcon}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          // className={classNames.icon}
                        />
                        <div style={{ paddingLeft: "15px" }}>
                          <div className="title">{item?.streamName} &nbsp;</div>
                          {/* <div className="subtitle">{item?.userData?.username}</div> */}
                        </div>
                      </div>

                      <div className="title">{getRevenueVaults(item)}</div>

                      <div className="title">{getRevenueTxns(item)}</div>

                      <div className="title">${getRevenueEarnings(item)}</div>

                      <div className="title">${getRevenueBalance(item)}</div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  No Records Found
                </div>
              )
            ) : (
              Array(10)
                .fill("")
                .map((item, i) => {
                  return (
                    <div
                      className="listDataGrid post"
                      style={{
                        width: "100%",
                        // height: "120px",
                        gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 0.2fr",
                        // borderBottom: "solid 0.5px #EEEEEE",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Skeleton
                          className="dp"
                          circle
                          width={50}
                          height={50}
                          style={{ marginRight: "20px" }}
                        />
                        <div className="userDetail">
                          <Skeleton width={100} />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Skeleton width={100} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Skeleton width={100} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Skeleton width={100} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Skeleton width={100} />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
        <div className="mobileWrapper mobileDefaultStep">
          <div style={{ overflowY: "scroll", height: "80vh" }}>
            <div
              className="listGridMobile"
              style={{
                gridTemplateColumns: "300px 200px 200px 200px 200px 100px",
              }}
            >
              <div>Stream</div>
              <div>Vaults</div>
              <div>Transactions</div>
              <div>All Time Earnings</div>
              <div>Current Balance</div>
            </div>
            <div
              style={{
                // display: "flex",
                fontWeight: 700,
                fontSize: "20px",
                // height: window.innerHeight - 175,
                // overflowY: "scroll",
              }}
            >
              {!dataLoading ? (
                byRevenueStreamArr?.length > 0 ? (
                  byRevenueStreamArr?.map((item) => {
                    return (
                      <div
                        onClick={(e) => {
                          setStep("step1");
                          setSelectedRevenueStream({
                            streamIcon: item.streamIcon,
                            streamName: item.streamName,
                            streamCode: item.streamCode,
                            transactions: getRevenueTxns(item),
                            alltimeEarning: getRevenueEarnings(item),
                            currentBalance: getRevenueBalance(item),
                          });
                        }}
                        className="listDataGridMobile"
                        style={{
                          gridTemplateColumns:
                            "300px 200px 200px 200px 200px 100px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={item?.streamIcon}
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            // className={classNames.icon}
                          />
                          <div style={{ paddingLeft: "15px" }}>
                            <div className="title">
                              {item?.streamName} &nbsp;
                            </div>
                            {/* <div className="subtitle">{item?.userData?.username}</div> */}
                          </div>
                        </div>

                        <div className="title">{getRevenueVaults(item)}</div>

                        <div className="title">{getRevenueTxns(item)}</div>

                        <div className="title">${getRevenueEarnings(item)}</div>

                        <div className="title">${getRevenueBalance(item)}</div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60vh",
                    }}
                  >
                    No Records Found
                  </div>
                )
              ) : (
                Array(10)
                  .fill("")
                  .map((item, i) => {
                    return (
                      <div
                        className="listDataGridMobile post"
                        style={{
                          width: "100%",
                          // height: "120px",
                          gridTemplateColumns: "300px 300px 300px 300px 200px",
                          // borderBottom: "solid 0.5px #EEEEEE",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Skeleton
                            className="dp"
                            circle
                            width={50}
                            height={50}
                            style={{ marginRight: "20px" }}
                          />
                          <div className="userDetail">
                            <Skeleton width={100} />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const stepOne = () => {
    return (
      <>
        <div className="desktopWrapper">
          <div
            className="listGrid stepOneTitle"
            style={{
              gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.15fr",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={(e) => {
                  setStep(null);
                  // setSelectedRevenueStream(null);
                }}
                className="backButton icon-imgs"
                style={{ marginRight: "22px" }}
              >
                <img src={back} alt="" />
              </div>

              <img
                src={selectedRevenueStream?.streamIcon}
                alt=""
                style={{ width: "26px", height: "30px" }}
              />
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  paddingLeft: "7px",
                }}
              >
                {selectedRevenueStream?.streamName}
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  {selectedRevenueStream?.transactions}
                </div>
                <div className="revSubtitle">Transactions</div>
              </div>
            </div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  ${selectedRevenueStream?.alltimeEarning}
                </div>
                <div className="revSubtitle">All Time Earnings</div>
              </div>
            </div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  ${selectedRevenueStream?.currentBalance}
                </div>
                <div className="revSubtitle">Balance</div>
              </div>
            </div>

            <div></div>
          </div>
          <div
            className="listGrid"
            style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.15fr" }}
          >
            <div>Revenue Vault</div>
            <div>Transactions</div>
            <div>All Time Earnings</div>
            <div>Current Balance</div>
          </div>

          <div
            style={{
              height: window.innerHeight - 300,
              overflowY: "scroll",
            }}
          >
            {!dataLoading
              ? individualStreamData.map((item) => {
                  return (
                    <div
                      onClick={(e) => {
                        setSelectedVault({
                          vaultIcon: item?.coinImage,
                          vaultName: item?.coinName,
                          vaultSymbol: item?.coinSymbol,
                          revenueIcon: selectedRevenueStream?.streamIcon,
                          revenueName: selectedRevenueStream?.streamName,
                          revenueCode: selectedRevenueStream?.streamCode,
                          transactions: individualStreamData1.find(
                            (o) => o.coin === item.coinSymbol
                          )?.txnsCount,
                          alltimeEarning: individualStreamData1
                            .find((o) => o.coin === item.coinSymbol)
                            ?.amount_usd?.toFixed(2),
                          currentBalance: item?.appCoinValueUSD?.toFixed(2),
                        });
                        setStep("step2");
                        // setSelectedVault(item);
                      }}
                      className="listDataGrid"
                      style={{
                        gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.15fr",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item?.coinImage}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          // className={classNames.icon}
                        />
                        <div style={{ paddingLeft: "15px" }}>
                          <div className="title">{item?.coinName} &nbsp;</div>
                          {/* <div className="subtitle">{item?.userData?.username}</div> */}
                        </div>
                      </div>

                      <div className="title">
                        {individualStreamData1.find(
                          (o) => o.coin === item.coinSymbol
                        )
                          ? individualStreamData1.find(
                              (o) => o.coin === item.coinSymbol
                            )?.txnsCount
                          : 0}
                      </div>
                      <div>
                        <div className="indTitle">
                          {individualStreamData1.find(
                            (o) => o.coin === item.coinSymbol
                          )
                            ? individualStreamData1
                                .find((o) => o.coin === item.coinSymbol)
                                .amount?.toFixed(5)
                            : "0.0000"}
                        </div>
                        <div className="indSubTitle">
                          ${" "}
                          {individualStreamData1.find(
                            (o) => o.coin === item.coinSymbol
                          )
                            ? individualStreamData1
                                .find((o) => o.coin === item.coinSymbol)
                                .amount_usd?.toFixed(2)
                            : "0.00"}
                        </div>
                      </div>

                      <div>
                        <div className="indTitle">
                          {item?.appCoinValue?.toFixed(5)}
                        </div>
                        <div className="indSubTitle">
                          ${item?.appCoinValueUSD?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })
              : Array(10)
                  .fill("")
                  .map((item, i) => {
                    return (
                      <div
                        className="listDataGrid post"
                        style={{
                          width: "100%",
                          // height: "120px",
                          gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.2fr",
                          // borderBottom: "solid 0.5px #EEEEEE",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Skeleton
                            className="dp"
                            circle
                            width={50}
                            height={50}
                            style={{ marginRight: "20px" }}
                          />
                          <div className="userDetail">
                            <Skeleton width={100} />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Skeleton width={100} />
                          <Skeleton width={50} height={10} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Skeleton width={100} />
                          <Skeleton width={50} height={10} />
                        </div>
                      </div>
                    );
                  })}
          </div>
        </div>
        <div className="mobileWrapper">
          <div
            className="listGrid stepOneTitle"
            style={{
              gridTemplateColumns: "300px 200px 200px 200px 100px",
              background: "white",
              overflowX: "scroll",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={(e) => {
                  setStep(null);
                  // setSelectedRevenueStream(null);
                }}
                className="backButton icon-imgs"
                style={{ marginRight: "22px" }}
              >
                <img src={back} alt="" />
              </div>

              <img
                src={selectedRevenueStream?.streamIcon}
                alt=""
                style={{ width: "26px", height: "30px" }}
              />
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  paddingLeft: "7px",
                }}
              >
                {selectedRevenueStream?.streamName}
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  {selectedRevenueStream?.transactions}
                </div>
                <div className="revSubtitle">Transactions</div>
              </div>
            </div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  ${selectedRevenueStream?.alltimeEarning}
                </div>
                <div className="revSubtitle">All Time Earnings</div>
              </div>
            </div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">
                  ${selectedRevenueStream?.currentBalance}
                </div>
                <div className="revSubtitle">Balance</div>
              </div>
            </div>

            <div></div>
          </div>
          <div
            style={{
              overflowY: "scroll",
              height: "80vh",
            }}
          >
            <div
              className="listGridMobile"
              style={{ gridTemplateColumns: "280px 200px 200px 200px 100px" }}
            >
              <div>Revenue Vault</div>
              <div>Transactions</div>
              <div>All Time Earnings</div>
              <div>Current Balance</div>
            </div>

            <div
              style={{
                // height: window.innerHeight - 300,
                // // overflowY: "scroll",
                // paddingBottom: "30vh",
                paddingBottom: "10vh",
              }}
            >
              {!dataLoading
                ? individualStreamData.map((item) => {
                    return (
                      <div
                        onClick={(e) => {
                          setSelectedVault({
                            vaultIcon: item?.coinImage,
                            vaultName: item?.coinName,
                            vaultSymbol: item?.coinSymbol,
                            revenueIcon: selectedRevenueStream?.streamIcon,
                            revenueName: selectedRevenueStream?.streamName,
                            revenueCode: selectedRevenueStream?.streamCode,
                            transactions: individualStreamData1.find(
                              (o) => o.coin === item.coinSymbol
                            )?.txnsCount,
                            alltimeEarning: individualStreamData1
                              .find((o) => o.coin === item.coinSymbol)
                              ?.amount_usd?.toFixed(2),
                            currentBalance: item?.appCoinValueUSD?.toFixed(2),
                          });
                          setStep("step2");
                          // setSelectedVault(item);
                        }}
                        className="listDataGridMobile"
                        style={{
                          gridTemplateColumns: "280px 200px 200px 200px 100px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={item?.coinImage}
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            // className={classNames.icon}
                          />
                          <div style={{ paddingLeft: "15px" }}>
                            <div className="title">{item?.coinName} &nbsp;</div>
                            {/* <div className="subtitle">{item?.userData?.username}</div> */}
                          </div>
                        </div>

                        <div className="title">
                          {individualStreamData1.find(
                            (o) => o.coin === item.coinSymbol
                          )
                            ? individualStreamData1.find(
                                (o) => o.coin === item.coinSymbol
                              )?.txnsCount
                            : 0}
                        </div>
                        <div>
                          <div className="indTitle">
                            {individualStreamData1.find(
                              (o) => o.coin === item.coinSymbol
                            )
                              ? individualStreamData1
                                  .find((o) => o.coin === item.coinSymbol)
                                  .amount?.toFixed(5)
                              : "0.0000"}
                          </div>
                          <div className="indSubTitle">
                            ${" "}
                            {individualStreamData1.find(
                              (o) => o.coin === item.coinSymbol
                            )
                              ? individualStreamData1
                                  .find((o) => o.coin === item.coinSymbol)
                                  .amount_usd?.toFixed(2)
                              : "0.00"}
                          </div>
                        </div>

                        <div>
                          <div className="indTitle">
                            {item?.appCoinValue?.toFixed(5)}
                          </div>
                          <div className="indSubTitle">
                            ${item?.appCoinValueUSD?.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : Array(10)
                    .fill("")
                    .map((item, i) => {
                      return (
                        <div
                          className="listDataGridMobile post"
                          style={{
                            width: "100%",
                            // height: "120px",
                            gridTemplateColumns:
                              "280px 200px 200px 200px 100px",
                            // borderBottom: "solid 0.5px #EEEEEE",
                          }}
                        >
                          <div
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
                              <Skeleton width={100} />
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Skeleton width={100} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Skeleton width={100} />
                            <Skeleton width={50} height={10} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Skeleton width={100} />
                            <Skeleton width={50} height={10} />
                          </div>
                        </div>
                      );
                    })}
            </div>
          </div>
        </div>
      </>
    );
  };

  const stepTwo = () => {
    return (
      <>
        <div className="desktopWrapper">
          <div
            className="stepOneTitle listGrid"
            style={{
              gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 0.2fr",
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={(e) => {
                  setStep("step1");
                  setSelectedVault(null);
                }}
                className="backButton icon-imgs"
                style={{ marginRight: "22px" }}
              >
                <img src={back} alt="" />
              </div>

              <img
                src={selectedVault?.vaultIcon}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              <div style={{ paddingLeft: "8px" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  {selectedVault?.vaultName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      paddingRight: "4px",
                    }}
                  >
                    For
                  </div>
                  <img
                    src={selectedVault?.revenueIcon}
                    alt=""
                    style={{ width: "12px", height: "12px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      paddingLeft: "4px",
                    }}
                  >
                    {selectedVault?.revenueName}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">{selectedVault?.transactions}</div>
                <div className="revSubtitle">Transactions</div>
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">${selectedVault?.alltimeEarning}</div>
                <div className="revSubtitle">All Time Earnings</div>
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">${selectedVault?.currentBalance}</div>
                <div className="revSubtitle">Balance</div>
              </div>
            </div>

            <div></div>
          </div>
          <div
            className="listGrid"
            style={{ gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 0.2fr" }}
          >
            <div>Transaction</div>
            <div>Transaction Type</div>
            <div>Credit</div>
            <div>Debit</div>
            <div>Balance</div>
          </div>
          <div
            style={{
              height: window.innerHeight - 300,
              overflowY: "scroll",
            }}
          >
            {!dataLoading
              ? vaultTransactions.map((item) => {
                  return (
                    <div
                      className="listDataGrid"
                      style={{
                        gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 0.2fr",
                      }}
                    >
                      <div className="reansactionWrapper">
                        <img
                          src={item.withdraw ? withdrawImg : depositImg}
                          alt=""
                          style={{ width: "35px", height: "35px" }}
                        />

                        <div className="transactionData">
                          <div>{item.withdraw ? "Withdrawal" : "Deposit"}</div>
                          <div>{new Date(item.date).toUTCString()}</div>
                        </div>
                      </div>
                      <div className="transactionData">
                        <div>{conditionalTxnType(item.txn_type)}</div>
                        <div>
                          {item.txn_type === "Dividend Payout"
                            ? item?.txn_metadata?.user_email
                            : item?.email}
                        </div>
                      </div>
                      <div style={{ color: "#50C7AD" }}>
                        {item.deposit ? item?.amount?.toFixed(4) : "0.0000"}
                      </div>
                      <div style={{ color: "#EA0F0F" }}>
                        {item.withdraw ? item?.amount?.toFixed(4) : "0.0000"}
                      </div>
                      <div style={{ fontWeight: 700 }}>
                        {item?.updated_balance?.toFixed(4)}
                      </div>
                    </div>
                  );
                })
              : Array(10)
                  .fill("")
                  .map((item, i) => {
                    return (
                      <div
                        className="listDataGrid post"
                        style={{
                          width: "100%",
                          // height: "120px",
                          gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 0.29fr",
                          // borderBottom: "solid 0.5px #EEEEEE",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Skeleton
                            className="dp"
                            circle
                            width={50}
                            height={50}
                            style={{ marginRight: "20px" }}
                          />
                          <div className="userDetail">
                            <Skeleton width={100} />
                            <Skeleton width={60} height={6} />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                          <Skeleton width={70} height={6} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Skeleton width={100} />
                        </div>
                      </div>
                    );
                  })}
          </div>
        </div>
        <div className="mobileWrapper">
          <div
            className="stepOneTitle listGrid"
            style={{
              gridTemplateColumns: "300px 200px 200px 200px 100px",
              background: "white",
              overflowX: "scroll",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={(e) => {
                  setStep("step1");
                  setSelectedVault(null);
                }}
                className="backButton icon-imgs"
                style={{ marginRight: "22px" }}
              >
                <img src={back} alt="" />
              </div>

              <img
                src={selectedVault?.vaultIcon}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              <div style={{ paddingLeft: "8px" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  {selectedVault?.vaultName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      paddingRight: "4px",
                    }}
                  >
                    For
                  </div>
                  <img
                    src={selectedVault?.revenueIcon}
                    alt=""
                    style={{ width: "12px", height: "12px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      paddingLeft: "4px",
                    }}
                  >
                    {selectedVault?.revenueName}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">{selectedVault?.transactions}</div>
                <div className="revSubtitle">Transactions</div>
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">${selectedVault?.alltimeEarning}</div>
                <div className="revSubtitle">All Time Earnings</div>
              </div>
            </div>

            <div className="revStats">
              <div style={{ textAlign: "right" }}>
                <div className="revTitle">${selectedVault?.currentBalance}</div>
                <div className="revSubtitle">Balance</div>
              </div>
            </div>
          </div>
          <div
            style={{
              overflowY: "scroll",
              height: "80vh",
            }}
          >
            <div
              className="listGridMobile"
              style={{
                gridTemplateColumns: "290px 200px 200px 200px 200px 100px",
              }}
            >
              <div>Transaction</div>
              <div>Transaction Type</div>
              <div>Credit</div>
              <div>Debit</div>
              <div>Balance</div>
            </div>
            <div
              style={{
                // height: window.innerHeight - 300,
                // overflowY: "scroll",
                paddingBottom: "10vh",
              }}
            >
              {!dataLoading
                ? vaultTransactions.map((item) => {
                    return (
                      <div
                        className="listDataGridMobile"
                        style={{
                          gridTemplateColumns:
                            "290px 200px 200px 200px 200px 100px",
                        }}
                      >
                        <div className="reansactionWrapper">
                          <img
                            src={item.withdraw ? withdrawImg : depositImg}
                            alt=""
                            style={{ width: "35px", height: "35px" }}
                          />

                          <div className="transactionData">
                            <div>
                              {item.withdraw ? "Withdrawal" : "Deposit"}
                            </div>
                            <div>{new Date(item.date).toUTCString()}</div>
                          </div>
                        </div>
                        <div className="transactionData">
                          <div>{conditionalTxnType(item.txn_type)}</div>
                          <div>
                            {item.txn_type === "Dividend Payout"
                              ? item?.txn_metadata?.user_email
                              : item?.email}
                          </div>
                        </div>
                        <div style={{ color: "#50C7AD" }}>
                          {item.deposit ? item?.amount?.toFixed(4) : "0.0000"}
                        </div>
                        <div style={{ color: "#EA0F0F" }}>
                          {item.withdraw ? item?.amount?.toFixed(4) : "0.0000"}
                        </div>
                        <div style={{ fontWeight: 700 }}>
                          {item?.updated_balance?.toFixed(4)}
                        </div>
                      </div>
                    );
                  })
                : Array(10)
                    .fill("")
                    .map((item, i) => {
                      return (
                        <div
                          className="listDataGrid post"
                          style={{
                            width: "100%",
                            // height: "120px",
                            gridTemplateColumns:
                              "290px 200px 200px 200px 200px 100px",
                            // borderBottom: "solid 0.5px #EEEEEE",
                          }}
                        >
                          <div
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
                              <Skeleton width={100} />
                              <Skeleton width={60} height={6} />
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Skeleton width={100} />
                            <Skeleton width={70} height={6} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Skeleton width={100} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Skeleton width={100} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Skeleton width={100} />
                          </div>
                        </div>
                      );
                    })}
            </div>
          </div>
        </div>
      </>
    );
  };

  const conditionalData = () => {
    switch (step) {
      case "step1":
        return stepOne();

      case "step2":
        return stepTwo();

      default:
        return defaultStep();
        break;
    }
  };

  return (
    <>
      <div>{conditionalData()}</div>
    </>
  );
};

export default ByRevenueStream;
