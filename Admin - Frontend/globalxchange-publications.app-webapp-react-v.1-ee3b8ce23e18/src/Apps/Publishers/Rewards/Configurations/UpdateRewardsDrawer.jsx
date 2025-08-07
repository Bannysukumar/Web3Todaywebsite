import React, { useState, useContext } from "react";
import classNames from "./rewards.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../../globalContex";

const UpdateRewardsDrawer = ({
  selectedReward,
  setSelectedReward,
  newRewardValue,
  setNewRewardValue,
  setupdatedSuccessful,
}) => {
  const [loading, setLoading] = useState(false);

  const {selectedPublication} = useContext(GlobalContex)

  function updateReward() {
    let pubdata;
    if (selectedPublication) {
      pubdata = selectedPublication._id
    } else {
      pubdata = "63a1a2c60e46260e093cf260"
    }
    setLoading(true);
    let obj = { [selectedReward?.field]: newRewardValue };
    console.log(obj, "obj")
    axios
      .put(
        `https://publications.apimachine.com/publication/${pubdata}`,
        obj
      )
      .then((response) => {
        setupdatedSuccessful((res) => !res);
        setLoading(false);
        setSelectedReward("");
      })
      .catch((error) => {
        console.log(error?.message, "Update rewards error");
        setLoading(false);
        setSelectedReward("");
      });
  }
  return (
    <div className={classNames.updateRewards}>
      <div className={classNames.header}>
        <div>Edit Reward</div>
        <div onClick={() => setSelectedReward("")}>X</div>
      </div>
      <div className={classNames.currentValue}>
        <div>{selectedReward ? selectedReward?.title : ""}</div>
        <div>{selectedReward?.value ? selectedReward?.value : "0"}</div>
      </div>
      <div className={classNames.updateValue}>
        <input
          type="number"
          placeholder="Enter New Amount"
          onChange={(event) => setNewRewardValue(event?.target?.value)}
        />
      </div>
      <div
        className={classNames.updateBtn}
        onClick={updateReward}
        style={{
          opacity: loading ? "0.7" : "",
          pointerEvents: loading ? "none" : "",
        }}
      >
        <div>Update Reward</div>
        {loading && (
          <div className={classNames.loaderContainer}>
            <div className={classNames.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRewardsDrawer;
