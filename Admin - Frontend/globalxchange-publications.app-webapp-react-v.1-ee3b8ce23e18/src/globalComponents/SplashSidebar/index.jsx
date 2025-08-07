import React, { useState, useEffect } from "react";
import classNames from "./sidebar.module.scss";

import myCrypto_full from "../../static/images/logos/myCrypto_full.svg";
import arrowRight from "../../static/images/templateLogos/arrowRight.svg";

const SplashSidebar = ({
  showDraw,
  setShowDraw,
  selectedMenu,
  selectedSplashCoin,
  setSelectedSplashCoin,
}) => {
  const [coinQuery, setCoinQuery] = useState("");

  const conditionalRenderMenu = () => {
    if (selectedMenu.length > 20) {
      return (
        <>
          <input
            value={coinQuery}
            onChange={(e) => setCoinQuery(e.target.value)}
            className={classNames.coinInput}
            type="text"
            placeholder="Search Capitalized.App...."
          />
          {/* <input className={classNames.coinInput} placeholder=""/> */}

          <div
            style={{
              paddingTop: "40px",
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            {selectedMenu
              .filter((item) => {
                const lowquery = coinQuery.toLowerCase();
                return (
                  (item.coinName + item.coinSymbol)
                    .toLowerCase()
                    .indexOf(lowquery) >= 0
                );
              })
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      setSelectedSplashCoin(item);
                      setShowDraw(false);
                      // setDisableBack(false);
                    }}
                    className={classNames.menuHover}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        border: "0.5px solid #E5E5E5",
                        borderRadius: "5px",
                        width: "53px",
                        height: "53px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={item.coinImage} alt="" width="27px" />
                    </div>
                    <div style={{ paddingLeft: "20px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 700 }}>
                        {item.coinName}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 400,
                          paddingTop: "8px",
                        }}
                      >
                        {item.coinSymbol}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      );
    } else {
      return selectedMenu.map((item, index) => {
        return (
          <div
            onClick={(e) => {
              if (item.title !== "Email" && item.link !== "") {
                window.open(item.link, "_blank");
              } else if (item.title === "Email") {
                window.open("mailto:" + item.link, "_blank");
              }
            }}
            key={index}
            className={item.link !== "" ? classNames.menuHover : ""}
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "35px",
              opacity: item.link !== "" ? 1 : 0.2,
            }}
          >
            <div
              style={{
                border: "0.5px solid #E5E5E5",
                borderRadius: "5px",
                width: "53px",
                height: "53px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={item.icon} alt="" width="27px" />
            </div>
            <div style={{ paddingLeft: "20px" }}>
              <div className={classNames.title}>{item.title}</div>
              <div className={classNames.subtitle}>{item.subtitle}</div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        // ref={wrapperRef}
        className={
          showDraw ? classNames.tooltipVisible1 : classNames.tooltipHidden1
        }
        style={{ padding: "38px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "140px", cursor: "pointer" }}
            src={myCrypto_full}
            alt=""
            // onClick={(e) => setSelectedNav("About")}
          />
          <div
            className={classNames.goButton}
            onClick={(e) => setShowDraw(false)}
          >
            <img src={arrowRight} alt="" />
          </div>
        </div>

        <div
          style={{ paddingTop: "50px", overflowY: "scroll", height: "90vh" }}
        >
          {conditionalRenderMenu()}
          {/* {!selectedMenu?.coinName ? (
            selectedMenu.map((item, index) => {
              return (
                <div
                  onClick={(e) => {
                    if (item.title !== "Email" && item.link !== "") {
                      window.open(item.link, "_blank");
                    } else if (item.title === "Email") {
                      window.open("mailto:" + item.link, "_blank");
                    }
                  }}
                  key={index}
                  className={item.link !== "" ? classNames.menuHover : ""}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "35px",
                    opacity: item.link !== "" ? 1 : 0.2,
                  }}
                >
                  <div
                    style={{
                      border: "0.5px solid #E5E5E5",
                      borderRadius: "5px",
                      width: "53px",
                      height: "53px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={item.icon} alt="" width="27px" />
                  </div>
                  <div style={{ paddingLeft: "20px" }}>
                    <div className={classNames.title}>{item.title}</div>
                    <div className={classNames.subtitle}>{item.subtitle}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div style={{ paddingTop: "36px" }}>
                <input
                  value={coinQuery}
                  onChange={(e) => setCoinQuery(e.target.value)}
                  className={classNames.coinInput}
                  type="text"
                  placeholder="Search Capitalized.App...."
                />
                {/* <input className={classNames.coinInput} placeholder=""/> 
              </div>
              <div
                style={{
                  paddingTop: "40px",
                  height: "600px",
                  overflowY: "scroll",
                }}
              >
                {filteredCoins.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => {
                        setSelectedSplashCoin(item);
                        setShowDraw(false);
                        // setDisableBack(false);
                      }}
                      className={classNames.menuHover}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "40px",
                      }}
                    >
                      <div
                        style={{
                          border: "0.5px solid #E5E5E5",
                          borderRadius: "5px",
                          width: "53px",
                          height: "53px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={item.coinImage} alt="" width="27px" />
                      </div>
                      <div style={{ paddingLeft: "20px" }}>
                        <div style={{ fontSize: "15px", fontWeight: 700 }}>
                          {item.coinName}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 400,
                            paddingTop: "8px",
                          }}
                        >
                          {item.coinSymbol}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SplashSidebar;
