import React, { useMemo } from "react";
import { useState } from "react";
// import { useContext } from "react";
// import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
// import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
import AssetsMyTokenSwap from "./AssetsMyTokenSwap";
import AllTokenSwap from "./AssetsAllTokenSwap";


const McbWithdrawals = () => {
    const tabs = ["My Withdrawal Paths", "All Withdrawal Paths"];
    const [tabSelected, setTabSelected] = useState("My Withdrawal Paths")

    // const { setShowSubDraw } = useContext(GlobalContex);

    const tabComponent = useMemo(() => {
        switch (tabSelected) {
            case "My Withdrawal Paths":
                return <AssetsMyTokenSwap />
            case "All Withdrawal Paths":
                return <AllTokenSwap />
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
                enabledFilters={[true, true, true, false, false,true]}
            />
            {tabComponent}
        </div>
    );
}

export default McbWithdrawals