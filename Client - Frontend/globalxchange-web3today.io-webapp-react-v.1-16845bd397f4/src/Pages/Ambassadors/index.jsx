import React, { useContext, useEffect } from "react";
import useWindowDimensions from "../../services/WindowSize";
import { GlobalContex } from "../../globalContext";
import Nav from "../../component/Nav";

import classNames from "./ambassadors.module.scss";

//assets
import ambassadorsBanner from "../../assets/images/ambassadors/ambassadorsBanner.svg";
import Footer from "../../component/Footer";
import MobileNav from "../../component/MobileLayout/MobileNav";

const Ambassadors = () => {
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
        <div className={classNames.ambassadors}>
          <div className={classNames.ambassadorsBanner}>
            <div className={classNames.contentDiv}>
              <div className={classNames.title}>
                <span>Become A Web3</span>&nbsp;
                <span className={classNames.colorTitle}>Ambassador</span>
              </div>
              <div className={classNames.para}>
                Drive blockchain adoption and promote the Web3 brand in your
                home country, all while bringing a steady income stream for
                yourself.
              </div>
              <div
                className={classNames.ambassadorBtn}
                onClick={() => {
                  setStatsOpened("ambassadorsForm");
                }}
              >
                <span>Become An Ambassador</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2462 6.39182L7.752 0.975476C7.66884 0.874994 7.55222 0.818184 7.43007 0.818184H5.49887C5.11484 0.818184 4.9154 1.33103 5.17695 1.646L7.58258 4.54335H1.23553C0.854599 4.54335 0.545441 4.88962 0.545441 5.31628V8.13865C0.545441 8.56532 0.854599 8.91159 1.23553 8.91159H7.58224L5.1766 11.8086C4.91506 12.1235 5.11449 12.6364 5.49853 12.6364H7.42973C7.55187 12.6364 7.6685 12.5796 7.75165 12.4791L12.2458 7.06234C12.4028 6.87336 12.4028 6.5808 12.2462 6.39182Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className={classNames.imageDiv}>
              <img src={ambassadorsBanner} alt="ambassadorsBanner" />
            </div>
            <div className={classNames.ambassadorsBannerBackground}></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ambassadors;
