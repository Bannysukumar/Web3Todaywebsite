
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
import Courses from "./Courses";

const ClassContent = () => {
    useEffect(() => {
        setTabSelected("Courses");
    }, []);
    const tabs = ["Courses"]

    const { setShowSubDraw, tabSelected, setTabSelected } =
        useContext(GlobalContex);

    const tabComponent = useMemo(() => {
        switch (tabSelected) {
            case "Courses":
                return <Courses />;

            // case "My TokenSwap Paths":
            //   return <AssetsMyTokenSwap />
            // case "All TokenSwap Paths":
            //   return <AllTokenSwap />

            default:
                return null;
        }
    }, [tabSelected]);

    return (
        <div>
            <NavBar
                tabs={tabs}
                tabSelected={tabSelected}
                setTabSelected={setTabSelected}
                enabledFilters={[true, true, true, false, false, true]}
            />

            {tabComponent}
        </div>
    );
};

export default ClassContent;
