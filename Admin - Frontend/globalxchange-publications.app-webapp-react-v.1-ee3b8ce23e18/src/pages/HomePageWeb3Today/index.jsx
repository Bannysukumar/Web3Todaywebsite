import React, { useContext, useEffect } from "react";
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

const HomePage = () => {
  const { pathname } = useLocation();
  const { width, height } = useWindowDimensions();
  const { showStory, mobileMenu, loginData } = useContext(GlobalContex);

  useEffect(() => {
    conditionalBody();
  }, [pathname]);

  const conditionalBody = () => {
    if (pathname === "/") {
      return width > 768 ? <HomeContent /> : <MobileLayout />;
    } else if (pathname === "/news/articles") {
      return width > 768 ? <HomeContent /> : <MobileLayout />;
    } else if (pathname === "/news/wapps") {
      return width > 768 ? <WAPPs /> : <MobileCompanyPage />;
    } else if (pathname === "/news/videos") {
      return width > 768 ? (
        <div style={{ padding: "0 100px" }}>
          <TrendingVideos />
          <VideosMain />
        </div>
      ) : (
        <MobileVideoPage />
      );
      // } else if (pathname === "/news/videos") {
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

  return (
    <div>
      <div
        style={{
          background: "white",
          zIndex: 2,
          filter: showStory ? "blur(70px)" : "none",
          position: !mobileMenu ? "sticky" : "",
          top: !mobileMenu ? "0" : "",
        }}
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
    </div>
  );

  // return width > 768 || width > height ? (
  //   <>
  //     <div
  //       style={{
  //         background: "white",
  //         zIndex: 1,
  //         filter: showStory ? "blur(70px)" : "none",
  //       }}
  //     >
  //       <Nav />
  //     </div>
  //     {conditionalBody()}

  //     <Footer />
  //   </>
  // ) : (
  //   <MobileLayout />
  // );
};

export default HomePage;
