import React, { useEffect, useState } from "react";
import classNames from "./marketstabs.module.scss";

//packages
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

//assets
import { IoMdArrowDropleft } from "react-icons/io";

//components
import Nav from "../../../../component/Nav";
import TradingViewWidget from "./chart.jsx";

//constants
const allSections = ["Chart", "Markets", "Articles", "Videos"];

const CryptoCoinDetailed = () => {
  //global
  const history = useHistory();
  const { cryptocoin } = useParams();

  //values
  const [selectedSection, setSelectedSection] = useState("Chart");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [allData, setAllData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  //functions

  function getAllCoins() {
    setDataLoading(true);
    axios
      .post(`https://comms.globalxchange.io/coin/vault/service/coins/get`, {
        app_code: "web3today",
        type: "crypto",
        displayCurrency: "INR",
      })
      .then(({ data }) => {
        if (data?.coins_data?.length > 0) {
          setAllData(data.coins_data);
          let selectedCoin = data?.coins_data?.filter((eachCoin) => {
            return (
              eachCoin?.coinName?.toLowerCase() === cryptocoin?.toLowerCase()
            );
          });
          console.log(selectedCoin, "selectedCoin");
          if (selectedCoin?.length > 0) {
            setSelectedCoin(selectedCoin[0]);
          }
        }
        setDataLoading(false);
      });
  }

  //queries
  useEffect(() => {
    getAllCoins();
  }, []);

  return (
    <div className={classNames.cryptoCoinDetailed}>
      <Nav />
      <div className={classNames.contentContainer}>
        <div className={classNames.header}>
          <div
            className={classNames.backBtn}
            onClick={() => {
              history.push("/markets/crypto");
            }}
          >
            <IoMdArrowDropleft />
            <span>All Coins</span>
          </div>
        </div>
        <div className={classNames.eachCoinContainer}>
          <div className={classNames.sidebar}>
            <div className={classNames.title}>
              <img src={selectedCoin?.coinImage} alt="bitcoinImg" />
              <div>
                <div className={classNames.coin}>{selectedCoin?.coinName}</div>
                <div className={classNames.symbol}>
                  {selectedCoin?.coinSymbol}
                </div>
              </div>
            </div>
            <div className={classNames.priceContainer}>
              <div className={classNames.price}>
                ₹
                {selectedCoin?.price?.INR
                  ? selectedCoin?.price?.INR?.toFixed(2)
                  : "0.00"}
              </div>
              <div
                className={classNames.perc}
                style={{
                  color: selectedCoin?._24hrchange > 0 ? "" : "#EA0F0F",
                }}
              >
                ({selectedCoin?._24hrchange?.toFixed(2)}%)
              </div>
            </div>
            <div className={classNames.mainBtns}>
              <div className={classNames.eachBtn}>Add To Watchlist</div>
              <div className={classNames.eachBtn}>Track In Portfolio</div>
            </div>
            <div className={classNames.allValues}>
              <div className={classNames.eachValue}>
                <div className={classNames.mainValue}>
                  <div>Market Cap:</div>
                  <div>₹{selectedCoin?.mkt_cap_DC?.toFixed(2)}</div>
                </div>
              </div>
              <div className={classNames.eachValue}>
                <div className={classNames.mainValue}>
                  <div>24 Hr Volume:</div>
                  <div>₹256,437,578,765.43</div>
                </div>
              </div>
              <div className={classNames.eachValue}>
                <div className={classNames.mainValue}>
                  <div>Circulating Supply:</div>
                  <div>{selectedCoin?.volume24hr_DC?.toFixed(2)}</div>
                </div>
                <div className={classNames.subValues}>
                  <div className={classNames.mainValue}>
                    <div>Max Supply:</div>
                    <div>{selectedCoin?.total_supply?.toFixed(2)}</div>
                  </div>
                  <div className={classNames.mainValue}>
                    <div>Total Supply:</div>
                    <div>{selectedCoin?.total_supply?.toFixed(2)}</div>
                  </div>
                </div>
              </div>
              <div className={classNames.eachValue}>
                <div className={classNames.mainValue}>
                  <div>Fully Diluted Market Cap:</div>
                  <div>₹256,437,578,765.43</div>
                </div>
              </div>
            </div>
            <div className={classNames.eachLinksContainer}>
              <div className={classNames.title}>Official Links</div>
              <div className={classNames.allLinks}>
                <div className={classNames.eachLinkBtn}>Website</div>
                <div className={classNames.eachLinkBtn}>Whitepaper</div>
                <div className={classNames.eachLinkBtn}>Github</div>
              </div>
            </div>
            <div className={classNames.eachLinksContainer}>
              <div className={classNames.title}>Socials</div>
              <div className={classNames.allLinks}>
                <div className={classNames.eachLinkBtn}>Reddit</div>
                <div className={classNames.eachLinkBtn}>Instagram</div>
              </div>
            </div>
          </div>
          <div className={classNames.sectionsContainer}>
            <div className={classNames.sectionsHeader}>
              {allSections?.map((eachItem, index) => {
                return (
                  <div
                    key={eachItem + index}
                    className={`${classNames.eachSection} ${
                      selectedSection === eachItem
                        ? classNames.selectedSection
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedSection(eachItem);
                    }}
                  >
                    {eachItem}
                  </div>
                );
              })}
            </div>
            <div className={classNames.sectionsContent}>
              <TradingViewWidget coinSymbol={selectedCoin?.coinSymbol} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCoinDetailed;
