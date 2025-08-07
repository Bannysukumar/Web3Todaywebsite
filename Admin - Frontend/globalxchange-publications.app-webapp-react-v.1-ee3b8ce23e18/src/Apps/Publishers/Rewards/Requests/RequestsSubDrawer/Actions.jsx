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



const Actions = ({ selectedRequest, setSelectedRequest }) => {
  const {
    selectedLevel,
    selectedIndex,
    setSelectedIndex,
    setAffiliateDrawer,
    selectedPublication,
    requestsDrawer,
    setRequestsDrawer,
    refetchRequest,
    setRefetchRequest,
    requestText,
    setRequestText,
    bankerEmail,
    loginData
  } = useContext(GlobalContex);

  const [newValue, setNewValue] = useState("")
  const [step, setStep] = useState(null);
  const [loadingData, setLoadingData] = useState("");
  const [successData, setSuccessData] = useState("");
  const [userProfileId, setUserProfileId] = useState("")
  const [ownerProfileId, setOwnerProfileId] = useState("")

  const fullHeightDrawer = (message) => {
    if (message) {
      return (
        <div
          style={{
            height: window.innerHeight - 150,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {message}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: window.innerHeight - 123,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
            }}
          >
            Updating Brand List...
          </div>
        </div>
      );
    }
  };



  // const updateReward = (value, index) => {
  //   let pubdata;
  //   if (selectedPublication) {
  //     pubdata = selectedPublication._id
  //   } else {
  //     pubdata = "63a1a2c60e46260e093cf260"
  //   }
  //   if(!value){
  //     toast.error("Please enter a value")
  //     return
  //   }
  //   // console.log("updateReward", value, index)
  //   // console.log("affiliateData", affiliateData)
  //   let temp = affiliateData
  //   temp[index] = value
  //   console.log("temp", temp)
  //   let obj = {ddsLevel:temp}
  //   axios.put(  `https://publications.apimachine.com/publication/${pubdata}`,
  //   obj)
  //   .then((res) => {
  //     // console.log("res", res)
  //     setAffiliateData(temp)
  //     toast.success("Reward Updated")
  //     setAffiliateDrawer(false)
  //     setNewValue("")
  //   })
  //   .catch((err) => {
  //     // console.log("err", err)
  //     toast.error("Something went wrong")
  //   }
  //   )
  // }

  const ValidateRequest = async () => {
    let pubdata;
    let body
    if (selectedPublication) {
      pubdata = selectedPublication._id
    } else {
      pubdata = "63a1a2c60e46260e093cf260"
    }
    // console.log("ValidateRequest", selectedRequest)
    setStep("loading")
    if (requestText === "approve") {
      setLoadingData("Transaction in progress...")
      axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${selectedRequest?.userDetail[0]?._id}&publication_id=${pubdata}`)
        .then((res) => {
          // console.log("res", res)

          if (res.data.status) {
            // console.log(res.data.updatedPoints, "updatedPoints")
            if (parseInt(selectedRequest.points_requested) > parseInt(res.data.updatedPoints)) {
              toast.error("Requested points are more than available points")
              setStep("default")
              return
            } else {
              // console.log("points are less")

              Promise.all([
                axios.get(`https://comms.globalxchange.io/gxb/apps/registered/user?email=${bankerEmail}&&app_code=web3today`),
                axios.get(`https://comms.globalxchange.io/gxb/apps/registered/user?email=${selectedRequest?.userDetail[0]?.email}&&app_code=web3today`)
              ])
                .then(([response1, response2]) => {
                  // console.log(response1.data.userApps[0].profile_id)
                  // console.log(response2.data.userApps[0].profile_id)
                  body = {
                    "token": loginData?.idToken,
                    "email": bankerEmail,
                    "from": {
                      "app_code": "web3today",
                      "profile_id": response1.data.userApps[0].profile_id,
                      "coin": selectedRequest?.ConvertionDetail[0]?.payoutCurrency,
                    },
                    "to": {
                      "app_code": "web3today",
                      "profile_id": response2.data.userApps[0].profile_id,
                      "coin": selectedRequest?.ConvertionDetail[0]?.payoutCurrency,
                    },
                    "to_amount": selectedRequest.balance_requested,
                    "transfer_for": "points redeem"
                  }
                  axios.post("https://comms.globalxchange.io/coin/vault/service/transfer", body)
                    .then((res) => {
                      if (res.data.status) {
                        axios.post("https://publications.apimachine.com/pointsrequest/update", {
                          _id: selectedRequest._id,
                          is_approved: "completed",
                        })
                          .then((res) => {
                            if (res.data.status) {
                              setStep("success")
                              setSuccessData(`You have successfully the approved this request. You will be redirected to the updated publications list now.`)
                              setTimeout(() => {
                                setRefetchRequest(!refetchRequest)
                                setStep("default")
                                setRequestsDrawer(false)
                              }, 1000);
                            } else {
                              setStep("default")
                              toast.error("Something went wrong-3")
                              setStep("default")
                            }
                          }).catch((err) => {
                            setStep("default")
                            console.log("err", err)
                            toast.error("Something went wrong-4")
                            setStep("default")
                          })
                      } else if (res.data.message === "jwt expired") {
                        setStep("Token Expired")
                      } else {
                        setStep("default")
                        toast.error("Something went wrong-5")
                        setStep("default")
                      }
                    }).catch((err) => {
                      setStep("default")
                      console.log("err", err)
                      toast.error("Something went wrong-6")
                      setStep("default")
                    })
                })
                .catch(error => {
                  console.log('Error:', error);
                });

            }
          } else {
            toast.error("Something went wrong-7")
            setStep("default")
          }
        })
    } else {
      setLoadingData("Cancelling request...")
      axios.post("https://publications.apimachine.com/pointsrequest/update", {
        _id: selectedRequest._id,
        is_approved: "cancelled",
      })
        .then((res) => {
          if (res.data.status) {
            setStep("success")
            setSuccessData(`You have successfully the cancelled this request. You will be redirected to the updated publications list now.`)
            // toast.success("Request Rejected")\
            setTimeout(() => {
              setRefetchRequest(!refetchRequest)
              setStep("default")
              setRequestsDrawer(false)
            }, 1000);
          } else {
            setStep("default")
            toast.error("Something went wrong")
          }
        })
    }
  }

  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(loadingData);
      case "success":
        return (
          <div
            className="assetDispText"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "60vh",
              padding: "0px 20px",
            }}
          >
            {successData}
            {/* Publisher Added/Removed successfully to {selectedPublication?.name}{" "}
              Publication */}
          </div>
        );


      case "Token Expired":
        return (
          <>
            <div className="sidebarTitle">Token Expired. Login Again.</div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <img src={lock} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "10px" }}>Logout</div>
            </div>
          </>
        );

      default:
        return <div className="sidebarSelect">
          <div onClick={ValidateRequest}
            className="sidebarCard" style={{ justifyContent: "space-between" }}
          >
            <div >Yes Confirm</div>
          </div>
          <div
            className="sidebarCard" style={{ justifyContent: "space-between" }}
            onClick={() => setRequestsDrawer(false)}
          >
            <div >Never Mind</div>
          </div>
        </div>

    }
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
            alignItems: "center",
            justifyContent: "space-between",
            display: step === "loading" || step === "success" ? "none" : "flex",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "22px" }}>
                {requestText === "approve" ? "Request Approval" : "Request Rejection"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="backButton icon-imgs close-img"
              onClick={(e) => {
                setRequestsDrawer(false)
                setNewValue("")
              }}
              style={{
                marginLeft: "20px",
              }}
            >
              <img src={close} alt="" />
            </div>
          </div>

        </div>
        {conditionalSteps()}
        <ToastContainer />
      </div>
    </>
  );
};


export default Actions;