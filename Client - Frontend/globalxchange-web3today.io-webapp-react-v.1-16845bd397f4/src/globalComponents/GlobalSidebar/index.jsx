// Package Imports
import React, { useEffect, useState, useContext } from "react";

// CSS Imports
import "./globalSidebar.scss";

// Context Imports
import { GlobalContex } from "../../globalContext";

// Image Imports
import Lock from "../../assets/images/icons/lock.svg";
import { ReactComponent as Collapse_img } from "../../assets/images/icons/collapse.svg";
import { ReactComponent as Collapse1_img } from "../../assets/images/icons/collapse1.svg";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const GlobalSidebar = ({ globalMenu }) => {
  const {
    collapse,
    setCollapse,
    loginData,
    setLoginData,
    selectedApp,
    setSelectedApp,
    login,
    setLogin,
    authorDetail,
  } = useContext(GlobalContex);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("selectedApp") && selectedApp === null) {
      setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
    } else if (localStorage.getItem("selectedApp")) {
      localStorage.setItem("selectedApp", JSON.stringify(selectedApp));
    } else {
      localStorage.setItem("selectedApp", JSON.stringify(globalMenu[0]));
      setSelectedApp(globalMenu[0]);
    }
  }, [selectedApp]);

  return (
    <>
      {!collapse ? (
        <div
          // className="sidebar"
          className={loginData ? "sidebar-loggedin" : "sidebar-loggedout"}
          style={{
            height: "100vh",
          }}
        >
          <div
            style={{
              minHeight: loginData
                ? window.innerHeight - 110
                : window.innerHeight,
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {globalMenu.map((item, index) => {
              return (
                <div
                  key={index}
                  className="globalItem"
                  style={{
                    opacity: selectedApp?.appName === item.appName ? 1 : 0.3,
                  }}
                  onClick={(e) => {
                    if (loginData) {
                      if (authorDetail !== null && authorDetail !== undefined) {
                        setSelectedApp(item);
                        history.push(`/${item.appName}`);
                      }
                    } else {
                      if (
                        item.appName === "Authors" ||
                        item.appName === "Web3Today"
                      ) {
                        setSelectedApp(item);
                        // history.push(`/${item.appName}`);
                      }
                    }
                  }}
                >
                  <img src={item?.appLogo} alt="" style={{ width: "30px" }} />
                </div>
              );
            })}
          </div>

          {loginData ? (
            <div className="lock">
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <img src={Lock} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {loginData ? (
        <div className="collapseButton" onClick={(e) => setCollapse(!collapse)}>
          {collapse ? (
            <Collapse1_img fill={selectedApp?.appColor} stroke="none" />
          ) : (
            <Collapse_img fill={selectedApp?.appColor} stroke="none" />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GlobalSidebar;
