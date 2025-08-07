import React from "react";
import "./search-currency.style.scss";
import { ImagesCS } from "../../../assets/0a-exporter";
export default function SearchCurrency({
  currencySelectorDropdown,
  setCurrencySelectorDropdown,
  setSelectedCountry,
  countryList,
  selectedCountry,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleClick = (obj) => {
    setSelectedCountry(obj);
    setCurrencySelectorDropdown(false);
  };
  return (
    <div
      className={`search-currency ${
        currencySelectorDropdown ? "full-height" : ""
      }`}
    >
      {currencySelectorDropdown ? (
        <>
          <div className="search-currency-search-bar">
            <img src={ImagesCS.search} />
            <input
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              placeholder="Which Countries Cryptocurrency Ecosystem Do You Want To Explore?"
            />
          </div>
          <div className="search-currency-list">
            {countryList
              .filter((x) => {
                return x.formData.Name.toLowerCase().startsWith(searchTerm);
              })
              .map((obj) => (
                <div className="s-c-l-row" onClick={() => handleClick(obj)}>
                  <div>
                    <img className="flag" src={obj.formData.Flag} />
                    {obj.formData.Name}
                  </div>
                  <div
                    className={
                      selectedCountry?.formData?.Name === obj.formData.Name
                        ? ""
                        : "d-none"
                    }
                  >
                    <img src={ImagesCS.doneLogo} />
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
