import React, { useState, useContext, useEffect } from "react";
// import Layout from '../../Layout/Layout';
// import fulllogo from '../../assets/images/player.svg';
// import searchIcon from '../../static/images/search.svg';
// import { useAppContextDetails } from '../../context/AppContext';
// import Points from './Points';
import "./Player.scss";
import Ads from "./Ads";
import Nav from "../../component/Nav";
import { GlobalContex } from "../../globalContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import  MobileNav from '../../component/m'
import MobileNav from "../../component/MobileLayout/MobileNav";
import useWindowDimensions from "../../services/WindowSize";
export default function Index() {
  // const { academytab, setAcademytab } = useAppContextDetails();
  const [tabName, settabName] = useState("Ads");
  const {
    setShowPopup,
    loginData,
    collapse,
    setCollapse,
    selectedApp,
    mobileMenu,
    hideArrow,
    userProfile,
    setUserProfile,
    fullWidthNav,
  } = useContext(GlobalContex);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    let prevScrollPos = 0;

    const handleScroll = () => {
      const currentScrollPos =
        document.querySelector(".mainAppContainer").scrollTop;
      const scrollUp = prevScrollPos > currentScrollPos;
      const navbar = document.querySelector(".mainAppNavbar");

      if (scrollUp) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-165.6px";
      }

      prevScrollPos = currentScrollPos;
    };

    const mainAppContainer = document.querySelector(".mainAppContainer");
    mainAppContainer.addEventListener("scroll", handleScroll);
    return () => mainAppContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <Layout active="Play" className="player" hideFooter>
    <div
      className="mainAppContainer"
      style={{
        width: "100%",
        height: fullWidthNav ? "" : "100vh",
        overflow: width > 768 ? "" : "auto",
        paddingLeft: loginData && width > 700 ? "80px" : "0px",
      }}
    >
      <div
        className="mainAppNavbar stcky"
        style={{
          background: "var(--theme-main)",
          zIndex: 2,
          // filter: showStory ? "blur(70px)" : "none",
          // position: !mobileMenu ? "sticky" : "",
          position: "sticky",
          top: !mobileMenu ? "0" : "",
          left: "0",
          right: "0",
        }}
      >
        {width > 768 ? <Nav /> : !mobileMenu ? <MobileNav /> : ""}
      </div>

      {tabName == "Ads" && <Ads />}
    </div>
    // </Layout>
  );
}
