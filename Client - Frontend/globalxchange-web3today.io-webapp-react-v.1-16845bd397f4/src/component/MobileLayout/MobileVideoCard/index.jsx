import React, { useContext, useEffect } from "react";
import styles from "./articleCard.module.scss";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import demoThumbnail from "../../../assets/demoThumbnail.png";

const MobileVideoCard = ({ item }) => {
  const history = useHistory();
  const { calculateTimeDifference } = useContext(GlobalContex);

  useEffect(() => {
    console.log(item, "lwkeilwkend");
  }, []);

  return (
    <>
      <div
        className={styles.articleCard}
        onClick={(e) => {
          // console.log(item?.custom_url, "custom URl");
          // setSelectedVideo(item?.custom_url);
          history.push(`/feed/video/${item?.custom_url}`);
        }}
      >
        <img src={item?.image} alt="" />
        <div className={styles.title}>{item?.title}</div>

        {/* <div className={styles.description}>{item?.desc}</div> */}
        {/* <div className={styles.categoryWrapper}>
          {item?.categoryDetail?.length > 0
            ? item?.categoryDetail?.map((item) => {
                return <div className={styles.category}>{item?.title}</div>;
              })
            : ""}
        </div> */}
        <div className={styles.metadata}>
          {/* <div className={styles.author}>
            <img
              src={item?.PublisherDetails[0]?.PublisherDetails[0]?.profile_pic}
              alt=""
            />
            <div>{item?.PublisherDetails[0]?.PublisherDetails[0]?.name}</div>
          </div> */}
          <div className={styles.timestamp}>
            {new Date(item?.createdAt).toUTCString().substring(0, 16)}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileVideoCard;
