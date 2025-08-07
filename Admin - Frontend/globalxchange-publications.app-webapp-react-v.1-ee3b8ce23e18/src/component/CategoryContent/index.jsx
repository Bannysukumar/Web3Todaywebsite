import React, { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContex } from "../../globalContext";
import styles from "./homeContent.module.scss";
import upIco from "../../assets/NewHomePage/up1_white.svg";
import downIco from "../../assets/NewHomePage/down1_color.svg";
import downIcoWhite from "../../assets/NewHomePage/down1_white.svg";
import loadingimg from "../../assets/NewHomePage/loading.gif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import MainIco1 from "../../assets/mainico.svg";
import axios from "axios";
import TrendingViewCategory from "../TrendingViewCategory";

const CategoryContent = () => {
  const { allArticles, selectedSubNav } = useContext(GlobalContex);
  const viewSwitcher = () => {
    switch (selectedSubNav) {
      case "Articles":
        return <TrendingViewCategory />;
        break;
      case "Videos":
        return <TrendingViewCategory />;
        break;

      default:
        break;
    }
  };

  return <div>{viewSwitcher()}</div>;
};

export default CategoryContent;
