import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/defaultImg.svg";
// import AppsSubDrawer from "./ArticlesSubDrawer";
// import "./dashboardApps.scss";

import { Typography } from "antd";
// import ArticlesSubDrawer from "./ArticlesSubDrawer";
// import ActionIndex from "./ArticlesSubDrawer/ActionIndex";

const Courses = () => {
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
        refetchCourses,
        getDisplayDate
    } = useContext(GlobalContex);
    const [allCourses, setAllCourses] = useState([]);
    const [allApps1, setAllApps1] = useState([]);
    const [appLoading, setAppLoading] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        setAppLoading(true);
        let pubdata;
        if (selectedPublication) {
            pubdata = selectedPublication._id
        } else {
            pubdata = "63a1a2c60e46260e093cf260"
        }
        axios
            .get(
                `https://publications.apimachine.com/courses/list?publication_id=${pubdata}`
            )
            .then(({ data }) => {
                setAppLoading(false);
                if (data.status) {
                    setAllCourses(data.data);
                    // setAppLoading(false);
                }
                // setAppLoading(false);
            });
    }, [
        bankerEmail,
        selectedPublication,
        refetchCourses
    ]);

    useEffect(() => {
        console.log('State updated:', selectedArticle);
    }, [selectedArticle]);

    const ActionClick = (item) => {
        setSelectedArticle(item);
        setActionsSubDrawer(true)
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
                        {/* <ActionIndex
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            /> */}
                    </div>
                </div>

                <div className="mobileWrapper">
                    {!showSubDraw ? (
                        <div style={{ overflowY: "scroll", height: "80vh" }}>
                            {headerSection("listGridMobile", mobileDataGrid)}

                            {!appLoading ? (
                                allCourses?.length > 0 ? (
                                    allCourses.map((item, index) => {
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
                            {/* <AppsSubDrawer allApps={allApps} /> */}
                        </div>
                    ) : (
                        // <AppsSubDrawer allApps={allApps} />
                        <></>
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
                <div style={{ textAlign: "left" }}>Cost</div>
                <div style={{ textAlign: "left" }}>Created On</div>
                <div style={{ textAlign: "left" }}>Sections</div>
                <div style={{ textAlign: "left" }}>Videos</div>
                <div style={{ textAlign: "left" }}>Purchases</div>
                <div style={{ textAlign: "left" }}>Earnings</div>

            </div>
        );
    };

    const contentSection = (item, gridClass, gridValues) => {
        return (
            <div
                className={gridClass}
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
        /> */}
                    <div>
                        <div className="title">
                            <Paragraph copyable={{ text: item?.cost }}>{item?.cost}</Paragraph>
                        </div>
                        <div className="subtitle">
                            <Paragraph copyable={{ text: item?.currency }}>
                                {item?.currency}
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
                    <div style={{ textAlign: "right" }}>
                        <div className="title">
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
                    <div style={{ textAlign: "right" }}>
                        <div className="title">
                            <Paragraph copyable={{ text: item?.section_count }}>
                                {item?.section_count}
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
                    <div style={{ textAlign: "right" }}>
                        <div className="title">
                            <Paragraph copyable={{ text: item?.section_video_count }}>
                                {item?.section_video_count}
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
                    <div style={{ textAlign: "right" }}>
                        <div className="title">
                            <Paragraph copyable={{ text: 0 }}>
                                0
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
                    <div style={{ textAlign: "right" }}>
                        <div className="title">
                            <Paragraph copyable={{ text: "0.00 INR" }}>
                                0.00 INR
                            </Paragraph>
                        </div>
                    </div>
                </div>
                {/* <div className="btngrp">
                    <button
                        className="readbtn"
                        onClick={() => window.open(`https://web3today.io/news/article/${item.custom_url}`)}
                    >
                        Read
                    </button>
                    <button
                        className="actionbtn"
                    >Stats</button>
                    <button
                        className="actionbtn"
                        onClick={() => ActionClick(item)}
                    >
                        Actions
                    </button>
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
                            {/* <Skeleton
                                className="dp"
                                circle
                                width={50}
                                height={50}
                                style={{ marginRight: "20px" }}
                            /> */}
                            <div className="userDetail">
                                <Skeleton width={100} />
                                <Skeleton width={120} style={{ height: "10px" }} />
                            </div>
                        </div>
                        {Array(5).fill("").map((item, i) => {
                            return <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <div className="userDetail">
                                    <Skeleton width={80} />
                                </div>
                            </div>
                        })}
                    </div>
                );
            });
    };

    return (
        <>
            {conditionalResposiveView(
                allCourses,
                appLoading,
                "2.3fr 1.2fr 1.7fr 0.8fr 0.8fr 0.8fr 1fr", // Desktop view Grid columns
                "350px 250px 250px" // Mobile view Grid columns
            )}
        </>
    );
};

export default Courses;
