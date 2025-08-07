import React, { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import McbTokenWithdrawals from "./McbTokenWithdrawals";
import McbTokenDeposits from "./McbTokenDeposits"
import "../../../static/scss/list.scss";
import "./tokenhash.scss"
// import AssetsMyTokenSwap from "./AssetsMyTokenSwap";
// import AllTokenSwap from "./AssetsAllTokenSwap";


const McbTokenHash = () => {
    const tabs = ["Withdrawals", "Deposits"];
    const [tabSelected, setTabSelected] = useState("Withdrawals")

    const { setShowSubDraw } = useContext(GlobalContex);

    const tabComponent = useMemo(() => {
        switch (tabSelected) {
            case "Withdrawals":
                return <McbTokenWithdrawals />
            case "Deposits":
                return <McbTokenDeposits/>
            // case "All TokenSwap Paths":
            //     return <AllTokenSwap />
            default:
                return null;
        }
    }, [
        tabSelected,
    ]);


    return (
        <div>
            <NavBar
                tabs={tabs}
                tabSelected={tabSelected}
                setTabSelected={setTabSelected}
                enabledFilters={[true, true, true, true, true , true]}
            />
            {tabComponent}
        </div>
    );
}

export default McbTokenHash