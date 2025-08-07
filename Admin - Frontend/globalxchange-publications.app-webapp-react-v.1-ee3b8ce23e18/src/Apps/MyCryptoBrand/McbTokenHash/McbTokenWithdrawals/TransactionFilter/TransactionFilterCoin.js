import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { GlobalContex } from "../../../../../globalContex";

function TransactionFilterCoin({
  coinSelected,
  setCoinSelected,
  appSelected,
  bankerSelected,
  isDeposit,
}) {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userType, bankerEmail } = useContext(GlobalContex);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        (isDeposit
          ? "https://comms.globalxchange.io/coin/vault/service/txns/deposit/get?"
          : `https://comms.globalxchange.io/coin/vault/service/path/withdraw/txn/get?`) +
          (appSelected?.app_code ? `&app_code=${appSelected?.app_code}` : "") +
          (bankerSelected?.bankerTag
            ? `&banker=${bankerSelected.bankerTag}`
            : "") +
          (userType === "Transactor" ? `&email=${bankerEmail}` : "")
      )
      .then(({ data }) => {
        if (data.status) {
          setCoins(data.perCoin);
        }
      })
      .finally(() => setLoading(false));
  }, [appSelected, bankerSelected, bankerEmail, userType]);
  return (
    <>
      <div className="godsEyeFilterBanker">
        <div className="labelItm">Which Assets Do You Want To See?</div>
        <label className="searchInp">
          <input
            type="text"
            placeholder="Search Coins"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} />
        </label>
        <Scrollbars autoHide className="itemListScroll">
          {loading
            ? Array(6)
                .fill("")
                .map(() => <Skeleton className="item" />)
            : coins
                .filter(
                  (coin) =>
                    coin?.coin.toLowerCase().includes(search.toLowerCase()) ||
                    coin?.coin_name.toLowerCase().includes(search.toLowerCase())
                )
                .map((coin) => (
                  <div
                    className={`item ${coin?.coin === coinSelected?.coin}`}
                    onClick={() => {
                      setCoinSelected(coin);
                    }}
                  >
                    <img className="coin" src={coin.coin_logo} alt="" />
                    <span>{coin.coin_name}</span>
                    <span className="count">{coin.count}</span>
                  </div>
                ))}
        </Scrollbars>
      </div>
      <div className="footerBtns">
        <div className="btnReset" onClick={() => setCoinSelected()}>
          All Coins
        </div>
        <div className="btnSave" onClick={() => {}}>
          Save
        </div>
      </div>
    </>
  );
}

export default TransactionFilterCoin;
