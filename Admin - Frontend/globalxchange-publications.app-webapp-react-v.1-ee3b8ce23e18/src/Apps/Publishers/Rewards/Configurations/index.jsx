import React from "react";
import classNames from "./rewards.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import UpdateRewardsDrawer from "./UpdateRewardsDrawer";

import filterIcon from "../../../../static/images/filter.svg";
import refreshIcon from "../../../../static/images/icons/refresh.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { GlobalContex } from "../../../../globalContex";

const RewardsTab = () => {
  const [rewardStructure, setRewardStructure] = useState("");
  const [selectedReward, setSelectedReward] = useState("");
  const [newRewardValue, setNewRewardValue] = useState("");
  const [showDisplay, setShowDisplay] = useState(false);

  const { selectedPublication, globalSearch, updatedSuccessful,
    setupdatedSuccessful } = useContext(GlobalContex)

  useEffect(() => {
    let pubdata;
    if (selectedPublication) {
      pubdata = selectedPublication._id
    } else {
      pubdata = "63a1a2c60e46260e093cf260"
    }
    axios
      .get(
        `https://publications.apimachine.com/publication/${pubdata}`
      )
      .then((response) => {
        setRewardStructure(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "Get reward structure error");
      });
  }, [updatedSuccessful, selectedPublication]);

  useEffect(() => {
    console.log("globalSearch-config", globalSearch)
    if (globalSearch.includes(EachTableContent.activity)) {
      setShowDisplay(true)
    }
    console.log(EachTableContent.activity)
  }, [globalSearch])

  let rewardData = ["reading an article", "Completing Article", "Daily Login", "Five Articles Read","Account Creation","Five Video Watched","Completing Video","Watching a Video","Article Question","Video Question","Affiliate Points"]

  return (
    <div className={classNames.rewardsTab}>
      {/* <div className={classNames.tabsContainer}>
        <div className={classNames.leftTabs}>
          <div className={classNames.selectedTab}>Configurations</div>
        </div>
        <div className={classNames.rightTabs}>
          <div>
            <img src={filterIcon} alt="filterIcon" />
          </div>
          <div>
            <img src={refreshIcon} alt="refreshIcon" />
          </div>
          <div>
            <AiOutlineSearch />
          </div>
        </div>
      </div> */}
      <div className={classNames.tableContainer}>
        <div className={classNames.headings}>
          <div>Activity</div>
          <div>Frequency</div>
          <div>Amount</div>
          <div></div>
        </div>
        <div className={classNames.contentRewards}>
          <div className={classNames.contentTable} style={{ display: rewardData[0].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Reading An Article"
              frequency="Per Minute"
              amount={rewardStructure ? rewardStructure?.rewardPoints : ""}
              setSelectedReward={setSelectedReward}
              fieldd="rewardPoints"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[1].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Completing Article"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.articleRead : ""}
              setSelectedReward={setSelectedReward}
              fieldd="articleRead"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[2].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Daily Login"
              frequency="Per Day"
              amount={rewardStructure ? rewardStructure?.dailyLogin : ""}
              setSelectedReward={setSelectedReward}
              fieldd="dailyLogin"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[3].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Five Articles Read"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.fiveArticleRead : ""}
              setSelectedReward={setSelectedReward}
              fieldd="fiveArticleRead"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[4].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Account Creation"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.signUpBonus : ""}
              setSelectedReward={setSelectedReward}
              fieldd="signUpBonus"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[5].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Five Video Watched"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.fiveVideoRead : ""}
              setSelectedReward={setSelectedReward}
              fieldd="fiveVideoRead"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[6].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Completing Video"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.videoRead : ""}
              setSelectedReward={setSelectedReward}
              fieldd="videoRead"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[7].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Watching a Video"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.videoRewardPoints : ""}
              setSelectedReward={setSelectedReward}
              fieldd="videoRewardPoints"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[8].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Article Question"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.articleQuestionPoints : ""}
              setSelectedReward={setSelectedReward}
              fieldd="articleQuestionPoints"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[9].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Video Question"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.videoQuestionPoints : ""}
              setSelectedReward={setSelectedReward}
              fieldd="videoQuestionPoints"
            />
          </div>
          <div className={classNames.contentTable} style={{ display: rewardData[10].toLowerCase().includes(globalSearch.toLowerCase()) ? "" : "none" }}>
            <EachTableContent
              activity="Affiliate Points"
              frequency="Per Activity"
              amount={rewardStructure ? rewardStructure?.ddsLevel[0] : ""}
              setSelectedReward={setSelectedReward}
              fieldd="ddsLevel"
            />
          </div>
        </div>
        {selectedReward && (
          <UpdateRewardsDrawer
            selectedReward={selectedReward}
            setSelectedReward={setSelectedReward}
            setNewRewardValue={setNewRewardValue}
            newRewardValue={newRewardValue}
            setupdatedSuccessful={setupdatedSuccessful}
          />
        )}
      </div>
    </div>
  );
};

export default RewardsTab;

const EachTableContent = ({
  activity,
  frequency,
  amount,
  setSelectedReward,
  fieldd,
}) => {
  return (
    <div className={classNames.eachTableContent}>
      <div>{activity}</div>
      <div>{frequency}</div>
      <div>{amount ? amount : "0"}</div>
      <div>
        <div
          onClick={() => {
            setSelectedReward({
              title: activity ? activity : "",
              field: fieldd ? fieldd : "",
              value: amount ? amount : "",
            });
            console.log({
              title: activity ? activity : "",
              field: fieldd ? fieldd : "",
              value: amount ? amount : "",
            });
          }}
        >
          Edit
        </div>
      </div>
    </div>
  );
};
