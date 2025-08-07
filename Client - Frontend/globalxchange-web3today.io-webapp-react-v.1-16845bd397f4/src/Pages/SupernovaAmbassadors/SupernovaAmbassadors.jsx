import React, { useContext } from "react";
import Nav from "../../component/Nav";
import MobileNav from "../../component/MobileLayout/MobileNav";
import SupernovaAmbassadors from "./index";
import { GlobalContex } from "../../globalContext";
import useWindowDimensions from "../../services/WindowSize";
import FooterContainer from "../../component/NewFooter";

const SupernovaAmbassadorsMain = () => {
  const { width } = useWindowDimensions();
  const { showStory, mobileMenu, fullWidthNav } = useContext(GlobalContex);

  return (
    <div
      className="mainAppContainer"
      style={{
        height: fullWidthNav ? "" : "100vh",
        overflow: width > 768 ? "" : "auto",
        // overflowY: fullWidthNav ? "hidden" : "",
      }}
    >
      <div
        style={{
          background: "var(--theme-main)",
          zIndex: 2,
          filter: showStory ? "blur(70px)" : "none",
          // position: !mobileMenu ? "sticky" : "",
          position: "sticky",
          top: !mobileMenu ? "0" : "",
          left: "0",
          right: "0",
        }}
        className="mainAppNavbar"
      >
        {width > 768 ? <Nav /> : !mobileMenu ? <MobileNav /> : ""}
      </div>
      <SupernovaAmbassadors />
      {width > 800 ? <FooterContainer /> : ""}
    </div>
  );
};

export default SupernovaAmbassadorsMain;
