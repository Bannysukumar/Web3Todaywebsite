import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../../../globalContext";
import MobileArticleCard from "../MobileArticleCard";
import styles from "./mobileSavedItems.module.scss";

const MobileSavedItems = () => {
  const navigate = useNavigate();
  const { userProfile, allCategories, calculateTimeDifference } =
    useContext(GlobalContex);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSavedItems = () => {
    setLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/saveditems?user_id=${userProfile?._id}`
        // `https://publications.apimachine.com/saveditems?user_id=63c05580a1c9c75295672a3c`
      )
      .then(({ data }) => {
        if (data.status) {
          // console.log(data.data.article, "kjwbdkwed");
          setSavedArticles(data.data.article);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getSavedItems();
  }, []);

  return (
    <div style={{ padding: "0px 20px" }}>
      {savedArticles?.map((item) => {
        return <MobileArticleCard item={item} saved={true} />;
      })}
    </div>
  );
};

export default MobileSavedItems;
