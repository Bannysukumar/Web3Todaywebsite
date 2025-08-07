import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import BrandsSubDrawer from "./BrandsSubDrawer";
import "./dashboardBrands.scss";

const DashboardBrands = () => {
  const {
    loginData,
    bankerEmail,
    selectedMcbDashboardBrand,
    setSelectedMcbDashboardBrand,
    setShowSubDraw,
    refetchAppData,
    refetchBrandData,
  } = useContext(GlobalContex);

  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getDateFromat = (date) => {
    const onlyDate = date.split(",")[0];
    return `${allMonths[onlyDate.split("/")[0] - 1]} ${
      onlyDate.split("/")[1]
    } ${onlyDate.split("/")[2]}`;
  };

  // useEffect(() => {
  //   setAppLoading(true);
  //   axios
  //     .get(
  //       `https://comms.globalxchange.io/gxb/apps/get?created_by=${bankerEmail}`
  //     )
  //     .then((res) => {
  //       setAllApps(res.data.apps);
  //     });

  //   axios
  //     .get(
  //       `https://comms.globalxchange.io/coin/vault/service/holdings/per/app/get?created_by=${bankerEmail}`
  //     )
  //     .then((res) => {
  //       if (res.data.status) {
  //         setAllApps1(res.data.apps);
  //         setAppLoading(false);
  //       } else {
  //         setAppLoading(false);
  //       }
  //     });
  // }, [bankerEmail, refetchAppData]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/gxb/app/gxlive/user/operator/get?email=${bankerEmail}&show_apps=true`
      )
      .then(({ data }) => {
        setAllBrands(data?.operators);
        setLoading(false);
      });
  }, [bankerEmail, refetchBrandData]);

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
            <BrandsSubDrawer allBrands={allBrands} />
          </div>
        </div>

        <div className="mobileWrapper">
          <div style={{ overflowY: "scroll", height: "80vh" }}>
            {headerSection("listGridMobile", mobileDataGrid)}

            {!dataLoading ? (
              data?.length > 0 ? (
                data.map((item, index) => {
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
          </div>
        </div>
      </>
    );
  };

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Brand</div>
        <div style={{ textAlign: "left" }}>Country</div>
        <div style={{ textAlign: "left" }}>Contact Information</div>
        <div style={{ textAlign: "left" }}>Founding Date</div>
        <div>Apps</div>
        <div></div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        onClick={(e) => {
          setSelectedMcbDashboardBrand(item);
          setShowSubDraw(true);
        }}
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.brand_logo ? item.brand_logo : defaultImg}
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
            // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">{item?.brand_name} &nbsp;</div>
            <div className="subtitle">{item?.operator_id}</div>
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
              item.brand_country?.image
                ? item?.brand_country?.image
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
              {item?.brand_country?.name
                ? item?.brand_country?.name
                : item?.brand_country}
              &nbsp;
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
            <div className="title">{item?.brand_phone}</div>
            {/* <div className="subtitle">{item?.date}</div> */}
            <div className="subtitle">{item?.brand_email}</div>
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
          <div style={{ textAlign: "right" }}>
            <div className="title">{getDateFromat(item?.founding_date)}</div>
            {/* <div className="subtitle">{item?.date}</div> */}
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
          <div style={{ paddingLeft: "15px", textAlign: "center" }}>
            <div className="title">{item?.app_data?.length}</div>
            {/* <div className="subtitle">{item?.date}</div> */}
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
                {/* <Skeleton width={120} style={{ height: "10px" }} /> */}
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
              <div className="userDetail">
                <Skeleton width={100} />
                {/* <Skeleton width={120} style={{ height: "10px" }} /> */}
              </div>
            </div>

            <div className="userDetail">
              <Skeleton width={100} />
              {/* <Skeleton width={120} style={{ height: "10px" }} /> */}
            </div>
          </div>
        );
      });
  };

  return (
    <>
      {conditionalResposiveView(
        allBrands,
        loading,
        "2fr 1.8fr 2fr 1fr 1fr 0.3fr", // Desktop view Grid columns
        "300px 200px 300px 200px 100px 50px" // Mobile view Grid columns
      )}
    </>
  );
};

export default DashboardBrands;
