import React, { useContext, useEffect, useState } from "react";
import { GlobalContex } from "../../../../globalContex";
import axios from "axios";
import "./tokenSwap.scss";
import Skeleton from "react-loading-skeleton";
import AssetsMyTokenSubDrawer from "./AssetMyTokenSubDrawer";

const AssetsMyTokenSwap = () => {
    const { selectedBrandApp, setShowSubDraw, setTheCurrency, refreshCall, setRefreshCall } = useContext(GlobalContex)
    const [assetsData, setAssetsData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    // let finalArray = []

    useEffect(() => {
        if (selectedBrandApp?.app_code) {
            setDataLoading(true);
            axios.get(`https://comms.globalxchange.io/gxb/apps/path/fees/get?app_code=${selectedBrandApp?.app_code}`).then(res => {
                console.log("assetsData ", res.data.Apps)
                if (res.data.status) {
                    setDataLoading(false);
                    if (res.data.Apps.length > 0) {
                        setAssetsData(res.data.Apps[0].pathDetail)
                    } else {
                        setAssetsData([])
                    }
                } else {
                    setDataLoading(false);
                    setAssetsData([])
                }
            })
        }
    }, [selectedBrandApp])

  


    return (
        <>
            <div className="desktopWrapper">
                <div style={{ width: "100%" }}>
                    <div
                        className="listGrid"
                        style={{
                            gridTemplateColumns: "1.5fr 1.5fr 3.5fr 1.5fr 1.5fr 0.2fr",
                        }}
                    >
                        <div>From</div>
                        <div style={{ textAlign: "left" }}>To</div>
                        <div style={{ textAlign: "left" }}>Path ID</div>
                        <div>Fixed Fee</div>
                        <div>Variable Fee</div>
                    </div>
                </div>


                <div
                    style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        height: window.innerHeight - 175,
                        overflowY: "scroll",

                    }}
                >
                    {!dataLoading ? (
                        assetsData?.length > 0 ? (
                            assetsData.map((item) => {
                                return (
                                    <div
                                        className="listDataGrid"
                                        style={{
                                            gridTemplateColumns: "1.5fr 1.5fr 3.5fr 1.5fr 1.5fr 0.2fr",
                                        }}
                                        onClick={() => (setShowSubDraw(true), setTheCurrency(item))}

                                    >
                                        <div className="leftList">
                                            <div className="title">
                                                {item.from_currency}
                                            </div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title">
                                                {item.to_currency}
                                            </div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title">{item.path_id}</div>
                                        </div>

                                        <div>
                                            <div className="title">${item.app_trade_fee? item.app_trade_fee.toFixed(2) : "0.00"}</div>
                                        </div>
                                        <div>
                                            <div className="title">{item.app_fixed_fee ? item.app_fixed_fee.toFixed(2) : "0.00"}%</div>
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
                        Array(10).fill("").map((item) => {
                            return (
                                <div
                                    className="listDataGrid"
                                    style={{
                                        gridTemplateColumns: "1.5fr 1.5fr 3.5fr 1.5fr 1.5fr 0.2fr",
                                    }}
                                >
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={350} />
                                    </div>
                                    <div>
                                        <Skeleton width={100} />
                                    </div>
                                    <div>
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <AssetsMyTokenSubDrawer />
                </div>
            </div>
        </>

    )
}

export default AssetsMyTokenSwap