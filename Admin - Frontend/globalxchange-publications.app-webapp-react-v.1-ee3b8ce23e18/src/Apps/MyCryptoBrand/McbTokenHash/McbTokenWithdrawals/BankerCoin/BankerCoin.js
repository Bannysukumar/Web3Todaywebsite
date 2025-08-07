import React from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as IconClose } from "../../../../../static/images/clipIcons/close.svg";

function BankerCoin({
  onClose,
  selectedCoin,
  setSelectedCoin,
  coinList,
  coinLoading,
}) {
  return (
    <div className="typeColoumn">
      <div className="hTabs">
        <div className="tab true">Include</div>
        <div className="tab">Exclude</div>
        <div className="btClose" onClick={() => onClose()}>
          <IconClose />
        </div>
      </div>
      <Scrollbars autoHide className="itemListScroll">
        {coinLoading
          ? Array(6)
              .fill("")
              .map(() => <Skeleton className="item" />)
          : coinList?.map((coin) => (
              <div
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
    </div>
  );
}

export default BankerCoin;
