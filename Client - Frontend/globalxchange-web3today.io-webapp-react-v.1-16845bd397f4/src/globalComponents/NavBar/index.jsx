import React from "react";
import { useState, useContext, useRef } from "react";
import FilterType from "../Filters/FilterType";
import UserFilter from "../Filters/UserFilter";
import CoinFilter from "../Filters/CoinFilter";
// import RightButton from "../RightButton";
import "./nav.scss";
import { GlobalContex } from "../../globalContext";
import { useEffect } from "react";
import GlobalFilterDrawer from "../GlobalFilterDrawer";
import CoinSelectModal from "../../Apps/MyCryptoBrand/McbTokenHash/McbTokenWithdrawals/CoinSelectModal/CoinSelectModal";
import styles from "../../Apps/MyCryptoBrand/McbTokenHash/McbTokenWithdrawals/SearchAndFilter/searchAndFilter.module.scss";
import { ReactComponent as SettingsIcon } from "../../static/images/clipIcons/settings.svg";
import { ReactComponent as CloseIcon } from "../../static/images/clipIcons/close.svg";
import { ReactComponent as SearchIcon } from "../../static/images/clipIcons/search.svg";
import { ReactComponent as BackIcon } from "../../static/images/clipIcons/back.svg";

import filterIcon from "../../static/images/filter.svg";
const NavBar = ({
  logo,
  name,
  tabs,
  tabSelected,
  setTabSelected,
  enabledFilters,
  customFilters,
}) => {
  //   const [tabSelected, setTabSelected] = useState(null);
  const {
    selectedFilter1,
    setSelectedFilter1,
    selectedFilter2,
    setSelectedFilter2,
    selectedFilter21,
    setSelectedFilter21,
    filter1,
    setFilter1,
    filter2,
    setFilter2,
    customerEmailFilter,
    setCustomerEmailFilter,
    allCoins,
    setAllCoins,
    selectedCoin,
    setSelectedCoin,
    openCoinFilter,
    setOpenCoinFilter,
    refetchApi,
    setRefetchApi,
    globalFilter,
    setGlobalFilter,
    coinSelect,
    setCoinSelect,
  } = useContext(GlobalContex);
  const [query, setQuery] = useState("");
  const [modalCoin, setModalCoin] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref?.current && ref.current.focus();
    }, 200);
  }, []);
  const [settings, setSettings] = useState(false);
  const [step, setStep] = useState(0);

  // useEffect(() => {
  //   setTabSelected([tabs[0]]);
  // }, [tabs]);

  function getContent() {
    switch (step) {
      case 1:
        return (
          <div className={styles.filterView}>
            {/* {filterList?.map((item) => (
              <div key={item.key} className={styles.listItem}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.switchGroup}>
                  <div
                    className={`${styles.switch} ${item.switch && styles.on}`}
                    onClick={() => {
                      try {
                        item.switchClick();
                      } catch (error) {}
                    }}
                  >
                    <div className={styles.switchBall} />
                  </div>
                  <div className={styles.switchLabel}>{item.switchLabel}</div>
                </div>
              </div>
            ))} */}
          </div>
        );

      default:
        return (
          <div className={styles.filterView}>
            {/* {mainList?.map((item) => (
              <div key={item.key} className={styles.listItem}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.switchGroup}>
                  <div
                    className={`${styles.switch} ${item.switch && styles.on}`}
                    onClick={() => {
                      try {
                        item.switchClick();
                      } catch (error) {}
                    }}
                  >
                    <div className={styles.switchBall} />
                  </div>
                  <div className={styles.switchLabel}>{item.switchLabel}</div>
                </div>
              </div>
            ))} */}
            <div className={styles.listItem} onClick={() => setStep(1)}>
              <span className={styles.label}>Filter By</span>
              {/* <span className={styles.value}>{filterBy}</span> */}
            </div>
          </div>
        );
    }
  }

  return (
    <>
      {searchOn ? (
        <div className={styles.searchAndFilter}>
          <input
            className={styles.serchInp}
            ref={ref}
            type="text"
            // placeholder={placeholder}
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
          {step === 1 && (
            <div
              key="back"
              className={styles.moreFilter}
              onClick={() => setStep(0)}
            >
              <BackIcon />
            </div>
          )}
          <div
            className={styles.moreFilter}
            key="settinClose"
            onClick={() => {
              setSettings(!settings);
              setStep(0);
            }}
          >
            {settings ? <CloseIcon /> : <SettingsIcon />}
            <div className={styles.label}>Search Settings</div>
          </div>
          <div
            key="searchClose"
            className={styles.moreFilter}
            onClick={() => {
              setSearchOn(false);
            }}
          >
            <CloseIcon />
            <div className={styles.label}>Close Search</div>
          </div>
          {settings && getContent()}
        </div>
      ) : (
        <>
          <div className="desktopWrapper">
            <div
              style={{ borderBottom: "var(--bordercolor-main)80 solid 1.5px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <div className="tab">
                  {tabs.map((tabItm) => (
                    <div
                      key={tabItm}
                      className={
                        "tabitm" + " " + (tabSelected === tabItm ? "true" : "")
                      }
                      onClick={() => {
                        setTabSelected(tabItm);
                        console.log(tabItm, "jhwdjwed");
                        //   tabClick();
                      }}
                    >
                      <h6 style={{ flexWrap: "nowrap" }}>{tabItm}</h6>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex" }}>
                  {customFilters ? customFilters : ""}
                  <div
                    className={
                      enabledFilters[0] ? "coin-button nav-user" : "nav-user"
                    }
                    onClick={(e) => setGlobalFilter(!globalFilter)}
                  >
                    <img
                      style={{ opacity: enabledFilters[0] ? 1 : 0.3 }}
                      src={filterIcon}
                      alt=""
                      width="20px"
                    />
                  </div>
                  <div
                    className={enabledFilters[1] ? "coin nav-user" : "nav-user"}
                    onClick={() => setModalCoin(true)}
                  >
                    <img src={coinSelect?.coinImage} alt="" width="20px" />
                  </div>
                  {modalCoin && (
                    <CoinSelectModal
                      setCoin={setCoinSelect}
                      onClose={() => setModalCoin(false)}
                    />
                  )}
                  <div
                    onClick={(e) => setGlobalFilter(!globalFilter)}
                    className={
                      enabledFilters[4] ? "coin-button nav-user" : "nav-user"
                    }
                  >
                    <img
                      style={{ opacity: enabledFilters[4] ? 1 : 0.3 }}
                      src={
                        require("../../static/images/icons/refresh.svg").default
                      }
                      alt=""
                    />
                  </div>
                  <div
                    className={
                      enabledFilters[5] ? "coin-button nav-user" : "nav-user"
                    }
                    onClick={() => setSearchOn(true)}
                  >
                    <img
                      style={{ opacity: enabledFilters[5] ? 1 : 0.3 }}
                      src={
                        require("../../static/images/icons/search.svg").default
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobileWrapper">
            <div
              style={{ borderBottom: "var(--bordercolor-main)80 solid 1.5px" }}
            >
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <div className="tab" style={{ overflowX: "scroll" }}>
                  {tabs.map((tabItm) => (
                    <div
                      key={tabItm}
                      className={
                        "tabitm" + " " + (tabSelected === tabItm ? "true" : "")
                      }
                      onClick={() => {
                        setTabSelected(tabItm);
                        console.log(tabItm, "jhwdjwed");
                        //   tabClick();
                      }}
                    >
                      <h6 style={{ flexWrap: "nowrap" }}>{tabItm}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {globalFilter ? <GlobalFilterDrawer /> : ""}
      {filter1 ? (
        <FilterType
          onClose={() => setFilter1(false)}
          onSuccess={() => setFilter1(false)}
          allCoins={allCoins}
          filter1={filter1}
          setFilter1={setFilter1}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedFilter1={selectedFilter1}
          setSelectedFilter1={setSelectedFilter1}
          tabSelected={tabSelected}
          setSelectedFilter21={setSelectedFilter21}
          selectedFilter21={selectedFilter21}
        />
      ) : (
        ""
      )}
      {filter2 ? (
        <UserFilter
          onClose={() => setFilter2(false)}
          onSuccess={() => setFilter2(false)}
          allCoins={allCoins}
          filter2={filter2}
          setFilter2={setFilter2}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedFilter2={selectedFilter2}
          setSelectedFilter2={setSelectedFilter2}
          selectedFilter21={selectedFilter21}
          setSelectedFilter21={setSelectedFilter21}
          customerEmailFilter={customerEmailFilter}
          setCustomerEmailFilter={setCustomerEmailFilter}
          refetchApi={refetchApi}
          setRefetchApi={setRefetchApi}
          query={query}
          setQuery={setQuery}
          tabSelected={tabSelected}
        />
      ) : (
        ""
      )}

      {openCoinFilter ? (
        <CoinFilter
          onClose={() => setOpenCoinFilter(false)}
          onSuccess={() => setOpenCoinFilter(false)}
          allCoins={allCoins}
          openCoinFilter={openCoinFilter}
          setOpenCoinFilter={setOpenCoinFilter}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
