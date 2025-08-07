import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../marketplace.scss";
import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

const GxtLicences = () => {
  const { bankerEmail } = useContext(GlobalContex);
  const [licenseData, setLicenseData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [theDate, setTheDate] = useState(new Date());
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let themonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://comms.globalxchange.io/coin/vault/user/license/get?email=${bankerEmail}`
      )
      .then((res) => {
        setDataLoading(false);

        // let data = res.data.users;
        // let output = data.slice(0, 30);
        setLicenseData(res.data.productLicenses);
      });
  }, [bankerEmail]);

  const getOrdinalNum = (number) => {
    let selector;

    if (number <= 0) {
      selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
      selector = 0;
    } else {
      selector = number % 10;
    }

    return number + ["th", "st", "nd", "rd", ""][selector];
  };

  return (
    <div
      style={{
        // display: "flex",
        fontWeight: 700,
        fontSize: "20px",
        height: window.innerHeight - 125,
        overflowY: "scroll",
      }}
    >
      {!dataLoading ? (
        licenseData?.length > 0 ? (
          licenseData.map((item) => {
            let renewdate;
            let nextrenewdate;
            let thedate = item.licenses[0]?.date;
            let lastdate = item.licenses[0]?.last_renewed_date;
            let nextdate = item.licenses[0]?.next_renew_date;

            if (lastdate) {
              renewdate =
                themonths[new Date(lastdate).getMonth()] +
                " " +
                getOrdinalNum(new Date(lastdate).getDate()) +
                " " +
                new Date(lastdate).getFullYear();
            } else {
              renewdate = "NA";
            }

            if (nextdate) {
              if (new Date(nextdate).getMonth()) {
                nextrenewdate =
                  themonths[new Date(nextdate).getMonth()] +
                  " " +
                  getOrdinalNum(new Date(nextdate).getDate()) +
                  " " +
                  new Date(nextdate).getFullYear();
              } else {
                nextrenewdate = "NA";
              }
            } else {
              nextrenewdate = "NA";
            }
            return (
              <div>
                <div
                  className="licenseDataGrid"
                  style={{
                    gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr",
                  }}
                >
                  <div className="tokenApp">
                    <div className="headtitle">Product</div>
                    <div className="headtext">
                      <span className="imgtopmarg">
                        <img
                          src={
                            item.product_icon ? item.product_icon : defaultImg
                          }
                          alt="the-image"
                          height="15px"
                          width="15px"
                        />
                      </span>
                      &nbsp;{item.product_name}
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">License Code:</div>
                      <div className="headtext thefontt">
                        {item.licenses[0]?.license_code}
                      </div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Purchase Date:</div>
                      <div className="headtext">
                        {themonths[new Date(thedate).getMonth()]}&nbsp;
                        {getOrdinalNum(new Date(thedate).getDate())}&nbsp;
                        {new Date(thedate).getFullYear()}
                      </div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Purchase Coin</div>
                      <div className="headtext">
                        {item.licenses[0]?.user_pay_coin}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="licenseDataGrid"
                  style={{
                    gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr",
                  }}
                >
                  <div className="tokenApp">
                    <div className="headtitle">Product Code</div>
                    <div className="headtext">
                      {item.licenses[0]?.product_code}
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">License ID:</div>
                      <div className="headtext">
                        {item.licenses[0]?.license_id}
                      </div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Renewal Date:</div>
                      <div className="headtext">{renewdate}</div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Amount Paid</div>
                      <div className="headtext">
                        {item.licenses[0]?.amount_paid
                          ? parseInt(item.licenses[0]?.amount_paid).toFixed(2)
                          : "NA"}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="licenseDataGrid"
                  style={{
                    gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr",
                  }}
                >
                  <div className="tokenApp">
                    <div className="headtitle">Product ID</div>
                    <div className="headtext thefontt">
                      {item.licenses[0]?.product_id}
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">License Status:</div>
                      <div className="headtext">
                        {item.licenses[0]?.license_status}
                      </div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Next Payment Date:</div>
                      <div className="headtext">{nextrenewdate}</div>
                    </div>
                  </div>
                  <div className="leftList">
                    <div>
                      <div className="headtitle">Paid From</div>
                      <div className="headtext">
                        {item.licenses[0]?.app_code}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="thebtm-hr" />
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            No Records Found
          </div>
        )
      ) : (
        <div>
          {Array(4)
            .fill("")
            .map((item) => {
              return (
                <div>
                  {Array(3)
                    .fill("")
                    .map((item) => {
                      return (
                        <div
                          className="licenseDataGrid"
                          style={{
                            gridTemplateColumns: "1.2fr 1.2fr 1.2fr 1.2fr",
                          }}
                        >
                          <div className="tokenApp">
                            <Skeleton width={100} />
                            <Skeleton width={120} style={{ height: "10px" }} />
                          </div>
                          <div className="leftList">
                            <div>
                              <Skeleton width={100} />
                              <Skeleton
                                width={120}
                                style={{ height: "10px" }}
                              />
                            </div>
                          </div>
                          <div className="leftList">
                            <div>
                              <Skeleton width={100} />
                              <Skeleton
                                width={120}
                                style={{ height: "10px" }}
                              />
                            </div>
                          </div>
                          <div className="leftList">
                            <div>
                              <Skeleton width={100} />
                              <Skeleton
                                width={120}
                                style={{ height: "10px" }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <hr className="thebtm-hr" />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GxtLicences;
