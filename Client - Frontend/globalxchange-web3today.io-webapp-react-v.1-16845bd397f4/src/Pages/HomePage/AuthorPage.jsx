import React, { useContext, useEffect } from "react";
import Nav from "../../component/Nav";
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
import CategoryContent from "../../component/CategoryContent";
import AuthorContent from "../../component/AuthorContent";

const AuthorPage = () => {
  const { pathname } = useLocation();
  const { width, height } = useWindowDimensions();
  const { showStory, mobileMenu, loginData, fullWidthNav } =
    useContext(GlobalContex);

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
      }}
    >
      <div
        className="mainAppNavbar"
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
      >
        {width > 768 ? <Nav /> : !mobileMenu ? <MobileNav /> : ""}
      </div>
      {!mobileMenu ? (
        <AuthorContent />
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

export default AuthorPage;
