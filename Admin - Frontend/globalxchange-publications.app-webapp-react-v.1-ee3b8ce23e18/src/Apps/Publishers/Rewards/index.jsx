import React, { useMemo, useState, useEffect, useContext } from "react";

import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
// import Authors from "./Authors";
// import Categories from "./Categories";
// import Navbars from "./Navbars";

// import Publications from "./Publications";
// import Users from "./Users";
import RewardsTab from "./Configurations"
import Affiliate from "./Affiliate";
import Payouts from "./Payouts";
import Requests from "./Requests";


const Rewards = () => {
  const tabs = [
    "Configurations",
    "Affiliates",
    "Conversion",
    "Requests"
  ];

  const { setShowSubDraw, tabSelected, setTabSelected } =
    useContext(GlobalContex);

  useEffect(() => {
    setTabSelected("Configurations");
  }, []);

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "Configurations":
        return <RewardsTab />;
      case "Affiliates":
        return <Affiliate />;
      case "Conversion":
        return <Payouts />;
      case "Requests":
        return <Requests />;
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

export default Rewards;
