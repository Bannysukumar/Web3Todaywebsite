import React, { useState, useContext } from "react";
import styles from "./articleSearch.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";

const ArticleSearch = ({ searchText, setSearchText, disp, setDisp }) => {
  const history = useHistory();

  // console.log("searchText", searchText.length);

  const { allArticles, calculateTimeDifference } = useContext(GlobalContex);

  const handleLink = (item) => {
    document.body.style.overflow = "auto";
    history.push(`/feed/article/${item?.custom_url}`);
    setDisp(!disp);
    setSearchText("");
  };
  const articlesPage = () => {
    document.body.style.overflow = "auto";
    history.push(`/feed/articles`);
    setDisp(!disp);
    setSearchText("");
  };
  if (searchText.length < 3) {
    return <div></div>;
  }
  if (
    allArticles.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.joinTags?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.joinKeywords?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.altTag?.toLowerCase().includes(searchText.toLowerCase())
    ).length === 0
  ) {
    return (
      <div>
        <p>No Articles found. Try Again...</p>
      </div>
    );
  }
  return (
    <div style={{ flexDirection: "column", width: "100%" }}>
      <div className={styles.articleSearch}>
        {allArticles
          .filter(
            (item) =>
              item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
              item.joinTags?.toLowerCase().includes(searchText.toLowerCase()) ||
              item.joinKeywords
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
              item.altTag?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item, i) => {
            let timeData;
            if (
              calculateTimeDifference(item?.createdAt) > 24 &&
              calculateTimeDifference(item?.createdAt) < 168
            ) {
              timeData =
                Math.floor(calculateTimeDifference(item?.createdAt) / 24) +
                " Days Ago";
            } else if (
              calculateTimeDifference(item?.createdAt) > 168 &&
              calculateTimeDifference(item?.createdAt) < 720
            ) {
              timeData =
                Math.floor(calculateTimeDifference(item?.createdAt) / 168) +
                " Weeks Ago";
            } else if (
              calculateTimeDifference(item?.createdAt) > 720 &&
              calculateTimeDifference(item?.createdAt) < 8760
            ) {
              timeData =
                Math.floor(calculateTimeDifference(item?.createdAt) / 720) +
                " Months Ago";
            } else if (calculateTimeDifference(item?.createdAt) > 8760) {
              timeData =
                Math.floor(calculateTimeDifference(item?.createdAt) / 8760) +
                " Years Ago";
            } else {
              timeData =
                calculateTimeDifference(item?.createdAt) + " Hours Ago";
            }

            return (
              <div
                className={styles.articleBox}
                onClick={() => handleLink(item)}
              >
                <div className={styles.articleLeftData}>
                  <p className={styles.searchArticleText}>{item.title}</p>
                  <p className={styles.searchArticleSubText}>
                    {item?.PublisherDetails[0]?.PublisherDetails[0]?.name} |{" "}
                    {timeData} 
                    {/* | 2 Min Read */}
                  </p>
                </div>
                <div className={styles.articleRightData}>
                  <img
                    src={item?.media}
                    alt="articleimage"
                    className={styles.imageSize}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.bottomBtn}>
        <button className={styles.viewAll} onClick={articlesPage}>
          View All Articles
        </button>
      </div>
    </div>
  );
};

export default ArticleSearch;
