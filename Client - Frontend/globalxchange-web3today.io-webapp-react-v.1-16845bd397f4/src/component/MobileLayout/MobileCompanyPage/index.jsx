import React, { useState, useEffect } from "react";
import styles from "./mobileCompany.module.scss";

import searchIco from "../../../assets/NavImages/thesearch.svg";
import ExternalLink from "../../../assets/MobileAssets/externalLink.svg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const MobileCompanyPage = () => {
  const [allWAPPs, setAllWAPPs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

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
    <>
      <div className={styles.searchWrapper}>
        <img
          src={searchIco}
          alt=""
          style={{ opacity: 0.5, height: "18px", width: "18px" }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search WAPPs..."
          className={styles.inputStyle}
        />
        <div className={styles.filterButton}>Filters</div>
      </div>
      {!loading
        ? allWAPPs
            .filter((o) => o.name.toLowerCase().includes(query))
            .map((item) => {
              return (
                <div className={styles.cardWrapper}>
                  <div className={styles.topRow}>
                    <div className={styles.cardImage}>
                      <img src={item?.profile_pic} alt="" />
                    </div>
                    <div>
                      <div className={styles.industryLable}>Industry</div>
                      <div className={styles.industryValue}>
                        {item?.industry}
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottomRow}>
                    <div className={styles.cardTitle}>{item?.name}</div>
                    <div className={styles.cardDescription}>
                      {item?.short_desc}
                    </div>
                    <div className={styles.actionWrapper}>
                      <div className={styles.learnMoreButton}>Learn More</div>
                      <div className={styles.websiteWrapper}>
                        <img
                          src={ExternalLink}
                          alt=""
                          className={styles.linkImg}
                        />
                        <div className={styles.website}>Website</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        : Array(5)
            .fill("")
            .map((item) => {
              return (
                <div className={styles.cardWrapper}>
                  <div className={styles.topRow}>
                    <div className={styles.cardImage}>
                      <Skeleton
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                    <div>
                      <div className={styles.industryLable}>Industry</div>
                      <div className={styles.industryValue}>
                        <Skeleton
                          width="100%"
                          style={{ borderRadius: "0px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottomRow}>
                    <div className={styles.cardTitle}>
                      <Skeleton width="30%" style={{ borderRadius: "0px" }} />
                    </div>
                    <div className={styles.cardDescription}>
                      <Skeleton width="100%" style={{ borderRadius: "0px" }} />
                      <Skeleton width="70%" style={{ borderRadius: "0px" }} />
                      <Skeleton width="40%" style={{ borderRadius: "0px" }} />
                    </div>
                  </div>
                </div>
              );
            })}
      <div></div>
    </>
  );
};

export default MobileCompanyPage;
