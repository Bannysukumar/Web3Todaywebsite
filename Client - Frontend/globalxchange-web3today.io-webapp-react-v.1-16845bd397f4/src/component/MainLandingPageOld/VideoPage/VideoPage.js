import React from "react";
import nextId from "react-id-generator";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import ReactPlayer from "react-player";
import { ImagesCS } from "../../../assets/0a-exporter";
import "./video-page.style.scss";
import { fetchBrainVideoLink } from "../../../services/csPostAPIs";
import LoadingAnimationCS from "../../../lotties-cs/LoadingAnimationCS";
import { getVideoInfo } from "../../../services/csGetAPIs";
export default function VideoPage() {
  const { videoId } = useParams();
  const [play, setPlay] = React.useState(false);
  const [playLink, setPlayLink] = React.useState(null);
  const [videoInfo, setVideoInfo] = React.useState(null);
  const getVideoLink = async () => {
    let res = await fetchBrainVideoLink(videoId);
    setPlayLink(res.data);
  };
  const setUpVideoInfo = async () => {
    let res = await getVideoInfo(videoId);
    if (res.data.status) {
      setVideoInfo(res.data.data.video);
    } else {
    }
  };

  React.useEffect(() => {
    getVideoLink();
    setUpVideoInfo();
  }, []);
  return (
    <div className="video-page-main">
      <div className="video-page-body">
        <div className="selected-video-section">
          <div className="video-player">
            {!playLink ? (
              <LoadingAnimationCS />
            ) : (
              <ReactPlayer
                onPause={() => setPlay(false)}
                onEnded={() => setPlay(false)}
                playing={play}
                width="100%"
                height="100%"
                url={playLink}
                controls={true}
              />
            )}
            {!play && playLink ? (
              <div className="overlay-curtain">
                <img
                  onClick={() => setPlay(!play)}
                  src={ImagesCS.playIconWhite}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="video-info">
            {!videoInfo ? (
              <h5 className="loader">
                Loadinggggggggggggggggggggggggggggggggggggggggggggg
              </h5>
            ) : (
              <h5>{videoInfo.title}</h5>
            )}
            {!videoInfo ? (
              <p className="loader">Loadingggggggg</p>
            ) : (
              <p>
                2,351 Views |{" "}
                {moment(videoInfo?.createdAt)
                  .format("DD-MM - YYYY")
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            )}
          </div>
          <div className="channel-info-wrapper">
            <div className="channel-info">
              {!videoInfo ? (
                <button className="loader-pic"></button>
              ) : (
                <img src={ImagesCS.shorupan} />
              )}
              <div>
                {!videoInfo ? (
                  <h5 className="loader">Channel Name</h5>
                ) : (
                  <h5>Shorupan P</h5>
                )}
                {!videoInfo ? (
                  <span className="loader">000 Subs</span>
                ) : (
                  <span>234 Subscribers</span>
                )}
              </div>
            </div>
            <div className="channel-follow">
              <button>Learn More</button>
              <button>Follow</button>
            </div>
          </div>
          <div className="add-comment">
            <img src={ImagesCS.shorupan} />
            <div>
              <input placeholder="Add a comment" />
              <button>Comment</button>
            </div>
          </div>
        </div>
        <div className="other-video-list">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((obj) => (
            <div className="suggestion-card">
              <div className="s-c-thumbnail">
                <img src={ImagesCS.playIcon} />
              </div>
              <div className="s-c-details">
                <h5>This Country Changes </h5>
                <div>
                  <p>
                    Japan Has Removed Cryptocurrency From Courts. Japan Has
                    Removed Cryptocurrency From Courts
                  </p>
                </div>
                <h6>2.45 mins</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="video-page-footer">
        <div className="video-footer-left">
          <img src={ImagesCS.hamburger} />
        </div>
        <div className="video-footer-middle">
          {footer.map((obj) => (
            <div>
              <h6 key={obj.keyId}>
                <img src={obj.icon} />
                {obj.name}
              </h6>
            </div>
          ))}
        </div>
        <div className="video-footer-right">
          <img src={ImagesCS.share} />
        </div>
      </div>
    </div>
  );
}

const footer = [
  { keyId: nextId(), name: "Author", id: "author", icon: ImagesCS.shorupan },
  {
    keyId: nextId(),
    name: "Cryptocurrency",
    id: "crypto",
    icon: ImagesCS.coin,
  },
  {
    keyId: nextId(),
    name: "Australia",
    id: "country",
    icon: ImagesCS.canadaFlag,
  },
  {
    keyId: nextId(),
    name: "Investments",
    id: "investments",
    icon: ImagesCS.coin,
  },
];
