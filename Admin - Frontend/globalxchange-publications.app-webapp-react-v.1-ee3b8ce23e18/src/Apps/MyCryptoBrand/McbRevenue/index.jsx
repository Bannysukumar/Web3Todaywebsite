import React, { useMemo } from "react";
import { useState } from "react";
// import { useContext } from "react";
// import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
// import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
import ByRevenueStream from "./ByRevenueStream";
// import CRMUsers from "./ByRevenueStream";

const McbRevenue = () => {
  const tabs = ["By Revenue Stream", "By Currency"];

  // const { setShowSubDraw } = useContext(GlobalContex);

  const [tabSelected, setTabSelected] = useState("By Revenue Stream");

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "By Revenue Stream":
        return <ByRevenueStream />;

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

export default McbRevenue;
