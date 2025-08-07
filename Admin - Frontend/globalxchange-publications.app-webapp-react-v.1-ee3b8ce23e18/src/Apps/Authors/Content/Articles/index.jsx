import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import AppsSubDrawer from "./ArticlesSubDrawer";
import "./dashboardApps.scss";

import { Typography } from "antd";
import ArticlesSubDrawer from "./ArticlesSubDrawer";
import ActionIndex from "./ArticlesSubDrawer/ActionIndex";
import useAxios from "../../../../hooks/useAxios";
import { Classnames } from "react-alice-carousel";

const Articles = () => {
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
    authorDetail,
    setAuthorDetail,
    refetchArticles,
    setRefetchArticles,
    globalSearch,
    titlesData,
    setTitlesData,
    panelContainer,
    setPanelContainer,
  } = useContext(GlobalContex);
  const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [categoriesArr, setCategoriesArr] = useState([])
  const [categoryNames , setCategoryNames] = useState([])

  const {
    data: allCategories,
    loading: allCategoriesLoading,
    error,
  } = useAxios(
    "GET",
    `https://publications.apimachine.com/category/publication/${selectedPublication?._id
      ? selectedPublication?._id
      : "63a1a2c60e46260e093cf260"
    }?ArticleAuthor=${bankerEmail}`
  );

  useEffect(() => {
    setTitlesData([]);
    setAppLoading(true);
    let pubdata;
    if (selectedPublication) {
      pubdata = selectedPublication._id;
    } else {
      pubdata = "63a1a2c60e46260e093cf260";
    }
    let url;
    if (categoriesArr.length > 0 || selectedStatus) {
      url = `https://publications.apimachine.com/article?email=${bankerEmail}&publication_id=${selectedPublication._id}&category=${categoriesArr.join('&category=')}`
    } else {
      url = `https://publications.apimachine.com/article?email=${bankerEmail}&publication_id=${pubdata}`;
    }
    axios.get(url).then(({ data }) => {
      setAppLoading(false);
      if (data.status && data.data.length > 0) {
        setAllApps(data.data);
        // setAppLoading(false);
      } else {
        // setAppLoading(false);
        setAllApps([]);
      }
      // setAppLoading(false);
    });
  }, [
    bankerEmail,
    refetchAppData,
    selectedPublication,
    authorDetail,
    refetchArticles,
    categoriesArr,
    categoryNames,
    selectedStatus,
  ]);

  useEffect(() => {
    console.log("State updated:", selectedArticle);
  }, [selectedArticle]);

  const ActionClick = (item) => {
    setSelectedArticle(item);
    setActionsSubDrawer(true);
    let creatorsArticles = document.querySelector(".creatorsArticles");

    if (creatorsArticles) {
      creatorsArticles.scrollTop = 0;
    }
  };

  const removeValueFromArray = (arr, valueToRemove) => {
    return arr.filter((item) => item !== valueToRemove);
  };

  const clickedData = (item) => {
    if (titlesData.includes(item?.title)) {
      const resultArray = removeValueFromArray(titlesData, item?.title);
      setTitlesData(resultArray);
    } else {
      setTitlesData([...titlesData, item?.title]);
    }

    console.log(titlesData);
  };

  const theCategories = (item) => {
    if (!item) return;
    console.log(categoriesArr, "categoriesArr")
    if (categoriesArr.includes(item?._id)) {
      const resultArray = removeValueFromArray(categoriesArr, item?._id);
      const resultNames = removeValueFromArray(categoryNames, item?.title)
      setCategoriesArr(resultArray);
      setCategoryNames(resultNames)
    } else {
      setCategoriesArr([...categoriesArr, item?._id]);
      setCategoryNames([...categoryNames , item?.title])
    }

    console.log("cate-data", `https://publications.apimachine.com/article?email=${bankerEmail}&publication_id=${selectedPublication._id}&category=` + categoriesArr.join('&category='))
  }

  const openSelect = () => {
    console.log("ancd", allCategories, categoriesArr)
    const idsArray = allCategories.data.map(item => item._id);
    const namesArray = allCategories.data.map(item => item.title);
    console.log("sss", idsArray)
    setCategoriesArr(idsArray)
    setCategoryNames(namesArray)
    // setCategoriesArr(...categoriesArr, ...idsArray)
  }

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
              overflowY: actionsSubDrawer ? "" : panelContainer ? "" : "scroll",
            }}
            className="creatorsArticles"
          >
            {!dataLoading ? (
              data?.length > 0 ? (
                data
                  .filter(
                    (item) =>
                      item?.title
                        ?.toLowerCase()
                        .includes(globalSearch.toLowerCase()) ||
                      item?._id
                        ?.toLowerCase()
                        .includes(globalSearch.toLowerCase())
                  )
                  .map((item) => {
                    return contentSection(
                      item,
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
            {/* <ArticlesSubDrawer
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            /> */}
            <ActionIndex
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            />
            <div
              className="panelContainer"
              style={{
                right: panelContainer ? "0" : "",
              }}
            >
              <div className="articlesFilter">
                <div className="header">
                  <div className="title">
                    Filter Panel
                    <div className="typeTitle">
                      <span
                        onClick={() => {
                          if (panelContainer) {
                            setPanelContainer("authorArticlesPanel");
                          }
                        }}
                      >
                        Articles
                      </span>
                      {panelContainer &&
                        panelContainer !== "authorArticlesPanel" && (
                          <span style={{ pointerEvents: "none" }}>
                            &nbsp;{"->"}&nbsp;
                          </span>
                        )}

                      {panelContainer ==
                        "authorArticlesPanelSelectCategory" && (
                          <span style={{ pointerEvents: "none" }}>
                            Filter By Category
                          </span>
                        )}

                      {panelContainer == "authorArticlesPanelSelectStatus" && (
                        <span style={{ pointerEvents: "none" }}>
                          Filter By Status
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="closeButton"
                    onClick={() => setPanelContainer(false)}
                  >
                    X
                  </div>
                </div>
                {panelContainer == "authorArticlesPanel" ? (
                  <div
                    className="differentMethods"
                    style={{
                      pointerEvents: appLoading ? "none" : "",
                      opacity: appLoading ? "0.5" : "",
                    }}
                  >
                    <div className="title">Filters</div>
                    <div
                      className="eachOption"
                      onClick={() =>
                        setPanelContainer("authorArticlesPanelSelectStatus")
                      }
                    >
                      <span>Status</span>
                      <span>
                        {selectedStatus == "all"
                          ? "All"
                          : selectedStatus == "inactive"
                            ? "Inactive"
                            : "Active"}
                      </span>
                    </div>
                    <div
                      className="eachOption"
                      onClick={() => {
                        setPanelContainer("authorArticlesPanelSelectCategory");
                      }}
                    >
                      <span>Categories</span>
                      <span>
                        {categoryNames.length > 0 ? categoryNames.join(",").length > 10 ? categoryNames.join(",").slice(0, 10) + "..." : categoryNames.join(",") : "All"}
                      </span>
                    </div>
                    <div
                      className="eachOption"
                      style={{ pointerEvents: "none", opacity: "0.5" }}
                    >
                      <span>Question:</span>
                      <span>All</span>
                    </div>
                    <div
                      className="eachOption"
                      style={{ pointerEvents: "none", opacity: "0.5" }}
                    >
                      <span>Date Range:</span>
                      <span>All</span>
                    </div>
                    <div className="title">Sort By</div>
                    <div
                      className="eachOption"
                      style={{ pointerEvents: "none", opacity: "0.5" }}
                    >
                      <span>Publishing Date:</span>
                      <span>Newest To Oldest</span>
                    </div>
                  </div>
                ) : panelContainer == "authorArticlesPanelSelectCategory" ? (
                  <div
                    className="differentMethods"
                    style={{
                      pointerEvents: appLoading ? "none" : "",
                      opacity: appLoading ? "0.5" : "",
                    }}
                  >
                    <div className="title">Select category</div>
                    {allCategoriesLoading ? (
                      <>
                        <div className="eachOption">
                          <span>
                            <Skeleton height={25} width={90} />
                          </span>
                        </div>
                        <div className="eachOption">
                          <span>
                            <Skeleton height={25} width={90} />
                          </span>
                        </div>
                      </>
                    ) : allCategories?.data?.length > 0 ? (
                      allCategories?.data?.map((eachItem, index) => {
                        return (
                          <div
                            className="eachOption"
                            key={eachItem?.title + index}
                            style={{ border: categoriesArr.includes(eachItem?._id) ? "1px solid #4b9ddc" : "" }}
                            onClick={() => {
                              // setSelectedCategory(eachItem);
                              // setPanelContainer("authorArticlesPanel");
                              theCategories(eachItem)
                            }}
                          >
                            <span>{eachItem?.title}</span>
                          </div>
                        );
                      })
                    ) : (
                      ""
                    )}
                    <div className="bottomSelect" onClick={() => openSelect()}>SelectAll</div>
                    <div className="bottomBtn" onClick={() => setPanelContainer("authorArticlesPanel")}>Back</div>
                  </div>
                ) : panelContainer == "authorArticlesPanelSelectStatus" ? (
                  <div
                    className="differentMethods"
                    style={{
                      pointerEvents: appLoading ? "none" : "",
                      opacity: appLoading ? "0.5" : "",
                    }}
                  >
                    <div className="title">Select status</div>
                    <div
                      className="eachOption"
                      onClick={() => {
                        setSelectedStatus("active");
                        setPanelContainer("authorArticlesPanel");
                      }}
                    >
                      <span>Active</span>
                    </div>
                    <div
                      className="eachOption"
                      onClick={() => {
                        setSelectedStatus("inactive");
                        setPanelContainer("authorArticlesPanel");
                      }}
                    >
                      <span>Inactive</span>
                    </div>
                    <div
                      className="eachOption"
                      onClick={() => {
                        setSelectedStatus("all");
                        setPanelContainer("authorArticlesPanel");
                      }}
                    >
                      <span>Active & Inactive</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="clearFilterButton"
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoriesArr([])
                    setCategoryNames([])
                    setSelectedStatus("");
                  }}
                  style={{
                    display:
                      panelContainer == "authorArticlesPanel" ? "" : "none",
                    pointerEvents: appLoading ? "none" : "",
                    opacity: appLoading ? "0.5" : "",
                  }}
                >
                  Clear All Filters
                </div>
              </div>
            </div>
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
        <div style={{ textAlign: "left" }}></div>
        <div style={{ textAlign: "left" }}>Status</div>
        <div style={{ textAlign: "left" }}>Question</div>
        <div style={{ textAlign: "left" }}></div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
          opacity: actionsSubDrawer
            ? actionsSubDrawer && selectedArticle === item
              ? "1"
              : "0.5"
            : "1",
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
              <Paragraph copyable={{ text: item?.title }}>
                {item?.title}
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
            width: "30px",
            height: "30px",
          }}
        />
        <div style={{ paddingLeft: "15px" }}>
          <div className="title">
            <Paragraph copyable={{ text: "--" }}>--</Paragraph>
          </div>
          <div className="subtitle">
            <Paragraph copyable={{ text: item?.email }}>
              {item?.email}
            </Paragraph>
          </div>
        </div> */}
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
              <Paragraph copyable={{ text: item?.status }}>
                {item?.status.slice(0, 1).toUpperCase() + item?.status.slice(1)}
              </Paragraph>
            </div>
            {/* <div className="subtitle">{item?.date}</div> */}
            {/* <div className="subtitle">{item?.email}</div> */}
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
              <Paragraph copyable={{ text: item?.articlesQuestionCount }}>
                {item?.articlesQuestionCount}
              </Paragraph>
            </div>
            {/* <div className="subtitle">{item?.date}</div> */}
            {/* <div className="subtitle">{item?.email}</div> */}
          </div>
        </div>
        <div className="btngrp">
          <button
            className="readbtn"
            onClick={() => clickedData(item)}
            style={{
              background: titlesData.includes(item?.title)
                ? "#4B9DDC"
                : "white",
            }}
          >
            {titlesData.includes(item?.title) ? (
              <span style={{ color: "white" }}>Selected</span>
            ) : (
              <span style={{ color: "black" }}>Select</span>
            )}
          </button>
          <button className="actionbtn">Stats</button>
          <button className="actionbtn" onClick={() => ActionClick(item)}>
            Actions
          </button>
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
        "2.5fr 2fr 1fr 2fr 3fr", // Desktop view Grid columns
        "350px 250px 250px" // Mobile view Grid columns
      )}
    </>
  );
};

export default Articles;
