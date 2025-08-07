import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import AppsSubDrawer from "./AuthorsSubDrawer";
import "./dashboardApps.scss";

import { Typography } from "antd";
import AuthorsSubDrawer from "./AuthorsSubDrawer";
import ActionIndex from "./AuthorsSubDrawer/ActionIndex";

const Authors = () => {
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
    selectedPublication,
    actionsSubDrawer,
    setActionsSubDrawer,
    refetchArticles,
    globalSearch,
    getDisplayDate,
    selectedAuthor,
    setSelectedAuthor
  } = useContext(GlobalContex);
  const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);


  useEffect(() => {
    setAppLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/application/notInPublication/${selectedPublication?._id}`
      )
      // .get(`https://publications.apimachine.com/article`)
      .then(({ data }) => {
        setAllApps(data.data);
        setAppLoading(false);
      });
  }, [bankerEmail, refetchAppData, refetchArticles, selectedPublication]);

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
                data.filter(
                  (item) =>
                    item.name
                      ?.toLowerCase()
                      .includes(globalSearch.toLowerCase()) ||
                    item.email
                      ?.toLowerCase()
                      .includes(globalSearch.toLowerCase())).map((item) => {
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
            <AuthorsSubDrawer
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            />
            <ActionIndex
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle} />
          </div>
        </div>

        <div className="mobileWrapper">
          {!showSubDraw ? (
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              {headerSection("listGridMobile", mobileDataGrid)}

              {!appLoading ? (
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
        <div style={{ textAlign: "left" }}>Currently Apart Of</div>
        <div style={{ textAlign: "left" }}>Availability</div>
        <div style={{ textAlign: "left" }}>Cost</div>
        <div style={{ textAlign: "left" }}>Articles</div>
        <div style={{ textAlign: "left" }}>Videos</div>
        <div style={{ textAlign: "left" }}>Viewers</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        className={gridClass}
        onClick={(e) => {
          setSelectedAuthor(item);
          setActionsSubDrawer(true);
        }}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.profile_pic ? item.profile_pic : defaultImg}
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
              <Paragraph copyable={{ text: item?.name }}>
                {item?.name}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?.email }}>
                {/* {item?._id?.substring(0, 20)}... */}
                {item?.email}
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
              <Paragraph copyable={{ text: `${item?.AppDetails.length > 0 ? item?.AppDetails[0]?.AppCount : "0"} Publications` }}>
                {item?.AppDetails.length > 0 ? item?.AppDetails[0]?.AppCount : "0"} Publications
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: getDisplayDate(item?.createdAt) }}>
                {getDisplayDate(item?.createdAt)}
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
              <Paragraph copyable={{ text: `${item?.status === "active" ? "Available" : "Not Available"}` }}>
                {item?.status === "active" ? "Available" : "Not Available"}
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
              <Paragraph copyable={{ text: "$0.00" }}>
                $0.00
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: "Per Word" }}>
                Per Word
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
              <Paragraph copyable={{ text: `${item?.ArticleDetails.length > 0 ? item.ArticleDetails[0]?.ArticleCount : 0}` }}>
                {item?.ArticleDetails.length > 0 ? item.ArticleDetails[0]?.ArticleCount : 0}
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
              <Paragraph copyable={{ text: `${item?.VideoDetails.length > 0 ? item.VideoDetails[0]?.VideoCount : 0}` }}>
                {item?.VideoDetails.length > 0 ? item.VideoDetails[0]?.VideoCount : 0}
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
              <Paragraph copyable={{ text: "--" }}>
                --
              </Paragraph>
            </div>
          </div>
        </div>


        {/* <div className="btngrp">
          <button className="readbtn" onClick={(e) => {
            setSelectedArticle(item);
            setShowSubDraw(true);
          }}>Read</button>
          <button className="actionbtn" onClick={(e) => {
            setSelectedArticle(item);
            setActionsSubDrawer(true);
          }}>Actions</button>
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
                <Skeleton width={120} />
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
                <Skeleton width={80} />
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
                <Skeleton width={100} />
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
                <Skeleton width={50} />
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
                <Skeleton width={50} />
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
                <Skeleton width={50} />
              </div>
            </div>
          </div>
        );
      });
  };

  return (
    <>
      {conditionalResposiveView(
        allApps,
        appLoading,
        "1.7fr 1.5fr 1fr 1fr 0.6fr 0.6fr 0.6fr", // Desktop view Grid columns
        "350px 250px 250px" // Mobile view Grid columns
      )}
    </>
  );
};

export default Authors;
