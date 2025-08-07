import React, { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
import AssetsMyTokenSwap from "./AssetsMyTokenSwap";
import AllTokenSwap from "./AssetsAllTokenSwap";


const McbTokenSwap = () => {
    const tabs = ["My TokenSwap Paths", "All TokenSwap Paths"];
    const [tabSelected, setTabSelected] = useState("My TokenSwap Paths")

    const { setShowSubDraw } = useContext(GlobalContex);

    const tabComponent = useMemo(() => {
        switch (tabSelected) {
            case "My TokenSwap Paths":
                return <AssetsMyTokenSwap />
            case "All TokenSwap Paths":
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

export default McbTokenSwap