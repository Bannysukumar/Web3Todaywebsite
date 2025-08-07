import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { FormatCurrency } from "../../../../../utils/FunctionTools";
import BankerCoin from "../BankerCoin/BankerCoin";
import BankerFilter from "../BankerFilter/BankerFilter";
import BankerTxnCard from "./BankerTxnCard";

function BankerTxnColumnn({
  isDeposit,
  txnSelected,
  setTxnSelected,
  colSelected,
  setColSelected,
  coinList,
  coinLoading,
  loading,
  transactionList,
  search,
  columnTotal,
  column,
  filterEmail,
  filterAppcode,
  filterBanker,
  statistics,
}) {
  const [filterEnableColumn, setFilterEnableColumn] = useState(false);
  const [columnCoins, setColumnCoins] = useState([]);
  const [columnApps, setColumnApps] = useState([]);
  const [coinChangeColumn, setCoinChangeColumn] = useState(false);
  const [subSearch, setSubSearch] = useState("");
  const [coinSelected, setCoinSelected] = useState();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const usdCoin = coinList?.filter((coin) => coin.coinSymbol === "USD")[0];
    setCoinSelected(usdCoin);
  }, [coinList]);

  const [txnCount, setTxnCount] = useState(0);
  useEffect(() => {
    let count = 0;
    statistics?.perStatus?.forEach((status, i) => {
      if (column === "All") {
        count = count + status?.count;
      } else if (status?.name?.toLowerCase() === column.toLowerCase()) {
        count = count + status?.count;
      }
    });
    setTxnCount(count);
  }, [column, statistics]);



  return (
    <>
      {(!txnSelected || colSelected === column) &&
        (filterEnableColumn ? (
          <BankerFilter
            onClose={() => setFilterEnableColumn(false)}
            selectedCoinList={columnCoins}
            setSelectedCoinList={setColumnCoins}
            selectedApps={columnApps}
            setSelectedApps={setColumnApps}
            coinList={coinList}
            coinLoading={coinLoading}
          />
        ) : coinChangeColumn ? (
          <BankerCoin
            onClose={() => setCoinChangeColumn(false)}
            selectedCoin={coinSelected}
            setSelectedCoin={setCoinSelected}
            coinList={coinList}
            coinLoading={coinLoading}
          />
        ) : (
          <div className="typeColoumn" onClick={() => setColSelected(column)}>
            <label className="head">
              <input
                type="text"
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                placeholder="Search Emails &amp; Usernames..."
              />
              <span className="type">{column}</span>
              <FontAwesomeIcon
                className="icon"
                icon={faEllipsisV}
                onClick={() => setFilterEnableColumn(true)}
              />
            </label>
            <Scrollbars
              className="columScrlWrap"
              autoHide
              renderView={(props) => (
                <div {...props} className="coloumnScroll" />
              )}
              onScrollFrame={(data) => {
                data.top === 1 && setCount((count) => count + 5);
              }}
              key={subSearch}
            >
              {loading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div className="transactionItm" key={i}>
                    <div className="txnHead">
                      <div className="banker"></div>
                      <Skeleton circle height={30} width={30} />
                    </div>
                    <div className="txnContent px-5">
                      <Skeleton height={40} count={4} />
                    </div>
                    <div className={`txnFooter Column`}></div>
                  </div>
                )) : transactionList.length > 0 ? (
                  transactionList
                    .filter(
                      (txn) =>
                        (filterEmail &&
                          txn.email
                            ?.toLowerCase()
                            .includes(search.toLowerCase())) ||
                        (filterBanker &&
                          txn.banker
                            ?.toLowerCase()
                            .includes(search.toLowerCase())) ||
                        (filterAppcode &&
                          txn.app_code
                            ?.toLowerCase()
                            .includes(search.toLowerCase()))
                    )
                    .filter(
                      (txn) =>
                        txn.email
                          .toLowerCase()
                          .includes(subSearch.toLowerCase()) &&
                        txn.current_step_data &&
                        (column === "All" ||
                          txn.current_step_data.status.toLowerCase() ===
                          column.toLowerCase())
                    )
                    .filter((txn) =>
                      columnApps?.length
                        ? columnApps.includes(txn.app_code)
                        : true
                    )
                    .filter((txn) =>
                      columnCoins?.length
                        ? columnCoins.includes(txn.coin)
                        : true
                    )
                    .slice(0, count)
                    .map((txn) => (
                      <div >
                        <BankerTxnCard
                          isDeposit={isDeposit}
                          txn={txn}
                          txnSelected={txnSelected}
                          coinList={coinList}
                          onClick={() => {
                            txn?._id === txnSelected?._id
                              ? setTxnSelected()
                              : setTxnSelected(txn);
                          }}
                          coinSelected={coinSelected}
                          key={txn._id}
                        />
                      </div>
                    ))
                ) : (
                  <div className="norecords">
                    <div>No records found</div>
                  </div>
                )
              }

            </Scrollbars>
            <label className="footer">
              <div className="totalValue">{txnCount} Txn's</div>
              <div className="totalValueAmt">
                {coinSelected?.symbol.length < 3 ? coinSelected.symbol : ""}

                {FormatCurrency(columnTotal / coinSelected?.price?.USD)}
              </div>
              <div className="flag" onClick={() => setCoinChangeColumn(true)}>
                <img src={coinSelected?.coinImage} alt="" />
              </div>
            </label>
          </div>
        ))}
    </>
  );
}

export default BankerTxnColumnn;
