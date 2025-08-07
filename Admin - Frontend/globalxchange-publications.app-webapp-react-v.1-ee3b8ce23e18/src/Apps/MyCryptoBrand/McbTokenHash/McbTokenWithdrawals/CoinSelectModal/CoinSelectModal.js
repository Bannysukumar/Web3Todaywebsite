import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { GlobalContex } from "../../../../../globalContex";
import tokenHashWide from "../../../../../static/images/logos/tokenHashWide.svg"
import "./modalCoinSelect.scss";

function CoinSelectModal({ setCoin, onClose }) {
  const { coinList, coinLoading , selectedApp } = useContext(GlobalContex);
  const [searchStr, setSearchStr] = useState([]);
  const [type, setType] = useState("fiat");
  return (
    <>
      <div className="modalCountrySelect">
        <div className="overlayClose" onClick={() => onClose()} />
        <div className="modalContent">
          <div className="head">
            <img src={selectedApp?.appFullLogo} alt="" />
          </div>
          <div className="content">
            <input
              value={searchStr}
              type="text"
              placeholder={`Search ${type} Currencies...|`}
              className="searchCountry"
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Scrollbars
              className="countryListScroll"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderView={(props) => <div {...props} className="countryList" />}
            >
              {coinLoading
                ? Array(6)
                    .fill("")
                    .map((coin) => (
                      <div className="listCountry">
                        <Skeleton className="name" width={200} />
                        <Skeleton circle className="flag" />
                      </div>
                    ))
                : coinList
                    .filter((coin) => coin.type === type)
                    .filter(
                      (coin) =>
                        coin.coinSymbol.includes(searchStr) ||
                        coin.coinName.includes(searchStr)
                    )
                    .map((coin) => (
                      <div
                        key={coin.coinSymbol}
                        className="listCountry"
                        onClick={() => {
                          setCoin(coin);
                          onClose();
                        }}
                      >
                        <div className="name">
                          {coin.coinName}({coin.coinSymbol})
                        </div>
                        <img src={coin.coinImage} alt="" className="flag" />
                      </div>
                    ))}
            </Scrollbars>
          </div>
          <div className="footer">
            <div
              className={`btnType ${type === "fiat"}`}
              onClick={() => setType("fiat")}
            >
              Fiat
            </div>
            <div
              className={`btnType ${type === "crypto"}`}
              onClick={() => setType("crypto")}
            >
              Crypto
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinSelectModal;
