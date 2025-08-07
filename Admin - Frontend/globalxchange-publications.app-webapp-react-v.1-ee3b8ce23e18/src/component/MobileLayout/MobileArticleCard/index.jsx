import React, { useContext } from "react";
import styles from "./articleCard.module.scss";
import { GlobalContex } from "../../../globalContext";
import { useNavigate } from "react-router-dom";

const MobileArticleCard = ({ item, saved }) => {
  const navigate = useNavigate();
  const { calculateTimeDifference } = useContext(GlobalContex);
  return (
    <>
      <div
        className={styles.articleCard}
        onClick={(e) => {
          navigate(`/news/article/${item?.custom_url}`);
        }}
      >
        <img src={item?.media} alt="" />
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
