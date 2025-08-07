import React, { useState, useEffect, useCallback, useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Axios from "axios";
import BankerTxnSidebar from "./BankerTxnSidebar/BankerTxnSidebar"
import BankerTxnColumnn from "./BankerTxnColoumn/BankerTxnColoumn";
// import Sidebar from "../layout/Sidebar.js";

import menu from "../../../../static/images/clipIcons/menu.svg";
import gxIcon from "../../../../static/images/clipIcons/gxIcon.svg";
import closeIcon from "../../../../static/images/clipIcons/close.svg";
import vaultIcon from "../../../../static/images/typeIcons/vault.svg";
import bankerIcon from "../../../../static/images/clipIcons/banker.svg";
import allCoin from "../../../../static/images/clipIcons/allCoin.svg";
import "../tokenhash.scss";

import BankerTransactionFilter from "./TransactionFilter/TransactionFilter"
import { GlobalContex } from "../../../../globalContex";
import { Redirect, useNavigate } from "react-router";
import SearchAndFilter from "./SearchAndFilter/SearchAndFilter";
import StatisticsComponent from "./StatisticsComponent/StatisticsComponent";



const McbTokenWithdrawals = () => {

    const { bankerEmail, userType, coinList, coinLoading } =
        useContext(GlobalContex);
    const [transactionList, setTransactionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [txnSelected, setTxnSelected] = useState();


    // console.log("Select " , txnSelected)

    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!txnSelected)
    //         navigate("/vault");
    // }, [navigate, txnSelected]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarTab, setSidebarTab] = useState("");
    const [appSelected, setAppSelected] = useState();
    const [bankerSelected, setBankerSelected] = useState();
    const [coinSelected, setCoinSelected] = useState();
    const [statistics, setStatistics] = useState();

    const updateTxnList = useCallback(() => {
        // console.log("Trans-url " + `https://comms.globalxchange.io/coin/vault/service/path/withdraw/txn/get?` +
        //     (appSelected?.app_code ? `&app_code=${appSelected?.app_code}` : "") +
        //     (bankerSelected?.bankerTag
        //         ? `&banker=${bankerSelected.bankerTag}`
        //         : "") +
        //     (coinSelected?.coin ? `&coin=${coinSelected.coin}` : "") +
        //     (userType === "Transactor" ? `&email=${bankerEmail}` : ""))
        setLoading(true);
        Axios.get(
            `https://comms.globalxchange.io/coin/vault/service/path/withdraw/txn/get?` +
            (appSelected?.app_code ? `&app_code=${appSelected?.app_code}` : "") +
            (bankerSelected?.bankerTag
                ? `&banker=${bankerSelected.bankerTag}`
                : "") +
            (coinSelected?.coin ? `&coin=${coinSelected.coin}` : "") +
            (userType === "Transactor" ? `&email=${bankerEmail}` : "")
        )
            .then((res) => {
                const { data } = res;
                if (data.status) {
                    // console.log("Txn's " , data.txns)
                    setTransactionList(data.txns);
                    setStatistics({ ...data, txns: undefined, status: undefined });
                    let body = { ...data, txns: undefined, status: undefined }
                    console.log("status-body " ,  body)
                } else {
                    setTransactionList([]);
                    setStatistics({ ...data, txns: undefined, status: undefined });
                }
            })
            .finally(() => setLoading(false));
    }, [appSelected, bankerSelected, coinSelected, bankerEmail, userType]);

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
        if(transactionList.length > 0){        
        setInitiatedTotal(
            statistics?.perStatus.filter((status) => status.name === "initiated")[0]
                ?.totalWithdrawValue
        );
        setCompletedTotal(
            statistics?.perStatus.filter((status) => status.name === "completed")[0]
                ?.totalWithdrawValue
        );
        setCancelledTotal(
            statistics?.perStatus.filter((status) => status.name === "cancelled")[0]
                ?.totalWithdrawValue
        );
        setAllTotal(statistics?.totalWithdrawValue);
        }else{
            setInitiatedTotal(0)
            setCompletedTotal(0)
            setCancelledTotal(0)
            setAllTotal(0)
        }
    }, [statistics?.perStatus, statistics?.totalWithdrawValue , transactionList]);

    // Filter
    const [isFilter, setIsFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const [filterEmail, setFilterEmail] = useState(true);
    const [filterAppcode, setFilterAppcode] = useState(false);
    const [filterBanker, setFilterBanker] = useState(false);



    return (
        <div className="withdrawalViewContent">
            <div className="withdrawListNFilter">
                {/* <SearchAndFilter
                    search={search}
                    setSearch={setSearch}
                    placeholder="Find A Withdraw..|"
                    filterBy={`${filterEmail ? "Email ," : ""}${filterAppcode ? " App Code ," : ""
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
                        icon: vaultIcon,
                        onClick: () => { },
                    }}
                /> */}
                <StatisticsComponent
                    statistics={statistics}
                    appSelected={appSelected}
                    coinSelected={coinSelected}
                    bankerSelected={bankerSelected}
                />
                <div className="container">
                    <Scrollbars
                        autoHide
                        className="withdrawListWrapper"
                        renderView={(props) => <div {...props} className="withdrawList" />}
                    >
                        <BankerTxnColumnn
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

    )
}

export default McbTokenWithdrawals