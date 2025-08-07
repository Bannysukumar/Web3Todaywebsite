import React, { useContext, useEffect, useState } from "react";

import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/whiteClose.svg";
import editPub from "../../../../../static/images/clipIcons/editPub.svg";
import userIcon from "../../../../../static/images/clipIcons/userIcon.svg";
import deletePub from "../../../../../static/images/clipIcons/delete.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import plusIcon from "../../../../../static/images/clipIcons/plus.svg";
import yesIcon from "../../../../../static/images/clipIcons/yes.svg";
import noIcon from "../../../../../static/images/clipIcons/no.svg";
import addIcon from "../../../../../static/images/clipIcons/addicon.svg";
import loadingGif from "../../../../../static/images/loading.gif";
import cloudUploadIcon from "../../../../../static/images/clipIcons/cloudUpload.svg";

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
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import Scrollbars from "react-custom-scrollbars";
import Axios from "axios";
import * as jose from "jose";
import "./subdrawer.scss";
import UploadIconImg from "../../../../../static/images/uploadIconImg.svg";
import { click } from "@testing-library/user-event/dist/click";


function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

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
  selectedStory,
  setSelectedStory
}) => {
  const navigate = useNavigate();
  const {
    showSubDraw,
    setShowSubDraw,
    actionsSubDrawer,
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
    setActionsSubDrawer,
    setRefetchAppData,
    StorySubDrawer,
    setStorySubDrawer,
    setTabSelected,
    refreshStories,
    setRefreshStories
  } = useContext(GlobalContex);

  const [bondStatus, setBondStatus] = useState("");
  const [search, setSearch] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsInPub, setAllAuthorsInPub] = useState([]);
  const [allAuthorsNotInPub, setAllAuthorsNotInPub] = useState([]);
  const [theTitle, setTheTitle] = useState("Select An Action");

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [storiesData, setStoriesData] = useState([])
  const [clickedStory, setClickedStory] = useState("")
  const [newStoryName, setNewStoryName] = useState("")
  const [newStoryDesc, setNewStoryDesc] = useState("")
  const [newStoryIcon, setNewStoryIcon] = useState("")
  const [newStoryIconLoading, setNewStoryIconLoading] = useState("");
  const [clickedStories, setClickedStories] = useState([])


  // useEffect(() => {
  //   setStep("Action");
  //   setPath(["Action"]);
  // }, [StorySubDrawer]);

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

  const uploadImage = async (e, setImage, setLoading) => {
    setLoading(true);
    const fileName = `${new Date().getTime()}${e.target.files[0].name.substr(
      e.target.files[0].name.lastIndexOf(".")
    )}`;
    const formData = new FormData();
    const file = renameFile(e.target.files[0], fileName);
    formData.append("files", file);
    // const path_inside_brain = "root/";

    // const jwts = await signJwt(fileName, emailDev, secret);
    // console.log(jwts, "lkjkswedcf");
    let { data } = await Axios.post(
      `https://publications.apimachine.com/article/upload`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setImage(data[0].urlName);
    setLoading(false)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 5000);
  };


  const ActionClick = (item) => {
    // console.log(item)
    if (clickedStories.includes(item?._id)) {
      let thefilteredData = clickedStories.filter(field => field !== item?._id)
      setClickedStories(thefilteredData)
    } else {
      setClickedStories([...clickedStories, item?._id])
    }
  }

  const handleDeleteStory = () => {
    setStep("loading")
    axios
      .delete(
        `https://publications.apimachine.com/story/delete/multiple`, { data: {ids: clickedStories} }
      )
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setStep("")
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setColouredIcon("");
        setPath([]);
        setStorySubDrawer(false);
        setTheTitle("Select An Action")
        setClickedStories([])
        setRefreshStories(!refreshStories);
      });
  }

  const handleDeletePub = () => {
    setStep("loading")
    axios
      .delete(
        `https://publications.apimachine.com/webstory/${selectedStory?._id}`
      )
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setStep("")
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setColouredIcon("");
        setPath([]);
        setStorySubDrawer(false);
        setTheTitle("Select An Action")
        setRefreshStories(!refreshStories);
      });
  };

  const pathAdjust = () => {
    if (path.length > 0) {
      setPath(path.slice(0, -1))
    } else {
      setPath([])
    }
    // console.log(step, "steppp")
    if (step === "Add Story") {
      setTheTitle("Select An Action")
    } else if (step === "Edit Story") {
      setTheTitle("Select An Action")
    } else if (step === "Edit Name") {
      setTheTitle("What do you want to change?")
    } else if (step === "Edit Icon") {
      setTheTitle("What do you want to change?")
    } else if (step === "Edit Description") {
      setTheTitle("What do you want to change?")
    }
  }


  const handleFetchStories = (item) => {
    axios
      .get(`https://publications.apimachine.com/story?web_story_id=${selectedStory?._id}`)
      .then(({ data }) => {
        if (data.status) {
          console.log(data.data)
          setStoriesData(data.data)
          setStep(item);
          setPath([...path, item]);
          setTheTitle(item);
        } else if (data.message === "jwt expired") {
          setStep("Token Expired");
        } else {
          toast.info("No stories found")
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setStep("")
      })
  }

  const WebStoryValidate = (item) => {
    console.log(item, "item")
    let body
    if (item === "name") {
      if (!newName) {
        toast.warning("Please Enter New Name")
        return
      } else {
        body = { name: newName }
      }
    } else if (item === "desc") {
      if (!newDesc) {
        toast.warning("Please Enter New Description")
        return
      } else {
        body = { desc: newDesc }
      }
    } else if (item === "icon") {
      if (!colouredIcon || colouredIcon === colouredIconLoading) {
        toast.warning("Please Upload Icon")
        return
      } else {
        body = { icon: colouredIcon }
      }
    }

    setStep("loading")
    axios
      .put(`https://publications.apimachine.com/webstory/${selectedStory?._id}`, body)
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setStep("")
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setColouredIcon("");
        setPath([]);
        setStorySubDrawer(false);
        setTheTitle("Select An Action")
        setRefreshStories(!refreshStories);
      });
  }


  const StoryValidate = (item) => {
    console.log(item, "item")
    let body
    if (item === "name") {
      if (!newStoryName) {
        toast.warning("Please Enter Story Title")
        return
      } else {
        body = { name: newStoryName }
      }
    } else if (item === "desc") {
      if (!newStoryDesc) {
        toast.warning("Please Enter New Description")
        return
      } else {
        body = { desc: newStoryDesc }
      }
    } else if (item === "icon") {
      if (!newStoryIcon || newStoryIcon === newStoryIconLoading) {
        toast.warning("Please Upload Icon")
        return
      } else {
        body = { image: newStoryIcon }
      }
    }

    setStep("loading")
    axios
      .put(`https://publications.apimachine.com/story/${clickedStory?._id}`, body)
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setStep("")
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setColouredIcon("");
        setNewStoryName("")
        setNewStoryDesc("")
        setNewStoryIcon("")
        setPath([]);
        setStorySubDrawer(false);
        setTheTitle("Select An Action")
        setRefreshStories(!refreshStories);
      });
  }

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

  // useEffect(() => {
  //   if (selectedPublication && selectedPublication !== null) {
  //     axios
  //       .all([
  //         axios.get(
  //           `https://publications.apimachine.com/application/notInPublication/${selectedPublication?._id}`
  //         ),
  //         axios.get(
  //           `https://publications.apimachine.com/application/publication/${selectedPublication?._id}`
  //         ),
  //       ])
  //       .then(
  //         axios.spread((...responses) => {
  //           const responseOne = responses[0];
  //           const responseTwo = responses[1];
  //           setAllAuthorsNotInPub(responseOne.data.data);
  //           setAllAuthorsInPub(responseTwo.data.data);
  //           // console.log(responseTwo.data.data);
  //         })
  //       )
  //       .catch((errors) => {
  //         console.log(errors);
  //       });
  //   }
  // }, [selectedPublication, refetchData]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://publications.apimachine.com/publisher/`)
  //     .then(({ data }) => {
  //       setAllAuthors(data.data);
  //       setLoading(false);
  //     });
  // }, [selectedPublication]);

  const validate = () => {
    if (
      colouredIcon &&
      name &&
      desc &&
      link
    ) {
      addNewStory();
    } else {
      toast.warning("All Fields Are Mandatory");
    }
  };

  const addNewStory = () => {
    setLoading(true);
    setStep("loading")

    axios
      .post(`https://publications.apimachine.com/story/new`, {
        web_story_id: selectedStory?._id,
        name: name,
        email: bankerEmail,
        image: colouredIcon,
        desc: desc,
        link_to_article: link
      })
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setPath([]);
        setStorySubDrawer(false);
        setRefreshStories(true);
      });
  };


  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(`Add ${name} to ${selectedStory?.name}`);

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
            You have successfully made the changes. You will be redirected to the updated web stories template page now.
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

      case "Add Story":
        return (
          <>
            <div className="scrollstory">
              <div className="storyname" style={{ paddingTop: "20px" }}>
                Name
              </div>
              <div className="StoryInput">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="textStory"
                  placeholder="Enter Name..."
                />
              </div>
              {/* <div className="storyname" style={{ paddingTop: "20px" }}>
              Email
            </div>
            <div className="StoryInput">
              <input
                value={bankerEmail}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="textStory"
                placeholder="Enter Email..."
              />
            </div> */}
              <div className="storyname" style={{ paddingTop: "20px" }}>
                Description
              </div>
              <div className="StoryInput">
                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  type="text"
                  className="textStory"
                  placeholder="Enter Description..."
                />
              </div>
              <div className="storyname" style={{ paddingTop: "20px" }}>Upload Image</div>
              <div>
                <div
                  className="filesUpload"
                  style={{ justifyContent: "flex-start" }}
                >
                  <label className="fileInp icon">
                    <img
                      className={`${Boolean(colouredIcon)}`}
                      src={
                        colouredIconLoading
                          ? loadingGif
                          : colouredIcon || cloudUploadIcon
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
                    <div
                      className="text"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      Colored Icon
                    </div>
                    <div className="hovTxt">
                      Upload
                      <br />
                      New
                    </div>
                  </label>
                </div>
              </div>
              <div className="storyname" style={{ paddingTop: "20px" }}>
                Link
              </div>
              <div className="StoryInput">
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  type="text"
                  className="textStory"
                  placeholder="Enter Link..."
                />
              </div>
            </div>
            <div className="bottomSubmit"
              onClick={() => validate()}
            >
              <p className="btm-text">Add Story</p>
            </div>
          </>
        );

      case "Edit Story":
        return (
          <>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Name");
              setPath([...path, "Edit Name"]);
              setTheTitle("Edit Name")
            }}>
              <div>Name</div>
            </div>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Description");
              setPath([...path, "Edit Description"]);
              setTheTitle("Edit Description")
            }}>
              <div>Description</div>
            </div>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Icon");
              setPath([...path, "Edit Icon"]);
              setTheTitle("Edit Icon")
            }}>
              <div>Icon</div>
            </div>
          </>
        )
      case "Edit Name":
        return (
          <>
            <div className="sidebarInputBox">
              <div>{selectedStory?.name}</div>
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="sidebarInputBox">
              <input type="text" value={newName} className="inputBox" placeholder="Enter New Name" onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="bottomSubmit" onClick={() => WebStoryValidate("name")}>
              <p className="btm-text">Submit Edit</p>
            </div>
          </>
        );

      case "Edit Selected Title":
        return (
          <>
            <div className="sidebarInputBox">
              <div>{clickedStory?.name}</div>
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="sidebarInputBox">
              <input type="text" value={newStoryName} className="inputBox" placeholder="Enter New Name" onChange={(e) => setNewStoryName(e.target.value)} />
            </div>
            <div className="bottomSubmit" onClick={() => StoryValidate("name")}>
              <p className="btm-text">Submit Edit</p>
            </div>
          </>
        );

      case "Edit Description":
        return (
          <>
            <div className="sidebarInputBox">
              <div>{selectedStory?.desc}</div>
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="sidebarInputBox">
              <input type="text" value={newDesc} className="inputBox" placeholder="Enter New Description" onChange={(e) => setNewDesc(e.target.value)} />
            </div>
            <div className="bottomSubmit" onClick={() => WebStoryValidate("desc")}>
              <p className="btm-text">Submit Edit</p>
            </div>
          </>
        );

      case "Edit Selected Description":
        return (
          <>
            <div className="sidebarInputBox">
              <div>{clickedStory?.desc}</div>
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="sidebarInputBox">
              <input type="text" value={newStoryDesc} className="inputBox" placeholder="Enter New Description" onChange={(e) => setNewStoryDesc(e.target.value)} />
            </div>
            <div className="bottomSubmit" onClick={() => StoryValidate("desc")}>
              <p className="btm-text">Submit Edit</p>
            </div>
          </>
        );

      case "Edit Icon":
        return (
          <>
            <div>
              <img src={selectedStory?.icon} alt="" className="category-img" />
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="bottomSubmit" onClick={() => WebStoryValidate("icon")}>
              <p className="btm-text">Submit Edit</p>
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
          </>
        );

      case "Edit Selected Cover Photo":
        return (
          <>
            <div>
              <img src={clickedStory?.image} alt="" className="category-img" />
            </div>
            <div className="breakLine">
              <div className="horizantalLine"></div>
              &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
              <div className="horizantalLine"></div>
            </div>
            <div className="bottomSubmit" onClick={() => StoryValidate("icon")}>
              <p className="btm-text">Submit Edit</p>
            </div>
            <label className="fileInp icon centerIco">
              <img
                className={`${Boolean(colouredIcon)} centerImg`}
                src={
                  newStoryIconLoading
                    ? loadingGif
                    : colouredIcon || newStoryIcon
                }
                alt=""
                style={{ borderRadius: "20px" }}
              />
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(
                    e,
                    setNewStoryIcon,
                    setNewStoryIconLoading
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
          </>
        );

      case "Delete Template":
        return (
          <>
            <div className="sidebarTitle">
              Are you sure you want to delete this template?
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("loading");
                setPath([...path, "loading"]);
                handleDeletePub();
              }}
            >
              {/* <img
                  src={yesIcon}
                  alt=""
                  className="coin"
                  style={{ width: "25px", height: "25px" }}
                /> */}
              <div>Yes I Am</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setPath([]);
                setTheTitle("Select An Action")
                setStep("default");
              }}
            >
              {/* <img
                  src={noIcon}
                  alt=""
                  className="coin"
                  style={{ width: "25px", height: "25px" }}
                /> */}
              <div>Never Mind</div>
            </div>
          </>
        );
      case "Edit Particular Story":
        return (
          <div className="storyScroll">
            <div className="sidebarTitle">
              Select Story you want to edit
            </div>
            {storiesData.map((e) => {
              return <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Selected Story");
                  setPath([...path, "Edit Selected Story"]);
                  setClickedStory(e)
                }}
              >
                <div>{e.name}</div>
              </div>
            })}
          </div>
        );

      case "Delete Particular Story":
        return (
          <>
            <div className="storyScroll">
              <div className="sidebarTitle">
                Select Stories you want to delete
              </div>
              {storiesData.map((e) => {
                return <div
                  className="sidebarCard"
                  style={{ backgroundColor: clickedStories.includes(e?._id) ? "#4b9ddc" : "" }}
                  onClick={() => {
                    // setStep("Delete Selected Story");
                    // setPath([...path, "Delete Selected Story"]);
                    ActionClick(e)
                  }}
                >
                  <div>{e.name}</div>
                </div>
              })}
            </div>
            <div className="bottomSubmit" style={{ display: clickedStories.length > 0 ? "" : "none" }}
              onClick={() => handleDeleteStory()}
            >
              <p className="btm-text">Delete Selected Stories</p>
            </div>
          </>
        );
      case "Edit Selected Story":
        return (
          <>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Selected Title");
              setPath([...path, "Edit Selected Title"]);
              setTheTitle("Edit Selected Title")
            }}>
              <div>Title</div>
            </div>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Selected Description");
              setPath([...path, "Edit Selected Description"]);
              setTheTitle("Edit Selected Description")
            }}>
              <div>Description</div>
            </div>
            <div className="sidebarCard" onClick={() => {
              setStep("Edit Selected Cover Photo");
              setPath([...path, "Edit Selected Cover Photo"]);
              setTheTitle("Edit Selected Cover Photo")
            }}>
              <div>Cover Photo</div>
            </div>
          </>
        )
      case "Delete Selected Story":
        return (
          <>
            <div className="sidebarTitle">
              Are you sure you want to delete this story?
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("loading");
                setPath([...path, "loading"]);
                handleDeleteStory();
              }}
            >
              {/* <img
                    src={yesIcon}
                    alt=""
                    className="coin"
                    style={{ width: "25px", height: "25px" }}
                  /> */}
              <div>Yes I Am</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setPath([]);
                setStep("Delete Particular Story");
                setPath("Delet Particular Story")
              }}
            >
              {/* <img
                    src={noIcon}
                    alt=""
                    className="coin"
                    style={{ width: "25px", height: "25px" }}
                  /> */}
              <div>Never Mind</div>
            </div>
          </>
        );





      default:
        return (
          <>
            <div className="sidebarTitle">What Would You Like To Do? </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Add Story");
                setPath([...path, "Add Story"]);
                setTheTitle("Add Story");
              }}
            >
              {/* <img
                src={addIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Add Story</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Edit Story");
                setPath([...path, "Edit Story"]);
                setTheTitle("Edit Story");
              }}
            >
              {/* <img
                src={addIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Edit Story</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                handleFetchStories("Edit Particular Story")
              }}
            >
              {/* <img
                src={addIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Edit Particular Story</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                handleFetchStories("Delete Particular Story")
              }}
            >
              {/* <img
                src={addIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Delete Particular Story</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Delete Template");
                setPath([...path, "Delete Template"]);
                setTheTitle("Delete Template");
              }}
            >
              <div>Delete Template</div>
            </div>
            {/* <div
              className="sidebarCard"
              onClick={() => {
                setStep("Add To Publication");
                setPath([...path, "Add To Publication"]);
              }}
            >
              <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>
                Add Authors To Publication
              </div>
            </div> */}
            {/* <div
              className="sidebarCard"
              onClick={() => {
                setStep("Remove From Publication");
                setPath([...path, "Remove From Publication"]);
              }}
            >
              <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>
                Remove Authors From Publication
              </div>
            </div> */}
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
                <div>
                  <div style={{ fontSize: "22px" }}>
                    {theTitle}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="backButton icon-imgs close-img"
                  onClick={(e) => {
                    setPath([]);
                    setStorySubDrawer(false);
                    setStep("");
                    setTheTitle("Select An Action")
                  }}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <img src={close} alt="" />
                </div>
              </div>
              {path.length > 0 ? (
                <div className="back-btm-button" onClick={pathAdjust}>
                  <p className="btm-text">Go Back</p>
                  {/* <button className="btm-text">go back</button> */}
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className="breadcrumb"
              style={{ display: "flex", flexDirection: "row" }}
            >

            </div>
          </div>
        )}
        {conditionalSteps()}

      </div>

      <ToastContainer />
    </>
  );
};

export default Actions;
