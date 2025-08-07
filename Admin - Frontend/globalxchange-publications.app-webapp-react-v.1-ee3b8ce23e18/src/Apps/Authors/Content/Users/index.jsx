import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

// import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import copyIcon from "../../../../static/images/icons/copy.svg";
import AppsSubDrawer from "./UsersSubDrawer";
import "./dashboardApps.scss";
import { Typography } from "antd";
import PublicationsSubDrawer from "./UsersSubDrawer";

const Users = () => {
  const { Paragraph } = Typography;
  const {
    loginData,
    bankerEmail,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
    showSubDraw,
    setShowSubDraw,
    refetchAppData,
    setSelectedTab,
    mcbMenu,
    isMobile,
    refetchData,
    setRefetchData,
  } = useContext(GlobalContex);
  const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://comms.globalxchange.io/coin/vault/service/users/holdings/data/get?app_code=web3today`
  //     )
  //     .then(({ data }) => {
  //       setAllApps(data.users);
  //       setLoading(false);
  //     });
  // }, [bankerEmail, refetchData]);

  const conditionalResposiveView = (
    data,
    dataLoading,
    desktopDataGrid,
    mobileDataGrid
  ) => {
    return (
      <>
        <div className="desktopWrapper">
          <div style={{ width: "100%" }}>
            {headerSection("listGrid", desktopDataGrid)}
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
              data?.length > 0 ? (
                data.map((item) => {
                  return contentSection(item, "listDataGrid", desktopDataGrid);
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
            <PublicationsSubDrawer
              selectedPublication={selectedPublication}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>

        <div className="mobileWrapper">
          {!showSubDraw ? (
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              {headerSection("listGridMobile", mobileDataGrid)}

              {!loading ? (
                allApps?.length > 0 ? (
                  allApps.map((item, index) => {
                    return contentSection(
                      item,
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
              <AppsSubDrawer allApps={allApps} />
            </div>
          ) : (
            <AppsSubDrawer allApps={allApps} />
          )}
        </div>
      </>
    );
  };

  // Change these three Sections according to the design

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Name</div>
        <div style={{ textAlign: "left" }}>Affiliate</div>
        <div style={{ textAlign: "left" }}>Address</div>
        <div style={{ textAlign: "left" }}>Contact</div>
        <div style={{ textAlign: "left" }}>Holdings</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        // onClick={(e) => {
        //   setSelectedPublication(item);
        //   setShowSubDraw(true);
        // }}
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              item?.userData?.profile_img
                ? item?.userData?.profile_img
                : defaultImg
            }
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.userData?.name }}>
                {item?.userData?.name}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?.userData?.username }}>
                {item?.userData?.username}
              </Paragraph>
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
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.refUserData?.name }}>
                {item?.refUserData?.name}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?.refUserData?.username }}>
                {item?.refUserData?.username}
              </Paragraph>
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
          <div style={{ textAlign: "left" }}>
            <div className="title">
              <Paragraph copyable={{ text: "--" }}>--</Paragraph>
            </div>
            {/* <div className="subtitle">{item?.date}</div> */}
            <div className="subtitle">
              <Paragraph copyable={{ text: "--" }}>--</Paragraph>
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
          <div style={{ textAlign: "left" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.userData?.email }}>
                {item?.userData?.email}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: "--" }}>--</Paragraph>
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
          <div style={{ textAlign: "center" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.total_holdings }}>
                ${item?.total_holdings?.toFixed(2)}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?.liquid_holdings }}>
                ${item?.liquid_holdings?.toFixed(2)}
              </Paragraph>
            </div>
          </div>
        </div>
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
                justifyContent: "center",
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
      });
  };

  return (
    <>
      {conditionalResposiveView(
        allApps,
        loading,
        "1.5fr 1.5fr 1fr 1.5fr 1fr", // Desktop view Grid columns
        "250px 250px 200px 100px 200px" // Mobile view Grid columns
      )}
    </>
  );
};

export default Users;
