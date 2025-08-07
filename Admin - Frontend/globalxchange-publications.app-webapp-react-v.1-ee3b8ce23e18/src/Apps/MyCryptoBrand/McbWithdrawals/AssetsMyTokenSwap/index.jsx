import React, { useContext, useEffect, useState } from "react";
import { GlobalContex } from "../../../../globalContex";
import axios from "axios";
import "./tokenSwap.scss";
import Skeleton from "react-loading-skeleton";
import AssetsMyTokenSubDrawer from "./AssetMyTokenSubDrawer";



const AssetsMyTokenSwap = () => {
    const { selectedBrandApp, setShowSubDraw, setTheCurrency, refreshCall, setRefreshCall, theAsset, setTheAsset } = useContext(GlobalContex)
    const [assetsData, setAssetsData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    // let finalArray = []

    useEffect(() => {
        if (selectedBrandApp?.app_code) {
            setDataLoading(true);
            axios.get(`https://comms.globalxchange.io/gxb/apps/path/fees/get?app_code=${selectedBrandApp?.app_code}&select_type=withdraw`).then(res => {
                console.log("assetsData ", res.data.Apps)
                if (res.data.status) {
                    setDataLoading(false);
                    if (res.data.Apps.length > 0) {
                        setTheAsset(res.data.Apps[0].pathDetail)
                    } else {
                        setTheAsset([])
                    }
                } else {
                    setDataLoading(false);
                    setTheAsset([])
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
                            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr",
                        }}
                    >
                        <div className="dispfonts">Banker</div>
                        <div className="leftList dispfonts">From</div>
                        <div className="leftList dispfonts">To</div>
                        <div className="leftList dispfonts">Banker Fixed Fee</div>
                        <div className="leftList dispfonts">Banker Variable Fee</div>
                        <div className="leftList dispfonts">App Fixed Fee</div>
                        <div className="leftList dispfonts">App Variable Fee</div>
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
                        theAsset?.length > 0 ? (
                            theAsset.map((item) => {
                                return (
                                    <div
                                        className="listDataGrid"
                                        style={{
                                            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr",
                                        }}
                                        onClick={() => (setShowSubDraw(true), setTheCurrency(item))}

                                    >
                                        <div className="tokenApp">
                                            <div className="title thefont">
                                                {item.banker}
                                                &nbsp;</div>
                                            <div className="subtitle thesubfont">{item.path_id}</div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title thefont">
                                                {item.from_currency}
                                            </div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title thefont">{item.to_currency}</div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title thefont">${item.banker_fixed_fee ? item.banker_fixed_fee.toFixed(2) : "0.00"}</div>
                                        </div>
                                        <div className="leftList">
                                            <div className="title thefont">{item.banker_trade_fee ? item.banker_trade_fee.toFixed(2) : "0.00"}%</div>
                                        </div>

                                        <div className="leftList">
                                            <div className="title thefont">${item.gx_fixed_fee ? item.gx_fixed_fee.toFixed(2) : "0.00"}</div>
                                        </div>
                                        <div className="leftList">
                                            <div className="title thefont">{item.gx_trade_fee ? item.gx_trade_fee.toFixed(2) : "0.00"}%</div>
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
                                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr",
                                    }}
                                >
                                    <div className="tokenApp">
                                        <Skeleton width={100} />
                                        <Skeleton width={250} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
                                        <Skeleton width={100} />
                                    </div>
                                    <div className="leftList">
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