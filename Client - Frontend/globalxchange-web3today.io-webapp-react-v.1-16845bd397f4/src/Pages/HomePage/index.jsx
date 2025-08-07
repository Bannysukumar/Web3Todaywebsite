import React, { useContext, useEffect, useState } from "react";
import styles from "./homePage.module.scss";
import Nav from "../../component/Nav";
import HomeContent from "../../component/HomeContent";
import Footer from "../../component/Footer";
import MobileLayout from "../../component/MobileLayout";
import useWindowDimensions from "../../services/WindowSize";
import { GlobalContex } from "../../globalContext";
import Videos from "./Videos";
import { useLocation } from "react-router-dom";
import WAPPs from "./Companies";
import MobileCompanyPage from "../../component/MobileLayout/MobileCompanyPage";
import MobileVideoPage from "../../component/MobileLayout/MobileVideoPage";
import MobileNav from "../../component/MobileLayout/MobileNav";
import MobileMenu from "../../component/MobileLayout/MobileMenu";
import MobileSavedItems from "../../component/MobileLayout/MobileSavedItems";
import SavedItems from "../SavedItems";
import MobileSidebarMenu from "../../component/MobileSidebar";
import VideosMain from "../../component/VideosMain";
import TrendingVideos from "../../component/VideosMain/VideosTop";
import CountDown from "./Countdown";

const HomePage = () => {
  const { pathname } = useLocation();
  const { width, height } = useWindowDimensions();
  const { showStory, mobileMenu, loginData, fullWidthNav } =
    useContext(GlobalContex);

  const [countdownDiv, setCountdownDiv] = useState(false);

  useEffect(() => {
    conditionalBody();
  }, [pathname]);

  const conditionalBody = () => {
    if (pathname === "/") {
      return width > 768 ? <HomeContent /> : <MobileLayout />;
    } else if (pathname === "/feed/articles") {
      return width > 768 ? <HomeContent /> : <MobileLayout />;
    } else if (pathname === "/feed/wapps") {
      return width > 768 ? <WAPPs /> : <MobileCompanyPage />;
    } else if (pathname === "/feed/videos") {
      return width > 768 ? (
        <div style={{ padding: "0 100px" }}>
          <TrendingVideos />
          <VideosMain />
        </div>
      ) : (
        <MobileVideoPage />
      );
      // } else if (pathname === "/feed/videos") {
      //   return width > 768 ? <Videos /> : <MobileVideoPage />;
    } else if (pathname === "/savedItems") {
      return width > 768 ? <SavedItems /> : <MobileLayout />;
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          coming Soon
        </div>
      );
    }
  };

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
    <div
      className="mainAppContainer"
      style={{
        height: fullWidthNav ? "" : "100vh",
        overflow: width > 768 ? "" : "auto",
        // overflowY: fullWidthNav ? "hidden" : "",
      }}
    >
      {/* {countdownDiv ? (
        <CountDown setCountdownDiv={setCountdownDiv} />
      ) : (
        <> */}
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
      {!mobileMenu ? (
        conditionalBody()
      ) : (
        // <MobileMenu />
        <MobileSidebarMenu />
      )}
      <Footer />
      {/* </>
      )} */}
    </div>
  );
};

export default HomePage;
