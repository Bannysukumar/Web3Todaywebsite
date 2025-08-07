import Axios from "axios";
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as IconClose } from "../../../../../static/images/clipIcons/close.svg"

const tabsArr = [
  "Coins",
  "Apps",
  "Users",
  "Uplines",
  "Minimum",
  "Maximum",
  "Before A Date",
  "After A Date",
];

function BankerFilter({
  onClose,
  selectedCoinList,
  setSelectedCoinList,
  selectedApps,
  setSelectedApps,
  coinList,
  coinLoading,
}) {
  const [filterTabSelected, setFilterTabSelected] = useState("Coins");
  const [appList, setAppList] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  useEffect(() => {
    setAppLoading(true);
    Axios.get("https://comms.globalxchange.io/gxb/apps/get")
      .then((res) => {
        const { data } = res;
        if (data.status) {
          const { apps } = data;
          setAppList(apps);
        }
      })
      .finally(() => setAppLoading(false));
  }, []);

  function getContent() {
    switch (filterTabSelected) {
      case "Coins":
        return (
          <Scrollbars autoHide className="itemListScroll">
            {coinLoading
              ? Array(6)
                  .fill("")
                  .map(() => <Skeleton className="item" />)
              : coinList.map((coin) => (
                  <div
                    className="item"
                    onClick={() => {
                      if (selectedCoinList.includes(coin.coinSymbol)) {
                        setSelectedCoinList(
                          selectedCoinList.filter(
                            (coins) => coin.coinSymbol !== coins
                          )
                        );
                      } else {
                        setSelectedCoinList([
                          ...selectedCoinList,
                          coin.coinSymbol,
                        ]);
                      }
                    }}
                  >
                    <img
                      className={`coin ${selectedCoinList.includes(
                        coin.coinSymbol
                      )}`}
                      src={coin.coinImage}
                      alt=""
                    />
                    <span>{coin.coinName}</span>
                    <input
                      readOnly
                      type="checkbox"
                      checked={selectedCoinList.includes(coin.coinSymbol)}
                    ></input>
                  </div>
                ))}
          </Scrollbars>
        );
      case "Apps":
        return (
          <Scrollbars autoHide className="itemListScroll">
            {appLoading
              ? Array(6)
                  .fill("")
                  .map(() => <Skeleton className="item" />)
              : appList.map((app) => (
                  <div
                    className="item"
                    onClick={() => {
                      if (selectedApps.includes(app.app_code)) {
                        setSelectedApps(
                          selectedApps.filter((apps) => app.app_code !== apps)
                        );
                      } else {
                        setSelectedApps([...selectedApps, app.app_code]);
                      }
                    }}
                  >
                    <img className="coin" src={app.app_icon} alt="" />
                    <span>{app.app_name}</span>
                    <input
                      readOnly
                      type="checkbox"
                      checked={selectedApps.includes(app.app_code)}
                    ></input>
                  </div>
                ))}
          </Scrollbars>
        );

      default:
        break;
    }
  }
  return (
    <div className="typeColoumn">
      <div className="hTabs">
        <div className="tab true">Include</div>
        <div className="tab">Exclude</div>
        <div className="btClose" onClick={() => onClose()}>
          <IconClose />
        </div>
      </div>
      <div className="scrlTabs">
        {tabsArr.map((tab, i) => (
          <div
            key={i}
            className={`tab ${tab === filterTabSelected}`}
            onClick={() => setFilterTabSelected(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {getContent()}
    </div>
  );
}

export default BankerFilter;
