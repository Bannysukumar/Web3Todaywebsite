import React, { useEffect, useState } from "react";
import classNames from "./campaigns.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("https://comms.globalxchange.io/coin/promo/farm/video/campaign/get")
      .then((response) => {
        // console.log(response?.data?.videoCampaigns, "all campaigns");
        setAllCampaigns(response?.data?.videoCampaigns);
      })
      .catch((error) => {
        console.log(error?.message, "campaigns error");
      });
  }, []);
  return (
    <div className={classNames.campaigns}>
      <div className={classNames.title}>Web3 Earn</div>
      {allCampaigns?.length > 0
        ? allCampaigns?.map((eachcampaigns) => {
            return <EachCampaigns {...eachcampaigns} />;
          })
        : ""}
    </div>
  );
};

export default Campaigns;

const EachCampaigns = ({
  video_title,
  video_description,
  video_thumbnail,
  payOutCoin,
  payout_amount,
}) => {
  return (
    <div className={classNames.eachCampaigns}>
      {video_thumbnail && (
        <div className={classNames.imgDiv}>
          <img src={video_thumbnail ? video_thumbnail : ""} alt="" />
        </div>
      )}
      <div className={classNames.title}>{video_title ? video_title : ""}</div>
      <div className={classNames.para}>
        {video_description ? video_description : ""}
      </div>
      <div className={classNames.btnsContainer}>
        <div>
          Watch & Earn {payout_amount ? payout_amount : ""}{" "}
          {payOutCoin ? payOutCoin : ""}
        </div>
        <div>I Watched On Social Media</div>
      </div>
    </div>
  );
};
