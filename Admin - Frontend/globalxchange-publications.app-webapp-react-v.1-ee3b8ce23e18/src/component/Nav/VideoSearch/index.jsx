import React, { useEffect, useState } from "react";
import styles from "./videosearch.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useNavigate } from "react-router-dom";

const VideoSearch = ({ searchText, setSearchText, disp, setDisp }) => {
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/video/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAllVideos(data.data);
        // setLoading(false);
      });
  }, []);
  const handleLink = (item) => {
    document.body.style.overflow = "auto";
    navigate(`/news/video/${item?.custom_url}`);
    setDisp(!disp);
    setSearchText("");
  };
  const videosNav = () => {
    document.body.style.overflow = "auto";
    navigate(`/news/videos`);
    setDisp(!disp);
    setSearchText("");
  };
  if (searchText.length < 3) {
    return <div></div>;
  }
  if (
    allVideos.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.joinTags?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.joinKeywords?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.altTag?.toLowerCase().includes(searchText.toLowerCase())
    ).length === 0
  ) {
    return (
      <div>
        <p>No Videos found. Try Again...</p>
      </div>
    );
  }
  return (
    <div style={{ flexDirection: "column", width: "100%" }}>
      <div className={styles.articleSearch}>
        {allVideos
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
            // if (item?.title.length < 27) {
            //     let remainData = <span style={{ color: "white" }}>{" ".repeat(27 - item.title.length)}</span>
            //     item.title = item.title + " ".repeat(27 - item.title.length)
            // }
            return (
              <div
                className={styles.articleBox}
                onClick={() => handleLink(item)}
              >
                <div className={styles.articleLeftData}>
                  <p className={styles.searchArticleText}>{item.title}</p>
                  <p className={styles.searchArticleSubText}>{item?.email}</p>
                </div>
                <div className={styles.articleRightData}>
                  <img
                    src={item?.image}
                    alt="articleimage"
                    className={styles.imageSize}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.bottomBtn}>
        <button className={styles.viewAll} onClick={videosNav}>
          View All Videos
        </button>
      </div>
    </div>
  );
};

export default VideoSearch;
