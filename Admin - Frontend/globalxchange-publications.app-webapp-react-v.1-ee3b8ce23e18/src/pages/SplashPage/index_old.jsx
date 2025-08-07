import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "./splashPage.module.scss";
import "./splash.css";

import homeImg from "../../static/images/bgs/homeBg.png";
import homeImgDark from "../../static/images/bgs/home_dark.png";

import taxChains from "../../static/images/menulogos/taxChains.svg";

import Banker from "../../static/images/menulogos/Banker.svg";
import Capitalized from "../../static/images/menulogos/Capitalized.svg";
import Create from "../../static/images/menulogos/Create.svg";
import FundManager from "../../static/images/menulogos/FundManager.svg";
import OTCDesks from "../../static/images/menulogos/OtcDesks.svg";
import Terminals from "../../static/images/menulogos/Terminals.svg";

import cryptoStartup from "../../static/images/menulogos/cryptoStartup.svg";
import cryptoMarketing from "../../static/images/menulogos/cryptoMarketing.svg";
import cryptoLaw from "../../static/images/menulogos/cryptoLaw.svg";
import safeStorage from "../../static/images/menulogos/safeStorage.svg";
import blockSoftware from "../../static/images/menulogos/blockSoftware.svg";
import cryptoShild from "../../static/images/menulogos/cryptoShild.svg";

import insta from "../../static/images/menulogos/insta.svg";
import discord from "../../static/images/menulogos/discord.svg";
import youtube from "../../static/images/menulogos/youtube.svg";
import email from "../../static/images/icons/home_logo_3.svg";
import whatsApp from "../../static/images/icons/whatsApp.svg";
import connection from "../../static/images/icons/connection.svg";
import telegram from "../../static/images/icons/telegram.svg";

import news from "../../static/images/icons/news.svg";
import media from "../../static/images/icons/media.svg";
import terms from "../../static/images/icons/terms.svg";
import privacy from "../../static/images/icons/privacy.svg";
import career from "../../static/images/icons/career.svg";
import investors from "../../static/images/icons/investors.svg";

import demoIcon from "../../static/images/clipIcons/demo.svg";
import playIcon from "../../static/images/clipIcons/watch.svg";

import myCrypto_full from "../../static/images/logos/myCrypto_full.svg";

import doubleArrow from "../../static/images/icons/doubleArrow.svg";
import arrowRight from "../../static/images/templateLogos/arrowRight.svg";

import axios from "axios";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import Templates from "./Templates";
import SplashHeader from "../../globalComponents/SplashHeader";
import SplashSidebar from "../../globalComponents/SplashSidebar";

const SplashPageOld = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef();
  const menuRef = useRef(null);
  // useOutsideAlerter(menuRef);
  useOutsideAlerter(wrapperRef);
  const [showMarket, setShowMarket] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  const [disableBack, setDisableBack] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [appWidth, setAppWidth] = useState(0);
  const [allCoins, setAllCoins] = useState([]);
  const [coinQuery, setCoinQuery] = useState("");
  const [allApps, setAllApps] = useState(0);
  const [statistics, setStatistics] = useState(null);
  const [totalAppUser, setTotalAppUser] = useState(0);

  const [fiatAsset, setFiatAsset] = useState(0);
  const [cryptoAsset, setCryptoAsset] = useState(0);

  const [visibleVideoModal, setVisibleVideoModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [bondLoading, setBondLoading] = useState(false);

  const [counter, setCounter] = useState(0);

  const [selectedNav, setSelectedNav] = useState("About");

  let filteredCoins = allCoins
    ? allCoins.filter((item) => {
        const lowquery = coinQuery.toLowerCase();
        return (
          (item.coinName + item.coinSymbol).toLowerCase().indexOf(lowquery) >= 0
        );
      })
    : "";

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!loading) {
      setCounter(counter + 1);
    }
  }, [loading]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setAppWidth(width);
    // console.log(width, "appWidth");
  };

  useEffect(() => {
    if (disableBack) {
      document.documentElement.style.overflow = "hidden";
      document.body.scroll = "no";
    } else {
      document.documentElement.style.overflow = "scroll";
      document.body.scroll = "yes";
    }
  }, [disableBack]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then((res) => {
        setAllCoins(res.data.coins);
      });

    axios.get(`https://comms.globalxchange.io/gxb/apps/get`).then((res) => {
      setAllApps(res.data.count);
    });

    axios
      .get(
        `https://comms.globalxchange.io/coin/vault/service/users/holdings/data/get`
      )
      .then((res) => {
        setTotalAppUser(res.data.totalUsersCount);
      });

    axios
      .get(
        `https://comms.globalxchange.io/coin/vault/service/users/total/holdings/data/all`
      )
      .then((res) => {
        setFiatAsset(res.data.total_liquid_fiatHoldings);
        setCryptoAsset(res.data.total_liquid_cryptoHoldings);
      });
  }, []);

  useEffect(() => {
    if (
      allApps !== 0 &&
      totalAppUser !== 0 &&
      cryptoAsset !== 0 &&
      fiatAsset !== 0
    ) {
      setLoading(false);
    }
  }, [allApps, totalAppUser, cryptoAsset, fiatAsset]);

  useEffect(() => {
    // setLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/coin/iced/banker/custom/user/bond/stats?displayCurrency=${selectedCoin.coinSymbol}`
      )
      .then((res) => {
        setStatistics(res.data.totalData);
        // setLoading(false);
      });
  }, [selectedCoin]);

  const handleMenuClick = (item) => {
    switch (item.title) {
      case "Banker":
        window.open("http://banker.app", "_blank");
        break;
      // case "Capitalized":
      //   window.open("http://capitalized.app", "_blank");
      //   break;
      case "Create":
        window.open("http://creating.app", "_blank");
        break;
      case "FundManager":
        window.open("http://fundmanagers.app", "_blank");
        break;
      case "OTCDesks":
        window.open("http://otcdesks.com", "_blank");
        break;
      case "Terminals":
        window.open("http://terminals.app", "_blank");
        break;
      default:
        break;
    }
  };

  const menuList = [
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

  const connectionList = [
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

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      function handleClickOutside(event) {
        // console.log(ref.current, event.target, "kwjbfkwjbefc");
        if (ref.current && !ref.current.contains(event.target)) {
          //   alert("You clicked outside of me!");
          setShowMarket(false);
          setShowMenu(false);
          setShowConnect(false);
          setDisableBack(false);
          setShowCoins(false);
          setVisibleVideoModal(false);
          // ref.current = null;
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const convertCurrencySystem = (inputValue) => {
    if (selectedCoin.coinSymbol === "INR") {
      return Math.abs(Number(inputValue)) >= 1.0e7
        ? (Math.abs(Number(inputValue)) / 1.0e7).toFixed(1)
        : // Six Zeroes for Millions
        Math.abs(Number(inputValue)) >= 1.0e5
        ? (Math.abs(Number(inputValue)) / 1.0e5).toFixed(1)
        : // Three Zeroes for Thousands
        Math.abs(Number(inputValue)) >= 1.0e3
        ? (Math.abs(Number(inputValue)) / 1.0e3).toFixed(1)
        : Math.abs(Number(inputValue));
    } else {
      // Nine Zeroes for Billions
      return Math.abs(Number(inputValue)) >= 1.0e9
        ? (Math.abs(Number(inputValue)) / 1.0e9).toFixed(1)
        : // Six Zeroes for Millions
        Math.abs(Number(inputValue)) >= 1.0e6
        ? (Math.abs(Number(inputValue)) / 1.0e6).toFixed(1)
        : // Three Zeroes for Thousands
        Math.abs(Number(inputValue)) >= 1.0e3
        ? (Math.abs(Number(inputValue)) / 1.0e3).toFixed(1)
        : Math.abs(Number(inputValue));
    }
  };

  const convertCurrencySystem1 = (inputValue) => {
    if (selectedCoin.coinSymbol === "INR") {
      return Math.abs(Number(inputValue)) >= 1.0e7
        ? "Cr"
        : // Six Zeroes for Millions
        Math.abs(Number(inputValue)) >= 1.0e5
        ? "L"
        : // Three Zeroes for Thousands
        Math.abs(Number(inputValue)) >= 1.0e3
        ? "K"
        : "";
    } else {
      // Nine Zeroes for Billions
      return Math.abs(Number(inputValue)) >= 1.0e9
        ? "B"
        : // Six Zeroes for Millions
        Math.abs(Number(inputValue)) >= 1.0e6
        ? "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(inputValue)) >= 1.0e3
        ? "K"
        : "";
    }
  };

  const conditionalHomeSection = () => {
    switch (selectedNav) {
      case "About":
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: window.innerHeight - 175,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    paddingLeft: "80px",
                    paddingRight: "0px",
                    marginTop: "-5vh",
                  }}
                >
                  <div className={classNames.heroText}>
                    Launch Your Crypto <br />
                    Business Instantly
                  </div>
                  <div
                    className={classNames.subHeroText}
                    style={{ paddingRight: "14.5vw", paddingTop: "30px" }}
                  >
                    MyCryptoBrand.com Is A Turnkey System Which Enables You To
                    Launch & Manage Your Own Crypto Business
                  </div>
                  <div
                    className={disableBack ? classNames.no_pointer : ""}
                    style={{
                      display: "flex",
                      paddingTop: "58px",
                      opacity: !disableBack ? 1 : 0.3,
                    }}
                  >
                    <div
                      onClick={(e) => navigate("/login")}
                      className={classNames.requestDemoButton}
                      style={{
                        width: "13vw",
                        height: "7vh",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={demoIcon} alt="" style={{ width: "1vw" }} />
                      &nbsp;&nbsp;Request Demo
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                      onClick={(e) => {
                        setVisibleVideoModal(true);
                        setDisableBack(true);
                      }}
                      className={classNames.watchVideoButton}
                      style={{
                        width: "13vw",
                        height: "7vh",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={playIcon} alt="" style={{ width: "0.9vw" }} />
                      &nbsp;&nbsp;Watch Video
                    </div>
                  </div>
                </div>
              </div>

              <div className="bgclass" style={{ width: "100%" }}>
                &nbsp;
              </div>
            </div>
            <div className={classNames.ctaSection}>
              Get A Free Consultation To See If Your Business Can Use
              MyCryptoBrand Today
            </div>

            <div
              className={classNames.statSection}
              style={{
                height: "100vh",
              }}
            >
              {/* Applicantions */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  <CountUp end={allApps} duration={3} />
                </div>
                <div className={classNames.subtitle}>Applications</div>
              </div>
              {/* User */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  <CountUp
                    end={convertCurrencySystem(totalAppUser)}
                    duration={3}
                    decimals={1}
                  />
                  {convertCurrencySystem1(totalAppUser)}
                </div>
                <div className={classNames.subtitle}>Users</div>
              </div>
              {/* Crypto Assets */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  $
                  <CountUp
                    end={convertCurrencySystem(cryptoAsset)}
                    duration={3}
                    decimals={1}
                  />
                  {convertCurrencySystem1(cryptoAsset)}
                </div>
                <div className={classNames.subtitle}>Crypto Assets</div>
              </div>
              {/* Fiat Assets */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  $
                  <CountUp
                    end={convertCurrencySystem(fiatAsset)}
                    duration={3}
                    decimals={1}
                  />
                  {convertCurrencySystem1(fiatAsset)}
                </div>
                <div className={classNames.subtitle}>Fiat Assets</div>
              </div>
              {/* Marketcap */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  --
                  {/* $
                  <CountUp
                    end={convertCurrencySystem(fiatAsset)}
                    duration={3}
                    decimals={1}
                  />
                  {convertCurrencySystem1(fiatAsset)} */}
                </div>
                <div className={classNames.subtitle}>Marketcap</div>
              </div>
              {/* App Revenue */}
              <div className={classNames.statCard}>
                <div className={classNames.title}>
                  --
                  {/* $
                  <CountUp
                    end={convertCurrencySystem(fiatAsset)}
                    duration={3}
                    decimals={1}
                  />
                  {convertCurrencySystem1(fiatAsset)} */}
                </div>
                <div className={classNames.subtitle}>App Revenue</div>
              </div>
            </div>

            <div className={classNames.contentSections}>
              <div className={classNames.textSection}>
                <div className={classNames.bigTitle}>
                  We Empower
                  <br />
                  Cryptopreneurs
                </div>
                <div className={classNames.smallSubtitle}>
                  MyCryptoBrand.com Is A Turnkey System Which Enables You To
                  Launch & Manage Your Own Crypto Business
                </div>
                {/* <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <div className={classNames.learnMoreButton}>
                  <div>Learn More</div>
                  <img src={doubleArrow} alt="" />
                </div>
              </div> */}
              </div>
              <div className="bgclass1">&nbsp;</div>
            </div>

            <div className={classNames.contentSections}>
              <div className="bgclass2">&nbsp;</div>
              <div className={classNames.textSection}>
                <div className={classNames.bigTitle}>
                  Plug Into The
                  <br />
                  MarketsVerse
                </div>
                <div className={classNames.smallSubtitle}>
                  MyCryptoBrand.com Is A Turnkey System Which Enables You To
                  Launch & Manage Your Own Crypto Business
                </div>
              </div>
            </div>
            <div className={classNames.contentSections}>
              <div className={classNames.textSection}>
                <div className={classNames.bigTitle}>
                  State Of The Art <br />
                  Apps. No Code
                </div>
                <div className={classNames.smallSubtitle}>
                  MyCryptoBrand.com Is A Turnkey System Which Enables You To
                  Launch & Manage Your Own Crypto Business
                </div>
              </div>
              <div className="bgclass3">&nbsp;</div>
            </div>
          </>
        );
      case "Templates":
        return <Templates />;
      default:
        break;
    }
  };

  const youTubeIframe = useMemo(() => {
    if (visibleVideoModal) {
      return (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/V9V_6bLuePU"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      );
    }
  }, [visibleVideoModal]);

  return (
    <>
      <div
        // style={{ overflow: disableBack ? "none" : "" }}
        className={disableBack ? classNames.overlayClose : ""}
      ></div>
      {appWidth > 900 ? (
        <div className={classNames.overlay} style={{ overflowY: "scroll" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Nav & Grid */}

            <SplashHeader
              wrapperRef={wrapperRef}
              setDisableBack={setDisableBack}
              disableBack={disableBack}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              setShowConnect={setShowConnect}
              showConnect={showConnect}
              setShowCoins={setShowCoins}
              showCoins={showCoins}
              setShowMarket={setShowMarket}
              selectedCoin={selectedCoin}
            />
            {/* After Nav all sections */}

            {conditionalHomeSection()}
            <div
              style={{
                borderBottom: "0.5px solid #E7E7E7",
                // paddingTop: "145px",
                marginTop: "-22px",
              }}
            >
              &nbsp;
            </div>
            {/* Footer Section */}
            <div
              style={{
                // height: "450px",
                display: "grid",
                gridTemplateColumns: "3fr 3fr 6fr",
                padding: "60px 80px",
                height: "60vh",
              }}
            >
              <div
                style={{
                  borderRight: "0.5px solid #E7E7E7",
                  display: "flex",
                  flex: "1 1",

                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className={classNames.footerTitle}>Contact</div>
                <div className={classNames.footerMenu}>
                  <img
                    src={insta}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Instagram
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={youtube}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  YouTube
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={whatsApp}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  WhatsApp
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={connection}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Connection
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={telegram}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Telegram
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={email}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Email
                </div>
              </div>
              <div
                style={{
                  borderRight: "0.5px solid #E7E7E7",
                  paddingLeft: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className={classNames.footerTitle}>About</div>
                <div className={classNames.footerMenu}>
                  <img src={news} alt="" className={classNames.footerMenuImg} />{" "}
                  News
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={media}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Media Assets
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={terms}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Terms Of Use
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={privacy}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Privacy Policy
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={career}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Careers
                </div>
                <div className={classNames.footerMenu}>
                  <img
                    src={investors}
                    alt=""
                    className={classNames.footerMenuImg}
                  />{" "}
                  Investors
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-between",
                  paddingLeft: "40px",
                }}
              >
                <div
                  className={classNames.footerTitle}
                  style={{ paddingBottom: "50px" }}
                >
                  Products
                </div>

                <div
                  style={{
                    display: "grid",
                    // gap: 10,
                    gridTemplateColumns: "1fr 1fr 1fr",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: "1 1",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={classNames.footerMenu}>HyFi</div>
                    <div className={classNames.footerMenu}>Wealth</div>
                    <div className={classNames.footerMenu}>OTCDesk</div>
                    <div className={classNames.footerMenu}>Terminal</div>
                    <div className={classNames.footerMenu}>Fund Management</div>
                    <div className={classNames.footerMenu}>NFTMarketplace</div>
                    <div className={classNames.footerMenu}>NFT Reward</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: "1 1",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={classNames.footerMenu}>Defi Markets</div>
                    <div className={classNames.footerMenu}>Signals</div>
                    <div className={classNames.footerMenu}>Create Exchange</div>
                    <div className={classNames.footerMenu}>Create NFT</div>
                    <div className={classNames.footerMenu}>
                      Create NFT Market
                    </div>
                    <div className={classNames.footerMenu}>
                      Create ShareToken
                    </div>
                    <div className={classNames.footerMenu}>
                      Create ShareToken Market
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: "1 1",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={classNames.footerMenu}>Create FundCoin</div>
                    <div className={classNames.footerMenu}>
                      Create FundCoin Market
                    </div>
                    <div className={classNames.footerMenu}>
                      Create IndexCoin
                    </div>
                    <div className={classNames.footerMenu}>
                      Create IndexCoin Market
                    </div>
                    <div className={classNames.footerMenu}>Create Bond</div>
                    <div className={classNames.footerMenu}>
                      Create Bond Market
                    </div>
                    <div className={classNames.footerMenu}>&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames.bottomText}
              style={{
                height: "65px",
                padding: "0px 50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "0.5px solid #E7E7E7",
              }}
            >
              All Rights Reserved 2022 MyCryptoBrand.com
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              borderBottom: "0.5px solid #E5E5E5",
            }}
          >
            {!showSidebar ? (
              <img
                onClick={(e) => setShowSidebar(true)}
                style={{ width: "28px" }}
                src={
                  require("../../static/images/icons/home_logo_2.svg").default
                }
                alt=""
              />
            ) : (
              <img
                onClick={(e) => setShowSidebar(false)}
                style={{ width: "33px" }}
                src={require("../../static/images/icons/close_2.svg").default}
                alt=""
              />
            )}
            <img style={{ width: "140px" }} src={myCrypto_full} alt="" />
            <div>&nbsp;</div>
          </div>
          {!showSidebar ? (
            <>
              <div
                className={classNames.bg}
                style={{
                  height: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "700",
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  Launch Your Crypto Business Instantly
                </div>
                <div
                  style={{
                    color: "white",
                    // fontSize: "13px",
                    fontWeight: "700",
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  MyCryptoBrand.com Is A Turnkey System Which Enables You To
                  Launch & Manage Your Own Crypto Business
                </div>
                <div
                  className={disableBack ? classNames.no_pointer : ""}
                  style={{
                    display: "flex",
                    paddingTop: "58px",
                    opacity: !disableBack ? 1 : 0.3,
                  }}
                >
                  <div
                    onClick={(e) => navigate("/login")}
                    className={classNames.requestDemoButton}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px 20px",
                    }}
                  >
                    <img src={demoIcon} alt="" />
                    &nbsp;Request Demo
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    className={classNames.watchVideoButton}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px 20px",
                    }}
                  >
                    <img src={playIcon} alt="" />
                    &nbsp;Watch Video
                  </div>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    paddingTop: "30px",
                  }}
                >
                  <div
                    onClick={(e) => navigate("/login")}
                    className={classNames.loginButton}
                    style={{ width: "35vw", height: "7vh", cursor: "pointer" }}
                  >
                    Login
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    className={classNames.registerButton}
                    style={{ width: "35vw", height: "7vh", cursor: "pointer" }}
                  >
                    Register
                  </div>
                </div> */}
              </div>

              {!loading && statistics ? (
                <>
                  <div className={classNames.gridMobile}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={classNames.titleMobile}>
                        <CountUp end={allApps} duration={3} />
                      </div>
                      <div className={classNames.subtitleMobile}>Apps</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={classNames.titleMobile}>
                        <CountUp
                          end={Math.floor(statistics.bonds_sold)}
                          duration={3}
                        />
                      </div>
                      <div className={classNames.subtitleMobile}>
                        Application Users
                      </div>
                    </div>
                  </div>
                  <div className={classNames.gridMobile}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={classNames.titleMobile}>
                        <CountUp
                          end={convertCurrencySystem(statistics?.investment)}
                          duration={3}
                          decimals={1}
                        />
                        {convertCurrencySystem1(statistics?.investment)}
                      </div>
                      <div className={classNames.subtitleMobile}>
                        Vault Holdings
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={classNames.titleMobile}>
                        <CountUp
                          end={statistics?.customers_count}
                          duration={3}
                        />
                      </div>
                      <div className={classNames.subtitleMobile}>
                        TXN Volume
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={classNames.gridMobile}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="skeleton"
                        style={{ width: "100%", padding: "0px 20px" }}
                      >
                        <div
                          className="skeleton-left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="line"
                            style={{ width: "100%", height: "20px" }}
                          ></div>
                          <div
                            className="line"
                            style={{ width: "50%", height: "10px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="skeleton"
                        style={{ width: "100%", padding: "0px 20px" }}
                      >
                        <div
                          className="skeleton-left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="line"
                            style={{ width: "100%", height: "20px" }}
                          ></div>
                          <div
                            className="line"
                            style={{ width: "50%", height: "10px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classNames.gridMobile}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="skeleton"
                        style={{ width: "100%", padding: "0px 20px" }}
                      >
                        <div
                          className="skeleton-left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="line"
                            style={{ width: "100%", height: "20px" }}
                          ></div>
                          <div
                            className="line"
                            style={{ width: "50%", height: "10px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="skeleton"
                        style={{ width: "100%", padding: "0px 20px" }}
                      >
                        <div
                          className="skeleton-left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="line"
                            style={{ width: "100%", height: "20px" }}
                          ></div>
                          <div
                            className="line"
                            style={{ width: "50%", height: "10px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ padding: "25px" }}>
              <br />
              <div className={classNames.mobileMenuItem}>About</div>
              <div className={classNames.mobileMenuItem}>Applicantions</div>
              <div className={classNames.mobileMenuItem}>Markets</div>
              <div className={classNames.mobileMenuItem}>Custom</div>
              <br />
              <div
                onClick={(e) => navigate("/login")}
                className={classNames.loginButton}
                style={{
                  width: "100%",
                  height: "7vh",
                  cursor: "pointer",
                  background: "#E5E5E5",
                }}
              >
                Login
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div
                className={classNames.registerButton}
                style={{
                  width: "100%",
                  height: "7vh",
                  cursor: "pointer",
                }}
              >
                Register
              </div>
              {/* <div className={classNames.mobileMenuItem}>Login</div>
              <div className={classNames.mobileMenuItem}>Register</div> */}
              <br />
              {/* <hr style={{ borderColor: "#E5E5E5" }} /> */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {connectionList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames.menuHover}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingBottom: "40px",
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* position absolute divs */}

      <SplashSidebar showSidebar={showSidebar} />

      <div
        onMouseDown={(e) => e.stopPropagation()}
        ref={wrapperRef}
        className={
          showMenu ? classNames.tooltipVisible1 : classNames.tooltipHidden1
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
            onClick={(e) => {
              setShowMenu(false);
              setDisableBack(false);
            }}
          >
            <img src={arrowRight} alt="" />
          </div>
        </div>

        <div
          style={{ paddingTop: "50px", overflowY: "scroll", height: "90vh" }}
        >
          {menuList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  window.open(item.link, "_blank");
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
                  <img src={item.icon} alt="" width="27px" />
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      paddingTop: "8px",
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        ref={wrapperRef}
        className={
          showConnect ? classNames.tooltipVisible1 : classNames.tooltipHidden1
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
            onClick={(e) => {
              setShowConnect(false);
              setDisableBack(false);
            }}
          >
            <img src={arrowRight} alt="" />
          </div>
        </div>

        <div
          style={{ paddingTop: "50px", overflowY: "scroll", height: "90vh" }}
        >
          {connectionList.map((item, index) => {
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
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        ref={wrapperRef}
        className={
          showCoins ? classNames.tooltipVisible1 : classNames.tooltipHidden1
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
            onClick={(e) => {
              setShowCoins(false);
              setDisableBack(false);
            }}
          >
            <img src={arrowRight} alt="" />
          </div>
        </div>
        <div style={{ paddingTop: "36px" }}>
          <input
            value={coinQuery}
            onChange={(e) => setCoinQuery(e.target.value)}
            className={classNames.coinInput}
            type="text"
            placeholder="Search Capitalized.App...."
          />
          {/* <input className={classNames.coinInput} placeholder=""/> */}
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
                  setSelectedCoin(item);

                  setShowCoins(false);
                  setDisableBack(false);
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
      </div>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        ref={wrapperRef}
        className={
          visibleVideoModal
            ? classNames.videoModalVisible
            : classNames.videoModalHidden
        }
        style={{ padding: "5px" }}
      >
        <div
          onClick={(e) => {
            setVisibleVideoModal(false);
            setDisableBack(false);
          }}
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            right: -10,
            top: -10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          &#x2715;
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/V9V_6bLuePU"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
};

export default SplashPageOld;
