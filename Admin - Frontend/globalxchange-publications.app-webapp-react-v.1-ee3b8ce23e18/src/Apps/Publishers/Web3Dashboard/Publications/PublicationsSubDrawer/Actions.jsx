import React, { useContext, useEffect, useState } from "react";

import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
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
import loadingGif from "../../../../../static/images/loading.gif";

import changeBond from "../../../../../static/images/icons/changeBond.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";
import UploadIconImg from "../../../../../static/images/uploadIconImg.svg";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import Skeleton from "react-loading-skeleton";
import Scrollbars from "react-custom-scrollbars";

const Actions = ({
  selectedPublication,
  allBonds,
  currenciesData,
  loading,
  setLoading,
  step,
  setStep,
  path,
  setPath,
}) => {
  const navigate = useNavigate();
  const {
    showSubDraw,
    setShowSubDraw,
    selectedListItem,
    setSelectedListItem,
    bondSelected,
    setBondSelected,
    bankerEmail,
    loginData,
    refetchBonds,
    setRefetchBonds,
    selectedMcbDashboardApp,
    allPublications,
  } = useContext(GlobalContex);

  const [bondStatus, setBondStatus] = useState("");
  const [search, setSearch] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsInPub, setAllAuthorsInPub] = useState([]);
  const [allAuthorsNotInPub, setAllAuthorsNotInPub] = useState([]);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [refetchData, setRefetchData] = useState(false);
  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");
  const [colouredLogo, setColouredLogo] = useState("")
  const [colouredLogoLoading, setColouredLogoLoading] = useState("")
  const [successData, setSuccessData] = useState("")
  const [loadingData, setLoadingData] = useState("")
  const [coverPhoto, setCoverPhoto] = useState("")
  const [coverPhotoLoading, setCoverPhotoLoading] = useState("")

  useEffect(() => {
    setStep("Action");
    setPath(["Action"]);
  }, [showSubDraw]);

  const handleBackStep = () => {
    if (path.length > 1) {
      path.splice(-1);
      // console.log(tempPath, "kqjdkjwed");
      setPath([...path]);
      if (path.length > 0) {
        setStep(path[path.length - 1]);
      }
    }
  };

  const handleBreadcrumbClick = (clickedStep) => {
    const foundStepIndex = path.findIndex((o) => o === clickedStep);
    const tempPath = path;
    tempPath.splice(foundStepIndex + 1, tempPath.length);
    setPath([...tempPath]);
    console.log(path, "lwndwed");
  };

  useEffect(() => {
    setStep(path[path.length - 1]);
  }, [path]);

  const handleDeletePub = () => {
    setLoading(true);
    setLoadingData("Deleting Publication...");
    axios
      .delete(
        `https://publications.apimachine.com/publication/${selectedPublication?._id}`
      )
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setSuccessData("You have successfully deleted publication. You will be redirected to the updated publication list now.");
          setTimeout(() => {
            setLoading(false);
            setPath([]);
            setStep("");
            setShowSubDraw(false);
            setRefetchData(true);
          }, 1000);
        }
      });
  };

  const IconValidate = () => {
    if (!colouredIcon || colouredIcon === colouredIconLoading) {
      alert("Please upload Icon");
    } else {
      setStep("loading");
      setLoadingData("Updating Icon...");
      // setApiLoad(true);
      let body = {
        profile_pic: colouredIcon,
      }
      axios
        .put(`https://publications.apimachine.com/publication/${selectedPublication?._id}`, body)
        .then((res) => {
          if (res.data.status) {
            setStep("success");
            setSuccessData("You have successfully updated the icon. You will be redirected to the updated publication list now.");
            setTimeout(() => {
              setLoading(false);
              setStep("");
              setPath([]);
              // setApiLoad(false);
              setShowSubDraw(false);
              setRefetchData(!refetchData);
              // setRefetchCategory(!refetchCategory);
              setColouredIcon("");
            }, 1000);
          } else {
            alert("Something went wrong, please try again later")
            // setApiLoad(false);
          }
        })
    }
  }

  const LogoValidate = () => {
    if (!colouredLogo || colouredLogo === colouredLogoLoading) {
      alert("Please upload Icon");
    } else {
      setStep("loading");
      setLoadingData("Updating logo...");
      // setApiLoad(true);
      let body = {
        fullColoredLogo: colouredLogo,
      }
      axios
        .put(`https://publications.apimachine.com/publication/${selectedPublication?._id}`, body)
        .then((res) => {
          if (res.data.status) {
            setStep("success");
            setSuccessData("You have successfully updated the logo. You will be redirected to the updated publication list now.");
            setTimeout(() => {
              setLoading(false);
              setStep("");
              setPath([]);
              // setApiLoad(false);
              setShowSubDraw(false);
              setRefetchData(!refetchData);
              // setRefetchCategory(!refetchCategory);
              setColouredIcon("");
            }, 1000);
          } else {
            alert("Something went wrong, please try again later")
            // setApiLoad(false);
          }
        })
    }
  }

  const CoverPhotoValidate = () => {
    if (!coverPhoto || coverPhoto === coverPhotoLoading) {
      alert("Please upload Icon");
    } else {
      setStep("loading");
      setLoadingData("Updating Cover Photo...");
      // setApiLoad(true);
      let body = {
        cover_pic: coverPhoto,
      }
      axios
        .put(`https://publications.apimachine.com/publication/${selectedPublication?._id}`, body)
        .then((res) => {
          if (res.data.status) {
            setStep("success");
            setSuccessData("You have successfully updated the cover photo. You will be redirected to the updated publication list now.");
            setTimeout(() => {
              setLoading(false);
              setStep("");
              setPath([]);
              // setApiLoad(false);
              setShowSubDraw(false);
              setRefetchData(true);
              // setRefetchCategory(!refetchCategory);
              setCoverPhotoLoading("");
            }, 1000);
          } else {
            alert("Something went wrong, please try again later")
            // setApiLoad(false);
          }
        })
    }
  }

  const fullHeightDrawer = (message) => {
    if (message) {
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

  useEffect(() => {
    if (selectedPublication && selectedPublication !== null) {
      axios
        .all([
          axios.get(
            `https://publications.apimachine.com/application/notInPublication/${selectedPublication?._id}`
          ),
          axios.get(
            `https://publications.apimachine.com/application/publication/${selectedPublication?._id}`
          ),
        ])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            setAllAuthorsNotInPub(responseOne.data.data);
            setAllAuthorsInPub(responseTwo.data.data);
            // console.log(responseTwo.data.data);
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    }
  }, [selectedPublication, refetchData]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://publications.apimachine.com/publisher/`)
  //     .then(({ data }) => {
  //       setAllAuthors(data.data);
  //       setLoading(false);
  //     });
  // }, [selectedPublication]);

  const handleAddAuthorToPub = () => {
    setStep("loading");
    setPath([...path, "loading"]);
    setLoading(true);
    setLoadingData("Adding author to publication")

    axios
      .post(`https://publications.apimachine.com/publication/add/publisher`, {
        publication_id: selectedPublication?._id,
        publisher_id: selectedAuthors.map((o) => o._id),
      })
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setSuccessData("Added author to publication successfully.")
          setTimeout(() => {
            setLoading(false);
            setPath([]);
            setStep("");
            setShowSubDraw(false);
            setRefetchData(true);
          }, 1000);
        }
      });
  };

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  const uploadImage = async (e, setImage, setLoading) => {
    setLoading(true);
    const fileName = `${new Date().getTime()}${e.target.files[0].name.substr(
      e.target.files[0].name.lastIndexOf(".")
    )}`;
    const formData = new FormData();
    const file = renameFile(e.target.files[0], fileName);
    formData.append("files", file);
    const path_inside_brain = "root/";

    // const jwts = await signJwt(fileName, emailDev, secret);
    // console.log(jwts, "lkjkswedcf");
    let { data } = await axios.post(
      `https://publications.apimachine.com/article/upload`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setImage(data[0].urlName);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  };

  const handleRemoveAuthorFromPub = () => {
    setStep("loading");
    setPath([...path, "loading"]);
    setLoading(true);
    setLoadingData("Removing Author from Publication")

    axios
      .delete(
        `https://publications.apimachine.com/publication/remove/publisher`,
        {
          headers: {},
          data: {
            publication_id: selectedPublication?._id,
            publisher_id: selectedAuthors.map((o) => o._id),
          },
        }
      )
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setSuccessData("Author removed from publication successfully!")
          setTimeout(() => {
            setLoading(false);
            setPath([]);
            setStep("");
            setShowSubDraw(false);
            setRefetchData(true);
          }, 1000);
        }
      });
  };

  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return (
          <>{loadingData}</>
        )

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

      case "Delete Publication":
        return (
          <>
            <div className="sidebarTitle">
              Are you sure you want to delete this publication?
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("loading");
                setPath([...path, "loading"]);
                handleDeletePub();
              }}
            >
              <img
                src={yesIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Yes</div>
            </div>
            <div
              className="sidebarCard"
            // onClick={() => {
            //   setBondStatus("inactive");
            //   setStep("Verify Status");
            //   setPath([...path, "Verify Status"]);
            // }}
            >
              <img
                src={noIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>No</div>
            </div>
          </>
        );

      case "Add To Publication":
        return (
          <>
            <div className="sidebarTitle" style={{ paddingTop: "0px" }}>
              Select Authors to Add
            </div>
            <div
              className="newConglomerate"
              style={{
                paddingBottom: "0px",
                padding: "0px",
                height: window.innerHeight - 420,
              }}
            >
              <div className="searchWrap">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search Publication....|"
                />
              </div>
              <Scrollbars className="searchList">
                {loading
                  ? Array(6)
                    .fill("")
                    .map((_, i) => (
                      <div className="user" key={i}>
                        <Skeleton className="dp" circle />
                        <div className="userDetail">
                          <Skeleton className="name" width={200} />
                          <Skeleton className="email" width={200} />
                        </div>
                      </div>
                    ))
                  : allAuthorsNotInPub
                    ?.filter((o) =>
                      o.name?.toLowerCase().includes(search.toLowerCase())
                    )
                    ?.map((item) => (
                      <div
                        className="user"
                        style={{
                          backgroundColor: selectedAuthors.find(
                            (o) => o.name === item.name
                          )
                            ? "whitesmoke"
                            : "#fff",
                        }}
                        key={item._id}
                        onClick={() => {
                          if (
                            selectedAuthors.find((o) => o.name === item.name)
                          ) {
                            setSelectedAuthors(
                              selectedAuthors.filter(
                                (o) => o.name !== item.name
                              )
                            );
                          } else {
                            setSelectedAuthors([...selectedAuthors, item]);
                          }
                        }}
                      >
                        <img
                          className="dp"
                          src={
                            item?.profile_pic ? item?.profile_pic : defaultImg
                          }
                          alt=""
                        />
                        <div className="userDetail">
                          <div className="name">{item?.name}</div>
                          <div className="email">
                            {item?._id?.substring(0, 10)}...
                          </div>
                        </div>
                      </div>
                    ))}
                <div className="space"></div>
              </Scrollbars>
            </div>
            <div className="ftBtns">
              <div className="newField" onClick={() => handleBackStep()}>
                Go Back
              </div>
              <div className="btnSubmit" onClick={() => handleAddAuthorToPub()}>
                Submit
              </div>
            </div>

            {/* <div
                className="sidebarCard"
                onClick={() => {
                  setStep("loading");
                  setPath([...path, "loading"]);
                  handleDeleteAuthor();
                }}
              >
                <img
                  src={yesIcon}
                  alt=""
                  className="coin"
                  style={{ width: "25px", height: "25px" }}
                />
                <div style={{ paddingLeft: "10px" }}>Yes</div>
              </div> */}
          </>
        );

      case "Remove From Publication":
        return (
          <>
            <div className="sidebarTitle" style={{ paddingTop: "0px" }}>
              Select Authors to Remove
            </div>
            <div
              className="newConglomerate"
              style={{
                paddingBottom: "0px",
                padding: "0px",
                height: window.innerHeight - 420,
              }}
            >
              <div className="searchWrap">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search Publication....|"
                />
              </div>
              <Scrollbars className="searchList">
                {loading
                  ? Array(6)
                    .fill("")
                    .map((_, i) => (
                      <div className="user" key={i}>
                        <Skeleton className="dp" circle />
                        <div className="userDetail">
                          <Skeleton className="name" width={200} />
                          <Skeleton className="email" width={200} />
                        </div>
                      </div>
                    ))
                  : allAuthorsInPub
                    ?.filter((o) =>
                      o.name?.toLowerCase().includes(search.toLowerCase())
                    )
                    ?.map((item) => (
                      <div
                        className="user"
                        style={{
                          backgroundColor: selectedAuthors.find(
                            (o) => o.name === item.name
                          )
                            ? "whitesmoke"
                            : "#fff",
                        }}
                        key={item._id}
                        onClick={() => {
                          if (
                            selectedAuthors.find((o) => o.name === item.name)
                          ) {
                            setSelectedAuthors(
                              selectedAuthors.filter(
                                (o) => o.name !== item.name
                              )
                            );
                          } else {
                            setSelectedAuthors([...selectedAuthors, item]);
                          }
                        }}
                      >
                        <img
                          className="dp"
                          src={
                            item?.profile_pic ? item?.profile_pic : defaultImg
                          }
                          alt=""
                        />
                        <div className="userDetail">
                          <div className="name">{item?.name}</div>
                          <div className="email">
                            {item?._id?.substring(0, 10)}...
                          </div>
                        </div>
                      </div>
                    ))}
                <div className="space"></div>
              </Scrollbars>
            </div>
            <div className="ftBtns">
              <div className="newField" onClick={() => handleBackStep()}>
                Go Back
              </div>
              <div
                className="btnSubmit"
                onClick={() => handleRemoveAuthorFromPub()}
              >
                Submit
              </div>
            </div>

            {/* <div
                  className="sidebarCard"
                  onClick={() => {
                    setStep("loading");
                    setPath([...path, "loading"]);
                    handleDeleteAuthor();
                  }}
                >
                  <img
                    src={yesIcon}
                    alt=""
                    className="coin"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <div style={{ paddingLeft: "10px" }}>Yes</div>
                </div> */}
          </>
        );

      case "Edit Type":
        return (
          <>
            <div className="sidebarTitle">What type of data do you want to edit?</div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Edit Cosmetic Data");
                setPath([...path, "Edit Cosmetic Data"]);
              }}
            >
              <div>Cosmetic</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Edit Basic Data");
                setPath([...path, "Edit Basic Data"]);
              }}
            >
              <div>Basic Data</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Edit Other Data");
                setPath([...path, "Edit Other Data"]);
              }}
            >
              <div>Other</div>
            </div>
          </>
        );

      case "Edit Icon":
        return (
          <div style={{ height: window.innerHeight - 316, overflow: "scroll" }}>
            <div>
              <img src={selectedPublication?.profile_pic} alt="" className="category-img" />
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="bottomSubmit" style={{ bottom: "20px", zIndex: 1 }} onClick={IconValidate}>
              <p className="btm-text" >Submit Edit</p>
            </div>
            <label className="fileInp icon centerIco">
              <img
                className={`${Boolean(colouredIcon)} centerImg`}
                src={
                  colouredIconLoading
                    ? loadingGif
                    : colouredIcon || UploadIconImg
                }
                alt=""
                style={{ width: "40px" }}
              />
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(
                    e,
                    setColouredIcon,
                    setColouredIconLoading
                  );
                }}
                accept="image/*"
              />
              {/* <div
                      className="text"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      Colored Icon
                    </div> */}
              <div className="hovTxt">
                Upload
                <br />
                New
              </div>
            </label>
          </div>
        );

      case "Edit Logo":
        return (
          <div style={{ height: window.innerHeight - 316, overflow: "scroll" }}>
            <div>
              <img src={selectedPublication?.fullColoredLogo} alt="" className = "disp-editimg"/>
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="bottomSubmit" style={{ bottom: "20px", zIndex: 1 }} onClick={LogoValidate}>
              <p className="btm-text" >Submit Edit</p>
            </div>
            <br/>
            <label className="fileInp bigedit-img">
              <img
                className={`${Boolean(colouredLogo)} centerImg`}
                src={
                  colouredLogoLoading
                    ? loadingGif
                    : colouredLogo || UploadIconImg
                }
                alt=""
                // style={{ width: "40px" }}
              />
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(
                    e,
                    setColouredLogo,
                    setColouredLogoLoading
                  );
                }}
                accept="image/*"
              />
              {/* <div
                      className="text"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      Colored Icon
                    </div> */}
              <div className="hovTxt">
                Upload
                <br />
                New
              </div>
            </label>
          </div>
        );

      case "Edit Cover Photo":
        return (
          <div style={{ height: window.innerHeight - 316, overflow: "scroll" }}>
            <div>
              <img src={selectedPublication?.cover_pic} alt="" className="disp-editimg" />
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="bottomSubmit" style={{ bottom: "20px", zIndex: 1 }} onClick={CoverPhotoValidate}>
              <p className="btm-text" >Submit Edit</p>
            </div>
            <br/>
            <label className="fileInp bigedit-img">
              <img
                className={`${Boolean(coverPhoto)} centerImg`}
                src={
                  coverPhotoLoading
                    ? loadingGif
                    : coverPhoto || UploadIconImg
                }
                alt=""
                // style={{ width: "40px" }}
              />
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(
                    e,
                    setCoverPhoto,
                    setCoverPhotoLoading
                  );
                }}
                accept="image/*"
              />
              {/* <div
                      className="text"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      Colored Icon
                    </div> */}
              <div className="hovTxt">
                Upload
                <br />
                New
              </div>
            </label>
          </div>
        );

      case "Edit Cosmetic Data":
        return (
          <>
            <div className="sidebarTitle">Which cosmetic item do you want to edit?</div>
            <div className="sidebarScroll">
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Icon");
                  setPath([...path, "Edit Icon"]);
                }}
              >
                <div>Icon</div>
              </div>
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Logo");
                  setPath([...path, "Edit Logo"]);
                }}
              >
                <div>Logo</div>
              </div>
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Cover Photo");
                  setPath([...path, "Edit Cover Photo"]);
                }}
              >
                <div>Cover Photo</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cover Photo");
              //   setPath([...path, "Edit Cover Photo"]);
              // }}
              >
                <div>Primary Colour</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Secondary Colour</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Font</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Font Colour</div>
              </div>
            </div>
          </>
        );

      case "Edit Basic Data":
        return (
          <>
            <div className="sidebarTitle">Which basic item do you want to edit?</div>
            <div className="sidebarScroll">
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Name</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Description</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Country</div>
              </div>
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Website</div>
              </div>
            </div>
          </>
        );

      case "Edit Other Data":
        return (
          <>
            <div className="sidebarTitle">Which other item do you want to edit?</div>
            <div className="sidebarScroll">
              <div
                className="sidebarCard"
              // onClick={() => {
              //   setStep("Edit Cosmetic Data");
              //   setPath([...path, "Edit Cosmetic Data"]);
              // }}
              >
                <div>Trending Nav Bar</div>
              </div>
            </div>
          </>
        );


      default:
        return (
          <>
            <div className="sidebarTitle">What do you want to do to "{selectedPublication?.name}"?</div>
            <div className="sidebarScroll">
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Type");
                  setPath([...path, "Edit Type"]);
                }}
              >
                {/* <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
                <div>Edit</div>
              </div>
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Delete Publication");
                  setPath([...path, "Delete Publication"]);
                }}
              >
                {/* <img
                src={deletePub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
                <div>Delete</div>
              </div>
              {/* <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Add To Publication");
                  setPath([...path, "Add To Publication"]);
                }}
              >
                
                <div>
                  Add Author
                </div>
              </div> */}
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Remove From Publication");
                  setPath([...path, "Remove From Publication"]);
                }}
              >
                {/* <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
                <div>
                  Remove Author
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div
        style={{
          padding: "30px",
          height: "90px",
        }}
      >
        {loading ||
          step === "loading" ||
          step === "Token Expired" ||
          step == "success" ? (
          ""
        ) : (
          <div>
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
                    selectedPublication?.profile_pic
                      ? selectedPublication?.profile_pic
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
                    Actions
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
                  onClick={(e) => {
                    setPath([]);
                    setShowSubDraw(false);
                  }}
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
              style={{ display: "flex", flexDirection: "row" }}
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
        )}
        {conditionalSteps()}
      </div>
    </>
  );
};



export default Actions;
