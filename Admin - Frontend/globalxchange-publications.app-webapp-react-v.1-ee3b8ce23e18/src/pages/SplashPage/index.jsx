import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../globalComponents/Footer";
import SplashHeader from "../../globalComponents/SplashHeader";
import SplashSidebar from "../../globalComponents/SplashSidebar";
import { GlobalContex } from "../../globalContex";
import About from "./About";
import Templates from "./Templates";
import classNames from "./splashPage.module.scss";
import SpecificPage from "./Templates/SpecificPage";
import BusinessOverview from "./Templates/SpecificPage/BusinessOverview";
import SecondSection from "./Templates/SpecificPage/SecondSection";

const SplashPage = () => {
  const { showDraw, setShowDraw } = useContext(GlobalContex);

  useEffect(() => {
    console.log(showDraw, "kwjefbkjwef");
  }, [showDraw]);

  return (
    <>
      <div>
        <div
          onMouseDown={(e) => setShowDraw(false)}
          // style={{ overflow: disableBack ? "none" : "" }}
          className={showDraw ? classNames.overlayClose : ""}
        ></div>
        <Routes>
          <Route path="" element={<About />} />
          <Route path="templates" element={<Templates />} />
          <Route exact path="templates/:id" element={<SpecificPage />}>
            <Route path="*" element={<SecondSection />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default SplashPage;
