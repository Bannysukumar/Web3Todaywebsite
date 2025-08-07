import React, { useContext } from "react";
import { GlobalContex } from "../../globalContext";

import cross from "../../static/images/icons/cross.svg";
import GlobalDrawer from "../GlobalDrawer";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
// import { AnimatePresence, transform } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import plus from "../../static/images/icons/plusWhite.svg";
import vault from "../../static/images/sidebarIcons/vaults.svg";

import { ReactComponent as Collapse_img } from "../../static/images/icons/collapse.svg";
import { ReactComponent as Collapse1_img } from "../../static/images/icons/collapse1.svg";

import "./tabsLayout.scss";

const TabsLayout = () => {
  const { pathname } = useLocation();
  const {
    collapse,
    setCollapse,
    tabs,
    setTabs,
    selectedTab,
    setSelectedTab,
    globalMenuAdd,
    setGlobalMenuAdd,
    selectedApp,
    setShowMobileMenu,
  } = useContext(GlobalContex);

  const navigate = useNavigate();

  const handleAddNew = () => {
    switch (pathname) {
      case "/Web3Today":
        setGlobalMenuAdd(true);
        break;
      case "/Authors":
        setGlobalMenuAdd(true);
        break;

      default:
        break;
    }
  };

  const handleReplaceTab = (item) => {
    if (
      tabs.findIndex((o) => o.menuName === item.menuName) < 0 ||
      tabs.length < 1
    ) {
      const index = tabs.findIndex((o) => o.menuName === selectedTab.menuName);
      console.log(
        tabs.findIndex((o) => o.menuName === selectedTab.menuName),
        selectedTab,
        "jhwgjwhe"
      );
      tabs.splice(index, 1, item);
      setSelectedTab(tabs.length < 1 ? tabs[index] : item);
    } else {
      setSelectedTab(item);
    }
  };

  const handleRemoveTab = (item) => {
    if (tabs.length > 2) {
      setTabs(tabs.filter((o) => o.menuName !== item.menuName));
      if (selectedTab.menuName === item.menuName) {
        console.log(selectedTab.menuName === item.menuName, "kjwcjwkhbek");
        if (tabs[tabs.length - 1].menuName === item.menuName) {
          setSelectedTab(tabs[tabs.length - 2]);
        } else {
          setSelectedTab(tabs[tabs.length - 1]);
        }
      }
    } else {
      setSelectedTab(
        tabs.findIndex((o) => o.menuName === item.menuName) === 0
          ? tabs[1]
          : tabs[0]
      );

      setTabs([]);
    }
  };
  return (
    <>
      <div className="desktopWrapper">
        <div className="tabInterface">
          <div className="tabsWrapper">
            {tabs.length > 0 ? (
              tabs.map((item, index) => {
                return (
                  <div
                    onClick={(e) => setSelectedTab(item)}
                    className="tabs"
                    style={{
                      opacity: selectedTab.menuName === item.menuName ? 1 : 0.3,
                    }}
                  >
                    <div className="tabIcon">
                      <img src={item.menuIcon} alt="" />
                    </div>
                    <div className="tabName">
                      {item.menuName.split(" ")[0]}&nbsp;
                      {item.menuName.split(" ")[1]}
                    </div>
                    {/* <div className="tabName">{item.menuName}</div> */}
                    <div
                      style={{ display: tabs.length > 1 ? "block" : "none" }}
                      className="cross"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTab(item);
                      }}
                    >
                      <img src={cross} alt="" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="tabs">
                <div className="tabIcon">
                  <img src={selectedTab?.menuIcon} alt="" />
                </div>
                <div className="tabName">
                  {selectedTab?.menuName.split(" ")[0]}&nbsp;
                  {selectedTab?.menuName.split(" ")[1]}
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <div
              onClick={(e) =>
                handleReplaceTab({
                  menuName: "Vaults",
                  menuIcon: vault,
                  enabled: true,
                })
              }
              className="vault-button"
            >
              <img src={vault} alt="" />

              <div style={{ paddingLeft: "10px" }}>Vault</div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
              onClick={handleAddNew}
              className="addNew"
              style={{
                background: selectedApp.appColor,
                fontWeight: 700,
                display: "flex",
                // justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <img src={plus} alt="" />

              <div style={{ paddingLeft: "10px" }}>Add new</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobileWrapper">
        <div className="tabInterface">
          <div className="tabsWrapper">
            <div className="tabs" style={{ borderRight: "none" }}>
              <div
                onClick={(e) => setShowMobileMenu(true)}
                className="tabIcon"
                style={{
                  border: "0.5px solid var(--bordercolor-main)",
                  borderRadius: "50%",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <img src={selectedTab?.menuIcon} alt="" /> */}
                <Collapse_img fill={selectedApp?.appColor} stroke="none" />
              </div>
              {/* item.menuName.split(" ")[0]}&nbsp;{item.menuName.split(" ")[1] */}
              <div className="tabName">
                {selectedTab?.menuName.split(" ")[0]}&nbsp;
                {selectedTab?.menuName.split(" ")[1]}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <div
              onClick={handleAddNew}
              className="addNew"
              style={{
                background: selectedApp.appColor,
                fontWeight: 700,
                display: "flex",
                // justifyContent: "space-around",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={plus} alt="" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {globalMenuAdd ? (
          <GlobalDrawer
            onClose={() => setGlobalMenuAdd(false)}
            pathname={pathname}
          />
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
};

export default TabsLayout;
