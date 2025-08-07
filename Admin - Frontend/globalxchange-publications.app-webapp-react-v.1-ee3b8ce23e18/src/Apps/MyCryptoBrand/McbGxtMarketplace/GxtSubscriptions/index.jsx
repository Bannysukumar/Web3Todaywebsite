import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";
import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import "../marketplace.scss"
import SubscriptionsSubDrawer from "./SubscriptionsSubDrawer";
import Item from "antd/lib/list/Item";

const GxtSubscriptions = () => {

    const { bankerEmail, setShowSubDraw,  selectedSubs,
        setSelectedSubs } = useContext(GlobalContex)

    const [subscriptionData, setSubscriptionData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        setDataLoading(true);
        axios
            .get(`https://comms.globalxchange.io/gxb/product/get?product_created_by=mycryptobrandsocial@gmail.com`)
            .then((res) => {
                setDataLoading(false);
                console.log(res.data, "subscription-data");
                // let data = res.data.users;
                // let output = data.slice(0, 30);
                setSubscriptionData(res.data.products);

            });
    }, []);


    return (
        <div className="desktopWrapper">
            <div style={{ width: "100%" }}>
                <div
                    className="listGrid"
                    style={{
                        gridTemplateColumns: "1.5fr 1.5fr 1.2fr 1.2fr 1.2fr",
                    }}
                >
                    <div>Brand</div>
                    <div className="leftList">Identifier</div>
                    <div className="leftList ">First Month </div>
                    <div className="leftList ">Monthly</div>
                    <div className="leftList ">Staking</div>
                </div>
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
                    subscriptionData?.length > 0 ? (
                        subscriptionData.map((item) => {
                            return (
                                <div onClick={() => (setShowSubDraw(true),setSelectedSubs(item))}
                                    className="listDataGrid" style={{
                                        gridTemplateColumns: "1.5fr 1.5fr 1.2fr 1.2fr 1.2fr",
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src={item.product_icon ? item.product_icon : defaultImg}
                                            alt=""
                                            style={{
                                                borderRadius: "50%",
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        // className={classNames.icon}
                                        />
                                        <div style={{ paddingLeft: "15px" }}>
                                            <div className="title">{item.product_name} &nbsp;</div>
                                            <div className="subtitle">Created By <span>
                                                <img
                                                    src={item.banker_metadata.profilePicURL ? item.banker_metadata.profilePicURL : defaultImg} width="10px" height="10px" />
                                            </span>&nbsp;
                                                <span>{item.banker_metadata.displayName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="leftList">
                                        <div>
                                            <div className="title">{item.product_code} &nbsp;</div>
                                            <div className="subtitle">{item.product_id}</div>
                                        </div>
                                    </div>
                                    <div className="leftList">
                                        <div>
                                            <div className="title">{item?.first_purchase?.price ? parseInt(item?.first_purchase?.price).toFixed(2) : "NA"} &nbsp;</div>
                                            <div className="subtitle">{item?.first_purchase?.coin ? item?.first_purchase?.coin : "NA"}</div>
                                        </div>
                                    </div>
                                    <div className="leftList">
                                        <div>
                                            <div className="title">{item?.billing_cycle?.monthly?.price ? parseInt(item?.billing_cycle?.monthly?.price).toFixed(2) : "NA"} &nbsp;</div>
                                            <div className="subtitle">{item?.billing_cycle?.monthly?.coin ? item?.billing_cycle?.monthly?.coin : "NA"}</div>
                                        </div>
                                    </div>
                                    <div className="leftList">
                                        <div>
                                            <div className="title">{item?.staking_details?.amount ? parseInt(item?.staking_details?.amount).toFixed(2) : "NA"} &nbsp;</div>
                                            <div className="subtitle">{item?.staking_details?.coin ? item?.staking_details?.coin : "NA"}</div>
                                        </div>
                                    </div>
                                </div>
                            )
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
                    Array(10)
                        .fill("")
                        .map((item, i) => {
                            return (
                                <div
                                    className="listDataGrid post"
                                    style={{
                                        width: "100%",
                                        // height: "120px",
                                        gridTemplateColumns:
                                            "1.5fr 1.5fr 1.2fr 1.2fr 1.2fr",
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
                                    {Array(4).fill("").map((item) => {
                                        return (
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
                                        )
                                    })}
                                </div>
                            );
                        })
                )}
                <SubscriptionsSubDrawer />
            </div>
        </div>

    )
}

export default GxtSubscriptions