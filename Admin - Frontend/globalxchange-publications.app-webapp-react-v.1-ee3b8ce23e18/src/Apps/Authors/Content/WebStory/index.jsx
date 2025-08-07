import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import AppsSubDrawer from "./StorySubDrawer";
import "./dashboardApps.scss";

import { Typography } from "antd";
import ActionIndex from "./StorySubDrawer/ActionIndex";

const WebStory = () => {
  const { Paragraph } = Typography;
  const {
    loginData,
    bankerEmail,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
    showSubDraw,
    setShowSubDraw,
    refetchAppData,
    refreshStories,
    setSelectedTab,
    mcbMenu,
    isMobile,
    selectedPublication,
    actionsSubDrawer,
    setActionsSubDrawer,
    StorySubDrawer,
    setStorySubDrawer,
    globalSearch
  } = useContext(GlobalContex);
  const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  useEffect(() => {
    let pubdata
    if (selectedPublication) {
      pubdata = selectedPublication._id
    } else {
      pubdata = "63a1a2c60e46260e093cf260"
    }
    setAppLoading(true);
    axios
      .get(
        ` https://publications.apimachine.com/webstory?publication_id=${pubdata}&email=${bankerEmail}`
      )
      // .get(`https://publications.apimachine.com/article`)
      .then(({ data }) => {
        if (data.status && data.data.length > 0) {
          setAllApps(data.data);
          setAppLoading(false);
        } else {
          setAllApps([])
          setAppLoading(false);
        }
      });
  }, [bankerEmail, refreshStories, selectedPublication]);

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
                    item?.name
                      ?.toLowerCase()
                      .includes(globalSearch.toLowerCase()) ||
                    item?._id
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
            {/* <ArticlesSubDrawer
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            /> */}
            <ActionIndex
              selectedStory={selectedStory}
              setSelectedStory={setSelectedStory} />
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
      <div className={gridClass} style={{
        gridTemplateColumns: gridValues
      }}>
        <div>Name</div>
        <div style={{ textAlign: "left" }}>Status</div>
        <div style={{ textAlign: "left" }}>Stories</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div

        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
          opacity: StorySubDrawer ? StorySubDrawer && selectedStory === item ? "1" : "0.5" : "1"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.icon ? item.icon : defaultImg}
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
              <Paragraph copyable={{ text: item?._id }}>
                {/* {item?._id?.substring(0, 20)}... */}
                {item?._id}
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
          {/* <img
            src={defaultImg}
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          /> */}
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.status }}>{item.status}</Paragraph>
            </div>
            {/* <div className="subtitle">
              <Paragraph copyable={{ text: item?.email }}>
                {item?.email}
              </Paragraph>
            </div> */}
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
            <div className="title">
              <Paragraph copyable={{ text: item.stories.length > 0 ? item.stories[0].count : "0" }}>
                {item.stories.length > 0 ? item.stories[0].count : "0"}
              </Paragraph>
            </div>
            {/* <div className="subtitle">{item?.date}</div> */}
            {/* <div className="subtitle">{item?.email}</div> */}
          </div>
        </div>
        <div className="btngrp">
          <button className="readbtn">Read</button>
          {/* <button className="readbtn" onClick={(e) => {
            setSelectedArticle(item);
            setShowSubDraw(true);
          }}>Read</button> */}
          <button className="actionbtn" onClick={(e) => {
            setSelectedStory(item);
            setStorySubDrawer(true);
          }}>Actions</button>
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
                justifyContent: "center",
              }}
            >
              <div className="userDetail">
                <Skeleton width={100} />
                <Skeleton width={120} style={{ height: "10px" }} />
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
        "2.5fr 2fr 1fr 2fr", // Desktop view Grid columns
        "350px 250px 250px" // Mobile view Grid columns
      )}
    </>
  );
};

export default WebStory;
