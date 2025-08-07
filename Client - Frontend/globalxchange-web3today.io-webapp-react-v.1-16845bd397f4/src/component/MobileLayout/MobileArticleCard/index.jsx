import React, { useContext } from "react";
import styles from "./articleCard.module.scss";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";

const MobileArticleCard = ({ item, saved }) => {
  const history = useHistory();
  const { calculateTimeDifference } = useContext(GlobalContex);
  return (
    <>
      <div
        className={styles.articleCard}
        onClick={(e) => {
          history.push(`/feed/article/${item?.custom_url}`);
        }}
      >
        <img src={item?.icon} alt="" />
        <div className={styles.title}>{item?.title}</div>
        <div className={styles.description}>{item?.desc}</div>
        {!saved ? (
          <div className={styles.metadata}>
            {/* <div className={styles.author}>
              <img
                src={
                  item?.PublisherDetails[0]?.PublisherDetails[0]?.profile_pic
                }
                alt=""
              />
              <div>{item?.PublisherDetails[0]?.PublisherDetails[0]?.name}</div>
            </div> */}
            <div className={styles.timestamp}>
              {new Date(item?.createdAt).toUTCString().substring(0, 16)}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MobileArticleCard;
