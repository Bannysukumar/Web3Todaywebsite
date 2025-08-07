import React, { useContext, useState } from "react";

import "./templates.scss";

import hyfi from "../../../static/images/templateLogos/hyfi.svg";
import wealth from "../../../static/images/templateLogos/wealth.svg";
import otcDesks from "../../../static/images/templateLogos/otcDesks.svg";
import terminals from "../../../static/images/templateLogos/terminals.svg";
import fundManagement from "../../../static/images/templateLogos/fundManagement.svg";
import nftMarketplace from "../../../static/images/templateLogos/nftMarketplace.svg";
import nftReward from "../../../static/images/templateLogos/nftReward.svg";
import defi from "../../../static/images/templateLogos/defi.svg";
import signals from "../../../static/images/templateLogos/signals.svg";

import vaults_full from "../../../static/images/templateLogos/vaults_full.svg";
import tokenSwap_full from "../../../static/images/templateLogos/tokenSwap_full.svg";
import moneyMarkets_full from "../../../static/images/templateLogos/moneyMarkets_full.svg";
import affiliate_full from "../../../static/images/templateLogos/affiliate_full.svg";
import bondIssuance_full from "../../../static/images/templateLogos/bondIssuance_full.svg";

import bondMarkets_full from "../../../static/images/templateLogos/bondMarkets_full.svg";
import portfolioAi_full from "../../../static/images/templateLogos/portfolioAi_full.svg";
import shareTokenIssuance_full from "../../../static/images/templateLogos/shareTokenIssuance_full.svg";
import shareTokenMarket_full from "../../../static/images/templateLogos/shareTokenMarket_full.svg";
import fundsCoinIssuance_full from "../../../static/images/templateLogos/fundsCoinIssuance_full.svg";
import fundCoinMarketplace_full from "../../../static/images/templateLogos/fundCoinMarketplace_full.svg";
import indexFundsIssuance_full from "../../../static/images/templateLogos/indexFundsIssuance_full.svg";
import indexFundsMarketplace_full from "../../../static/images/templateLogos/indexFundsMarketplace_full.svg";
import arrowRight from "../../../static/images/templateLogos/arrowRight.svg";
import Footer from "../../../globalComponents/Footer";
import SplashHeader from "../../../globalComponents/SplashHeader";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../../../globalContex";

const Templates = () => {
  const { selectedTemplate, setSelectedTemplate, templateList } =
    useContext(GlobalContex);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredTemplateList = templateList.filter((item) => {
    const lowquery = query.toLowerCase();
    return item.name.toLowerCase().indexOf(lowquery) >= 0;
  });

  return (
    <>
      <SplashHeader />
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="templateSearch"
          placeholder="Search Application Templates...."
        />
      </div>
      <div
        style={{
          overflowY: "scroll",
          height: "100vh",
          paddingBottom: "190px",
        }}
      >
        <>
          <div style={{ minHeight: "80vh" }}>
            {filteredTemplateList.map((item, index) => {
              return (
                <div className="mainSection" key={index}>
                  <div className="textSection">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={item.logo} alt="" width={38} height={38} />
                        <div className="textHeader">{item.name}</div>
                      </div>
                      <div
                        className="goButton"
                        onClick={(e) => {
                          // setSelectedTemplate(item);
                          navigate(`${item.name.toLowerCase()}`);
                        }}
                      >
                        <img src={arrowRight} alt="" />
                      </div>
                    </div>
                    <div className="textDesc">{item.desc}</div>
                  </div>
                  <div className="scrollSection">
                    {item?.cards?.map((item1, index1) => {
                      return (
                        <div className="scrollCards" key={index1 + 1}>
                          <img src={item1?.logo} alt="" width="176px" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
        <Footer />
      </div>
    </>
  );
};

export default Templates;
