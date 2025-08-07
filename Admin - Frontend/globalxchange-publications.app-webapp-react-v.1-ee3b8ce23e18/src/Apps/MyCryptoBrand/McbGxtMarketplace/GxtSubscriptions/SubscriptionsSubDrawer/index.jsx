import React, { useEffect, useState, useContext } from "react";
import "./subdrawer.scss"
import { GlobalContex } from "../../../../../globalContex";
import Actions from "./actions"
import Skeleton from "react-loading-skeleton";

const SubscriptionsSubDrawer = () => {
    const { showSubDraw, theCurrency, setTheCurrency, selectedBrandApp, selectedSubs, setSelectedSubs } = useContext(GlobalContex);
    const [selectedMenu, setSelectedMenu] = useState("Actions");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(null);
    const [path, setPath] = useState([]);

    let thedisp

    if (step === "loading" || step === "success") {
        thedisp = "none"
    } else {
        thedisp = ""
    }

    console.log("currency ", theCurrency)



    const conditionalData = () => {
        switch (selectedMenu) {
            case "Actions":
                return (
                    <Actions
                        loading={loading}
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        path={path}
                        setPath={setPath}
                    />
                );
            default:
                break;
        }
    };

    return (
        <div className={showSubDraw ? "right-drawer-visible" : "right-drawer-hidden"}
            style={{ height: window.innerHeight - 123, top:46 }}
        >
            <div className="navs-disp" style={{ display: thedisp }}>
                <div
                    className={
                        selectedMenu === "About" ? "navs-data active-tab" : "navs-data"
                    }
                >
                    <div>About</div>
                </div>
                <div onClick={(e) => setSelectedMenu("Actions")}
                    className={
                        selectedMenu === "Actions" ? "navs-data active-tab" : "navs-data"
                    }
                >
                    <div>Actions</div>
                </div>
            </div>
            {conditionalData()}
        </div>
    )
}

export default SubscriptionsSubDrawer