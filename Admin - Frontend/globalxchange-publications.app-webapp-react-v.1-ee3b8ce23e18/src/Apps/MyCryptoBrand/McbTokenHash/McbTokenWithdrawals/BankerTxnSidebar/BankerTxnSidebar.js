import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import noIcn from "../../../../../static/images/clipIcons/no.svg";
import apiIcon from "../../../../../static/images/clipIcons/apis.svg";
import ApiView from "./ApiView";
import { ToastContext } from "../../../../../ToastContext";
import "./bankertxnsidebar.scss"

function BankerTxnSidebar({ txnSelected, upline, setUpline, onClose }) {
  const { copyToClipboard } = useContext(ToastContext);
  const [tab, setTab] = useState("User");
  const [userLoading, setUserLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [uplineLoading, setUplineLoading] = useState(false);
  const [uplines, setUplines] = useState();

  useEffect(() => {
    console.log("Transaction-selected " , txnSelected)
    setUserLoading(true);
    setUplineLoading(true);
    Axios.get(
      `https://comms.globalxchange.io/coin/vault/service/users/holdings/data/get?email=${txnSelected?.email}`
    )
      .then(({ data }) => {
        if (data.status) {
          setUserData(data?.users[0]);
        }
      })
      .finally(() => setUserLoading(false));
    Axios.get(
      `https://comms.globalxchange.io/brokerage/stats/get/uplines?email=${txnSelected?.email}`
    )
      .then(({ data }) => {
        if (data.status) {
          setUplines(data);
        }
      })
      .finally(() => setUplineLoading(false));
  }, [txnSelected]);

  function getContent() {
    switch (true) {
      case tab === "User" && upline:
        return (
          <>
            <div className="breadCrumb">
              <span onClick={() => setUpline(false)}>Withdrawal</span>-&gt;
              <span onClick={() => setUpline(false)}>User</span>-&gt;
              <span>Uplines</span>
            </div>
            <Scrollbars
              className="userDetail"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderTrackHorizontal={() => <div />}
              renderTrackVertical={() => <div />}
            >
              <div className="moreTitle">User</div>
              <div className="moreItem">
                <div className="user">
                  <img
                    src={
                      uplines?.user?.profile_img ||
                      `https://avatars.dicebear.com/4.5/api/initials/${uplines?.user?.name}.svg`
                    }
                    alt=""
                  />
                  <div className="detail">
                    <div className="name">{uplines?.user?.name}</div>
                    <div className="desc">{uplines?.user?.email}</div>
                  </div>
                </div>
              </div>
              {uplines?.uplines && (
                <>
                  <div className="moreTitle">Direct</div>
                  <div className="moreItem">
                    <div className="user">
                      <img
                        src={
                          (uplines?.uplines &&
                            uplines?.uplines[0]?.profile_img) ||
                          `https://avatars.dicebear.com/4.5/api/initials/${
                            uplines?.uplines && uplines?.uplines[0]?.name
                          }.svg`
                        }
                        alt=""
                      />
                      <div className="detail">
                        <div className="name">
                          {uplines?.uplines && uplines?.uplines[0]?.name}
                        </div>
                        <div className="desc">
                          {uplines?.uplines && uplines?.uplines[0]?.email}
                        </div>
                      </div>
                    </div>
                    <div className="dd">
                      DD{uplines?.uplines && uplines?.uplines[0].dds}
                    </div>
                  </div>
                  {uplines?.uplines.length > 1 && (
                    <>
                      <div className="moreTitle">Indirect</div>
                      {uplines?.uplines
                        ?.filter((user, i) => i !== 0)
                        .map((user) => (
                          <div className="moreItem">
                            <div className="user">
                              <img
                                src={
                                  user?.profile_img ||
                                  `https://avatars.dicebear.com/4.5/api/initials/${user?.name}.svg`
                                }
                                alt=""
                              />
                              <div className="detail">
                                <div className="name">{user?.name}</div>
                                <div className="desc">{user?.email}</div>
                              </div>
                            </div>
                            <div className="dd">DD{user.dds}</div>
                          </div>
                        ))}
                    </>
                  )}
                </>
              )}
            </Scrollbars>
          </>
        );
      case tab === "User":
        return (
          <>
            <div className="heads">
              <img
                src={
                  userData?.userData?.profile_img ||
                  `https://avatars.dicebear.com/api/initials/${txnSelected.email}.svg`
                }
                alt=""
              />
              <div className="detail">
                {userLoading ? (
                  <Skeleton className="name" width={250} />
                ) : (
                  <div className="name">
                    {userData?.userData?.name}{" "}
                    <FontAwesomeIcon
                      icon={faCopy}
                      onClick={() =>
                        copyToClipboard(uplines?.user?.name, "Name Copied")
                      }
                    />
                  </div>
                )}
                {userLoading ? (
                  <Skeleton className="email" width={280} />
                ) : (
                  <div className="email">
                    {userData?.userData?.email}
                    <FontAwesomeIcon
                      icon={faCopy}
                      onClick={() =>
                        copyToClipboard(uplines?.user?.email, "Email Copied")
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <Scrollbars
              className="userDetail"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderTrackHorizontal={() => <div />}
              renderTrackVertical={() => <div />}
            >
              <div className="listItem">
                <span>Username</span>
                <span>
                  {userData?.userData?.username}
                  {userLoading && <Skeleton width={250} />}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      copyToClipboard(
                        userData?.userData?.username,
                        "Username Copied"
                      )
                    }
                  />
                </span>
              </div>
              <div className="listItem">
                <span>Affiliate ID</span>
                <span>
                  {userData?.userData?.affiliate_id}
                  {userLoading && <Skeleton width={250} />}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      copyToClipboard(
                        userData?.userData?.affiliate_id,
                        "Affiliate Id Copied"
                      )
                    }
                  />
                </span>
              </div>
              <div className="listItem">
                <span>Ref Affiliate ID</span>
                <span>
                  {userData?.refUserData?.affiliate_id}
                  {userLoading && <Skeleton width={250} />}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      copyToClipboard(
                        userData?.refUserData?.affiliate_id,
                        "Ref Affiliate Id Copied"
                      )
                    }
                  />
                </span>
              </div>
              <div className="listItem">
                <span>Joining Date</span>
                <span>
                  {userLoading ? (
                    <Skeleton width={250} />
                  ) : (
                    moment(userData?.userData?.date).format("MMMM Do YYYY")
                  )}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      copyToClipboard(
                        moment(userData?.userData?.date).format("MMMM Do YYYY"),
                        "Date Copied"
                      )
                    }
                  />
                </span>
              </div>
              <div className="listItem">
                <span>First App</span>
                <span>
                  {userData?.appsData?.appsData[0]?.app_name}
                  {userLoading && <Skeleton width={250} />}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() =>
                      copyToClipboard(
                        userData?.appsData?.appsData[0]?.app_name,
                        "App Name Copied"
                      )
                    }
                  />
                </span>
              </div>
              <div className="moreTitle">More Data</div>
              <div className="moreItem">
                <div className="detail">
                  <div className="name">Holdings</div>
                  <div className="desc">The Users Financial Situation</div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className="moreItem" onClick={() => setUpline(true)}>
                <div className="detail">
                  <div className="name">Uplines</div>
                  <div className="desc">See The Users Liniage</div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className="moreItem">
                <div className="detail">
                  <div className="name">Registered Apps</div>
                  <div className="desc">See All The Users Registered Apps</div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </Scrollbars>
          </>
        );
      case tab === "API":
        return <ApiView txnId={txnSelected._id} />;
      default:
        return "";
    }
  }

  function footer() {
    switch (tab) {
      case "API":
        return (
          <Scrollbars className="menuList">
            <div className="menuItem true">
              <img src={apiIcon} alt="" />
              <span>Transactional</span>
            </div>
            <div className="menuItem">
              <img src={apiIcon} alt="" />
              <span>Simplified Withdrawal API</span>
            </div>
          </Scrollbars>
        );
      default:
        break;
    }
  }
  return (
    <div className="bankerTxnSidebar">
      <div className="tabs">
        <div className={`tab ${tab === "API"}`} onClick={() => setTab("API")}>
          API
        </div>
        <div className={`tab ${tab === "User"}`} onClick={() => setTab("User")}>
          User
        </div>
        <div
          className={`tab ${tab === "Transaction"}`}
          onClick={() => setTab("Transaction")}
        >
          Transaction
        </div>
        <div
          className={`tab ${tab === "Communications"}`}
          onClick={() => setTab("Communications")}
        >
          Communications
        </div>
      </div>
      {getContent()}
      <div className="footers">
        <div className="content">{footer()}</div>
        <div
          className="icon"
          onClick={() => {
            try {
              onClose();
            } catch (error) {}
          }}
        >
          <img src={noIcn} alt="" />
        </div>
      </div>
    </div>
  );
}

export default BankerTxnSidebar;
