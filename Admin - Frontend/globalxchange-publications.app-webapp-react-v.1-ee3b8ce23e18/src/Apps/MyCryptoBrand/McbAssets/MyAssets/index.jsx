import React, { useEffect, useContext } from "react"
import "./myAssets.scss"
import axios from "axios"
import { GlobalContex } from "../../../../globalContex"
import { useState } from "react"
import Skeleton from "react-loading-skeleton";
import MyAssetsSubDrawer from "./MyAssetsSubDrawer"


const MyAssets = () => {
    const { selectedBrandApp, setShowSubDraw ,setCoinIIRD } = useContext(GlobalContex)
    const [AppsData, setAppsData] = useState(null)
    const [dataLoading, setDataLoading] = useState(false);
    const [coin, setCoin] = useState("")

    useEffect(() => {
        setDataLoading(true)
        axios.get(`https://comms.globalxchange.io/gxb/apps/get?app_code=${selectedBrandApp?.app_code}`)
            .then((res) => {
                setDataLoading(false);
                if (res.data.status) {
                    if (res.data.apps.length > 0) {
                           setCoinIIRD(res.data.apps[0].irdData)
                        if (typeof res.data.apps[0].coins == "string") {
                            setAppsData(res.data.apps[0].coins.split(" "))
                        } else {
                            setAppsData(res.data.apps[0].coins)
                        }
                    } else {
                        setAppsData([])
                    }
                } else {
                    setAppsData([])
                }
            })
    }, [selectedBrandApp])
   
    return (
        <>
            <div className="desktopWrapper">
                <div style={{ width: "100%" }}>
                    <div
                        className="listGrid"                                      >
                        <div>Asset</div>
                    </div>
                </div>
                <div style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    height: window.innerHeight - 175,
                    overflowY: "scroll",

                }}>
                    {!dataLoading ? (
                        AppsData?.length > 0 ? (
                            AppsData?.map((item) => {
                                return (
                                    <div className="listDataGrid" onClick={() => (setShowSubDraw(true), setCoin(item))}>
                                        <div className="leftList">
                                            <div className="title">
                                                {item}
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
                                No Assets Found
                            </div>
                        )
                    ) : (
                        Array(10).fill("").map((item) => {
                            return (
                                <div className="listDataGrid">
                                    <div className="leftList">
                                        <div className="title">
                                            <Skeleton width={100} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <MyAssetsSubDrawer coin = {coin} AppsData = {AppsData}/>
                </div>
            </div>
        </>
    )
}

export default MyAssets