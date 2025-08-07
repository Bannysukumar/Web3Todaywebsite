import React, { useContext, useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";

function TransactionFilterApps({
  appSelected,
  setAppSelected,
  bankerSelected,
  coinSelected,
  isDeposit,
}) {
  const [search, setSearch] = useState("");
  const { appList, userType, bankerEmail } = useContext(GlobalContex);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        (isDeposit
          ? "https://comms.globalxchange.io/coin/vault/service/txns/deposit/get?"
          : `https://comms.globalxchange.io/coin/vault/service/path/withdraw/txn/get?`) +
          (bankerSelected?.bankerTag
            ? `&banker=${bankerSelected.bankerTag}`
            : "") +
          (coinSelected?.coin ? `&coin=${coinSelected.coin}` : "") +
          (userType === "Transactor" ? `&email=${bankerEmail}` : "")
      )
      .then(({ data }) => {
        if (data.status) {
          setApps(data.perAppCode);
        }
      })
      .finally(() => setLoading(false));
  }, [bankerSelected, coinSelected, bankerEmail, userType]);

  return (
    <>
      <div className="godsEyeFilterBanker">
        <div className="labelItm">Which App Do You Want To See?</div>
        <label className="searchInp">
          <input
            type="text"
            placeholder="Search Apps"
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
            : appList
                .filter(
                  (app) =>
                    app?.app_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    app?.app_code.toLowerCase().includes(search.toLowerCase())
                )
                .map((app) => (
                  <div
                    className={`item ${app.app_code === appSelected?.app_code}`}
                    onClick={() => {
                      setAppSelected(app);
                    }}
                  >
                    <img className="coin" src={app.app_icon} alt="" />
                    <span>{app.app_name}</span>
                    <span className="count">
                      {apps.filter((appx) => appx?.app_code === app.app_code)[0]
                        ?.count || 0}
                    </span>
                  </div>
                ))}
        </Scrollbars>
      </div>
      <div className="footerBtns">
        <div
          className="btnReset" style={{opacity : 1}}
          onClick={() => {
            // userType !== "App Owner" &&
            setAppSelected();
          }}
        >
          All Apps
        </div>
        <div className="btnSave" onClick={() => {}}>
          Save
        </div>
      </div>
    </>
  );
}

export default TransactionFilterApps;
