import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./crypto.module.scss";
import "./list.scss";

const Crypto = () => {
  const [allData, setAllData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setDataLoading(true);
    axios
      .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, {
        app_code: "web3today",
        type: "crypto",
        displayCurrency: "INR",
      })
      .then(({ data }) => {
        console.log(data, "kjwbdkjwed");
        setAllData(data.coins_data);
        setDataLoading(false);
      });
  }, []);

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Asset</div>
        <div>Price</div>
        <div>24 Hr Change</div>
        <div>Market Cap</div>
        <div>Trading Volume</div>
        <div style={{ textAlign: "right" }}>Supply</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        // onClick={(e) => {
        //   setBondSelected(bond);
        //   setShowSubDraw(true);
        // }}
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item?.coinImage}
            alt=""
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
            // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">{item?.coinName}</div>
          </div>
        </div>
        <div className={styles.valueStyle}>₹{item?.price.INR.toFixed(2)}</div>
        <div
          className={styles.valueStyle}
          style={{ color: item?._24hrchange_priceDC > 0 ? "green" : "red" }}
        >
          {item?._24hrchange_priceDC > 0 ? "+" : "-"}₹
          {item?._24hrchange_priceDC.toFixed(2)}&nbsp;(
          {item?._24hrchange?.toFixed(2)}%)
        </div>
        <div className={styles.valueStyle}>₹{item?.mkt_cap_DC?.toFixed(2)}</div>
        <div className={styles.valueStyle}>
          ₹{item?.volume24hr_DC?.toFixed(2)}
        </div>
        <div
          className={styles.valueStyle}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          {item?.total_supply?.toFixed(2)}&nbsp;{item?.coinSymbol}
        </div>

        {/* 
        <div>
          <div className="title">
            {FormatCurrency(
              bond?.coinsData?.[0]?.bondCost,
              bond?.coinsData?.[0]?.coin
            )}{" "}
            {bond?.coinsData?.[0]?.coin}&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatCurrency(
                    bond?.coinsData?.[0]?.bondCost,
                    bond?.coinsData?.[0]?.coin
                  )} ${bond?.coinsData?.[0]?.coin}`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            ${FormatCurrency(0)}&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`$${FormatCurrency(0)}`);
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>

        <div>
          <div className="title">
            {FormatNumber(bond.months, 0)} Months &nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatNumber(bond.months, 1)} Months`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            {bond?.days} Days &nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${bond?.days} Days`);
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div>
          <div className="title">
            {FormatNumber(bond?.daily_interest_rate, 2)}
            %&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatNumber(bond?.daily_interest_rate, 2)} %`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            ${FormatCurrency(bond?.coinsData?.[0]?.perDayEarnings)}
            &nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `$${FormatNumber(bond?.daily_interest_rate, 2)}`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div>
          <div className="title">
            {FormatNumber(bond?.monthly_interest_rate, 2)}
            %&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatNumber(bond?.monthly_interest_rate, 2)} %`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            ${FormatCurrency(bond?.coinsData?.[0]?.monthlyEarnings)}
            &nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `$${FormatCurrency(bond?.coinsData?.[0]?.monthlyEarnings)}`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div>
          <div className="title">
            {FormatNumber(bond?.annual_interest_rate, 2)}
            %&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatNumber(bond?.annual_interest_rate, 2)} %`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            ${FormatCurrency(bond?.coinsData?.[0]?.annualEarnings)}
            &nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `$${FormatCurrency(bond?.coinsData?.[0]?.annualEarnings)}`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div>
        <div>
          <div className="title">
            {FormatNumber(bond?.term_interest_rate, 2)}%&nbsp;&nbsp;
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${FormatNumber(bond?.term_interest_rate, 2)} %`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
          <div className="subtitle">
            ${FormatCurrency(bond?.coinsData?.[0]?.termEarnings)}
            &nbsp;&nbsp;
            <img
              // className={classNames.copy}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `$${FormatCurrency(bond?.coinsData?.[0]?.termEarnings)}`
                );
              }}
              src={copyToClipboard}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </div>
        </div> */}
      </div>
    );
  };

  const loadingSection = (gridClass, gridValues) => {
    return Array(10)
      .fill("")
      .map((item, i) => {
        return (
          <div
            className={gridClass}
            style={{
              width: "100%",
              gridTemplateColumns: gridValues,
              // borderBottom: "solid 0.5px #EEEEEE",
            }}
          >
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                className="dp"
                circle
                width={30}
                height={30}
                style={{ marginRight: "20px" }}
              />
              <div className="userDetail" style={{ paddingTop: "10px" }}>
                <Skeleton width={100} />
                {/* <Skeleton width={120} style={{ height: "10px" }} /> */}
              </div>
            </div>
            <div>
              <Skeleton width={120} />
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={120} />
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={120} />
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={120} />
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={120} />
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
          </div>
        );
      });
  };

  const conditionalResposiveView = (
    data,
    dataLoading,
    desktopDataGrid,
    mobileDataGrid,
    showSubDraw
  ) => {
    return (
      <>
        <div className="desktopWrapper">
          <div style={{ width: "100%", paddingTop: "30px" }}>
            {headerSection("listGrid", desktopDataGrid)}
          </div>
          <div
            style={{
              // display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              height: window.innerHeight - 470,
              overflowY: "scroll",
            }}
          >
            {!dataLoading ? (
              data?.length > 0 ? (
                data
                  .filter((o) =>
                    o.coinName.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((bond) => {
                    return contentSection(
                      bond,
                      "listDataGrid",
                      desktopDataGrid
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
              loadingSection("listDataGrid", desktopDataGrid)
            )}
            {/* <AppsSubDrawer allApps={allApps} /> */}
          </div>
        </div>

        {/* <div className="mobileWrapper">
          <div style={{ overflowY: "scroll", height: "80vh" }}>
            {headerSection("listGridMobile", mobileDataGrid)}

            {!dataLoading ? (
              data?.length > 0 ? (
                data?.map((bond, index) => {
                  return contentSection(
                    bond,
                    "listDataGridMobile",
                    mobileDataGrid
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
              loadingSection("listDataGrid", mobileDataGrid)
            )}
            
          </div>
        </div> */}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          Today’s Cryptocurrency Prices By MarketCap
        </div>
        <div className={styles.searchContainer}>
          <input
            placeholder="Search Crypto.."
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        {Array(10)
          .fill("")
          .map((item) => {
            return (
              <div style={{ marginRight: "20px" }}>
                <div className={styles.card}>&nbsp;</div>
              </div>
            );
          })}
      </div>
      <div style={{}}>
        {conditionalResposiveView(
          allData,
          dataLoading,
          "1fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr ", // Desktop view Grid columns
          "250px 300px 200px 200px 200px 200px " // Mobile view Grid columns
        )}
      </div>
    </div>
  );
};

export default Crypto;
