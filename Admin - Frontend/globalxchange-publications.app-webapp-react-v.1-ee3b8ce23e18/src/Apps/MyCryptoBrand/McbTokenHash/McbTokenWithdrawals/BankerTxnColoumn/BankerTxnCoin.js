import React from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as IconClose } from "../../../../../static/images/clipIcons/close.svg";
import tzData from "../../../../../utils/timezones.json";

function BankerTxnCoin({
  onClose,
  selectedCoin,
  setSelectedCoin,
  coinList,
  coinLoading,
  tab,
  setTab,
  timeZone,
  setTimeZone,
}) {
  function getContent() {
    switch (tab) {
      case "coin":
        return (
          <Scrollbars autoHide className="itemListScroll">
            {coinLoading
              ? Array(6)
                  .fill("")
                  .map((_, i) => <Skeleton key={i} className="item" />)
              : coinList.map((coin) => (
                  <div
                    key={coin.coinSymbol}
                    className="item"
                    onClick={() => {
                      setSelectedCoin(coin);
                    }}
                  >
                    <img className="coin" src={coin.coinImage} alt="" />
                    <span>{coin.coinName}</span>
                    <input
                      readOnly
                      type="checkbox"
                      checked={selectedCoin.coinSymbol === coin.coinSymbol}
                    ></input>
                  </div>
                ))}
          </Scrollbars>
        );
      case "tz":
        return (
          <Scrollbars autoHide className="itemListScroll">
            {tzData.map((tz, i) => (
              <div
                key={`${tz.abbr}${i}`}
                className="item"
                onClick={() => {
                  setTimeZone(tz);
                }}
              >
                <span>{tz.abbr}</span>
                <span className="ml-auto">GMT {tz.offset}</span>
              </div>
            ))}
          </Scrollbars>
        );

      default:
        break;
    }
  }
  return (
    <div className="typeColoumn abs">
      <div className="hTabs">
        <div className={`tab ${tab === "coin"}`} onClick={() => setTab("coin")}>
          Currency
        </div>
        <div className={`tab ${tab === "tz"}`} onClick={() => setTab("tz")}>
          Time Zone
        </div>
        <div className="btClose" onClick={() => onClose()}>
          <IconClose />
        </div>
      </div>
      {getContent()}
    </div>
  );
}

export default BankerTxnCoin;
