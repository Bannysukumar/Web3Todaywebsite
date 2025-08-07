import React, { useState, useContext } from "react";
import { FormatCurrency } from "../../../../../utils/FunctionTools";
import CoinSelectModal from "../CoinSelectModal/CoinSelectModal";
import { GlobalContex } from "../../../../../globalContex";

function StatisticsComponent({
  statistics,
  appSelected,
  coinSelected,
  bankerSelected,
  isDeposit,

}) {
  const { coinSelect, setCoinSelect } = useContext(GlobalContex);
  function getTitle() {

    switch (true) {
      case Boolean(
        appSelected?.app_code &&
        coinSelected?.coinSymbol &&
        bankerSelected?.bankerTag
      ):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${coinSelected?.coinName} ${isDeposit ? "Deposit" : "Withdrawals"
          } Made From ${appSelected?.app_name} Facilitated Via ${bankerSelected?.bankerTag
          }`;
      case Boolean(appSelected?.app_code && coinSelected?.coinSymbol):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${coinSelected?.coinName} ${isDeposit ? "Deposit" : "Withdrawals"
          } Made From ${appSelected?.app_name}`;
      case Boolean(appSelected?.app_code && bankerSelected?.bankerTag):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${isDeposit ? "Deposit" : "Withdrawals"} Made From ${appSelected?.app_name
          } Facilitated Via ${bankerSelected?.bankerTag}`;
      case Boolean(coinSelected?.coinSymbol && bankerSelected?.bankerTag):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${coinSelected?.coinName} ${isDeposit ? "Deposit" : "Withdrawals"
          } Made From ${appSelected?.app_name} Facilitated Via ${bankerSelected?.bankerTag
          }`;
      case Boolean(appSelected?.app_code):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${isDeposit ? "Deposit" : "Withdrawals"} Made From ${appSelected?.app_name
          }`;
      case Boolean(coinSelected?.coinSymbol):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${coinSelected?.coinName} ${isDeposit ? "Deposit" : "Withdrawals"
          }`;
      case Boolean(bankerSelected?.bankerTag):
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${isDeposit ? "Deposit" : "Withdrawals"} Facilitated Via ${bankerSelected?.bankerTag
          }`;
      default:
        return `${statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0} ${isDeposit ? "Deposit" : "Withdrawals"}`;
    }
  }
  const [modalCoin, setModalCoin] = useState(false);


  return (
    <>
      <div className="statitics">
        <div className="label">{getTitle()}</div>
        {/* <div className="count">{statistics?.totalWithdrawalsCount ? statistics.totalWithdrawalsCount : 0}</div> */}
        <div className="volume">Volume</div>
        <div className="volume">
          {coinSelect?.symbol.length < 3 ? coinSelect.symbol : ""}
          {FormatCurrency(
            statistics?.totalWithdrawValue / coinSelect.price.USD,
            coinSelect.coinSymbol
          )}
        </div>
        {/* <div className="coin" onClick={() => setModalCoin(true)}>
          <img src={coinSelect?.coinImage} alt="" />
        </div> */}
      </div>
      {modalCoin && (
        <CoinSelectModal
          setCoin={setCoinSelect}
          onClose={() => setModalCoin(false)}
        />
      )}
    </>
  );
}

export default StatisticsComponent;
