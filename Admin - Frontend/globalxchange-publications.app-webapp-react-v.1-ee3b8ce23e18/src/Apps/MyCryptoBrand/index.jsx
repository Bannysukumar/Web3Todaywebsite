import React from "react";
import { useContext } from "react";
import GlobalSidebar from "../../globalComponents/GlobalSidebar";
import LocalSidebar from "../../globalComponents/LocalSidebar";
import { GlobalContex } from "../../globalContex";

import TabsLayout from "../../globalComponents/TabsLayout";
import AdminModal from "../../globalComponents/AdminModal";

import crm from "../../static/images/sidebarIcons/crm.svg";
import dash from "../../static/images/sidebarIcons/dash.svg";
import affiliates from "../../static/images/sidebarIcons/affiliates.svg";
import vaults from "../../static/images/sidebarIcons/vaults.svg";
import terminal from "../../static/images/sidebarIcons/terminal.svg";
import bonds from "../../static/images/sidebarIcons/bonds.svg";
import loans from "../../static/images/sidebarIcons/socially.svg";
import Lock from "../../static/images/icons/lock.svg";
import defaultImg from "../../static/images/icons/app_placeholder.png";
import revenue from "../../static/images/sidebarIcons/revenue.svg";
import assets from "../../static/images/sidebarIcons/assets.svg";

import VaultPage from "../../globalComponents/VaultPage";
import McbDashboard from "./McbDashboard";
import McbCRM from "./McbCRM";
import McbRevenue from "./McbRevenue";
import McbAssets from "./McbAssets";
import McbTokenSwap from "./McbTokenSwap";
import McbWithdrawals from "./McbWithdrawals";
import McbGxtMarketplace from "./McbGxtMarketplace";
import MobileMenu from "../../globalComponents/MobileMenu";
import McbTokenHash from "./McbTokenHash";

const MyCryptoBrand = () => {
  const {
    collapse,
    setTabs,
    setSelectedTab,
    selectedTab,
    loginData,
    setBankerEmail,
    modalOpen,
    setModalOpen,
    localMenu,
    globalMenu,
    mcbMenu,
    setDispdraw,
    showMobileMenu,
  } = useContext(GlobalContex);

  // const openside = (e) => {
  //   themail = e.currentTarget.id;
  //   value.setselectemail(e.currentTarget.id);
  //   value.setdispdraw("TranslateX(0%)");
  //   value.settriggerevent("none");
  // };

  const conditionalPages = () => {
    switch (selectedTab?.menuName) {
      case "Dashboard":
        return <McbDashboard />;
      case "CRM":
        return <McbCRM />;
      case "Vaults":
        return <VaultPage />;
      case "Revenue":
        return <McbRevenue />;
      case "Assets":
        return <McbAssets />;
      case "TokenSwap":
        return <McbTokenSwap />
      case "External Withdrawals":
        return <McbWithdrawals />
      case "GXT Marketplace":
        return <McbGxtMarketplace />
      case "TokenHash":
        return <McbTokenHash />
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
        break;
    }
  };

  return (
    <>
      <div className="desktopWrapper">
        <div className={collapse ? "grid-cap-collapsed" : "grid-cap"}>
          <GlobalSidebar globalMenu={globalMenu} />
          <LocalSidebar localMenu={mcbMenu} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TabsLayout />
            <div style={{}}>{conditionalPages()}</div>
          </div>
        </div>
      </div>
      {showMobileMenu ? (
        <MobileMenu />
      ) : (
        <div className="mobileWrapper">
          <TabsLayout />
          <div style={{}}>{conditionalPages()}</div>
        </div>
      )}
      {/* {modalOpen && (
        <AdminModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => setModalOpen(false)}
        />
      )} */}
    </>
  );
};

export default MyCryptoBrand;
