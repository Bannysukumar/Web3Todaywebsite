import React, { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";

import DashboardApps from "./DashboardApps";
import DashboardBrands from "./DashboardBrands";
import DashboardFieldGroups from "./DashboardFieldGroups";
import DashboardGroupFields from "./DashboardGroupFields";

const McbDashboard = () => {
  const tabs = ["Apps", "Brands", "Global Field Groups", "Global Group Fields"];

  const { setShowSubDraw } = useContext(GlobalContex);

  const [tabSelected, setTabSelected] = useState("Apps");

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "Apps":
        return <DashboardApps />;
      case "Brands":
        return <DashboardBrands />;
      case "Global Field Groups":
        return <DashboardFieldGroups />;
      case "Global Group Fields":
        return <DashboardGroupFields />;
      default:
        return null;
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

export default McbDashboard;
