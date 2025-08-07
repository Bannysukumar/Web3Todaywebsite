import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";
import ActionIndex from "./PayoutsSubDrawer/ActionIndex";

const Payouts = () => {
    const {
        bankerEmail,
        selectedPublication,
        payoutDrawer,
        refetchPayout,
        setRefetchPayout,
        setPayoutDrawer
    } = useContext(GlobalContex);

    const [payoutsData, setPayoutsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayout, setSelectedPayout] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://publications.apimachine.com/publication/${selectedPublication?._id}`
            )
            .then(({ data }) => {
                console.log(data.data, "publication-data");
                setPayoutsData(data.data);
                setLoading(false);
            });
    }, [bankerEmail, refetchPayout, selectedPublication]);

    const ActionClick = (item) => {
        setPayoutDrawer(true);
        setSelectedPayout(item);
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
                            data ? (
                                <div style={{ width: "100%" }}>
                                    {contentSection(data, "listDataGrid", desktopDataGrid)}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "60vh",
                                    }}
                                >
                                    No Payouts data Found
                                </div>
                            )
                        ) : (
                            loadingSection("listDataGrid", desktopDataGrid)
                        )}
                        <ActionIndex
                            selectedPayout={selectedPayout}
                            setSelectedPayout={setSelectedPayout}
                        />

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
                <div>Payout Currency</div>
                {/* <div style={{ textAlign: "left" }}>Frequency</div> */}
                <div style={{ textAlign: "left" }}>Rate</div>
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
                    <div style={{ paddingLeft: "15px" }}>
                        <div className="title">
                            {item?.payoutCurrency ? item?.payoutCurrency : "Not Set"}
                        </div>
                    </div>

                </div>

                {/* <div
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
                </div> */}
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
                            {item?.payoutConversionRate ? parseFloat(item?.payoutConversionRate).toFixed(4) : "Not Set"}
                        </div>
                    </div>
                </div>
                <div className="btngrp">
                    <button className="readbtn" onClick={() => ActionClick(item)}>Edit</button>


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
                payoutsData,
                loading,
                "2.5fr 2fr 2fr", // Desktop view Grid columns
                "350px 250px 250px" // Mobile view Grid columns
            )}
        </>
    );
}

export default Payouts;