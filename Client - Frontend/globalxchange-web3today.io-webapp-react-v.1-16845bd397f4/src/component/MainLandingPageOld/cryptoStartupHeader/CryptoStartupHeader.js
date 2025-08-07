import React from "react";
import "./crypto-startup-header.style.scss";
import { ImagesCS } from "../../../assets/0a-exporter";
import { CStartup } from "../cs-context/CSContext";
export default function CryptoStartupHeader({ setDropdown, dropdown }) {
  const cstartup = React.useContext(CStartup);
  const {
    mainSearch,
    mainSearchTerm,
    setMainSearchTerm,
    selectedCountry,
    setMainSearch,
  } = cstartup;
  const handleCountryClick = () => {
    if (mainSearch && !mainSearchTerm) {
      setMainSearchTerm(selectedCountry?.formData?.Name);
    } else {
      mainSearch
        ? setMainSearchTerm("")
        : setMainSearchTerm(selectedCountry?.formData?.Name);
      setMainSearch(!mainSearch);
    }
  };

  React.useEffect(() => {
    // console.log("selectedCountry", selectedCountry);
  }, [selectedCountry]);
  return (
    <div
      style={dropdown ? { alignItems: "flex-end" } : {}}
      className="crypto-startup-header"
    >
      {dropdown ? (
        <div className="about-crypto-startup">
          <img src={ImagesCS.cryptoStartupText} />
        </div>
      ) : (
        ""
      )}
      <div className={dropdown ? "d-none" : "c-s-h-logo"}>
        <img src={ImagesCS.cryptoStartupFull} />
      </div>
      <div className="c-s-h-app-menu">
        <button
          onClick={() => {
            setMainSearch(!mainSearch);
            setDropdown(false);
            setMainSearchTerm("");
          }}
        >
          <img
            style={mainSearch ? { height: "20px" } : {}}
            src={mainSearch ? ImagesCS.closeLogo : ImagesCS.searchDark}
          />
        </button>
        <button
          onClick={() => {
            setDropdown(!dropdown);
            setMainSearch(false);
          }}
        >
          <img
            style={dropdown ? { height: "20px" } : {}}
            src={dropdown ? ImagesCS.closeLogo : ImagesCS.appMenu}
          />
        </button>
      </div>
    </div>
  );
}
