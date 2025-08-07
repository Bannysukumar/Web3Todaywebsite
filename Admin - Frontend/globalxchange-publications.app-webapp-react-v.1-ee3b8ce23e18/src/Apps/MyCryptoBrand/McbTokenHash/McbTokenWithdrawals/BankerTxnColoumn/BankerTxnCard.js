import Axios from "axios";
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import moment from "moment-timezone";

import { FormatCurrency } from "../../../../../utils/FunctionTools";
import copyIcn from "../../../../../static/images/clipIcons/copy.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import BankerTxnCoin from "./BankerTxnCoin";
import OnOutsideClick from "../../../../../utils/OnOutsideClick";
import { TimeAgo } from "../../../../../utils/Functions";
import { ToastContext } from "../../../../../ToastContext"
import { useNavigate } from "react-router";
import { GlobalContex } from "../../../../../globalContex";

function BankerTxnCard({
  isDeposit,
  txn,
  txnSelected,
  coinList,
  coinSelected,
  onClick,
}) {
  const Navigate = useNavigate();
  const { copyToClipboard } = useContext(ToastContext);
  const { coinListObject } = useContext(GlobalContex);
  const txnCoin = coinList?.filter(
    (coin) => coin.coinSymbol === (isDeposit ? txn.coin : txn.buy_coin)
  )[0];

  const [profile, setProfile] = useState({
    username: "",
    name: "",
    profile_img: "",
    aff: "",
  });

  const [uplines, setUplines] = useState();
  const [switchTime, setSwitchTime] = useState(false);
  function timeAgo() {
    const { days, hours, minutes } = TimeAgo(txn?.timestamp);
    return `${days} Days ${hours} Hours ${minutes} Minutes Ago`;
  }

  useEffect(() => {
    Axios.post("https://comms.globalxchange.io/get_affiliate_data_no_logs", {
      email: txn.email,
    }).then((res) => {
      const data = res.data[0];
      if (data) {
        setProfile({
          username: data.username,
          name: data.name,
          profile_img: data.profile_img,
          aff: data.ref_affiliate,
        });
      }
    });
    Axios.get(
      `https://comms.globalxchange.io/brokerage/stats/get/uplines?email=${txn?.email}`
    ).then(({ data }) => {
      if (data.status) {
        setUplines(data.uplines[0]);
      }
    });
  }, [txn]);
  const [cardCoin, setCardCoin] = useState(coinSelected);
  useEffect(() => {
    setCardCoin(coinSelected);
  }, [coinSelected]);
  const [timeZone, setTimeZone] = useState({
    value: "Eastern Standard Time",
    abbr: "EST",
    offset: -5,
    utc: ["America/Chicago"],
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [tab, setTab] = useState("");

  //

  const elRefs = useRef([]);

  elRefs.current = Array(12)
    .fill()
    .map((_, i) => elRefs.current[i] || createRef());

  const refOut = useRef();
  OnOutsideClick(
    undefined,
    () => {
      try {
        onClick();
        // Navigate(
        //   `/${"MyCryptoBrand"}/${txn?.email}/${txn?._id}`
        // );
      } catch (error) { }
    },
    refOut,
    elRefs
  );
  return (
    <>
      <div
        className={`txnItem ${!txnSelected || txn === txnSelected}`}
        ref={refOut}
      >
        <div className="txnHead">
          <div className="value">
            <img
              src={copyIcn}
              alt=""
              ref={elRefs.current[0]}
              onClick={() =>
                copyToClipboard(
                  FormatCurrency(txn.buy_amount, txn.buy_coin),
                  "Native Value Copied"
                )
              }
            />
            {FormatCurrency(txn.buy_amount, txn.buy_coin)}
          </div>
          <div className="coin">
            <img src={txnCoin?.coinImage} alt="" />
          </div>
          <div className="value">
            <img
              src={copyIcn}
              alt=""
              ref={elRefs.current[1]}
              onClick={() =>
                copyToClipboard(
                  FormatCurrency(txn.bankerCredit?.usd_value, txn?.buy_coin),
                  "Native Value Copied"
                )
              }
            />
            {cardCoin?.coinSymbol === "USD" ? "$" : ""}
            {FormatCurrency(
              (isDeposit
                ? txn?.usd_value
                : txn?.final_buy_amount *
                (coinListObject && coinListObject[txn.buy_coin].usd_price)) /
              coinSelected?.price?.USD
            )}
          </div>
          <div
            className="coin"
            ref={elRefs.current[2]}
            onClick={() => {
              setFilterOpen(true);
              setTab("coin");
            }}
          >
            <img src={cardCoin?.coinImage} alt="" />
          </div>
        </div>
        <div className="content">
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[3]}
                onClick={() =>
                  copyToClipboard(
                    profile.name || profile.username,
                    "Name Copied"
                  )
                }
              />
              Username:
            </div>
            <div className="value">
              <span>{profile.name || profile.username}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[4]}
                onClick={() => copyToClipboard(txn.email, "Email Copied")}
              />
              Email:
            </div>
            <div className="value">
              <span>{txn.email}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[5]}
                onClick={() => copyToClipboard(txn.app_code, "App Copied")}
              />
              App:
            </div>
            <div className="value">
              <span>{txn.app_code}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[6]}
                onClick={() =>
                  copyToClipboard(uplines?.email, "Upline Mail Copied")
                }
              />
              Upline:
            </div>
            <div className="value">
              <span>{uplines?.email}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[7]}
                onClick={() => copyToClipboard(txn?.friendId, "Address Copied")}
              />
              Address:
            </div>
            <div className="value">
              <span>{txn?.friendId}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <img
                src={copyIcn}
                alt=""
                ref={elRefs.current[8]}
                onClick={() =>
                  copyToClipboard(txn?.userWithdrawData, "Backup Copied")
                }
              />
              Backup:
            </div>
            <div className="value">
              <span>{txn?.userWithdrawData}</span>
            </div>
          </div>
        </div>
        <div
          className={`txnFooter ${txn.current_step_data && txn.current_step_data.status
            }`}
        >
          <div className="color" />
          <div className="time">
            <img
              src={copyIcn}
              alt=""
              ref={elRefs.current[9]}
              onClick={() =>
                copyToClipboard(
                  `${moment(txn.timestamp)
                    .tz(timeZone.utc[0])
                    .format("MMM Do YYYY [At] h:mm A")} ${timeZone.abbr}`,
                  "Txn Time Copied"
                )
              }
            />
            {switchTime
              ? timeAgo()
              : moment(txn.timestamp)
                .tz(timeZone.utc[0])
                .format("MMM Do YYYY [At] h:mm A")}
          </div>
          <div
            className="tz"
            ref={elRefs.current[10]}
            onClick={() => {
              setFilterOpen(true);
              setTab("tz");
            }}
          >
            {timeZone.abbr}
          </div>
          <div
            className="tzBt"
            ref={elRefs.current[11]}
            onClick={() => setSwitchTime(!switchTime)}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </div>
        </div>
      </div>
      {filterOpen && (
        <BankerTxnCoin
          onClose={() => setFilterOpen(false)}
          selectedCoin={cardCoin}
          setSelectedCoin={setCardCoin}
          coinList={coinList}
          coinLoading={false}
          tab={tab}
          setTab={setTab}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
        />
      )}
    </>
  );
}

export default BankerTxnCard;
