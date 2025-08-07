import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";
import ActionIndex from "./AffiliateSubDrawer/ActionIndex";

const Affiliate = () => {
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
        globalSearch,
        selectedLevel,
        setSelectedLevel,
        selectedIndex,
        setSelectedIndex,
        affiliateDrawer,
        setAffiliateDrawer,
    } = useContext(GlobalContex);

    const [affiliateData, setAffiliateData] = useState(["0", "0", "0", "0", "0"]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://publications.apimachine.com/publication/${selectedPublication?._id}`
            )
            // .get(`https://publications.apimachine.com/article`)
            .then(({ data }) => {
                console.log("ddslevel", data.data.ddsLevel);
                if (data.data.ddsLevel.length === 0) {
                    data.data.ddsLevel = ["0", "0", "0", "0", "0"];
                }
                setAffiliateData(data.data.ddsLevel);
                setLoading(false);
            });
    }, [bankerEmail, refetchAppData, selectedPublication]);

    const ActionClick = (item, index) => {
        setSelectedLevel(item);
        setSelectedIndex(index);
        setAffiliateDrawer(true)
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
                                data.map((item, index) => {
                                    return contentSection(item, index, "listDataGrid", desktopDataGrid);
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
                                    No Affiliate rewards Found
                                </div>
                            )
                        ) : (
                            loadingSection("listDataGrid", desktopDataGrid)
                        )}
                        <ActionIndex
                            affiliateData={affiliateData}
                            setAffiliateData={setAffiliateData}
                        />
                        {/* <ArticlesSubDrawer
                            selectedArticle={selectedArticle}
                            setSelectedArticle={setSelectedArticle}
                        />
                        <ActionIndex
                            selectedArticle={selectedArticle}
                            setSelectedArticle={setSelectedArticle} /> */}
                    </div>
                </div>

                {/* <div className="mobileWrapper">
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
                            <div>data</div>
                        </div>
                    ) : (
                        <AppsSubDrawer allApps={allApps} />
                        <div>data</div>
                    )}
                </div> */}
            </>
        );
    };

    // Change these three Sections according to the design

    const headerSection = (gridClass, gridValues) => {
        return (
            <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
                <div>Level</div>
                <div style={{ textAlign: "left" }}>Frequency</div>
                <div style={{ textAlign: "left" }}>Amount</div>
            </div>
        );
    };

    const contentSection = (item, index, gridClass, gridValues) => {
        return (
            <div

                className={gridClass}
                style={{
                    gridTemplateColumns: gridValues,
                    display: globalSearch ? index.toString() === globalSearch.toString() ? "" : "none" : "",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ paddingLeft: "15px" }}>
                        <div className="title">
                            {index}
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
                    <div className="title">
                        Per Signup
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
                            {affiliateData[index] ? affiliateData[index] : "0"}
                        </div>
                        {/* <div className="subtitle">{item?.date}</div> */}
                        {/* <div className="subtitle">{item?.email}</div> */}
                    </div>
                </div>
                <div className="btngrp">
                    <button className="readbtn" onClick={() => ActionClick(item, index)}>Edit</button>
                    {/* <button className="actionbtn" onClick={(e) => {
                setSelectedArticle(item);
                setActionsSubDrawer(true);
              }}>Actions</button> */}
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
                affiliateData,
                loading,
                "2.5fr 2fr 1fr 2fr", // Desktop view Grid columns
                "350px 250px 250px" // Mobile view Grid columns
            )}
        </>
    );
};

export default Affiliate;