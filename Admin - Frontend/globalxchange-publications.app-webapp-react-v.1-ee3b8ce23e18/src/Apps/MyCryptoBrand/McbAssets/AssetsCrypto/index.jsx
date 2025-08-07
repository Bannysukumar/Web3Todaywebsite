import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import AssetsCryptoSubDrawer from "./AssetsCryptoSubDrawer";

const AssetsCrypto = () => {
  const {
    loginData,
    setShowSubDraw,
    selectedBrandApp,
    selectedMcbAssetsCrypto,
    setSelectedMcbAssetsCrypto,
  } = useContext(GlobalContex);
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (selectedBrandApp?.app_code) {
      setDataLoading(true);
      axios
        .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, {
          app_code: selectedBrandApp?.app_code,
          type: "crypto",
        })
        .then(({ data }) => {
          console.log(data, "kjwbckwjefc");
          // let data = res.data.users;
          // let output = data.slice(0, 30);
          setCryptoAssets(data?.coins_data);
          setDataLoading(false);
        });
    }
  }, [selectedBrandApp]);

  return (
    <>
      <div className="desktopWrapper">
        <div style={{ width: "100%" }}>
          <div
            className="listGrid"
            style={{
              gridTemplateColumns: "1.5fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr 0.2fr",
            }}
          >
            <div>Brand</div>
            <div style={{ textAlign: "left" }}>Vault Details</div>
            <div>Price</div>
            <div>Interest Rate</div>
            <div>Liquid Holdings</div>
            <div>Total Holdings</div>

            {/* <div>Name</div>
          <div style={{ textAlign: "left" }}>Brand</div>
          <div style={{ textAlign: "center" }}>Founding Date</div>
          <div style={{ textAlign: "center" }}>Users</div>
          <div>Holdings</div> */}
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
            cryptoAssets?.length > 0 ? (
              cryptoAssets?.map((item) => {
                return (
                  <div
                    onClick={(e) => {
                      setSelectedMcbAssetsCrypto(item);
                      setShowSubDraw(true);
                    }}
                    className="listDataGrid"
                    style={{
                      gridTemplateColumns:
                        "1.5fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr 0.2fr",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.coinImage ? item.coinImage : defaultImg}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                        // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">{item?.coinName} &nbsp;</div>
                        <div className="subtitle">{item?.coinSymbol}</div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        <div className="title">{item?.asset_type}</div>
                        <div className="subtitle">
                          {item.native_deposit === true
                            ? "Native Deposit"
                            : "Non-Native Deposit"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="title">
                        ${item?.coinPriceUSD?.toFixed(2)}
                      </div>
                      {/* <div className="subtitle">
                        ${item?.coinPriceUSD?.toFixed(2)} After Fee
                      </div> */}
                    </div>

                    <div>
                      <div className="title">
                        {(item?.original_interest_rate * 365).toFixed(2)}%
                      </div>
                      <div className="subtitle">
                        {(item?.interest_rate * 365).toFixed(2)}% After IRD
                      </div>
                    </div>

                    <div>
                      <div className="title">0.00 {item?.coinSymbol}</div>
                      <div className="subtitle">$0.00 USD</div>
                    </div>

                    <div>
                      <div className="title">0.00 {item?.coinSymbol}</div>
                      <div className="subtitle">$0.00 USD</div>
                    </div>
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
                      gridTemplateColumns:
                        "1.5fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr 0.2fr",
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
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                    </div>
                    <div className="userDetail">
                      <Skeleton width={100} />
                      <Skeleton width={120} style={{ height: "10px" }} />
                    </div>
                    <div className="userDetail">
                      <Skeleton width={100} />
                      <Skeleton width={120} style={{ height: "10px" }} />
                    </div>
                    <div className="userDetail">
                      <Skeleton width={100} />
                      <Skeleton width={120} style={{ height: "10px" }} />
                    </div>

                    <div className="userDetail">
                      <Skeleton width={100} />
                      <Skeleton width={120} style={{ height: "10px" }} />
                    </div>
                  </div>
                );
              })
          )}
          {/* <AssetsCryptoSubDrawer cryptoAssets={cryptoAssets} /> */}
        </div>
      </div>
      <div className="mobileWrapper">
        <div style={{ overflowY: "scroll", height: "80vh" }}>
          <div
            className="listGridMobile"
            style={{
              gridTemplateColumns: "300px 200px 200px 200px 200px 200px 100px",
            }}
          >
            <div>Brand</div>
            <div style={{ textAlign: "left" }}>Vault Details</div>
            <div>Price</div>
            <div>Interest Rate</div>
            <div>Liquid Holdings</div>
            <div>Total Holdings</div>

            {/* <div>Name</div>
          <div style={{ textAlign: "left" }}>Brand</div>
          <div style={{ textAlign: "center" }}>Founding Date</div>
          <div style={{ textAlign: "center" }}>Users</div>
          <div>Holdings</div> */}
          </div>
          <div
            style={{
              // display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              // height: window.innerHeight - 175,
              // overflowY: "scroll",
              paddingBottom: "10vh",
            }}
          >
            {!dataLoading ? (
              cryptoAssets?.length > 0 ? (
                cryptoAssets?.map((item) => {
                  return (
                    <div
                      onClick={(e) => {
                        setSelectedMcbAssetsCrypto(item);
                        setShowSubDraw(true);
                      }}
                      className="listDataGridMobile"
                      style={{
                        gridTemplateColumns:
                          "300px 200px 200px 200px 200px 200px 100px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.coinImage ? item.coinImage : defaultImg}
                          alt=""
                          style={{
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                          }}
                          // className={classNames.icon}
                        />
                        <div style={{ paddingLeft: "15px" }}>
                          <div className="title">{item?.coinName} &nbsp;</div>
                          <div className="subtitle">{item?.coinSymbol}</div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div style={{ textAlign: "left" }}>
                          <div className="title">{item?.asset_type}</div>
                          <div className="subtitle">
                            {item.native_deposit === true
                              ? "Native Deposit"
                              : "Non-Native Deposit"}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="title">
                          ${item?.coinPriceUSD?.toFixed(2)}
                        </div>
                        <div className="subtitle">
                          ${item?.coinPriceUSD?.toFixed(2)} After Fee
                        </div>
                      </div>

                      <div>
                        <div className="title">
                          {(item?.original_interest_rate * 365).toFixed(2)}%
                        </div>
                        <div className="subtitle">
                          {(item?.interest_rate * 365).toFixed(2)}% After IRD
                        </div>
                      </div>

                      <div>
                        <div className="title">0.00 {item?.coinSymbol}</div>
                        <div className="subtitle">$0.00 USD</div>
                      </div>

                      <div>
                        <div className="title">0.00 {item?.coinSymbol}</div>
                        <div className="subtitle">$0.00 USD</div>
                      </div>
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
                        gridTemplateColumns:
                          "300px 200px 200px 200px 200px 200px 100px",
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
                          <Skeleton width={120} style={{ height: "10px" }} />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div className="userDetail">
                          <Skeleton width={100} />
                          <Skeleton width={120} style={{ height: "10px" }} />
                        </div>
                      </div>
                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>

                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                    </div>
                  );
                })
            )}
            {/* <AssetsCryptoSubDrawer cryptoAssets={cryptoAssets} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetsCrypto;
