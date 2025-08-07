import React, { useEffect, useState } from "react";
import classNames from "./marketstabs.module.scss";

//packages
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

//assets
import { IoMdArrowDropleft } from "react-icons/io";

//components
import Nav from "../../../../component/Nav";
// import TradingViewWidget from "./chart.jsx";

//constants
const allSections = [
  "Offers",
  "Smart Contracts",
  "Founders",
  "Investors",
  "Job Openings",
];

const WappDetailed = () => {
  //global
  const history = useHistory();
  const { wappid } = useParams();

  //values
  const [selectedSection, setSelectedSection] = useState("Offers");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [allData, setAllData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  //functions

  function getAllWapp() {
    setDataLoading(true);
    axios
      .get(`https://publications.apimachine.com/company/${wappid}`)
      .then(({ data }) => {
        console.log(data, "getAllWapp");
        setSelectedCoin(data?.data);
        setDataLoading(false);
      });
  }

  //queries
  useEffect(() => {
    getAllWapp();
  }, []);

  return (
    <div className={classNames.cryptoCoinDetailed}>
      <Nav />
      <div className={classNames.contentContainer}>
        <div className={classNames.header}>
          <div
            className={classNames.backBtn}
            onClick={() => {
              history.push("/feed/wapps");
            }}
          >
            <IoMdArrowDropleft />
            <span>All WAPP’s</span>
          </div>
        </div>
        <div className={classNames.eachCoinContainer}>
          <div className={classNames.sidebar}>
            <img
              src={selectedCoin?.cover_pic}
              alt="wappcover"
              className={classNames.coverImage}
            />
            <div className={classNames.otherContainers}>
              <div className={classNames.title}>
                <img src={selectedCoin?.profile_pic} alt="bitcoinImg" />
                <div>
                  <div className={classNames.coin}>{selectedCoin?.name}</div>
                  {/* <div className={classNames.symbol}>
                  {selectedCoin?.coinSymbol}
                </div> */}
                </div>
              </div>
              <div className={classNames.priceContainer}>
                {/* <div className={classNames.price}>
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
              </div> */}
                <div style={{ fontWeight: "400" }}>
                  {selectedCoin?.short_desc}
                </div>
              </div>
              <div className={classNames.mainBtns}>
                <div className={classNames.eachBtn}>Add To Watchlist</div>
                <div
                  className={classNames.eachBtn}
                  onClick={() => {
                    if (
                      selectedCoin?.website &&
                      selectedCoin?.website?.includes("https://")
                    ) {
                      window.open(selectedCoin?.website, "_blank");
                    } else if (selectedCoin?.website) {
                      window.open("https://" + selectedCoin?.website, "_blank");
                    }
                  }}
                >
                  Go To Website
                </div>
              </div>
              <div className={classNames.allValues}>
                <div className={classNames.eachValue}>
                  <div className={classNames.mainValue}>
                    <div>Country:</div>
                    <div>{selectedCoin?.country}</div>
                  </div>
                </div>
                <div className={classNames.eachValue}>
                  <div className={classNames.mainValue}>
                    <div>Sector:</div>
                    <div>{selectedCoin?.sector}</div>
                  </div>
                </div>

                <div className={classNames.eachValue}>
                  <div className={classNames.mainValue}>
                    <div>Industry:</div>
                    <div>{selectedCoin?.industry}</div>
                  </div>
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
              {/* <TradingViewWidget coinSymbol={selectedCoin?.coinSymbol} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WappDetailed;
