import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styles from "./mobileVideoPage.module.scss";
import { useHistory } from "react-router-dom";
import { GlobalContex } from "../../../globalContext";
import MobileArticleCard from "../MobileArticleCard";
import MobileVideoCard from "../MobileVideoCard";
import Skeleton from "react-loading-skeleton";
import FloatingFooter from "../FloatingFooter";
import useWindowDimensions from "../../../services/WindowSize";

const MobileVideoPage = () => {
  const history = useHistory();
  const { width } = useWindowDimensions();
  const { allCategories } = useContext(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/video/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setTrendingVideos(data.data);
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className={styles.container}>
      {/* <div style={{ padding: "20px 12px" }}>
        {allCategories.map((category) => {
          return (
            <div
              style={{ scrollMargin: "100px" }}
              className={styles.container2}
              // ref={bottomDivRef}
              id={category.title}
            >
              <div style={{ fontSize: "20px", fontWeight: 700 }}>
                {category.title}
              </div>
              <div>
                {trendingVideos?.map((item) => {
                  if (item.categoryType.find((o) => o === category._id))
                    return <MobileVideoCard item={item} />;
                })}
              </div>
            </div>
          );
        })}
      </div> */}
      <div
        className={styles.filterType}
        style={{
          display:
            window.location.pathname == "/feed/articles" ||
            window.location.pathname == "/" ||
            window.location.pathname == "" ||
            window.location.pathname == "/feed/videos"
              ? ""
              : "none",
        }}
      >
        <div
          onClick={(event) => {
            history.push("/feed/articles");
          }}
          style={{
            fontWeight:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "600"
                : "",
            background:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "white"
                : "",
            color:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "#4b2a91"
                : "",
          }}
        >
          Articles
        </div>
        <div
          onClick={(event) => {
            history.push("/feed/videos");
          }}
          style={{
            fontWeight: window.location.pathname == "/feed/videos" ? "600" : "",
            background:
              window.location.pathname == "/feed/videos" ? "white" : "",
            color: window.location.pathname == "/feed/videos" ? "#4b2a91" : "",
          }}
        >
          Videos
        </div>
      </div>
      {/* <div className={styles.trendingLabel}>Trending Videos</div> */}
      <div
        style={{
          padding: "0px 12px",
          marginTop: "-10px",
          paddingBottom: "120px",
        }}
      >
        {trendingVideos?.map((item) => {
          return <MobileVideoCard item={item} />;
        })}
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  ) : (
    <div className={styles.container}>
      <div style={{ padding: "20px 12px" }}>
        {Array(4)
          .fill("")
          .map((category) => {
            return (
              <div
                style={{ scrollMargin: "100px" }}
                className={styles.container2}
                // ref={bottomDivRef}
                id={category.title}
              >
                <div style={{ fontSize: "20px", fontWeight: 700 }}>
                  <Skeleton width="40%" height="15px" />
                </div>
                <div>
                  {Array(10)
                    .fill("")
                    .map((item) => {
                      return (
                        <div>
                          <Skeleton width="100%" height="200px" />
                          <Skeleton width="40%" height="15px" />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MobileVideoPage;
