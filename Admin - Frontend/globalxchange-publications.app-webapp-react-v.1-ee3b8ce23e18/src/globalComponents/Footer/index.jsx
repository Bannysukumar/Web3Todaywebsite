import React from "react";

import classNames from "./footer.module.scss";

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

const Footer = () => {
  return (
    <>
      <div
        style={{
          borderBottom: "0.5px solid #E7E7E7",
          // paddingTop: "145px",
          marginTop: "-22px",
        }}
      >
        &nbsp;
      </div>
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
            <img src={insta} alt="" className={classNames.footerMenuImg} />{" "}
            Instagram
          </div>
          <div className={classNames.footerMenu}>
            <img src={youtube} alt="" className={classNames.footerMenuImg} />{" "}
            YouTube
          </div>
          <div className={classNames.footerMenu}>
            <img src={whatsApp} alt="" className={classNames.footerMenuImg} />{" "}
            WhatsApp
          </div>
          <div className={classNames.footerMenu}>
            <img src={connection} alt="" className={classNames.footerMenuImg} />{" "}
            Connection
          </div>
          <div className={classNames.footerMenu}>
            <img src={telegram} alt="" className={classNames.footerMenuImg} />{" "}
            Telegram
          </div>
          <div className={classNames.footerMenu}>
            <img src={email} alt="" className={classNames.footerMenuImg} />{" "}
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
            <img src={news} alt="" className={classNames.footerMenuImg} /> News
          </div>
          <div className={classNames.footerMenu}>
            <img src={media} alt="" className={classNames.footerMenuImg} />{" "}
            Media Assets
          </div>
          <div className={classNames.footerMenu}>
            <img src={terms} alt="" className={classNames.footerMenuImg} />{" "}
            Terms Of Use
          </div>
          <div className={classNames.footerMenu}>
            <img src={privacy} alt="" className={classNames.footerMenuImg} />{" "}
            Privacy Policy
          </div>
          <div className={classNames.footerMenu}>
            <img src={career} alt="" className={classNames.footerMenuImg} />{" "}
            Careers
          </div>
          <div className={classNames.footerMenu}>
            <img src={investors} alt="" className={classNames.footerMenuImg} />{" "}
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
              <div className={classNames.footerMenu}>Create NFT Market</div>
              <div className={classNames.footerMenu}>Create ShareToken</div>
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
              <div className={classNames.footerMenu}>Create IndexCoin</div>
              <div className={classNames.footerMenu}>
                Create IndexCoin Market
              </div>
              <div className={classNames.footerMenu}>Create Bond</div>
              <div className={classNames.footerMenu}>Create Bond Market</div>
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
    </>
  );
};

export default Footer;
