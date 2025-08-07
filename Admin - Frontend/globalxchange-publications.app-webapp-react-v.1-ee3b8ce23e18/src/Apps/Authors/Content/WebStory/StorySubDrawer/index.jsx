import React, { useContext, useState } from "react";
import { GlobalContex } from "../../../../../globalContex";
import styles from "../StorySubDrawer/subdrawer.module.scss";

import About from "./About";
import back from "../../../../../static/images/icons/back.svg";

const StorySubDrawer = ({ selectedArticle, setSelectedArticle }) => {
  // console.log("subdrawer " + tabSelected);
  const {
    showSubDraw,
    setShowSubDraw,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
  } = useContext(GlobalContex);

  const [selectedMenu, setSelectedMenu] = useState("About");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(null);
  const [path, setPath] = useState([]);

  const showArticle = () => {
    try {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.parse(selectedArticle?.article),
          }}
        />
      );
    } catch (error) {
      return selectedArticle?.article;
    }
  };

  return (
    <div
      className={
        showSubDraw ? styles.right_drawer_visible : styles.right_drawer_hidden
      }
      style={{ height: window.innerHeight }}
    >
      <div style={{ padding: "20px", display: "flex", alignItems: "center" }}>
        <div
          className="backButton icon-imgs"
          onClick={(e) => {
            setShowSubDraw(false);
            setSelectedArticle(null);
          }}
        >
          <img src={back} alt="" />
        </div>
        <div style={{ paddingLeft: "20px" }}>{selectedArticle?.title}</div>
      </div>
      <div
        style={{
          padding: "0px 20px",
          fontSize: "14px",
          fontWeight: "normal",
          overflowY: "scroll",
          height: window.innerHeight - 160,
        }}
      >
        <div style={{ paddingBottom: "20px", color: "gray" }}>
          {selectedArticle?.desc}
        </div>
        {showArticle()}
      </div>
    </div>
  );
};

export default StorySubDrawer;
