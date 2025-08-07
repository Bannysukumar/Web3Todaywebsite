import React, { useContext, useEffect } from "react";
import useWindowDimensions from "../../services/WindowSize";
import { GlobalContex } from "../../globalContext";
import Nav from "../../component/Nav";

import classNames from "./casestudy.module.scss";

//assets
import Footer from "../../component/Footer";
import MobileNav from "../../component/MobileLayout/MobileNav";
import CaseStudyMain from "../../component/CaseStudyMain";

const CaseStudyPage = () => {
  const { loginData, mobileMenu, setStatsOpened, fullWidthNav } =
    useContext(GlobalContex);
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
        {width > 800 || width > height ? <Nav /> : <MobileNav />}
        <div className={classNames.casestudy}>
          <CaseStudyMain />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudyPage;
