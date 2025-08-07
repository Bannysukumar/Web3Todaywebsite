import React, { useContext, useEffect, useState } from "react";
import styles from "./videos.module.scss";
import demoThumbnail from "../../../assets/demoThumbnail.png";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";

const Videos = () => {
  const history = useHistory();
  const { allCategories } = useContext(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [query, setQuery] = useState("");

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
      <div className={styles.videoRow} style={{ padding: "45px 0px" }}>
        <div className={styles.headerContainer}>
          <div className={styles.title}>
            {query.length ? "Video Search Result" : "Trending Videos"}
          </div>
          <div className={styles.searchContainer}>
            <input
              placeholder="Search Videos.."
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {!query.length ? (
          <>
            <div className={styles.videoWrapper}>
              {trendingVideos.map((item) => {
                return (
                  <div
                    className={styles.videoCard}
                    onClick={(e) => {
                      history.push(`/feed/video/${item?.custom_url}`);
                    }}
                  >
                    <div
                      className={styles.cardImage}
                      //   style={{ backgroundImage: `url(${item?.image})` }}
                    >
                      <img
                        src={item?.image}
                        alt="thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </div>

                    <div className={styles.videoTitle}>
                      {item?.title.length > 50
                        ? item?.title.substring(0, 50) + "..."
                        : item?.title}
                    </div>
                    <div className={styles.authorData}>
                      <div className={styles.authorLeft}>
                        <img
                          src={demoThumbnail}
                          alt="thumbnail"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                          }}
                        />
                        <div style={{ paddingLeft: "8px", opacity: "0.5" }}>
                          {item?.email}
                        </div>
                      </div>
                      <div style={{ opacity: "0.5" }}>325 Views</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ paddingTop: "20px" }}>
              {allCategories.map((category, index) => {
                return (
                  <div className={styles.videoRow}>
                    <div className={styles.title}>{category.title}</div>
                    <div className={styles.videoWrapper}>
                      {trendingVideos.map((item) => {
                        if (item.categoryType.find((o) => o === category._id)) {
                          return (
                            <div
                              className={styles.videoCardSmall}
                              onClick={(e) => {
                                history.push(`/feed/video/${item?.custom_url}`);
                              }}
                            >
                              <div className={styles.cardImageSmall}>
                                <img
                                  src={item?.image}
                                  alt="thumbnail"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "5px",
                                  }}
                                />
                              </div>
                              <div className={styles.videoTitleSmall}>
                                {item.title.substring(0, 20)}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.videoWrapper}>
            {trendingVideos
              .filter((o) =>
                o.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((item) => {
                return (
                  <div
                    className={styles.videoCard}
                    onClick={(e) => {
                      history.push(`/feed/video/${item?.custom_url}`);
                    }}
                  >
                    <div
                      className={styles.cardImage}
                      //   style={{ backgroundImage: `url(${item?.image})` }}
                    >
                      <img
                        src={item?.image}
                        alt="thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </div>

                    <div className={styles.videoTitle}>
                      {item?.title.length > 50
                        ? item?.title.substring(0, 50) + "..."
                        : item?.title}
                    </div>
                    <div className={styles.authorData}>
                      <div className={styles.authorLeft}>
                        <img
                          src={demoThumbnail}
                          alt="thumbnail"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                          }}
                        />
                        <div style={{ paddingLeft: "8px", opacity: "0.5" }}>
                          {item?.email}
                        </div>
                      </div>
                      <div style={{ opacity: "0.5" }}>325 Views</div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.videoRow} style={{ padding: "45px 0px" }}>
        <div>
          <div className={styles.headerContainer}>
            <div className={styles.title}>Trending Videos</div>
            <div className={styles.searchContainer}>
              <input
                placeholder="Search Videos.."
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.videoWrapper}>
          {Array(10)
            .fill("")
            .map((item) => {
              return (
                <div>
                  <div className={styles.videoCard}>
                    <Skeleton style={{ width: "100%", height: "200px" }} />
                    <div className={styles.videoTitle}>
                      <Skeleton style={{ height: "10px", width: "100%" }} />
                      <Skeleton style={{ height: "10px", width: "80%" }} />
                    </div>
                    <div className={styles.authorData}>
                      <div className={styles.authorLeft}>
                        <Skeleton
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                          }}
                        />

                        <div style={{ paddingLeft: "8px", opacity: "0.5" }}>
                          <Skeleton
                            style={{ height: "10px", width: "100px" }}
                          />
                        </div>
                      </div>
                      <div style={{ opacity: "0.5" }}>
                        <Skeleton style={{ height: "10px", width: "100px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div style={{ paddingTop: "20px" }}>
          {Array(5)
            .fill("")
            .map((item, index) => {
              return (
                <div className={styles.videoRow}>
                  <div className={styles.title}>category {index + 1}</div>
                  <div className={styles.videoWrapper}>
                    {Array(10)
                      .fill("")
                      .map((item) => {
                        return (
                          <div>
                            <div className={styles.videoCardSmall}>
                              <Skeleton
                                style={{ width: "100%", height: "200px" }}
                              />
                              <div className={styles.videoTitleSmall}>
                                <Skeleton
                                  style={{ height: "10px", width: "100%" }}
                                />
                                <Skeleton
                                  style={{ height: "10px", width: "80%" }}
                                />
                              </div>
                              <div className={styles.authorData}>
                                <div className={styles.authorLeft}>
                                  <Skeleton
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      borderRadius: "50%",
                                    }}
                                  />

                                  <div
                                    style={{
                                      paddingLeft: "8px",
                                      opacity: "0.5",
                                    }}
                                  >
                                    <Skeleton
                                      style={{ height: "10px", width: "100px" }}
                                    />
                                  </div>
                                </div>
                                <div style={{ opacity: "0.5" }}>
                                  <Skeleton
                                    style={{ height: "10px", width: "100px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default Videos;
