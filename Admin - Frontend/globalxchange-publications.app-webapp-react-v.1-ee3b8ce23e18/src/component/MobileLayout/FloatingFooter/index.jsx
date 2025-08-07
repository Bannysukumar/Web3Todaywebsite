import React from "react";
import classNames from "./floatingfooter.module.scss";
import { CreatorsIcon, TopicsIcon, TrendingIcon } from "../FooterIcons";

const FloatingFooter = () => {
  return (
    <div className={classNames.floatingFooter}>
      <TrendingIcon />
      <TopicsIcon />
      <CreatorsIcon />
    </div>
  );
};

export default FloatingFooter;
