import React, { useContext, useState } from "react";
import "../../../../../static/scss/subdrawer.scss";
import { GlobalContex } from "../../../../../globalContex";

import About from "./About";
import Actions from "./Actions";

const ActionIndex = ({ userSelectedPublication,selectedVideo,setSelectedVideo }) => {
  // console.log("subdrawer " + tabSelected);
  const {
    showSubDraw,
    setShowSubDraw,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
    videoActionsSubDrawer, 
    setVideoActionsSubDrawer,
    setActionsSubDrawer,
  } = useContext(GlobalContex);

  const [selectedMenu, setSelectedMenu] = useState("Actions");
  // const [] = useState(false);
  const [step, setStep] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);

  const conditionalData = () => {
    switch (selectedMenu) {
      case "About":
        return (
          // <About
          //   selectedPublication={selectedPublication}
          //   loading={loading}
          //   setLoading={setLoading}
          //   step={step}
          //   setStep={setStep}
          //   path={path}
          //   setPath={setPath}
          // />
          <div>Coming Soon</div>
        );

      case "Actions":
        return (
          <Actions
            selectedPublication={userSelectedPublication}
            loading={loading}
            setLoading={setLoading}
            step={step}
            setStep={setStep}
            path={path}
            setPath={setPath}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        );

      default:
        break;
    }
  };

  return (
    <div
      className={videoActionsSubDrawer ? "right-drawer-visible" : "right-drawer-hidden"}
      style={{ height: window.innerHeight - 123,top:46 }}
    >
      {loading ||
      step === "loading" ||
      step === "Token Expired" ||
      step == "success" ? (
        ""
      ) : (
        <div>
          {/* <div
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
          </div> */}
        </div>
      )}
      {/* {thedata} */}
      {conditionalData()}
    </div>
  );
};

export default ActionIndex;
