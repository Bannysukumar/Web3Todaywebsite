import React, { useContext } from "react";
import { GlobalContex } from "../../globalContex";

import cross from "../../static/images/icons/cross.svg";
import GlobalDrawer from "../GlobalDrawer";
import { AnimatePresence, transform } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import plus from "../../static/images/addNewIcons/AddIcon.svg";
import vault from "../../static/images/sidebarIcons/vaults.svg";
import greySearch from "../../static/images/greySearch.svg";
import closeList from "../../static/images/Closelist.svg";


import "./tabsLayout.scss";

import { ReactComponent as Collapse_img } from "../../static/images/icons/collapse.svg";
import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection";
// import { Slider } from "antd";

const TabsLayout = () => {
  const { pathname } = useLocation();
  console.log(pathname, "pathname");
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
    tabSelected,
    slider,
    setSlider,
    globalSearch,
    setGlobalSearch,
    step, setStep,
    mainMenu,
    setMainMenu,
    loginData,
    cardOpen,
    setCardOpen,
    selectedPublication,
    setSelectedPublication,
    allPublications,
  } = useContext(GlobalContex);

  let filterPublications = []
  if (selectedApp?.appName === "Authors") {
    console.log(JSON.stringify(allPublications), "All-pubs")
    allPublications?.forEach((item, index) => {
      filterPublications.push(item?.PublicationDetails?.[0])
    })
    console.log(filterPublications, "fetch")
    console.log(selectedPublication,)
    // filterPublications = fetchData?.filter((o) => o._id !== selectedPublication._id);
  } else {
    filterPublications = allPublications.filter((o) => o._id !== selectedPublication._id);
  }


  const navigate = useNavigate();

  const handleAddNew = () => {
    // setStep("")
    // setMainMenu("")
    switch (pathname) {
      case "/MyApps":
        // setGlobalMenuAdd(true);
        setSlider(true);
        break;
      case "/MarketsVerse":
        setSlider(true);
        break;
      case "/MyCryptoBrand":
        setSlider(true);
        break;
      case "/CapitalMarkets":
        setSlider(true);
        break;
      case "/Capitalized":
        setSlider(true);
        break;
      case "/FundManagers":
        setSlider(true);
        break;
      case "/OTCDesks":
        setSlider(true);
        break;
      case "/Publishers":
        // setSlider(true);
        setSlider(true)
        break;
      case "/Authors":
        // setSlider(true);
        setSlider(true)
        break;
      case "/Classrooms":
        // setSlider(true);
        setSlider(true)
        break;
      case "/Malls":
        // setSlider(true);
        setSlider(true)
        break;
      case "/Marketsverse":
        // setSlider(true);
        setSlider(true)
        break;
      default:
        break;
    }
  };

  const handleReplaceTab = (item) => {
    console.log("cxzxczxczxc", item);
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
                    {/* <div className="tabIcon">
                      <img src={item.menuIcon} alt="" />
                    </div> */}
                    <div className="tabName">
                      {item.menuName.split(" ")[0]}&nbsp;
                      {item.menuName.split(" ")[1]}
                    </div>
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
                {/* <div className="tabIcon">
                  <img src={selectedTab?.menuIcon} alt="" />
                </div> */}
                <div className="tabName">
                  {selectedTab?.menuName.split(" ")[0]}&nbsp;
                  {selectedTab?.menuName.split(" ")[1]}
                </div>
              </div>
            )}
          </div>
          <div className={pathname === "/Publishers" || pathname === "/Authors" ? "searchGlobal1" : "searchGlobal"}>
            <input type="search" placeholder={`Search ${tabSelected}...`} value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} className="inputGlobal" />
            <img src={greySearch} alt="search" className="greySearch" />
          </div>
          <div
            className="selectModal"
            style={{ display: pathname === "/Publishers" || pathname === "/Authors" ? "" : "none" }}
            onClick={(e) => {
              e.stopPropagation()
              setCardOpen(!cardOpen)
            }}>
            <div>
              {selectedPublication ? (
                <img
                  src={cardOpen ? closeList : selectedPublication.profile_pic}
                  alt=""
                  style={{
                    width: "37px",
                    height: "37px",
                    borderRadius: "100%",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "37px",
                    width: "37px",
                    borderRadius: "100%",
                  }}
                >
                  &nbsp;
                </div>
              )}
            </div>
          </div>
          {/* {cardOpen && (
            <div className="overlay" />
          )} */}

          <div className="cardWrapper" style={{ transform: cardOpen ? "TranslateY(0%)" : "TranslateY(-120%)" }}>
            <p className="cardTitle">Switch {selectedApp?.DispName}</p>
            <div>
              {selectedPublication ? (
                <>
                  <div className="selectedCard">
                    <img src={selectedPublication.profile_pic} alt="card" className="imageCard" />
                    <p className="selectedText">{selectedPublication?.name
                    }</p>
                  </div>
                </>
              ) : ""}
            </div>
            <hr className="hrline" />
            <div>
              {selectedApp?.appName === "Authors" ? (<>
                <div className="listCard">
                  {filterPublications?.map((item, index) => {
                    console.log(item, "filter-publication")
                    return (
                      <div
                        className="listedCards"
                        onClick={() => {
                          setSelectedPublication(item?.PublicationDetail[0]);
                          setCardOpen(false)
                          localStorage.setItem(
                            "selectedPublication",
                            JSON.stringify(item)
                          );
                          setStep(null);
                        }}
                      >
                        <img src={item?.PublicationDetail?.[0].profile_pic} alt="card" className="imageCard" />
                        <p className="selectedText">{item?.PublicationDetail?.[0].name}</p>
                      </div>
                    );
                  })}
                </div></>) : (
                <>
                  <div className="listCard">
                    {filterPublications?.map((item, index) => {
                      return (
                        <div
                          className="listedCards"
                          onClick={() => {
                            setSelectedPublication(item);
                            setCardOpen(false)
                            localStorage.setItem(
                              "selectedPublication",
                              JSON.stringify(item)
                            );
                            setStep(null);
                          }}
                        >
                          <img src={item?.profile_pic} alt="card" className="imageCard"/>
                          <p className="selectedText">{item?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            onClick={handleAddNew}
            className="addDrawerBtn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "119px",
              margin: "auto",
              cursor: "pointer",
            }}
          >
            {/* <div
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
            </div> */}
            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
            <div
              style={{
                fontWeight: 700,
                display: "flex",
                // justifyContent: "space-around",
                alignItems: "center",
                // marginRight: "20px",
              }}
            >
              <img src={plus} alt="" />

              {/* <div style={{ paddingLeft: "10px" }}>Add new</div> */}
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
                  border: "0.5px solid #e7e7e7",
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

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={plus} alt="" /> &nbsp; Add New
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {/* {Slider ? ( */}
        <GlobalDrawer
          onClose={() => setSlider(false)}
          pathname={pathname}
        />
        {/* ) : (
          ""
        )} */}
      </AnimatePresence>
    </>
  );
};

export default TabsLayout;
