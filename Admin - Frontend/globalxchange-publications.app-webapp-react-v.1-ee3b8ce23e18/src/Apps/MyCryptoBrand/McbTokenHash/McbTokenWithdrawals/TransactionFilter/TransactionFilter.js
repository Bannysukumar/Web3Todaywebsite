import React, { useEffect, useState } from "react";
import TransactionFilterApps from "./TransactionFilterApps";
import TransactionFilterBanker from "./TransactionFilterBanker";
import TransactionFilterCoin from "./TransactionFilterCoin";
import BankerTransactionFilterDisplay from "./TransactionFilterDisplay";
import "./sidebarFilter.scss";

function BankerTransactionFilter({
  sidebarTab,
  appSelected,
  setAppSelected,
  bankerSelected,
  setBankerSelected,
  coinSelected,
  setCoinSelected,
  isDeposit,
}) {
  const [tab, setTab] = useState("Display");
  useEffect(() => {
    if (sidebarTab) {
      setTab(sidebarTab);
    }
  }, [sidebarTab]);

  function getTabContent() {
    switch (tab) {
      case "Display":
        return <BankerTransactionFilterDisplay />;
      case "Banker":
        return (
          <TransactionFilterBanker
            appSelected={appSelected}
            bankerSelected={bankerSelected}
            coinSelected={coinSelected}
            setBankerSelected={setBankerSelected}
            isDeposit={isDeposit}
          />
        );
      case "Apps":
        return (
          <TransactionFilterApps
            setAppSelected={setAppSelected}
            appSelected={appSelected}
            bankerSelected={bankerSelected}
            coinSelected={coinSelected}
            isDeposit={isDeposit}
          />
        );
      case "Coin":
        return (
          <TransactionFilterCoin
            appSelected={appSelected}
            bankerSelected={bankerSelected}
            coinSelected={coinSelected}
            setCoinSelected={setCoinSelected}
            isDeposit={isDeposit}
          />
        );
      default:
        break;
    }
  }
  return (
    <div className="godsEyeUserFiter">
      <div className="headTabs">
        <div
          className={`tab ${tab === "Display"}`}
          onClick={() => setTab("Display")}
        >
          Display
        </div>
        <div
          className={`tab ${tab === "Banker"}`}
          onClick={() => setTab("Banker")}
        >
          Bankers
        </div>
        <div className={`tab ${tab === "Apps"}`} onClick={() => setTab("Apps")}>
          Apps
        </div>
        <div className={`tab ${tab === "Coin"}`} onClick={() => setTab("Coin")}>
          Assets
        </div>
      </div>
      {getTabContent()}
    </div>
  );
}

export default BankerTransactionFilter;
