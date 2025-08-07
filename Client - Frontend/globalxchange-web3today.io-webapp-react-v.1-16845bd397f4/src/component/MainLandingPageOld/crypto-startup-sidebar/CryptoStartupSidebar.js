import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ImagesCS } from "../../../assets/0a-exporter";
import ConstantCS from "../../../Constant";
import { CStartup } from "../cs-context/CSContext";
import "./crypto-startup-sidebar.style.scss";

export default function CryptoStartupSidebar({ setFullSizeSidebar }) {
  const cstartup = React.useContext(CStartup);
  const history = useHistory();
  const {
    fullSizeSidebar,
    setSelectedTab,
    setSidebarDifference,
    selectedTab,
    selectedCountry,
    setLoginStatus,
    loggedIn,
    handleLogout,
    setMainSearchTerm,
    setMainSearch,
  } = cstartup;

  const handleLogoutClick = () => {
    handleLogout();
    history.push(`/${localStorage.getItem("country")}/get-started`);
  };

  const handleGetStarted = () => {
    setLoginStatus(true);
    setSelectedTab({
      count: 100,
      type: { leyId: "xx10", name: "Login", id: "login" },
    });
    history.push(`/${localStorage.getItem("country")}/get-started`);
  };
  return (
    <div
      className={`crypto-start-up-sidebar ${
        fullSizeSidebar ? "" : "adjust-small-size"
      }`}
    >
      <div
        onClick={() => {
          history.push(`/${localStorage.getItem("country")}/trending`);
          // setMainSearch(true);
          // setMainSearchTerm(selectedCountry?.formData?.Name);
        }}
        className={`sidebar-list-header ${!fullSizeSidebar ? "c-s-l-h" : ""}`}
      >
        <img src={ImagesCS.sideico} />
        <h4 className={!fullSizeSidebar ? "d-none" : ""}>
          CryptoStartup's
          {/* {selectedCountry.formData.Name} */}
        </h4>
        <button className="close-mobile-logo">
          <img src={ImagesCS.closeLogo} />
        </button>
      </div>
      <div className="sidebar-list-wrapper">
        <div className={false ? "c-s-s-overlay" : "d-none"}></div>
        {ConstantCS.csSidebarList.map((obj, num) => (
          <Link to={`/${localStorage.getItem("country")}/${obj.id}`}>
            <button
              disabled={obj.disable}
              key={obj.leyId}
              onClick={() => {
                if (selectedTab.type.id === obj.id) return;
                setFullSizeSidebar(false);
                setSidebarDifference(selectedTab.count - num);
                setSelectedTab({ count: num, type: { ...obj } });
              }}
              className={
                selectedTab.type.id === obj.id ? "selected-section" : ""
              }
            >
              <img src={obj.icon} />
              <span>{obj.name}</span>
              <p className={fullSizeSidebar ? "d-none" : ""}>{obj.name}</p>
            </button>
          </Link>
        ))}
      </div>
      <div
        onClick={() =>
          loggedIn.status ? handleLogoutClick() : handleGetStarted()
        }
        className="sidebar-guest"
      >
        {loggedIn.status ? (
          <div>
            <img
              height="20px"
              src={
                !loggedIn.details?.profile_img
                  ? ImagesCS.cryptoStartupShort
                  : loggedIn.details?.profile_img
              }
            />
            <h4>
              {loggedIn.details?.username}
              <p>Logout</p>
            </h4>
          </div>
        ) : (
          <h6>Get Started</h6>
        )}
      </div>
    </div>
  );
}
