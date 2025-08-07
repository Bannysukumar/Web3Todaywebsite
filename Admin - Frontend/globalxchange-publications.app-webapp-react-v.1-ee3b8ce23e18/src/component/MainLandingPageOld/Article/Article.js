import Interweave from "interweave";
import React from "react";
import nextId from "react-id-generator";
import { useParams } from "react-router";
import { ImagesCS } from "../../../assets/0a-exporter";
import LoadingAnimationCS from "../../../lotties-cs/LoadingAnimationCS";
import { fetchArticleIdId } from "../../../services/csGetAPIs";
import "./article.style.scss";
import ArticleSkeleton from "./ArticleSkeleton";
export default function Article() {
  const { articleId } = useParams();
  const readRef = React.useRef();
  const [articleDetails, setArticleDetails] = React.useState(null);
  const [positions, setPositions] = React.useState({
    height: 0,
    scrolled: 0,
    totalScroll: 0,
  });

  const setUpArticleDetails = async () => {
    let res = await fetchArticleIdId(articleId);
    if (res.data.status) {
      setArticleDetails(res.data.data.article);
    } else {
      setArticleDetails(null);
    }
  };
  React.useEffect(() => {
    setUpArticleDetails();
  }, []);
  const handleScroll = () => {
    if (!readRef.current) return;
    setPositions({ ...positions, scrolled: readRef.current?.scrollTop });
  };

  React.useLayoutEffect(() => {
    if (!articleDetails) return;
    let ele = document.getElementById("read");
    setPositions({
      ...positions,
      height: ele.offsetHeight,
      totalScroll: ele.scrollHeight,
    });
  }, [articleDetails]);

  return (
    <div className="article-main">
      <div
        ref={readRef}
        onScroll={() => handleScroll()}
        id="read"
        className="article-wrapper"
      >
        {!articleDetails ? (
          <ArticleSkeleton />
        ) : (
          <>
            <div
              style={{ backgroundImage: `url(${articleDetails.media})` }}
              className="article-cover"
            />
            <div className="article-body">
              <div className="article-title-wrapper">
                <div className="article-author">
                  <img src={articleDetails.icon} />
                </div>
                <h5>{articleDetails.title}</h5>
              </div>
              <div className="article-content">
                <Interweave content={articleDetails.article} />
                {/* <p>{articleDetails.article}</p> */}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="article-footer">
        <div
          style={{
            width: `${
              ((positions.height + positions.scrolled) /
                positions.totalScroll) *
              100
            }%`,
          }}
          className="loader"
        />
        <div className="article-footer-left">
          <img src={ImagesCS.hamburger} />
        </div>
        <div className="article-footer-middle">
          {footer.map((obj) => (
            <div>
              <h6 key={obj.keyId}>
                <img src={obj.icon} />
                {obj.name}
              </h6>
            </div>
          ))}
        </div>
        <div className="article-footer-right">
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
