import React, { useState, useContext } from "react";
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
  } = useContext(GlobalContex);
  const { width, height } = useWindowDimensions();
  return (
    // <Layout active="Play" className="player" hideFooter>
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: loginData && width > 700 ? "80px" : "0px",
      }}
    >
      <div
        className="stcky"
        style={{ position: "sticky", top: 0, background: "white" }}
      >

{width > 768 ? <Nav /> : !mobileMenu ? <MobileNav /> : ""}
        {/* <Nav />

        <MobileNav /> */}
      </div>

      {tabName == "Ads" && <Ads />}
    </div>
    // </Layout>
  );
}
