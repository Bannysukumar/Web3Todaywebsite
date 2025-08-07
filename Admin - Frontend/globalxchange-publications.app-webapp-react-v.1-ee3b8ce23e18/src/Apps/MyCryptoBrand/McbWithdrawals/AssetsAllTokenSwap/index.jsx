import React, { useEffect, useState, useContext } from "react";
import "./allTokenSwap.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { GlobalContex } from "../../../../globalContex";
import AllTokenSwapSubDrawer from "./AssetsAllTokenSwapSubDrawer";


function AllTokenSwap() {
    const [TokensData, setTokensData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);
    const { showSubDraw, setShowSubDraw, theCurrency, setTheCurrency } = useContext(GlobalContex);

    useEffect(() => {
        setDataLoading(true);
        axios.get(`https://comms.globalxchange.io/coin/vault/service/payment/paths/get?select_type=withdraw&paymentMethod=vault`).then(res => {
            console.log("tokensData ", res.data)
            if (res.data.status) {
                setDataLoading(false);
                if (res.data.paths.length > 0) {
                    setTokensData(res.data.paths)
                    console.log("Tokens  ", res.data.paths[0])
                } else {
                    setDataLoading(false)
                    setTokensData([])
                }
            } else {
                setDataLoading(false);
                setTokensData([])
            }
        })
    }, [])
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

                    }}>
                    {!dataLoading ? (
                        TokensData?.length > 0 ? (
                            TokensData.map((item) => {
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
                    <AllTokenSwapSubDrawer />
                </div>
            </div>
        </>
    )
}

export default AllTokenSwap