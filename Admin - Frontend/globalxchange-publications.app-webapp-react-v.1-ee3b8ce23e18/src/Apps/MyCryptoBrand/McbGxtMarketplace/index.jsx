import React, { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import GxtSubscriptions from "./GxtSubscriptions";
import GxtLicences from "./GxtLicenses";
import "./marketplace.scss";

const McbGxtMarketplace = () => {
  const tabs = ["Subscriptions", "My Licenses"];

  const { setShowSubDraw } = useContext(GlobalContex);

  const [tabSelected, setTabSelected] = useState("Subscriptions");

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "Subscriptions":
        return <GxtSubscriptions />
      case "My Licenses":
        return <GxtLicences/>
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

export default McbGxtMarketplace;
