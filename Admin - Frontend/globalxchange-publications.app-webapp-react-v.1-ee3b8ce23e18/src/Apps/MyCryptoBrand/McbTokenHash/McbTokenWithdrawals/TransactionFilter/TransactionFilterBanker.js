import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { GlobalContex } from "../../../../../globalContex";

function TransactionFilterBanker({
  bankerSelected,
  setBankerSelected,
  coinSelected,
  appSelected,
  isDeposit,
}) {
  const [search, setSearch] = useState("");
  const [bankers, setBankers] = useState([]);
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
          (coinSelected?.coin ? `&coin=${coinSelected.coin}` : "") +
          (userType === "Transactor" ? `&email=${bankerEmail}` : "")
      )
      .then(({ data }) => {
        if (data.status) {
          setBankers(data.perBankerData);
        }
      })
      .finally(() => setLoading(false));
  }, [appSelected, coinSelected, bankerEmail, userType]);
  return (
    <>
      <div className="godsEyeFilterBanker">
        <div className="labelItm">Which Banker Do You Want To See?</div>
        <label className="searchInp">
          <input
            type="text"
            placeholder="Search Bankers"
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
            : bankers
                .filter((banker) =>
                  banker?.bankerTag.toLowerCase().includes(search.toLowerCase())
                )
                .map((banker) => (
                  <div
                    className={`item ${
                      banker?.bankerTag === bankerSelected?.bankerTag
                    }`}
                    onClick={() => {
                      setBankerSelected(banker);
                    }}
                  >
                    <img className="coin" src={banker.profilePicURL} alt="" />
                    <span>{banker.bankerTag}</span>
                    <span className="count">{banker?.count}</span>
                  </div>
                ))}
        </Scrollbars>
      </div>
      <div className="footerBtns">
        <div className="btnReset" onClick={() => setBankerSelected()}>
          All Bankers
        </div>
        <div className="btnSave" onClick={() => {}}>
          Save
        </div>
      </div>
    </>
  );
}

export default TransactionFilterBanker;
