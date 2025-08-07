import React, { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import NavBar from "../../../globalComponents/NavBar";
import { GlobalContex } from "../../../globalContex";
import "../../../static/scss/list.scss";
import AssetsCrypto from "./AssetsCrypto";
import CRMUsers from "./AssetsCrypto";
import AssetsForex from "./AssetsForex";
import AssetsMyTokenSwap from "./AssetsMyTokenSwap";
import AllTokenSwap from "./AssetsAllTokenSwap";
import MyAssets from "./MyAssets";

const McbAssets = () => {
  const tabs = ["Crypto", "Forex", "My Assets"];

  const { setShowSubDraw, tabSelected, setTabSelected } =
    useContext(GlobalContex);

  const tabComponent = useMemo(() => {
    switch (tabSelected) {
      case "Crypto":
        return <AssetsCrypto />;
      case "Forex":
        return <AssetsForex />;
      case "My Assets":
        return <MyAssets />;
      // case "My TokenSwap Paths":
      //   return <AssetsMyTokenSwap />
      // case "All TokenSwap Paths":
      //   return <AllTokenSwap />

      default:
        return null;
    }
  }, [tabSelected]);

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

export default McbAssets;
