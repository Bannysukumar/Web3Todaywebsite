import React, { useMemo, useState, useEffect, useContext } from "react";

import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
// import Articles from "./Articles";
// import Authors from "./Authors";
// import Categories from "./Categories";
// import Navbars from "./Navbars";

// import Publications from "./Publications";
// import Users from "./Users";
// import Videos from "./Videos";
// import WebStory from "./WebStory";
// import CaseStudy from "./CaseStudy";
// import Reports from "./Reports";
import Authors from "./Authors";

const Hire = () => {
  const tabs = [
    "Authors"
  ];

  const { setShowSubDraw, tabSelected, setTabSelected } =
    useContext(GlobalContex);

  useEffect(() => {
    setTabSelected("Authors");
  }, []);

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "Authors":
        return <Authors />;
      default:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "20px",
              height: "70vh",
            }}
          >
            Coming Soon
          </div>
        );
    }
  }, [
    tabSelected,
    // openCoinFilter, refetchApi
  ]);

  return (
    <div>
      <NavBar
        tabs={tabs}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
        enabledFilters={[true, true, true, false, false,true]}
      />

      {tabComponent}

      {/* <div style={{ width: "100%" }}>
        <div className="listGrid">
          <div>Asset</div>
          <div>Cost</div>
          <div>Length</div>
          <div>Daily Return</div>
          <div>Monthly Return</div>
        </div>
      </div> */}
      {/* <div
        style={{
          // display: "flex",
          fontWeight: 700,
          fontSize: "20px",
        }}
      >

        <Subdrawer />
      </div> */}
    </div>
  );
};

export default Hire;
