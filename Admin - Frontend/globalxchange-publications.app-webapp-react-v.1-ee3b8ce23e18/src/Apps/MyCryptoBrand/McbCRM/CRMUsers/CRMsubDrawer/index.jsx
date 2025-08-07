import React, { useContext, useState } from "react";
import { GlobalContex } from "../../../../../globalContex";
import "./subdrawer.scss"
import Actions from "./Actions";

const CRMsubDrawer = () => {
    const {
        showSubDraw,
        setShowSubDraw,
        selectedMcbDashboardApp,
        setSelectedMcbDashboardApp,
        crmUser
    } = useContext(GlobalContex);

    const [selectedMenu, setSelectedMenu] = useState("Actions");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(null);
    const [path, setPath] = useState([]);

    let disp
    if(step === "loading" || step === "success"){
        disp = "none"
    }else {
        disp = ""
    }

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

    console.log("CRM-user " , crmUser)
    return (
        <div
        className={showSubDraw ? "right-drawer-visible" : "right-drawer-hidden"}
        style={{ height: window.innerHeight - 123  }}
      >
        {!loading && step !== "Token Expired" ? (
          <div className="navs-disp" style={{display:disp}}>
            <div
              onClick={(e) => setSelectedMenu("About")}
              className={
                selectedMenu === "About" ? "navs-data active-tab" : "navs-data"
              }
            >
              <div>About</div>
            </div>
            <div
              onClick={(e) => setSelectedMenu("Actions")}
              className={
                selectedMenu === "Actions" ? "navs-data active-tab" : "navs-data"
              }
            >
              <div>Actions</div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {thedata} */}
        {conditionalData()}
      </div>
    )
}

export default CRMsubDrawer