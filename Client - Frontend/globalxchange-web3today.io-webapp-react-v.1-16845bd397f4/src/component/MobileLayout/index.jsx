import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContex } from "../../globalContext";
import ArticleLayout from "./ArticleLayout";
import MobileCompanyPage from "./MobileCompanyPage";
import MobileMenu from "./MobileMenu";
import MobileNav from "./MobileNav";
import MobileSavedItems from "./MobileSavedItems";
import MobileTrendingPage from "./MobileTrendingPage";
import MobileVideoPage from "./MobileVideoPage";
import MobileSidebarMenu from "../MobileSidebar";
import Play from "../../Pages/Player";
import CreatorsMobile from "./Creators";
import TopicsMobile from "./Topics";
const MobileLayout = () => {
  const { pathname } = useLocation();
  const {
    mobileMenu,
    setMobileMenu,
    selectedMobileMenu,
    setSelectedMobileMenu,
    selectedMobileSubMenu,
    setSelectedMobileSubMenu,
  } = useContext(GlobalContex);

  const conditionalRender = () => {
    switch (pathname) {
      case "/":
        return <MobileTrendingPage />;
      case "/feed/articles":
        return <MobileTrendingPage />;
      case "/feed/WAPPs":
        return <MobileCompanyPage />;
      case "/feed/videos":
        return <MobileVideoPage />;
      case "/savedItems":
        return <MobileSavedItems />;
      case "/earn/ads":
        return <Play />;
      case "/creators":
        return <CreatorsMobile />;
      case "/topics":
        return <TopicsMobile />;

      default:
        break;
    }
  };

  return (
    <>
      {!mobileMenu ? (
        <div>{conditionalRender()}</div>
      ) : (
        <>
          {/* <MobileMenu /> */}
          <MobileSidebarMenu />
        </>
      )}
    </>
  );
};

export default MobileLayout;
