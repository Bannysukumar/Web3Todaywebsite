import React, { useContext, useEffect, useRef, useState } from "react";

import myCrypto_full from "../../static/images/logos/myCrypto_full.svg";
import { useNavigate, useLocation } from "react-router-dom";

import cryptoStartup from "../../static/images/menulogos/cryptoStartup.svg";
import cryptoMarketing from "../../static/images/menulogos/cryptoMarketing.svg";
import cryptoLaw from "../../static/images/menulogos/cryptoLaw.svg";
import safeStorage from "../../static/images/menulogos/safeStorage.svg";
import blockSoftware from "../../static/images/menulogos/blockSoftware.svg";
import cryptoShild from "../../static/images/menulogos/cryptoShild.svg";
import news from "../../static/images/icons/news.svg";
import insta from "../../static/images/menulogos/insta.svg";
import discord from "../../static/images/menulogos/discord.svg";
import youtube from "../../static/images/menulogos/youtube.svg";
import email from "../../static/images/icons/home_logo_3.svg";
import whatsApp from "../../static/images/icons/whatsApp.svg";
import connection from "../../static/images/icons/connection.svg";
import telegram from "../../static/images/icons/telegram.svg";

import "./splashHeader.scss";
import SplashSidebar from "../SplashSidebar";
import { GlobalContex } from "../../globalContext";
import axios from "axios";

const SplashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showDraw, setShowDraw, selectedMenu, setSelectedMenu } =
    useContext(GlobalContex);

  const [allCoins, setAllCoins] = useState([]);

  const appMenu = [
    {
      icon: cryptoStartup,
      title: "CryptoStartups.com",
      subtitle: "Crypto Business Publication",
      link: "http://cryptostartups.com",
    },
    {
      icon: cryptoMarketing,
      title: "CryptoMarketingPro",
      subtitle: "Blockchain Marketing Agency",
      link: "http://cryptomarketingpro.com",
    },
    {
      icon: cryptoLaw,
      title: "CryptoLaw.com",
      subtitle: "Crypto Legal Publication",
      link: "http://cryptolaw.com",
    },
    {
      icon: safeStorage,
      title: "Safe Storage",
      subtitle: "Institutional Custody Solution",
      link: "http://safe.storage",
    },
    {
      icon: blockSoftware,
      title: "Block.Software",
      subtitle: "Blockchain Development Agency",
      link: "http://block.software",
    },
    {
      icon: cryptoShild,
      title: "CryptocurrencyShield",
      subtitle: "Crypto Insurance Platform",
      link: "http://cryptocurrencyshield.com",
    },
  ];

  const socialMediaMenu = [
    {
      icon: news,
      title: "Blog",
      subtitle: "blog.mycryptobrand.com",
      link: "http://blog.mycryptobrand.com",
    },
    {
      icon: email,
      title: "Email",
      subtitle: "support@inr.group",
      link: "contact@mycryptobrand.com",
    },
    {
      icon: discord,
      title: "Discord",
      subtitle: "Join Server",
      link: "",
    },
    {
      icon: youtube,
      title: "Youtube",
      subtitle: "Go To Channel",
      link: "https://www.youtube.com/channel/UCthJbOwKpKcPSx6gYaMeWTw",
    },
    {
      icon: insta,
      title: "Instagram",
      subtitle: "@inr.group",
      link: "https://www.instagram.com/mycryptobrandofficial/",
    },
    {
      icon: whatsApp,
      title: "WhatsApp",
      subtitle: "@inr.group",
      link: "https://api.whatsapp.com/send?phone=16477234329&text=&source=&data=",
    },
    {
      icon: telegram,
      title: "Telegram",
      subtitle: "@inr.group",
      link: "",
    },
    {
      icon: connection,
      title: "Connection",
      subtitle: "@inr.group",
      link: "",
    },
  ];

  useEffect(() => {
    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then((res) => {
        setAllCoins(res.data.coins);
      });
  }, []);

  return (
    <>
      <div>
        <div className="gridTwo">
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              onClick={(e) => window.open("http://globalxchange.com", "_blank")}
              className={!showDraw ? "topIcons" : ""}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div>
                <img
                  src={
                    require("../../static/images/icons/home_logo_11.svg")
                      .default
                  }
                  alt=""
                />
              </div>
            </div>
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                setShowDraw(true);
                setSelectedMenu(appMenu);
              }}
              className={!showDraw ? "topIcons" : ""}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={
                  require("../../static/images/icons/home_logo_2.svg").default
                }
                alt=""
              />
            </div>
          </div>

          <div>&nbsp;</div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                setShowDraw(true);
                setSelectedMenu(socialMediaMenu);
              }}
              // ref={wrapperRef}
              className={!showDraw ? "topIcons1" : ""}
              style={{
                // marginLeft: "-1.5px",
                //   borderLeft: !disableBack ? "0.5px solid var(--bordercolor-main)" : "",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                //   pointerEvents: showMenu ? "none" : "",
              }}
            >
              <img
                //   style={{ opacity: !disableBack ? 1 : 0.3 }}
                src={
                  require("../../static/images/icons/home_logo_3.svg").default
                }
                alt=""
              />
            </div>
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                setShowDraw(true);
                setSelectedMenu(allCoins);
              }}
              className={!showDraw ? "topIcons1" : ""}
              style={{
                //   borderLeft: !disableBack ? "0.5px solid var(--bordercolor-main)" : "",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //   opacity: !disableBack ? 1 : 0.4,
              }}
            >
              <img
                //   style={{ opacity: !disableBack ? 1 : 0.4 }}
                src={
                  require("../../static/images/icons/home_logo_4.svg").default
                }
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="grid">
          <div
            style={{
              paddingTop: "13px",
              paddingLeft: "75px",
              // display: "flex",
              // justifyContent: "center",
              display: "block",
            }}
          >
            <img
              style={{ width: "140px", cursor: "pointer" }}
              src={myCrypto_full}
              alt=""
              onClick={(e) => navigate("/")}
            />
          </div>
          <div>
            <input
              className="searchBox"
              type="text"
              style={{
                padding: "0px 20px",
                //   opacity: !disableBack ? 1 : 0.03,
                border: "none",
              }}
              placeholder="Search MyCryptoBrand...."
            />
          </div>
          <div
          // onClick={(e) => setSelectedNav("About")}
          >
            <span
              className={pathname === "/" ? "selectednav" : "nonselectednav"}
              onClick={(e) => navigate("/")}
            >
              About
            </span>
          </div>
          <div onClick={(e) => navigate("/templates")}>
            <span
              className={
                pathname === "/templates" ? "selectednav" : "nonselectednav"
              }
            >
              Templates
            </span>
          </div>
          <div
            onClick={(e) => window.open(`http://marketsverse.com`, "_blank")}
          >
            MarketsVerse
          </div>
          <div onClick={(e) => window.open(`http://block.software`, "_blank")}>
            Block.Software
          </div>
          <div
            onClick={(e) => window.open(`http://metaverseapps.io`, "_blank")}
          >
            MetaverseApps
          </div>
          <div onClick={(e) => navigate("/login")}>Login</div>
          <div
            style={{
              // color: "white",
              fontWeight: "700",
              // opacity: !disableBack ? 1 : 0.1,
            }}
          >
            Register
          </div>
        </div>
      </div>
      {showDraw ? (
        <div
          style={{
            // display: "static",
            height: "100vh",
            width: "350px",
            background: "white",
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
          }}
        >
          <SplashSidebar
            showDraw={showDraw}
            setShowDraw={setShowDraw}
            selectedMenu={selectedMenu}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SplashHeader;
