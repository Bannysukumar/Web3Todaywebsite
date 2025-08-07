import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./companies.module.scss";
import Skeleton from "react-loading-skeleton";
import searchIco from "../../../assets/NavImages/thesearch.svg";
import downIco from "../../../assets/NewHomePage/down1_color.svg";

const WAPPs = () => {
  const [allWAPPs, setAllWAPPs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const allFilters = ["Overview", "Contacts", "Signals", "Financials"];
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/company?publication_id=638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAllWAPPs(data.data);
        // console.log(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.searchTitle}>Search</div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <img src={searchIco} alt="" />
        </div>
        {allFilters.map((item) => {
          return (
            <div className={styles.filterBlock}>
              <div className={styles.filterTitle}>{item}</div>
              <img src={downIco} alt="" />
            </div>
          );
        })}
      </div>
      <div
        className={styles.rightSide}
        style={{ height: window.innerHeight - 100, overflowY: "scroll" }}
      >
        {!loading
          ? allWAPPs
              ?.filter((o) => o.name.toLowerCase().includes(query))
              ?.map((item) => {
                return (
                  <div className={styles.cardStyle}>
                    <div className={styles.topRow}>
                      <div>
                        <div className={styles.cardImage}>
                          <img src={item?.profile_pic} alt="" />
                        </div>
                      </div>
                      <div className={styles.titleContainer}>
                        <div className={styles.cardTitle}>{item?.name}</div>
                        <div className={styles.cardDescription}>
                          {item?.short_desc}
                        </div>
                      </div>
                    </div>
                    <div className={styles.bottomRow}>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Founder</div>
                        <div className={styles.itemValue}>
                          {item?.founders[0]}
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Industry</div>
                        <div className={styles.itemValue}>{item?.industry}</div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Headquarters</div>
                        <div className={styles.itemValue}>{item?.country}</div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Investors</div>
                        <div className={styles.itemValue}>
                          {item?.investors[0]}
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.learnMoreButton}>Learn More</div>
                      </div>
                    </div>
                  </div>
                );
              })
          : Array(5)
              .fill("")
              .map((item) => {
                return (
                  <div className={styles.cardStyle}>
                    <div className={styles.topRow}>
                      <div>
                        <div className={styles.cardImage}>
                          <Skeleton
                            width="100%"
                            height="100%"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                      </div>
                      <div
                        className={styles.titleContainer}
                        style={{ width: "100%" }}
                      >
                        <div className={styles.cardTitle}>
                          <Skeleton
                            width="30%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                        <div className={styles.cardDescription}>
                          <Skeleton
                            width="100%"
                            style={{ borderRadius: "0px" }}
                          />
                          <Skeleton
                            width="80%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.bottomRow}>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Founder</div>
                        <div className={styles.itemValue}>
                          <Skeleton
                            width="100%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Industry</div>
                        <div className={styles.itemValue}>
                          <Skeleton
                            width="100%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Headquarters</div>
                        <div className={styles.itemValue}>
                          <Skeleton
                            width="100%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        <div className={styles.itemTitle}>Investors</div>
                        <div className={styles.itemValue}>
                          <Skeleton
                            width="100%"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className={styles.rowItem}>
                        {/* <div className={styles.learnMoreButton}>Learn More</div> */}
                        <div>&nbsp;</div>
                      </div>
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default WAPPs;
