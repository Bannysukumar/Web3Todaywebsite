import React from "react";
import { ImagesCS } from "../../../../assets/0a-exporter";
import "./cs-video-section.style.scss";
export default function CSVideoSection({
  fullSizeSidebar,
  fullScreenPlayer,
  setFullScreenPlayer,
}) {
  return (
    <div
      className={`cs-video-section ${
        fullSizeSidebar ? "adjust-for-sidebar" : ""
      }`}
    >
      <div
        className={`cs-video-player-wrapper ${
          fullScreenPlayer ? "occupy-fullscreen" : "'"
        }`}
      >
        <div className="c-s-video-player-header">
          <h6>Video Information</h6>
          <img
            onClick={() => setFullScreenPlayer(!fullScreenPlayer)}
            src={ImagesCS.fullScreen}
          />
        </div>
        <img className="play-icon" src={ImagesCS.playIcon} />
      </div>
      <div className="cs-video-suggestion">
        {[1, 2, 3, 4].map((obj) => (
          <div className="suggestion-card">
            <div className="s-c-thumbnail"></div>
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
  );
}
