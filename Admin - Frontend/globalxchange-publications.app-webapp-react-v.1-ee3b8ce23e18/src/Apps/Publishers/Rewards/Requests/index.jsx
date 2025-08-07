import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";
import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import { Typography } from "antd";
import "./requests.scss";
import ActionIndex from "./RequestsSubDrawer/ActionIndex";



const Requests = () => {
    const { Paragraph } = Typography;
    const {
        bankerEmail,
        selectedPublication,
        payoutDrawer,
        refetchPayout,
        setRefetchPayout,
        showSubDraw,
        setShowSubDraw,
        globalSearch,
        setPayoutDrawer,
        requestsDrawer,
        setRequestsDrawer,
        refetchRequest,
        setRefetchRequest,
        requestText,
        setRequestText,
        selectedFilterRequest,
        setSelectedFilterRequest,
    } = useContext(GlobalContex);

    const [loading, setLoading] = useState(false);
    const [allRequests, setAllRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        if (bankerEmail) {
            setLoading(true);
            axios
                .get(
                    `https://publications.apimachine.com/pointsrequest/list?publication_id=${selectedPublication._id}&is_approved=${selectedFilterRequest.toLowerCase()}`
                )
                .then(({ data }) => {
                    console.log("data", data)
                    if (data.status) {
                        setAllRequests(data.data);
                        setSelectedRequest(data.data[0]);
                    } else {
                        setAllRequests([]);
                        setSelectedRequest(null);
                    }
                    setLoading(false);
                });
        }
    }, [bankerEmail, refetchRequest, selectedPublication, selectedFilterRequest, setSelectedFilterRequest]);

    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }

        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function getDisplayDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const suffix = getOrdinalSuffix(day);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return formattedDate.replace(/\d+/, `${day}${suffix}`);
    }

    function getDisplayTime(time) {
        const dateObj = new Date(time);
        const timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata' };
        const formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions);
        return formattedTime;
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
                                    item?.userDetail[0].username
                                        ?.toLowerCase()
                                        .includes(globalSearch.toLowerCase())||
                                        item?.userDetail[0].email
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
                        <ActionIndex
                            selectedRequest={selectedRequest}
                            setSelectedRequest={setSelectedRequest}
                        />
                    </div>
                </div>

                <div className="mobileWrapper">
                    {!showSubDraw ? (
                        <div style={{ overflowY: "scroll", height: "80vh" }}>
                            {headerSection("listGridMobile", mobileDataGrid)}

                            {!loading ? (
                                allRequests?.length > 0 ? (
                                    allRequests.map((item, index) => {
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
                            <ActionIndex
                                selectedRequest={selectedRequest}
                                setSelectedRequest={setSelectedRequest}
                            />
                        </div>
                    ) : (
                        <ActionIndex
                            selectedRequest={selectedRequest}
                            setSelectedRequest={setSelectedRequest}
                        />
                    )}
                </div>
            </>
        );
    };

    // Change these three Sections according to the design

    const headerSection = (gridClass, gridValues) => {
        return (
            <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
                <div>User</div>
                <div style={{ textAlign: "left" }}>Date</div>
                <div style={{ textAlign: "left" }}>Amount</div>
                <div style={{ textAlign: "left" }}>Rate</div>
                <div style={{ textAlign: "left", display: selectedFilterRequest === "completed" ? "" : "none" }}>{selectedFilterRequest === "completed" ? "Approved" : ""}</div>
                <div style={{ textAlign: "left", display: selectedFilterRequest === "cancelled" ? "" : "none" }}>{selectedFilterRequest === "cancelled" ? "Rejected" : ""}</div>
                <div style={{ textAlign: "left" }}></div>
            </div>
        );
    };

    const contentSection = (item, gridClass, gridValues) => {
        // const date = new Date(item?.createdAt);
        // const options = { month: 'long', day: 'numeric', year: 'numeric' };
        // const formattedDate = date.toLocaleDateString('en-US', options);

        // const day = date.getDate();
        // const suffix = getOrdinalSuffix(day);
        // const formattedDateWithSuffix = formattedDate.replace(/\d+/, `${day}${suffix}`);

        // const timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata' };
        // const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        return (
            <div

                className={gridClass}
                style={{
                    gridTemplateColumns: gridValues,
                    opacity: requestsDrawer ? requestsDrawer && selectedRequest === item ? "1" : "0.5" : "1"
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={item?.userDetail ? item?.userDetail[0]?.profile_pic : defaultImg}
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
                            <Paragraph copyable={{ text: item?.userDetail[0].username }}>{item?.userDetail[0].username}</Paragraph>
                        </div>
                        <div className="subtitle">
                            <Paragraph copyable={{ text: item?.userDetail[0].email }}>
                                {item?.userDetail[0].email?.substring(0, 10)}...{" "}
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

                    <div>
                        <div className="title">
                            <Paragraph
                                copyable={{
                                    text: getDisplayDate(item?.createdAt)
                                }}
                            >
                                {getDisplayDate(item?.createdAt)}
                            </Paragraph>
                        </div>
                        <div className="subtitle">
                            <Paragraph copyable={{ text: getDisplayTime(item?.createdAt) }}>
                                {getDisplayTime(item?.createdAt)} IST
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

                    <div>
                        <div className="title">
                            <Paragraph
                                copyable={{
                                    text: item?.balance_requested
                                }}
                            >
                                {item?.balance_requested} {item?.ConvertionDetail ? item?.ConvertionDetail[0]?.payoutCurrency : "--"}
                            </Paragraph>
                        </div>
                        <div className="subtitle">
                            <Paragraph copyable={{ text: item?.points_requested }}>
                                {item?.points_requested} W3T
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
                        src={item?.app_code ? item?.app_code[2]?.app_icon : defaultImg}
                        alt=""
                        style={{
                            // borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                        }}
                    /> */}
                    <div>
                        <div className="title">
                            <Paragraph copyable={{ text: `1.00 ${item?.ConvertionDetail ? item?.ConvertionDetail[0]?.payoutCurrency : "--"}` }}>
                                {`1.00 ${item?.ConvertionDetail ? item?.ConvertionDetail[0]?.payoutCurrency : "--"}`}
                            </Paragraph>
                        </div>
                        <div className="subtitle">
                            <Paragraph copyable={{ text: item?.ConvertionDetail ? parseInt(1 / `${item.ConvertionDetail[0]?.payoutConversionRate}`) : "--" }}>
                                {item?.ConvertionDetail ? parseInt(1 / (item.ConvertionDetail[0]?.payoutConversionRate)) : "--"} W3T
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
                    <div style={{ textAlign: "right", display: selectedFilterRequest === "pending" ? "flex" : "none" }}>
                        <div className="title approvebtn" onClick={(e) => {
                            setSelectedRequest(item);
                            setRequestsDrawer(true);
                            setRequestText("approve")
                        }}>
                            Approve
                        </div>
                        <div className="title rejectbtn" style={{ marginLeft: "4px" }} onClick={(e) => {
                            setSelectedRequest(item);
                            setRequestsDrawer(true);
                            setRequestText("reject")
                        }}>
                            Reject
                        </div>
                        </div>
                        <div style={{ display: selectedFilterRequest === "pending" ? "none" : "" }}>
                            <div className="title">
                                <Paragraph
                                    copyable={{
                                        text: getDisplayDate(item?.updatedAt)
                                    }}
                                >
                                    {getDisplayDate(item?.updatedAt)}
                                </Paragraph>
                            </div>
                            <div className="subtitle">
                                <Paragraph copyable={{ text: getDisplayTime(item?.updatedAt) }}>
                                    {getDisplayTime(item?.updatedAt)} IST
                                </Paragraph>
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
                    <div style={{ textAlign: "center", paddingLeft: "3px" }}>
                        <div className="title rejectbtn">
                            Reject
                        </div>
                    </div>
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
                allRequests,
                loading,
                "1fr 1fr 1fr 1fr 1.3fr", // Desktop view Grid columns
                "250px 250px 200px 100px 200px" // Mobile view Grid columns
            )}
        </>
    );
}

export default Requests;