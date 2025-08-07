import React, { useEffect, useState } from "react";
import MobileNav from "../../component/MobileLayout/MobileNav";
import useWindowDimensions from "../../services/WindowSize";
import styles from "./scoreBoard.module.scss";

import Back from "../../assets/images/icons/back_solid.svg";
import axios from "axios";

const ScoreBoard = () => {
  const { width, height } = useWindowDimensions();
  const [step, setStep] = useState("");
  const [readStat, setReadStat] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleStat, setArticleStat] = useState(null);

  const getAllArticles = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    axios
      .get(
        `https://publications.apimachine.com/action/user?user_id=${userProfile?._id}`
      )
      .then(({ data }) => {
        console.log(data, "data");
        setReadStat(data.data);
        setAllArticles(data.data.detail);
      });
  };

  const getOneArticleStat = () => {
    axios
      .get(
        `https://publications.apimachine.com/action/article?service_id=${selectedArticle?.article_id}`
      )
      .then(({ data }) => {
        setArticleStat(data.data);
      });
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      getOneArticleStat();
    }
  }, [selectedArticle]);

  const conditionalBody = () => {
    switch (step) {
      case "All Articles":
        return (
          <div className={styles.container}>
            <div
              className={styles.statHeader}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={Back}
                alt=""
                onClick={(e) => {
                  setStep("");
                  setSelectedArticle(null);
                }}
                style={{ cursor: "pointer" }}
              />
              <div>&nbsp;Read Articles</div>
            </div>
            <div
              className={styles.articleContainer}
              style={{ width: window.innerWidth - 200 }}
            >
              {allArticles?.map((item) => {
                return (
                  <div className={styles.articleCard}>
                    <div className={styles.thumbnail}>
                      <img
                        src={item?.articleDetails?.icon}
                        alt=""
                        style={{ background: "lightgray" }}
                      />
                    </div>
                    <div
                      style={{
                        border: "0.5px solid #E7E7E7",
                        borderWidth: "0px 0.5px 0.5px 0.5px",
                        padding: "30px",
                        borderRadius: "0px 0px 15px 15px",
                      }}
                    >
                      <div className={styles.title}>
                        {item?.articleDetails?.title.length > 60
                          ? item?.articleDetails?.title.slice(0, 60) + "..."
                          : item?.articleDetails?.title}
                      </div>
                      <div className={styles.statGrid}>
                        <div className={styles.gridItem}>
                          <div>{item?.open_count}</div>
                          <div>Times Read</div>
                        </div>
                        <div className={styles.gridItem}>
                          <div>{(item?.total_duration / 60000).toFixed(2)}</div>
                          <div>Time (M)</div>
                        </div>
                        <div className={styles.gridItem}>
                          <div>0.00%</div>
                          <div>Completed</div>
                        </div>
                      </div>
                      <div
                        className={styles.globalStatBtn}
                        onClick={(e) => {
                          setSelectedArticle(item);
                          setStep("One Article");
                        }}
                      >
                        See Global Stats
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "One Article":
        return (
          <div className={styles.container}>
            <div
              className={styles.statHeader}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={Back}
                alt=""
                onClick={(e) => {
                  setStep("All Articles");
                  setSelectedArticle(null);
                }}
                style={{ cursor: "pointer" }}
              />
              <div>
                &nbsp;
                {selectedArticle?.articleDetails?.title.length > 90
                  ? selectedArticle?.articleDetails?.title.slice(0, 90) + "..."
                  : selectedArticle?.articleDetails?.title}
              </div>
            </div>

            <div className={styles.statContainer}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLable}>Times Read</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  {(articleStat?.totalReadDuration / 60000).toFixed(2)}
                </div>
                <div className={styles.statLable}>Total Time Spent (M)</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  {articleStat?.unique_user}
                </div>
                <div className={styles.statLable}>Total Individual Readers</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0.00%</div>
                <div className={styles.statLable}>Avg Completion Rate</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLable}>Avg Times Read Per User</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0</div>
                <div className={styles.statLable}>
                  Avg Time Spent Per User (M)
                </div>
              </div>
              <div
                className={styles.statCard}
                style={{ visibility: "hidden" }}
              ></div>
              <div
                className={styles.statCard}
                style={{ visibility: "hidden" }}
              ></div>
            </div>
            <div className={styles.statHeader} style={{ paddingTop: "40px" }}>
              Users Who Read This Article
            </div>
            <div className={styles.userCardWrapper}>
              {articleStat?.detail?.map((item, index) => {
                return (
                  <div className={styles.userCard}>
                    <div>
                      <div className={styles.userThumbnail}>
                        <img
                          src={item?.userDetails?.profile_pic}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className={styles.userDetails}>
                        <div className={styles.userName}>
                          {item?.userDetails?.username}
                        </div>
                        <div className={styles.userEmail}>
                          {item?.userDetails?.email}
                        </div>
                      </div>
                    </div>
                    <div className={styles.userNumber}>#{index + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.container}>
            <div className={styles.statHeader}>Reading Stats</div>
            <div className={styles.cardContainer}>
              {/* Individual Articles Read */}
              <div
                className={styles.card}
                onClick={(e) => setStep("All Articles")}
              >
                <div className={styles.cardLable}>Individual Articles Read</div>
                <div className={styles.cardValue}>
                  {readStat?.total_article}
                </div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Total Minutes Read */}
              <div
                className={styles.card}
                onClick={(e) => setStep("All Articles")}
              >
                <div className={styles.cardLable}>Total Minutes Read</div>
                <div className={styles.cardValue}>
                  {(readStat?.totalReadDuration / 60000).toFixed(2)}
                </div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Avg Reading Per Article */}
              <div
                className={styles.card}
                onClick={(e) => setStep("All Articles")}
              >
                <div className={styles.cardLable}>Avg Reading Per Article</div>
                <div className={styles.cardValue}>0.00</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Article Finish Rate */}
              <div
                className={styles.card}
                onClick={(e) => setStep("All Articles")}
              >
                <div className={styles.cardLable}>Article Finish Rate</div>
                <div className={styles.cardValue}>0.00%</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              <div
                className={styles.card}
                onClick={(e) => setStep("All Articles")}
              >
                <div className={styles.cardLable}>Total Articles Read</div>
                <div className={styles.cardValue}>
                  {readStat?.total_article_open_count}
                </div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
            </div>

            <div className={styles.statHeader} style={{ paddingTop: "100px" }}>
              Watching Stats
            </div>
            <div className={styles.cardContainer}>
              {/* Individual Videos Watched */}
              <div className={styles.card}>
                <div className={styles.cardLable}>
                  Individual Videos Watched
                </div>
                <div className={styles.cardValue}>0.00</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Total Minutes Watched */}
              <div className={styles.card}>
                <div className={styles.cardLable}>Total Minutes Watched</div>
                <div className={styles.cardValue}>0.00</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Avg Time Per Video */}
              <div className={styles.card}>
                <div className={styles.cardLable}>Avg Time Per Video</div>
                <div className={styles.cardValue}>0.00</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
              {/* Video Finish Rate */}
              <div className={styles.card}>
                <div className={styles.cardLable}>Video Finish Rate</div>
                <div className={styles.cardValue}>0.00%</div>
                <div className={styles.cardStat}>
                  <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24
                  Hours
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // return width > 900 || width > height ? (
  //   <div className={styles.container}>
  //     <div className={styles.header}>
  //       <div className={styles.headerTitle}>Your W3T Scoreboard</div>
  //       <div className={styles.scoreContainer}>
  //         <div className={styles.score}>83.31</div>
  //         <div className={styles.scoreLable}>How Its Calculated?</div>
  //       </div>
  //     </div>
  //     <div className={styles.statHeader}>Reading Stats</div>
  //     <div className={styles.cardContainer}>
  //       {/* Total Reading Minutes */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Total Reading Minutes</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Reading Per Day */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Avg Reading Per Day</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Reading Per Article */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Avg Reading Per Article</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Article Finish Rate */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Article Finish Rate</div>
  //         <div className={styles.cardValue}>0.00%</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //     </div>

  //     <div className={styles.statHeader} style={{ paddingTop: "100px" }}>
  //       Watching Stats
  //     </div>
  //     <div className={styles.cardContainer}>
  //       {/* Total Watching Minutes */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Total Watching Minutes</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Watching Per Day */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Avg Watching Per Day</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Watching Per Video */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Avg Watching Per Video</div>
  //         <div className={styles.cardValue}>0.00</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Video Finish Rate */}
  //       <div className={styles.card}>
  //         <div className={styles.cardLable}>Video Finish Rate</div>
  //         <div className={styles.cardValue}>0.00%</div>
  //         <div className={styles.cardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <div>
  //     <MobileNav />
  //     <div className={styles.mobileHeaderContainer}>
  //       <div style={{ paddingBottom: "10px" }}>Your W3T Scoreboard</div>
  //       <div className={styles.score}>83.31</div>
  //       <div className={styles.scoreLable}>How Its Calculated?</div>
  //     </div>
  //     <div className={styles.mobileCardContainer}>
  //       <div className={styles.mobileStatHeader}>Reading Stats</div>

  //       {/* Total Reading Minutes */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Total Reading Minutes</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Reading Per Day */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Avg Reading Per Day</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Reading Per Article */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Avg Reading Per Article</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Article Finish Rate */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Article Finish Rate</div>
  //         <div className={styles.mobileCardValue}>0.00%</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //     </div>
  //     <div className={styles.mobileCardContainer}>
  //       <div className={styles.mobileStatHeader}>Watching Stats</div>
  //       {/* Total Watching Minutes */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Total Watching Minutes</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Watching Per Day */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Avg Watching Per Day</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Avg Watching Per Video */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Avg Watching Per Video</div>
  //         <div className={styles.mobileCardValue}>0.00</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //       {/* Video Finish Rate */}
  //       <div className={styles.mobileCard}>
  //         <div className={styles.mobileCardLable}>Video Finish Rate</div>
  //         <div className={styles.mobileCardValue}>0.00%</div>
  //         <div className={styles.mobileCardStat}>
  //           <span style={{ color: "#04AF76" }}>+0.00%</span> In Last 24 Hours
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Your W3T Scoreboard</div>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>0.00</div>
          <div className={styles.scoreLable}>How Its Calculated?</div>
        </div>
      </div>
      {conditionalBody()}
    </>
  );
};

export default ScoreBoard;
