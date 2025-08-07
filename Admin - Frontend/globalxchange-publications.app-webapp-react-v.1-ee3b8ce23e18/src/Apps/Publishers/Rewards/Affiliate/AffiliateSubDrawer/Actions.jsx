import React, { useContext, useEffect, useState } from "react";


import back from "../../../../../static/images/icons/back.svg";
// import close from "../../../../../static/images/icons/close1.svg";
import close from "../../../../../static/images/whiteClose.svg";
import editPub from "../../../../../static/images/clipIcons/editPub.svg";
import userIcon from "../../../../../static/images/clipIcons/userIcon.svg";
import deletePub from "../../../../../static/images/clipIcons/delete.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import plusIcon from "../../../../../static/images/clipIcons/plus.svg";
import yesIcon from "../../../../../static/images/clipIcons/yes.svg";
import noIcon from "../../../../../static/images/clipIcons/no.svg";
// import defaultImg from "../../../../../static/images/icons/app_placeholder.png";
// import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import defaultImg from "../../../../../static/images/icons/defaultImg.svg";
import lock from "../../../../../static/images/icons/lock.svg";


import changeBond from "../../../../../static/images/icons/changeBond.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";


import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import * as jose from "jose";
import Skeleton from "react-loading-skeleton";
import Scrollbars from "react-custom-scrollbars";
import "./subdrawer.scss"
import { ToastContainer, toast } from "react-toastify";
import UploadIconImg from "../../../../../static/images/uploadIconImg.svg";
import loadingGif from "../../../../../static/images/loading.gif";
import closeIconRed from "../../../../../static/images/addNewIcons/closeIconRed.svg";
import '../../../../../globalComponents/GlobalDrawer/globalNewSidebar.module.scss'
import NotInCategoryList from "../../../../../globalComponents/GlobalDrawer/NewArticle/NotInCategoryList"
import NotInNavBarList from "../../../../../globalComponents/GlobalDrawer/NewArticle/NotInNavBarList";
import EditEnterArticle from "../../../../../globalComponents/GlobalDrawer/NewArticle/EditEnterArticle";



const Actions = ({affiliateData,setAffiliateData}) => {
  const {
    selectedLevel,
    selectedIndex,
    setSelectedIndex,
    setAffiliateDrawer,
    selectedPublication
  } = useContext(GlobalContex);

  const [newValue, setNewValue] = useState("")

  const updateReward = (value, index) => {
    let pubdata;
    if (selectedPublication) {
      pubdata = selectedPublication._id
    } else {
      pubdata = "63a1a2c60e46260e093cf260"
    }
    if(!value){
      toast.error("Please enter a value")
      return
    }
    // console.log("updateReward", value, index)
    // console.log("affiliateData", affiliateData)
    let temp = affiliateData
    temp[index] = value
    console.log("temp", temp)
    let obj = {ddsLevel:temp}
    axios.put(  `https://publications.apimachine.com/publication/${pubdata}`,
    obj)
    .then((res) => {
      // console.log("res", res)
      setAffiliateData(temp)
      toast.success("Reward Updated")
      setAffiliateDrawer(false)
      setNewValue("")
    })
    .catch((err) => {
      // console.log("err", err)
      toast.error("Something went wrong")
    }
    )
  }






  return (
    <>
      <div
        style={{
          padding: "30px",
          height: "90px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <img
                  src={
                    selectedArticle?.profile_pic
                      ? selectedArticle?.profile_pic
                      : defaultImg
                  }
                  alt=""
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "100%",
                  }}
                /> */}
            <div>
              <div style={{ fontSize: "22px" }}>
                Edit Levels
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="backButton icon-imgs close-img"
              onClick={(e) => {
                setAffiliateDrawer(false)
                setNewValue("")
              }}
              style={{
                marginLeft: "20px",
              }}
            >
              <img src={close} alt=""/>
            </div>
          </div>

        </div>
        <>
          {/* <div className="sidebarTitle">What Would You Like To Do? </div> */}
          <div className="sidebarSelect">
            <div
              className="sidebarCard" style={{ justifyContent: "space-between" }}
            >
              <div>Level {selectedIndex}</div>
              <div>{selectedLevel}</div>
            </div>
            <div className="inputWrap" style={{ marginTop: "20px" }}  >
              <input
                type="number"
                className="text"
                placeholder="Enter New Value.."
                value = {newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <div className="back-btm-button" style={{background:"#4B9DDC;"}} onClick={()=>updateReward(newValue,selectedIndex)}>
              <p className="btm-text" >Update Reward</p>
            </div>
          </div>
        </>
        <ToastContainer />
      </div>
    </>
  );
};


export default Actions;