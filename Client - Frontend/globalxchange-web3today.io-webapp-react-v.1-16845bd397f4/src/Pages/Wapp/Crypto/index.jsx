import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./crypto.module.scss";
import "./list.scss";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../../services/WindowSize";

const Crypto = () => {
  const history = useHistory();
  const { width, height } = useWindowDimensions();
  const [allData, setAllData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/company?publication_id=638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        let minDataReq = Math.ceil((height - 157) / 90);
        console.log(
          data,
          "all companies for one publication",
          minDataReq,
          data?.data
        );
        if (data?.data?.length >= minDataReq) {
          setAllData(data?.data);
        } else {
          let dataArray = data?.data;
          let addNewData = minDataReq - data?.data?.length;

          let newArray = [...dataArray, ...Array(addNewData)?.fill(null)];
          setAllData(newArray);
        }
        setDataLoading(false);
      });
  }, []);

  const headerSection = (gridClass, gridValues) => {
    return (
      <div
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
          alignItems: "center",
          borderLeft: "0.5px solid var(--bordercolor-main)",
          borderRight: "0.5px solid var(--bordercolor-main)",
          background: "var(--highlight-color)",
          gap: "1rem",
        }}
      >
        <div style={{ textAlign: "left" }}>Name</div>
        <div style={{ textAlign: "left" }}>Industry</div>
        <div style={{ textAlign: "left" }}>Founder</div>
        <div style={{ textAlign: "left" }}>Headquarters</div>
        <div style={{ textAlign: "left" }}>Investors</div>
        <div style={{ textAlign: "left" }}>Founded</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
          borderLeft: "0.5px solid var(--bordercolor-main)",
          borderRight: "0.5px solid var(--bordercolor-main)",
          gap: "1rem",
        }}
        onClick={() => {
          history.push(`/feed/wapps/${item?._id}`);
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item?.profile_pic}
            alt=""
            style={{
              borderRadius: "50%",
              width: "22px",
              height: "22px",
            }}
            // className={classNames.icon}
          />
          <div className={styles.valueStyle} style={{ paddingLeft: "8px" }}>
            <div className="title" style={{ fontSize: "0.9rem" }}>
              {item?.name}
            </div>
          </div>
        </div>
        <div className={styles.valueStyle} style={{ alignItems: "start" }}>
          {item?.industry}
        </div>
        <div
          className={styles.valueStyle}
          style={{
            alignItems: "start",
          }}
        >
          {item?.founders?.length > 0 ? item?.founders[0] : ""}
        </div>
        <div className={styles.valueStyle} style={{ alignItems: "start" }}>
          {item?.country}
        </div>
        <div className={styles.valueStyle} style={{ alignItems: "start" }}>
          {item?.investors?.length}
        </div>
        <div
          className={styles.valueStyle}
          style={{ display: "flex", alignItems: "start" }}
        >
          --
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
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
              <Skeleton width={80} style={{ height: "10px" }} />
            </div>
            <div>
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
        <div className="desktopWrapper" style={{ height: "100%" }}>
          <div style={{ width: "100%" }}>
            {headerSection("listGrid", desktopDataGrid)}
          </div>
          <div
            style={{
              // display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              // height: window.innerHeight - 470,
              overflowY: "scroll",
            }}
          >
            {!dataLoading ? (
              data?.length > 0 ? (
                data
                  // .filter((o) =>
                  //   o.coinName.toLowerCase().includes(query.toLowerCase())
                  // )
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
      {/* <div className={styles.headerContainer}>
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
      </div> */}
      {/* <div className={styles.cardContainer}>
        {Array(10)
          .fill("")
          .map((item) => {
            return (
              <div style={{ marginRight: "20px" }}>
                <div className={styles.card}>&nbsp;</div>
              </div>
            );
          })}
      </div> */}
      <div style={{ height: "100%" }}>
        {conditionalResposiveView(
          allData,
          dataLoading,
          "1.5fr 1fr 1.5fr 1.5fr 1fr 1fr ", // Desktop view Grid columns
          "250px 300px 200px 200px 200px 200px ", // Mobile view Grid columns
          ""
        )}
      </div>
    </div>
  );
};

export default Crypto;
