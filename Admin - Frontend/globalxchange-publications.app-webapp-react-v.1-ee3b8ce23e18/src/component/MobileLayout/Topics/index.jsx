import React, { useContext, useEffect, useState } from "react";
import MobileNav from "../MobileNav";
import classNames from "./topics.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../../services/WindowSize";
import FloatingFooter from "../FloatingFooter";

const TopicsMobile = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { setCategoryId } = useContext(GlobalContex);
  const [allTopics, setAllTopics] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        // console.log(response?.data?.data, "topics mobile");
        if (response?.data?.data) {
          setAllTopics(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message, "topics mobile error");
      });
  }, []);

  return (
    <div className={classNames.topicsMobile}>
      <div>
        <MobileNav />
      </div>
      {/* <div className={classNames.heading}>Topics</div> */}
      <div className={classNames.allTopics}>
        {allTopics?.length > 0
          ? allTopics?.map((eachTopic) => {
              return (
                <div
                  className={classNames.eachTopic}
                  onClick={() => {
                    navigate(`/news/articles/${eachTopic?.title}`);
                    setCategoryId(eachTopic?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{ pointerEvents: "none" }}
                >
                  <img src={eachTopic?.thumbnail} alt="" />
                  <div>{eachTopic?.title}</div>
                </div>
              );
            })
          : ""}
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  );
};

export default TopicsMobile;
