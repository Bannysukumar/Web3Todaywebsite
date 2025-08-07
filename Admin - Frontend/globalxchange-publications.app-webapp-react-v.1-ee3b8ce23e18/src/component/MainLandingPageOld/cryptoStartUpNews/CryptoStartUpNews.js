import React from "react";
import "./crypto-startup-news.style.scss";
import { ImagesCS } from "../../../assets/0a-exporter";
import nextId from "react-id-generator";
import CSVideoSection from "./c-s-video-section/CSVideoSection";
import { CStartup } from "../cs-context/CSContext";
export default function CryptoStartUpNews({}) {
  let cstartup = React.useContext(CStartup);
  const { fullSizeSidebar, setMainSearchTerm, setMainSearch, selectedCountry } =
    cstartup;
  const [fullScreenPlayer, setFullScreenPlayer] = React.useState(false);

  React.useEffect(() => {
    if (fullScreenPlayer) {
      setMainSearchTerm("");
      setMainSearch(false);
    }
  }, [fullScreenPlayer]);
  return (
    <div className={`crypto-startup-news ${fullScreenPlayer ? "p-0" : ""}`}>
      <div className={`c-s-n-body`}>
        <div className="c-s-n-news-section">
          <CSVideoSection
            fullScreenPlayer={fullScreenPlayer}
            setFullScreenPlayer={setFullScreenPlayer}
            fullSizeSidebar={fullSizeSidebar}
          />
        </div>

        <div className="c-s-n-tabs">
          <div className="tabs-trending">
            <h4>
              See What's Trending{" "}
              {selectedCountry.formData.Name === "publicationtemplate2"
                ? ""
                : "In"}{" "}
              {selectedCountry.formData.Name}{" "}
              <img src={selectedCountry.formData.Flag} />
            </h4>
          </div>
          <div className="c-s-n-tabs-header">
            {headers.map((obj) => (
              <h5 key={obj.keyId}>{obj.name}</h5>
            ))}
          </div>
          <div className="c-s-n-tabs-people">
            {people.map((obj) => (
              <div>
                <img src={obj.img} />
                <span>{obj.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const headers = [
  { keyId: nextId(), name: "WAPPs" },
  { keyId: nextId(), name: "Investors" },
  { keyId: nextId(), name: "Founders" },
  { keyId: nextId(), name: "Influencers" },
];
const people = [
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
  { keyId: nextId(), name: "Sally M", img: ImagesCS.girlFace },
];
