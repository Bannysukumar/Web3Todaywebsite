import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../../globalContext";
import styles from "./savedItems.module.scss";
const SavedItems = () => {
  const navigate = useNavigate();
  const { userProfile, allCategories, calculateTimeDifference } =
    useContext(GlobalContex);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSavedItems = () => {
    setLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/saveditems?user_id=${userProfile?._id}`
        // `https://publications.apimachine.com/saveditems?user_id=63c05580a1c9c75295672a3c`
      )
      .then(({ data }) => {
        if (data.status) {
          setSavedArticles(data.data.article);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getSavedItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>Your Saved Items</div>
        <div className={styles.tabContainer}>
          <div className={styles.tab} style={{ opacity: 1 }}>
            Articles
          </div>
          <div className={styles.tab}>Videos</div>
          <div className={styles.tab}>WebStory’s</div>
          <div className={styles.tab}>WAPPs</div>
          <div className={styles.tab}>People</div>
        </div>
      </div>
      <div className={styles.savedItemGrid}>
        <div>
          {!loading
            ? savedArticles?.map((item) => {
                return (
                  <div
                    className={styles.newsCard}
                    onClick={(e) => {
                      navigate(`/news/article/${item?.custom_url}`);
                    }}
                  >
                    <div
                      style={{
                        padding: "0px 34px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ fontSize: "25px", fontWeight: 700 }}>
                        {item?.title}
                      </div>
                      <br />
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 300,
                        }}
                      >
                        {item?.email} |{" "}
                        {calculateTimeDifference(item?.createdAt)} Hours Ago | 2
                        Min Read
                      </div>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <img
                        src={item?.media}
                        alt=""
                        width="100%"
                        height="170px"
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                  </div>
                );
              })
            : Array(5)
                .fill("")
                .map((item) => {
                  return (
                    <div className={styles.newsCard}>
                      <div
                        style={{
                          padding: "0px 34px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ fontSize: "25px", fontWeight: 700 }}>
                          <Skeleton />
                        </div>
                        <br />
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 300,
                          }}
                        >
                          <Skeleton width={"60%"} />
                        </div>
                      </div>
                      <div style={{ padding: "20px" }}>
                        <Skeleton height={"170px"} />
                      </div>
                    </div>
                  );
                })}
        </div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default SavedItems;
