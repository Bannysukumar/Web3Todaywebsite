import React, { useEffect, useState } from "react";

import classNames from "./trendingVideos.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import playbuttonIcon from "../../../assets/images/icons/playbutton.svg";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const TrendingVideos = () => {
  const history = useHistory();
  const [trendingVideos, setTrendingVideos] = useState("");
  const [balanceTrendingVideos, setBalanceTrendingVideos] = useState("");
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [scrollLeftOffset, setScrollLeftOffset] = useState(0);

  useEffect(() => {
    setTrendingLoading(true);
    axios
      .get(
        "https://publications.apimachine.com/video/navbar/638dd8a8b257b3715a8fbe08"
      )
      .then((response) => {
        // console.log(response?.data, "trending videos");
        if (response?.data?.status) {
          let res = response?.data?.data?.slice(1);
          // console.log(res, "resresres");
          setBalanceTrendingVideos(res);
          setTrendingVideos(response?.data?.data);
          setTrendingLoading(false);
        } else {
          setTrendingVideos("false");
          setTrendingLoading(false);
        }
      })
      .catch((error) => {
        console.log(error?.message, "trending articles API  error");
      });
  }, []);

  function scrollDivNext() {
    let scrollableDiv = document.querySelector("#otherScrollableVideos");
    let scrollAmount = 80; // Change the value to adjust the scroll amount
    // console.dir(scrollableDiv, "scrollableDiv prev");
    setScrollLeftOffset(scrollableDiv?.scrollLeft);
    scrollableDiv.scrollBy({
      left: scrollAmount,
      behavior: "smooth", // Add this option for smooth scrolling
    });
  }
  function scrollDivPrev() {
    let scrollableDiv = document.querySelector("#otherScrollableVideos");
    let scrollAmount = -80; // Change the value to adjust the scroll amount
    // console.dir(scrollableDiv, "scrollableDiv next");
    setScrollLeftOffset(scrollableDiv?.scrollLeft);
    scrollableDiv.scrollBy({
      left: scrollAmount,
      behavior: "smooth", // Add this option for smooth scrolling
    });
  }

  return (
    <div className={classNames.trendingVideos}>
      <div className={classNames.title}>Trending</div>
      {trendingLoading
        ? Array.from({ length: 1 }).map((_, index) => {
            return <Skeleton width={900} height={300} />;
          })
        : trendingVideos?.length > 0 && (
            <div className={classNames.content}>
              <img src={trendingVideos[0]?.image} alt="trendingvideos" />
              <div
                className={classNames.blacktint}
                onClick={() =>
                  history.push(`/feed/video/${trendingVideos[0]?.custom_url}`)
                }
              >
                <div>
                  <div className={classNames.title}>
                    {trendingVideos[0]?.title ? trendingVideos[0]?.title : ""}
                  </div>
                  <div className={classNames.mainBtn}>Watch Now</div>
                </div>
              </div>
              <div className={classNames.otherVideosParent}>
                <div
                  className={classNames.prevBtn}
                  style={{ display: scrollLeftOffset != "0" ? "" : "none" }}
                >
                  <div onClick={scrollDivPrev}>
                    <MdArrowForwardIos />
                  </div>
                </div>
                <div
                  className={classNames.otherVideos}
                  id="otherScrollableVideos"
                >
                  {balanceTrendingVideos?.length > 0 &&
                    balanceTrendingVideos?.map((eachvideo, i) => {
                      return (
                        <div
                          key={"eachvideo" + i}
                          onClick={() =>
                            history.push(`/feed/video/${eachvideo?.custom_url}`)
                          }
                        >
                          <img src={eachvideo?.image} alt="imagee" />
                          <div className={classNames.overlayVideos}>
                            <img src={playbuttonIcon} alt="playbuttonIcon" />
                            {eachvideo?.title}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className={classNames.nextBtn}>
                  <div onClick={scrollDivNext}>
                    <MdArrowForwardIos />
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default TrendingVideos;
