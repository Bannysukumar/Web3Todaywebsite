import React, { useContext, useEffect, useState } from "react";

import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import editApp from "../../../../../static/images/clipIcons/appData.svg";
import editApp1 from "../../../../../static/images/icons/editApp.svg";
import userIcon from "../../../../../static/images/clipIcons/userIcon.svg";
import deleteApp from "../../../../../static/images/clipIcons/delete.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import plusIcon from "../../../../../static/images/clipIcons/plus.svg";
import closeIcon from "../../../../../static/images/clipIcons/no.svg";
import defaultImg from "../../../../../static/images/icons/app_placeholder.png";

import connectedBonds from "../../../../../static/images/icons/connectedBonds.svg";
import bondContracts from "../../../../../static/images/icons/bondPurchases.svg";
import bondIssued from "../../../../../static/images/icons/bondIssued.svg";
import interestPayments from "../../../../../static/images/icons/interestPayments.svg";
import bondSettlements from "../../../../../static/images/icons/bondSettlements.svg";
import expiredBonds from "../../../../../static/images/icons/expiredBonds.svg";

import cloudUploadIcon from "../../../../../static/images/clipIcons/cloudUpload.svg";
import loadingGif from "../../../../../static/images/loading.gif";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import * as jose from "jose";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";

const About = ({
  allFieldGroups,
  loading,
  setLoading,
  step,
  setStep,
  path,
  setPath,
}) => {
  const {
    loginData,
    bankerEmail,
    showSubDraw,
    setShowSubDraw,
    bondSelected,
    setBondSelected,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
    refetchAppData,
    setRefetchAppData,
    selectedMcbDashboardBrand,
    selectedFieldGroup,
    setSelectedFieldGroup,
    refetchFieldGroupData,
    setRefetchFieldGroupData,
  } = useContext(GlobalContex);

  const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
  const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

  //Update App Details States
  const [updatedData, setUpdatedData] = useState("");

  const [imgLoading, setImgLoading] = useState(false);

  const offeringDefaultCase = [
    {
      name: "Metadata",
      // icon: userIcon,
      value: null,
      enabled: true,
    },
    {
      name: "Group Fields",
      // icon: userIcon,
      value: null,
      enabled: true,
    },
  ];

  // useEffect(() => {
  //   console.log(selectedFieldGroup, "kjwekwe");
  // }, [selectedFieldGroup]);

  useEffect(() => {
    setStep("About");
    setPath(["About"]);
  }, [showSubDraw]);

  const handleBackStep = () => {
    setUpdatedData("");
    if (path.length > 1) {
      path.splice(-1);
      // console.log(tempPath, "kqjdkjwed");
      setPath([...path]);
      if (path.length > 0) {
        setStep(path[path.length - 1]);
      }
    }
  };

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  const signJwt = async (fileName, emailDev, secret) => {
    try {
      const jwts = await new jose.SignJWT({ name: fileName, email: emailDev })
        .setProtectedHeader({ alg: "HS512" })
        .setIssuer("gxjwtenchs512")
        .setExpirationTime("10m")
        .sign(new TextEncoder().encode(secret));
      return jwts;
    } catch (error) {
      console.log(error, "kjbedkjwebdw");
    }
  };

  const uploadImage = async (e, setUpdatedData, setLoading) => {
    setImgLoading(true);
    const fileName = `${new Date().getTime()}${e.target.files[0].name.substr(
      e.target.files[0].name.lastIndexOf(".")
    )}`;
    const formData = new FormData();
    const file = renameFile(e.target.files[0], fileName);
    formData.append("files", file);
    const path_inside_brain = "root/";

    const jwts = await signJwt(fileName, emailDev, secret);
    console.log(jwts, "lkjkswedcf");
    let { data } = await axios.post(
      `https://publications.apimachine.com/article/upload`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setUpdatedData(data[0].urlName);
  setTimeout(() => {
setImgLoading(false);
    }, 5000)
  };

  const handleBreadcrumbClick = (clickedStep) => {
    setUpdatedData("");
    const foundStepIndex = path.findIndex((o) => o === clickedStep);
    const tempPath = path;
    tempPath.splice(foundStepIndex + 1, tempPath.length);
    setPath([...tempPath]);
    console.log(path, "lwndwed");
  };

  useEffect(() => {
    setStep(path[path.length - 1]);
  }, [path]);

  //Update App Data Functions Start

  const handleDataChange = (bodyData) => {
    setLoading(true);
    const tempData = {
      email: bankerEmail,
      token: loginData.idToken,
      group_id: selectedFieldGroup.group_id,
    };
    axios
      .post(`https://comms.globalxchange.io/gxb/apps/field/groups/edit`, {
        ...tempData,
        ...bodyData,
      })
      .then(({ data }) => {
        if (data.status) {
          setLoading(false);
          handleBackStep();
          setRefetchFieldGroupData(!refetchFieldGroupData);
          setUpdatedData("");
        } else {
          if (data.message === "jwt expired") {
            setLoading(false);
            setStep("Token Expired");
          }
        }
      });
  };

  useEffect(() => {
    if (selectedFieldGroup) {
      setSelectedFieldGroup(
        allFieldGroups.find((o) => o._id === selectedFieldGroup?._id)
      );
    }
  }, [allFieldGroups]);

  const fullHeightDrawer = (message) => {
    if (message) {
      return (
        <div
          style={{
            height: window.innerHeight - 175,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message}
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: window.innerHeight - 175,
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
            Updating Field Group Data...
          </div>
        </div>
      );
    }
  };

  //Update App Data Functions Ends

  const conditionalSteps = () => {
    switch (step) {
      case "Metadata":
        return (
          <div
            className="scrollbarSideDraw"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: window.innerHeight - 300,
            }}
          >
            <div style={{ position: "relative" }}>
              <div className="lableName">Group Name</div>
              <div className="inputWrap1">{selectedFieldGroup?.name}</div>
              <div
                className="editIcon"
                style={{ top: "27%" }}
                onClick={(e) => {
                  setStep("Group Name");
                  setPath([...path, "Group Name"]);
                }}
              >
                <img src={editApp1} alt="" />
              </div>
            </div>

            {/* Logo section starts */}
            <div style={{ paddingTop: "40px" }}>
              <div className="lableName">Logos</div>
              <div>
                <div className="logoCard" style={{ marginRight: "23px" }}>
                  <img
                    src={selectedFieldGroup?.group_icon}
                    alt=""
                    style={{ width: "46px", height: "46px" }}
                  />
                  <div
                    className="editIcon1"
                    onClick={(e) => {
                      setStep("Group Icon");
                      setPath([...path, "Group Icon"]);
                    }}
                  >
                    <img src={editApp1} alt="" />
                  </div>
                </div>
                <div className="iconLabel">Group Icon</div>
              </div>
            </div>

            {/* Group Description */}
            <div style={{ position: "relative", paddingTop: "40px" }}>
              <div className="lableName">Group Description</div>
              <div className="inputWrap1" style={{ height: "300px" }}>
                {selectedFieldGroup?.description}
              </div>
              <div
                className="editIcon"
                style={{ top: "18%" }}
                onClick={(e) => {
                  setStep("Group Description");
                  setPath([...path, "Group Description"]);
                }}
              >
                <img src={editApp1} alt="" />
              </div>
            </div>

            <div style={{ position: "relative", paddingTop: "40px" }}>
              <div className="lableName">Field Key</div>
              <div className="inputWrap1">{selectedFieldGroup?.field_key}</div>
              <div
                className="editIcon"
                style={{ top: "50%" }}
                onClick={(e) => {
                  setStep("Field Key");
                  setPath([...path, "Field Key"]);
                }}
              >
                <img src={editApp1} alt="" />
              </div>
            </div>
          </div>
        );

      case "Group Name":
        return (
          <>
            {!loading ? (
              <>
                <div
                  className="scrollbarSideDraw"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: window.innerHeight - 400,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div className="lableName">Current Group Name</div>
                    <div className="inputWrap1">{selectedFieldGroup?.name}</div>
                  </div>
                  <div style={{ position: "relative", paddingTop: "40px" }}>
                    <div className="lableName">Enter New Group Name</div>
                    <div className="inputWrap1">
                      <input
                        placeholder="Enter Name...."
                        value={updatedData}
                        onChange={(e) => setUpdatedData(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="footerBtns">
                  <div onClick={(e) => handleBackStep()}>Go Back</div>
                  <div
                    onClick={(e) =>
                      handleDataChange({
                        update_data: {
                          name: updatedData,
                        },
                      })
                    }
                  >
                    Save Changes
                  </div>
                </div>
              </>
            ) : (
              fullHeightDrawer()
            )}
          </>
        );

      case "Group Icon":
        return (
          <>
            {!loading ? (
              <>
                <div
                  className="scrollbarSideDraw"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: window.innerHeight - 400,
                  }}
                >
                  <div>
                    <div className="lableName">Current Group Icon</div>
                    <div className="logoCard" style={{ marginRight: "23px" }}>
                      <img
                        src={selectedFieldGroup?.group_icon}
                        alt=""
                        style={{ width: "46px", height: "46px" }}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="lableName">New Group Icon</div>
                  <div className="filesUpload" style={{ marginTop: "-20px" }}>
                    <label
                      className="fileInp icon"
                      style={{
                        flex: "0 0 100%",
                        maxWidth: "103px",
                        height: "80px",
                      }}
                    >
                      <img
                        style={{ width: "46px", height: "46px" }}
                        className={`${Boolean(updatedData)}`}
                        src={
                          imgLoading
                            ? loadingGif
                            : updatedData || cloudUploadIcon
                        }
                        alt=""
                      />
                      <input
                        type="file"
                        onChange={(e) => {
                          uploadImage(e, setUpdatedData, setLoading);
                        }}
                        accept="image/*"
                      />

                      <div className="hovTxt">
                        Upload
                        <br />
                        New
                      </div>
                    </label>
                  </div>
                </div>
                <div className="footerBtns">
                  <div onClick={(e) => handleBackStep()}>Go Back</div>
                  <div
                    onClick={(e) =>
                      handleDataChange({
                        update_data: {
                          group_icon: updatedData,
                        },
                      })
                    }
                  >
                    Save Changes
                  </div>
                </div>
              </>
            ) : (
              fullHeightDrawer()
            )}
          </>
        );

      case "Group Description":
        return (
          <>
            {!loading ? (
              <>
                <div
                  className="scrollbarSideDraw"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: window.innerHeight - 400,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div className="lableName">Current Group Description</div>
                    <div className="inputWrap1" style={{ height: "300px" }}>
                      {selectedFieldGroup?.description}
                    </div>
                  </div>
                  <div style={{ position: "relative", paddingTop: "40px" }}>
                    <div className="lableName">Enter New Group Description</div>
                    <div className="inputWrap1" style={{ height: "auto" }}>
                      <textarea
                        style={{ width: "100%", border: "none" }}
                        rows="10"
                        placeholder="Enter Group Description...."
                        value={updatedData}
                        onChange={(e) => setUpdatedData(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="footerBtns">
                  <div onClick={(e) => handleBackStep()}>Go Back</div>
                  <div
                    onClick={(e) =>
                      handleDataChange({
                        update_data: {
                          description: updatedData,
                        },
                      })
                    }
                  >
                    Save Changes
                  </div>
                </div>
              </>
            ) : (
              fullHeightDrawer()
            )}
          </>
        );

      case "Field Key":
        return (
          <>
            {!loading ? (
              <>
                <div
                  className="scrollbarSideDraw"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: window.innerHeight - 400,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div className="lableName">Current Field Key</div>
                    <div className="inputWrap1">
                      {selectedFieldGroup?.field_key}
                    </div>
                  </div>
                  <div style={{ position: "relative", paddingTop: "40px" }}>
                    <div className="lableName">Enter New Field Key</div>
                    <div className="inputWrap1">
                      <input
                        placeholder="Enter Field Key...."
                        value={updatedData}
                        onChange={(e) => setUpdatedData(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="footerBtns">
                  <div onClick={(e) => handleBackStep()}>Go Back</div>
                  <div
                    onClick={(e) =>
                      handleDataChange({
                        update_data: {
                          field_key: updatedData,
                        },
                      })
                    }
                  >
                    Save Changes
                  </div>
                </div>
              </>
            ) : (
              fullHeightDrawer()
            )}
          </>
        );

      case "Token Expired":
        return (
          <>
            {fullHeightDrawer("Token Expired. Please Relogin.")}
            <div className="footerBtns">
              <div onClick={(e) => handleBackStep()}>Go Back</div>
              <div
                onClick={(e) => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </div>
            </div>
          </>
        );

      default:
        return (
          <div style={{ padding: "0px 30px" }}>
            <div className="sidebarTitle">What Would You Like To See? </div>
            <div
              style={{ overflowY: "scroll", height: window.innerHeight - 380 }}
            >
              {offeringDefaultCase.map((item) => {
                return (
                  <div
                    // className={
                    //   item.enabled ? "sidebarCard" : "sidebarCardDisabled"
                    // }
                    className="sidebarCard"
                    onClick={(e) => {
                      if (item.enabled) {
                        setStep(item.name);
                        setPath([...path, item.name]);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>{item.name}</div>
                    </div>
                    <div>{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        style={{
          height: "90px",
        }}
      >
        {!loading && step !== "Token Expired" ? (
          <div style={{ padding: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    selectedFieldGroup?.group_icon
                      ? selectedFieldGroup?.group_icon
                      : defaultImg
                  }
                  alt=""
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "100%",
                  }}
                />
                <div style={{ paddingLeft: "10px" }}>
                  <div style={{ fontSize: "22px" }}>
                    {selectedFieldGroup?.name}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {path.length > 1 ? (
                  <div
                    className="backButton icon-imgs"
                    onClick={(e) => handleBackStep()}
                  >
                    <img src={back} alt="" />
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="backButton icon-imgs"
                  onClick={(e) => setShowSubDraw(false)}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <img src={close} alt="" />
                </div>
              </div>
            </div>

            <div
              className="breadcrumb"
              style={{
                display: "flex",
                flexDirection: "row",
                height: "20px",
                paddingTop: "7px",
              }}
            >
              {path?.map((item, index) => {
                return (
                  <div>
                    {index !== 0 ? <span>&nbsp;{`->`}&nbsp;</span> : ""}
                    <span
                      onClick={(e) => handleBreadcrumbClick(item)}
                      className={
                        index === path.length - 1 ? "crumbSelected" : "crumbs"
                      }
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {conditionalSteps()}
      </div>
    </>
  );
};

export default About;
