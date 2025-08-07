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
  const { showStory, mobileMenu, loginData } = useContext(GlobalContex);

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
