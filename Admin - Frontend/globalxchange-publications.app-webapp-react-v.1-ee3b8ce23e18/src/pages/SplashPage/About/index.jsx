import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import SplashHeader from "../../../globalComponents/SplashHeader";
import classNames from "./about.module.scss";
import CountUp from "react-countup";
import demoIcon from "../../../static/images/clipIcons/demo.svg";
import playIcon from "../../../static/images/clipIcons/watch.svg";
import { GlobalContex } from "../../../globalContex";
import axios from "axios";
import SplashHeader from "../../../globalComponents/SplashHeader";
import Footer from "../../../globalComponents/Footer";

import ytLoading from "../../../static/youtubeLoading.gif";

const About = () => {
  const wrapperRef = useRef();
  const navigate = useNavigate();
  const { selectedCoinSplash, setSelectedCoinSplash, setAllCoins } =
    useContext(GlobalContex);
  const [totalAppUser, setTotalAppUser] = useState(0);
  const [fiatAsset, setFiatAsset] = useState(0);
  const [cryptoAsset, setCryptoAsset] = useState(0);
  const [visibleVideoModal, setVisibleVideoModal] = useState(false);
  const [allApps, setAllApps] = useState(0);
  const [loading, setLoading] = useState(false);

  const [disableBack, setDisableBack] = useState(false);

  const [youTubeLink, setYouTubeLink] = useState("");

  const convertCurrencySystem = (inputValue) => {
    if (selectedCoinSplash.coinSymbol === "INR") {
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
    if (selectedCoinSplash.coinSymbol === "INR") {
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
    if (visibleVideoModal) {
      setYouTubeLink("https://www.youtube.com/embed/V9V_6bLuePU");
    } else {
      setYouTubeLink("");
    }
  }, [visibleVideoModal]);

  return (
    <div className={disableBack ? "overlayClose" : ""}>
      <SplashHeader />
      <div
        style={{
          overflowY: disableBack ? "" : "scroll",
          height: "100vh",
          paddingBottom: "110px",
        }}
      >
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
                  // className={disableBack ? classNames.no_pointer : ""}
                  style={{
                    display: "flex",
                    paddingTop: "58px",
                    // opacity: !disableBack ? 1 : 0.3,
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

            <div className={classNames.bgclass} style={{ width: "100%" }}>
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
            <div className={classNames.bgclass1}>&nbsp;</div>
          </div>

          <div className={classNames.contentSections}>
            <div className={classNames.bgclass2}>&nbsp;</div>
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
            <div className={classNames.bgclass3}>&nbsp;</div>
          </div>
        </>

        <Footer />
        <div
          onMouseDown={(e) => setVisibleVideoModal(false)}
          // ref={wrapperRef}
          className={
            visibleVideoModal
              ? classNames.videoModalVisible
              : classNames.videoModalHidden
          }
          style={{ padding: "5px" }}
        >
          {/* <div
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
              right: "38.5%",
              top: "32.5%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            &#x2715;
          </div> */}

          <iframe
            width="560"
            height="315"
            src={youTubeLink}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
