import React from "react";
import { useContext } from "react";
import GlobalSidebar from "../../globalComponents/GlobalSidebar";
import LocalSidebar from "../../globalComponents/LocalSidebar";
import { GlobalContex } from "../../globalContex";

import TabsLayout from "../../globalComponents/TabsLayout";
import AdminModal from "../../globalComponents/AdminModal";

import publication from "../../static/images/sidebarIcons/publication.svg";
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

import MobileMenu from "../../globalComponents/MobileMenu";
import Web3Dashboard from "./Web3Dashboard";
import "../commonAppCss.scss";
import RewardsTab from "./Rewards";
import AdminContent from "./Content"
import Hire from "./Hire";

const Publishers = () => {
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
    web3Menu,
    setDispdraw,
    showMobileMenu,
    tabSelected,
    setTabSelected,
  } = useContext(GlobalContex);

  // const openside = (e) => {
  //   themail = e.currentTarget.id;
  //   value.setselectemail(e.currentTarget.id);
  //   value.setdispdraw("TranslateX(0%)");
  //   value.settriggerevent("none");
  // };

  const conditionalPages = () => {
    switch (selectedTab?.menuName) {
      case "Management":
        return (
          <Web3Dashboard
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
          />
        );

      case "Rewards":
        return <RewardsTab />;
      case "Content":
        return <AdminContent />;
      case "Hire":
        return <Hire />;
        

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
            Coming Soon 5
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
          <LocalSidebar localMenu={web3Menu} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TabsLayout />
            <div style={{ height: "100%" }}>{conditionalPages()}</div>
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

export default Publishers;
