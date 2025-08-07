import Axios from "axios";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import ReactJson from "react-json-view";

import apiIcon from "../../../../../static/images/clipIcons/apis.svg";
import { ReactComponent as IconClose } from "../../../../../static/images/clipIcons/close.svg";

function ApiView({ txnId }) {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.io/coin/vault/service/txn/status/logs?id=${txnId}`
    )
      .then(({ data }) => {
        if (data.status && data.txn) setTransaction(data.txn);
        else console.log("No Records Found");
      })
      .catch((err) => console.error(err.message || "Something Went Wrong"))
      .finally(() => setLoading(false));
  }, [txnId]);
  const [mainTransaction, setMainTransaction] = useState();
  const [expndedLog, setExpndedLog] = useState({});
  const [creditLog, setCreditLog] = useState({});
  const [debitLog, setDebitLog] = useState({});
  useEffect(() => {
    if (transaction) {
      Axios.get(
        `https://comms.globalxchange.io/coin/vault/service/txn/status/logs?id=${transaction._id}`
      ).then(({ data }) => setExpndedLog(data));
      Axios.get(
        `https://comms.globalxchange.io/coin/vault/service/txn/summary/get?id=${
          transaction && transaction.userDebit && transaction.userDebit.id
        }`
      ).then(({ data }) => setDebitLog(data));
      Axios.get(
        `https://comms.globalxchange.io/coin/vault/service/txn/summary/get?id=${
          transaction && transaction.userDebit && transaction.bankerCredit.id
        }`
      ).then(({ data }) => setCreditLog(data));
    }
  }, [transaction]);
  return (
    <>
      {mainTransaction ? (
        <Scrollbars className="jsonScroll">
          <IconClose className="btClose" onClick={() => setMainTransaction()} />
          <ReactJson
            src={mainTransaction}
            collapseStringsAfterLength={50}
            displayDataTypes={false}
          />
        </Scrollbars>
      ) : (
        <div className="apiView">
          <div className="head">Transactional API’s</div>
          <Scrollbars className="scrollbar">
            <div
              className="item"
              onClick={() => {
                setMainTransaction(transaction);
              }}
            >
              <img src={apiIcon} alt="" />
              <span>Simplified Withdrawal Log</span>
            </div>
            <div
              className="item"
              onClick={() => {
                setMainTransaction(expndedLog);
              }}
            >
              <img src={apiIcon} alt="" />
              <span>Expanded Transaction Log</span>
            </div>
            <div
              className="item"
              onClick={() => {
                setMainTransaction(creditLog);
              }}
            >
              <img src={apiIcon} alt="" />
              <span>Banker Side</span>
            </div>
            <div
              className="item"
              onClick={() => {
                setMainTransaction(debitLog);
              }}
            >
              <img src={apiIcon} alt="" />
              <span>User Side</span>
            </div>
          </Scrollbars>
        </div>
      )}
    </>
  );
}

export default ApiView;
