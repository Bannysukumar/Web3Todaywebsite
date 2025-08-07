import React, { useState, useEffect, useCallback, useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Axios from "axios";
import BankerTxnSidebar from "../McbTokenWithdrawals/BankerTxnSidebar/BankerTxnSidebar";
import BankerTxnColumnn from "../McbTokenWithdrawals/BankerTxnColoumn/BankerTxnColoumn";
// import Sidebar from "../layout/Sidebar.js";

import menu from "../../../../static/images/clipIcons/menu.svg";
import gxIcon from "../../../../static/images/clipIcons/gxIcon.svg";
import closeIcon from "../../../../static/images/clipIcons/close.svg";
import bankerIcon from "../../../../static/images/clipIcons/banker.svg";
import allCoin from "../../../../static/images/clipIcons/allCoin.svg";
import atmsIcon from "../../../../static/images/typeIcons/atms.svg";
import "../tokenhash.scss";

import SearchAndFilter from "../McbTokenWithdrawals/SearchAndFilter/SearchAndFilter";
import BankerTransactionFilter from "../McbTokenWithdrawals/TransactionFilter/TransactionFilter";
import GlobalFilterDrawer from "../../../../globalComponents/GlobalFilterDrawer";
// import { MainContext } from "../context/MainContext.js";
import { Redirect, useNavigate } from "react-router";
import StatisticsComponent from "../McbTokenWithdrawals/StatisticsComponent/StatisticsComponent";
import { GlobalContex } from "../../../../globalContex";

function TokenDeposits() {
  // eslint-disable-next-line no-unused-vars
  //   const { emailParam, txnId } = useParams();
  const { email, appList, userType } = useContext(GlobalContex);
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txnSelected, setTxnSelected] = useState();

  // useEffect(() => {
  //   if (userType === "App Owner") setAppSelected(appList[0]);
  // }, [appList, userType]);

  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!txnSelected) navigate("/atms");
  //   }, [navigate, txnSelected]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState("");
  const [appSelected, setAppSelected] = useState();
  const [bankerSelected, setBankerSelected] = useState();
  const [coinSelected, setCoinSelected] = useState();
  const [statistics, setStatistics] = useState();
  const updateTxnList = useCallback(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.io/coin/vault/service/txns/deposit/get?` +
        (appSelected?.app_code ? `&app_code=${appSelected?.app_code}` : "") +
        (bankerSelected?.bankerTag
          ? `&banker=${bankerSelected.bankerTag}`
          : "") +
        (coinSelected?.coin ? `&coin=${coinSelected.coin}` : "") +
        (userType === "Transactor" ? `&email=${email}` : "")
    )
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setTransactionList(data.txns);
          setStatistics({ ...data, txns: undefined, status: undefined });
        } else {
          setTransactionList([]);
          setStatistics({ ...data, txns: undefined, status: undefined });
        }
      })
      .finally(() => setLoading(false));
  }, [appSelected, bankerSelected, coinSelected, email, userType]);

  useEffect(() => {
    updateTxnList();
  }, [updateTxnList]);

  const [search, setSearch] = useState("");

  const [upline, setUpline] = useState(false);
  const [colSelected, setColSelected] = useState("");
  const [initiatedTotal, setInitiatedTotal] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);
  const [cancelledTotal, setCancelledTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);

  useEffect(() => {
    let init = 0;
    transactionList
      .filter(
        (txn) =>
          txn.current_step_data && txn.current_step_data.status === "Initiated"
      )
      .forEach((txn) => {
        init += txn?.usd_value || 0;
      });
    setInitiatedTotal(init);

    let completed = 0;
    transactionList
      .filter(
        (txn) =>
          txn.current_step_data && txn.current_step_data.status === "Completed"
      )
      .forEach((txn) => {
        completed += txn?.usd_value || 0;
      });
    setCompletedTotal(completed);

    let cancelled = 0;
    transactionList
      .filter(
        (txn) =>
          txn.current_step_data && txn.current_step_data.status === "Cancelled"
      )
      .forEach((txn) => {
        cancelled += txn?.usd_value || 0;
      });
    setCancelledTotal(cancelled);

    let all = 0;
    transactionList.forEach((txn) => {
      all += txn?.usd_value || 0;
    });
    setAllTotal(all);
  }, [transactionList]);

  const [coinList, setCoinList] = useState([]);
  const [coinLoading, setCoinLoading] = useState(false);
  useEffect(() => {
    setCoinLoading(true);
    Axios.post("https://comms.globalxchange.io/coin/vault/service/coins/get", {
      app_code: "ice",
    })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          const { coins_data } = data;
          setCoinList(coins_data);
        }
      })
      .finally(() => setCoinLoading(false));
  }, []);

  // Filter
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);
  const [filterEmail, setFilterEmail] = useState(true);
  const [filterAppcode, setFilterAppcode] = useState(false);
  const [filterBanker, setFilterBanker] = useState(false);

  //   if (!email) {
  //     return <Redirect to="/" />;
  //   }
  return (
    <div className="withdrawalViewContent">
      {/* <Sidebar type={"atms"} /> */}
      <div className="withdrawListNFilter">
        {/* <SearchAndFilter
          search={search}
          setSearch={setSearch}
          placeholder="Find A Withdraw..|"
          filterBy={`${filterEmail ? "Email ," : ""}${
            filterAppcode ? " App Code ," : ""
          }${filterBanker ? " Banker" : ""}`}
          mainList={[
            {
              key: "0",
              label: "Function Performed By Search Bar",
              switch: isFilter,
              switchLabel: isFilter ? "Filter" : "Search",
              switchClick: () => setIsFilter(!isFilter),
            },
            {
              key: "1",
              label: "Filter Range",
              switch: currentPage,
              switchLabel: currentPage ? "Current Page" : "Entire List",
              switchClick: () => setCurrentPage(!currentPage),
            },
          ]}
          filterList={[
            {
              key: "11",
              label: "Emails",
              switch: filterEmail,
              switchLabel: filterEmail ? "On" : "Off",
              switchClick: () => setFilterEmail(!filterEmail),
            },
            {
              key: "12",
              label: "App Code",
              switch: filterAppcode,
              switchLabel: filterAppcode ? "On" : "Off",
              switchClick: () => setFilterAppcode(!filterAppcode),
            },
            {
              key: "13",
              label: "Banker",
              switch: filterBanker,
              switchLabel: filterBanker ? "On" : "Off",
              switchClick: () => setFilterBanker(!filterBanker),
            },
          ]}
          iconOne={{
            icon: sidebarOpen || txnSelected ? closeIcon : menu,
            onClick: () => {
              setTxnSelected();
              setSidebarOpen(sidebarOpen || txnSelected ? false : true);
            },
            label: "Board Settings",
          }}
          iconTwo={{
            icon: coinSelected?.coin_logo || allCoin,
            onClick: () => {
              setSidebarOpen(true);
              setSidebarTab("Coin");
            },
            label: coinSelected?.coin_name || "All Coins",
          }}
          iconThree={{
            icon: bankerSelected?.profilePicURL || bankerIcon,
            onClick: () => {
              setSidebarOpen(true);
              setSidebarTab("Banker");
            },
            label: bankerSelected?.bankerTag || "All Bankers",
          }}
          iconFour={{
            icon: appSelected?.app_code ? appSelected?.app_icon : gxIcon,
            onClick: () => {
              setSidebarOpen(true);
              setSidebarTab("Apps");
            },
            label: appSelected?.app_code ? appSelected?.app_name : "All Apps",
          }}
          iconMain={{
            icon: atmsIcon,
            onClick: () => {},
          }}
        /> */}
        <StatisticsComponent
          statistics={statistics}
          appSelected={appSelected}
          coinSelected={coinSelected}
          bankerSelected={bankerSelected}
          isDeposit
        />
        <div className="container">
          <Scrollbars
            autoHide
            className="withdrawListWrapper"
            renderView={(props) => <div {...props} className="withdrawList" />}
          >
            <BankerTxnColumnn
              isDeposit
              txnSelected={txnSelected}
              setTxnSelected={setTxnSelected}
              colSelected={colSelected}
              setColSelected={setColSelected}
              coinList={coinList}
              coinLoading={coinLoading}
              loading={loading}
              transactionList={transactionList}
              search={search}
              columnTotal={initiatedTotal}
              column="Initiated"
              filterEmail={filterEmail}
              filterAppcode={filterAppcode}
              filterBanker={filterBanker}
              statistics={statistics}
            />
            <BankerTxnColumnn
              isDeposit
              txnSelected={txnSelected}
              setTxnSelected={setTxnSelected}
              colSelected={colSelected}
              setColSelected={setColSelected}
              coinList={coinList}
              coinLoading={coinLoading}
              loading={loading}
              transactionList={transactionList}
              search={search}
              columnTotal={completedTotal}
              column="Completed"
              filterEmail={filterEmail}
              filterAppcode={filterAppcode}
              filterBanker={filterBanker}
              statistics={statistics}
            />
            <BankerTxnColumnn
              isDeposit
              txnSelected={txnSelected}
              setTxnSelected={setTxnSelected}
              colSelected={colSelected}
              setColSelected={setColSelected}
              coinList={coinList}
              coinLoading={coinLoading}
              loading={loading}
              transactionList={transactionList}
              search={search}
              columnTotal={cancelledTotal}
              column="Cancelled"
              filterEmail={filterEmail}
              filterAppcode={filterAppcode}
              filterBanker={filterBanker}
              statistics={statistics}
            />
            <BankerTxnColumnn
              isDeposit
              txnSelected={txnSelected}
              setTxnSelected={setTxnSelected}
              colSelected={colSelected}
              setColSelected={setColSelected}
              coinList={coinList}
              coinLoading={coinLoading}
              loading={loading}
              transactionList={transactionList}
              search={search}
              columnTotal={allTotal}
              column="All"
              filterEmail={filterEmail}
              filterAppcode={filterAppcode}
              filterBanker={filterBanker}
              statistics={statistics}
            />
          </Scrollbars>
          {txnSelected && (
            <BankerTxnSidebar
              txnSelected={txnSelected}
              upline={upline}
              setUpline={setUpline}
              onClose={() => setTxnSelected()}
            />
          )}
          {sidebarOpen && !txnSelected && (
            <BankerTransactionFilter
              isDeposit
              sidebarTab={sidebarTab}
              appSelected={appSelected}
              setAppSelected={setAppSelected}
              bankerSelected={bankerSelected}
              setBankerSelected={setBankerSelected}
              coinSelected={coinSelected}
              setCoinSelected={setCoinSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenDeposits;
