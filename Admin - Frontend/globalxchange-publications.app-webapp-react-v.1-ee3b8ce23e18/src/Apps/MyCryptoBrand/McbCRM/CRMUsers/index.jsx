import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import CRMsubDrawer from "./CRMsubDrawer";
const CRMUsers = () => {
  const { loginData, selectedBrandApp, setShowSubDraw , crmUser , setCrmUser , crmData , setCrmData } = useContext(GlobalContex);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/coin/vault/service/users/holdings/data/get?app_code=${selectedBrandApp?.app_code}`
      )
      .then(({ data }) => {
        // let data = res.data.users;
        // let output = data.slice(0, 30);
        setCrmData(data.users);
        setDataLoading(false);
      });
  }, [selectedBrandApp]);

  return (
    <>
      <div className="desktopWrapper">
        <div style={{ width: "100%" }}>
          <div
            className="listGrid"
            style={{ gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr 1fr" }}
          >
            <div>Name</div>
            <div style={{ textAlign: "left" }}>Affiliate</div>
            <div style={{ textAlign: "left" }}>Address</div>
            <div style={{ textAlign: "left" }}>Contact</div>
            <div style={{ textAlign: "left" }}>Holdings</div>

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
          {!dataLoading
            ? crmData?.map((item) => {
              return (
                <div
                  className="listDataGrid"
                  style={{
                    gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr 1fr",
                  }}
                  onClick={() => (setShowSubDraw(true), setCrmUser(item))}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={
                        item.userData.profile_img
                          ? item.userData.profile_img
                          : defaultImg
                      }
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                    // className={classNames.icon}
                    />
                    <div style={{ paddingLeft: "15px" }}>
                      <div className="title">
                        {item?.userData?.name} &nbsp;
                      </div>
                      <div className="subtitle">
                        {item?.userData?.username}
                      </div>
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
                    <img
                      src={
                        item?.refUserData?.profile_img
                          ? item?.refUserData?.profile_img
                          : defaultImg
                      }
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                    // className={classNames.icon}
                    />
                    <div style={{ paddingLeft: "15px" }}>
                      <div className="title">{item?.refUserData?.name}</div>
                      <div className="subtitle">
                        {item?.refUserData?.email}
                      </div>
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
                    <img
                      src={defaultImg}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                    // className={classNames.icon}
                    />
                    <div style={{ paddingLeft: "15px" }}>
                      <div className="title">India</div>
                      <div className="subtitle">40 Manjeera Town Villa</div>
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
                    <div>
                      <div className="title">{item?.userData?.email}</div>
                      {/* <div className="subtitle">{item?.date}</div> */}
                      <div className="subtitle">+1 647 559 0183</div>
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
                    <div>
                      <div className="title">
                        ${item?.total_holdings?.toFixed(4)}
                      </div>
                      <div className="subtitle">
                        ${item?.liquid_holdings?.toFixed(4)}
                      </div>
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
                      gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1fr 1fr",
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div className="userDetail" >
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
          <CRMsubDrawer />
        </div>
      </div>
      <div className="mobileWrapper">
        <div style={{ overflowY: "scroll", height: "80vh" }}>
          <div
            className="listGridMobile"
            style={{
              gridTemplateColumns: "300px 300px 300px 300px 200px 20px",
            }}
          >
            <div>Name</div>
            <div style={{ textAlign: "left" }}>Affiliate</div>
            <div style={{ textAlign: "left" }}>Address</div>
            <div style={{ textAlign: "left" }}>Contact</div>
            <div>Holdings</div>
            <div>&nbsp;</div>
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
            {!dataLoading
              ? crmData?.map((item) => {
                return (
                  <div
                    className="listDataGridMobile"
                    style={{
                      gridTemplateColumns:
                        "300px 300px 300px 300px 200px 20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={
                          item.userData.profile_img
                            ? item.userData.profile_img
                            : defaultImg
                        }
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">
                          {item?.userData?.name} &nbsp;
                        </div>
                        <div className="subtitle">
                          {item?.userData?.username}
                        </div>
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
                      <img
                        src={
                          item?.refUserData?.profile_img
                            ? item?.refUserData?.profile_img
                            : defaultImg
                        }
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">{item?.refUserData?.name}</div>
                        <div className="subtitle">
                          {item?.refUserData?.email}
                        </div>
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
                      <img
                        src={defaultImg}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">India</div>
                        <div className="subtitle">40 Manjeera Town Villa</div>
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
                      <div>
                        <div className="title">{item?.userData?.email}</div>
                        {/* <div className="subtitle">{item?.date}</div> */}
                        <div className="subtitle">+1 647 559 0183</div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        style={{ paddingLeft: "15px", textAlign: "center" }}
                      >
                        <div className="title">
                          {item?.appsData?.total_holdings?.toFixed(4)}
                        </div>
                        <div className="subtitle">
                          {item?.liquid_holdings?.toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div>&nbsp;</div>
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
                        gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1fr 1fr",
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
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CRMUsers;
