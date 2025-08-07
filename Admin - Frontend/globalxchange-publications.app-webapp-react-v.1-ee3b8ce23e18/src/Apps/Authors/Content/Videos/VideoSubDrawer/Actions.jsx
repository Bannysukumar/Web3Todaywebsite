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
  selectedArticle,
  setSelectedArticle,
  selectedVideo,
  setSelectedVideo,

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
    setVideoActionsSubDrawer,
    setRefetchAppData,
    setRefetchArticles,
    refetchArticles,
    setWideDrawer,
    refetchVideos,
    setRefetchVideos
  } = useContext(GlobalContex);

  console.log(selectedVideo, "selectedVideo");


  const [bondStatus, setBondStatus] = useState("");
  const [search, setSearch] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsInPub, setAllAuthorsInPub] = useState([]);
  const [allAuthorsNotInPub, setAllAuthorsNotInPub] = useState([]);
  const [categories, setCategories] = useState([]);
  const [navBars, setNavBars] = useState([]);
  const [keywordsArr, setKeywordsArr] = useState([])
  const [keywords, setKeywords] = useState("")
  const [selectKeywords, setSelectKeywords] = useState([])
  const [metaTag, setMetaTag] = useState("")
  const [metaArr, setMetaArr] = useState([])
  const [selectMeta, setSelectMeta] = useState([])


  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [theTitle, setTheTitle] = useState("Select An Action");
  const [newQuestion, setNewQuestion] = useState("");
  const [choices, setChoices] = useState([{ option: "", is_correct: "" }, { option: "", is_correct: "" }, { option: "", is_correct: "" }, { option: "", is_correct: "" }]);
  const [loadingData, setLoadingData] = useState("");
  const [successData, setSuccessData] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [newField, setNewField] = useState("");
  const [articleField, setArticleField] = useState("")
  // const [newField, setNewField] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");
  const [CategoryArr, setCategoryArr] = useState([])
  const [navBarArr, setNavBarArr] = useState([])
  const [display, setDisplay] = useState(true)
  const [keywordsData, setKeywordsData] = useState([])
  const [articleBody, setArticleBody] = useState("")


  let displayText



  // const [selectedKey, setSelectedKey] = useState("");


  // useEffect(() => {
  //   setStep("Action");
  //   setPath(["Action"]);
  // }, [actionsSubDrawer]);


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
    setLoadingData(`Deleting ${selectedVideo?.title}`);
    setLoading(true);
    axios
      .delete(
        `https://publications.apimachine.com/video/${selectedVideo?._id}`
      )
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setSuccessData(` You have successfully deleted ${selectedVideo?.title}. You will be redirected to the updated article list now.`)
          setTimeout(() => {
            setLoading(false);
            setPath([]);
            setStep("");
            setRefetchVideos(!refetchVideos);
            setVideoActionsSubDrawer(false);
          }, 1000);
        }
      });
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((tag) => tag !== index));
  }

  const removeFetchCategory = (index) => {
    setCategoryArr(CategoryArr.filter((cat) => cat._id !== index._id));
  }

  const removeFetchNav = (index) => {
    setNavBarArr(navBarArr.filter((nav) => nav._id !== index._id));
  }

  const removeNavbar = (index) => {
    setNavBars(navBars.filter((tag) => tag !== index));
  }

  const removeFetchKeyword = (index) => {
    setSelectKeywords(selectKeywords.filter((tag) => tag !== index));
  }

  const removeFetchMeta = (index) => {
    setSelectMeta(selectMeta.filter((tag) => tag !== index));
  }

  const addMetaTag = (metaTag) => {
    if (metaTag === "") return
    setMetaArr([...metaArr, metaTag])
    console.log(metaArr, "metaArr")
    setMetaTag("")
  }

  const removeTag = (item) => {
    setMetaArr(metaArr.filter((tag) => tag !== item));
  };




  const pathAdjust = () => {
    if (path.length > 0) {
      setPath(path.slice(0, -1))
    } else {
      setPath([])
    }
    // console.log(step, "steppp")
    if (step === "Add A Question" || step === "Delete Video") {
      setTheTitle("Select An Action")
    }
    if (step === "Edit Title field" || step === "Edit Article field" || step === "Edit Icon field" || step === "Edit Description field" || step === "Edit Categories field" || step === "Edit Navbars field" || step === "Edit Cover Photo field" || step === "Edit Article field" || step === "Edit Keywords field" || step === "Edit Alt-Tag field" || step === "Edit Action Button Text field" || step === "Edit Action Button Link field" || step === "Edit Custom URL field" || step === "Edit Metatags field") {
      setTheTitle("What Do You Want To Change?")
    }
    if (step === "Edit Keywords field") {
      setKeywordsArr([])
    }
    if (step === "Edit Metatags field") {
      setMetaArr([])
    }
    if (step === "Edit Categories field") {
      setCategories([])
    }
    if (step === "Edit Navbars field") {
      setNavBars([])
    }
  }

  const addKeyword = (keyword) => {
    console.log(keyword, "keyword")
    if (keyword === "") return
    setKeywordsArr([...keywordsArr, keyword])
    console.log(keywordsArr, "keywordsArr")
    setKeywords("")
  }

  const removeKeyword = (item) => {
    setKeywordsArr(keywordsArr.filter((keyword) => keyword !== item));
  };



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


  const QuestionValidate = () => {
    if (newQuestion === "") {
      toast.warning("Please enter a question")
    } else if (choices[0].option === "" || choices[1].option === "" || choices[2].option === "" || choices[3].option === "") {
      toast.warning("Please enter all the options")
    } else if (choices[0].is_correct === "" || choices[1].is_correct === "" || choices[2].is_correct === "" || choices[3].is_correct === "") {
      toast.warning("Please select the correct answer")
    } else {
      setLoadingData("Adding Question to video...")
      setStep("loading")
      let body = {
        video_id: selectedVideo?._id,
        question: newQuestion,
        options: choices
      }
      axios
        .post(`https://publications.apimachine.com/videoquestions/new`, body)
        .then((res) => {
          if (res.data.status) {
            setStep("success");
            setSuccessData(` You have successfully added a question to ${selectedVideo?.title}. You will be redirected to the updated video list now.`)
            setTimeout(() => {
              setStep("");
              setPath([]);
              setNewQuestion("");
              setChoices([{ option: "", is_correct: "" }, { option: "", is_correct: "" }, { option: "", is_correct: "" }, { option: "", is_correct: "" }])
              setVideoActionsSubDrawer(false);
            }, 1000);
          } else {
            alert("Something went wrong, please try again later")
          }
        })
    }
  }


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


  const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
  const emailDev = "rahulrajsb@outlook.com";

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
     setImage(data[0].urlName);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  };


  const handleOptionChange = (e, i) => {
    const options = [...choices]
    options[i].option = e.target.value
    setChoices(options)


    // console.log(options, "choice")
  }


  const handleAnswerChange = (e, i) => {
    const options = [...choices]
    options[i].is_correct = true


    //set all other options to false
    options.forEach((option, index) => {
      if (index !== i) {
        option.is_correct = false
      }
    })
    setChoices(options)




    // console.log(options, "choice")
  }

  const validateArticle = (data, e) => {
    // setStep("loading");
    let body
    // console.log(data,e, "sample")
    if (e === 4) {
      console.log(...categories, ...CategoryArr, "categories")
      //fetch id's from categories and categoryArr and merge them
      let categoryIds = [...categories, ...CategoryArr].map((category) => category._id)
      body = {
        [editVideoTiles[e].key]: categoryIds
      }
    } else if (e === 5) {
      let navBarIds = [...navBars, ...navBarArr].map((navBar) => navBar._id)
      body = {
        [editVideoTiles[e].key]: navBarIds
      }
    } else if (e === 6) {
      body = {
        [editVideoTiles[e].key]: [...selectKeywords, ...keywordsArr]
      }
    } else if (e === 7) {
      body = {
        [editVideoTiles[e].key]: [...selectMeta, ...metaArr]
      }
    } else {
      body = {
        [editVideoTiles[e].key]: newField
      }
    }
    console.log(body, "body")
    axios.put(`https://publications.apimachine.com/video/${selectedVideo?._id}`, body)
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setSuccessData(` You have successfully updated ${selectedVideo?.title}. You will be redirected to the updated video list now.`)
          setTimeout(() => {
            setStep("");
            setPath([]);
            setNewField("");
            setKeywordsArr([]);
            setMetaArr([]);
            setCategories([]);
            setCategoryArr([]);
            setNavBarArr([]);
            setNavBars([]);
            setRefetchVideos(!refetchVideos);
            setVideoActionsSubDrawer(false);
          }, 1000);
        } else {
          setStep("default")
          toast.warning(data.message || "Something went wrong. Please try again later.")
        }
      }).catch((err) => {
        setStep("default")
        toast.warning(err.message || "Something went wrong. Please try again later.")
      }
      )
  }


  let editVideoTiles =
    [{ name: "Title", key: "title" },
    { name: "Thumbnail", key: "image" },
    { name: "Description", key: "desc" },
    { name: "Video Link", key: "video" },
    { name: "Categories", key: "categoryType" },
    { name: "Navbars", key: "navbar_id" },
    { name: "Keywords", key: "keywords" },
    { name: "Metatags", key: "metatags" },
    { name: "Alt-Tag", key: "altTag" },
    { name: "Action Button Text", key: "action" },
    { name: "Action Button Link", key: "action_link" },
    { name: "Custom URL", key: "custom_url" }]








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


      case "Delete Video":
        return (
          <>
            <div className="sidebarTitle">
              Are you sure you want to delete this video?
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
      case "Add A Question":
        return (
          <>
            <div className="sidebarQuestionBox">
              <input type="text" value={newQuestion} className="inputBox" placeholder="Enter Question" onChange={(e) => setNewQuestion(e.target.value)} />
            </div>
            <div className="sidebarChoiceList">
              {choices.map((choice, i) => {
                console.log(choice.is_correct, "choice")
                return (
                  <div className="sidebarQuestionBox" key={i}>
                    <input type="text" value={choice.option} className="inputBox" placeholder={`Choice${i + 1}`} onChange={(e) => handleOptionChange(e, i)} />
                    <button className="optionBtn" onClick={(e) => handleAnswerChange(e, i)} style={{ background: choice.is_correct === true ? "green" : "transparent", color: choice.is_correct === true ? "white" : "#E7E7E7" }}>R</button>
                    <button className="optionBtn" style={{ background: choice.is_correct === false ? "red" : "transparent", color: choice.is_correct === false ? "white" : "#E7E7E7" }}>W</button>
                  </div>
                )
              })}
            </div>
            {/* <div className="sidebarQuestionBox">
              <input type="text" value={choice1} className="inputBox" placeholder="Choice 2" onChange={(e) => setChoice1(e.target.value)} />
              <button className="optionBtn">R</button>
              <button className="optionBtn">W</button>
            </div>
            <div className="sidebarQuestionBox">
              <input type="text" value={choice1} className="inputBox" placeholder="Choice 3" onChange={(e) => setChoice1(e.target.value)} />
              <button className="optionBtn">R</button>
              <button className="optionBtn">W</button>
            </div> */}
            <div className="bottomSubmit" onClick={QuestionValidate}>
              <p className="btm-text">Submit Question</p>
            </div>
          </>
        )
      case "Edit Video":
        return (
          <>
            <div className="sidebarSelect">
              {editVideoTiles.map((tile, i) => {
                return (
                  <div className="sidebarCard" id={tile.key} onClick={() => {
                    setStep(`Edit ${tile.name} field`);
                    setPath([...path, `Edit ${tile.name} field`]);
                    setTheTitle(`Edit ${tile.name} field`);
                    setSelectedText(tile.name)
                    setCategoryArr(tile.name === "Categories" ? selectedVideo?.categoryDetail : [])
                    setNavBarArr(tile.name === "Navbars" ? selectedVideo?.navDetails : [])
                    setArticleBody(tile.name === "Article" ? selectedArticle?.article : "")
                    setSelectKeywords(tile.name === "Keywords" ? selectedVideo?.keywords : [])
                    setSelectMeta(tile.name === "Metatags" ? selectedVideo?.metatags : [])
                    // setSelectedKey(tile.key)
                  }}>
                    {tile.name}
                  </div>
                )
              })}
            </div >
          </>
        );
      case `Edit ${selectedText} field`:
        let key
        if (selectedText === "Title") {
          displayText = selectedVideo?.title
          key = 0
        } else if (selectedText === "Thumbnail") {
          displayText = selectedVideo?.image
          key = 1
        } else if (selectedText === "Description") {
          displayText = selectedVideo?.desc
          key = 2
        } else if (selectedText === "Video Link") {
          displayText = selectedVideo?.video
          key = 3
        } else if (selectedText === "Categories") {
          displayText = selectedVideo?.categories
          key = 4
        } else if (selectedText === "Navbars") {
          displayText = selectedVideo?.navbar
          key = 5
        } else if (selectedText === "Keywords") {
          displayText = selectedVideo?.keywords
          key = 6
        } else if (selectedText === "Metatags") {
          displayText = selectedVideo?.metatags
          key = 7
        } else if (selectedText === "Alt-Tag") {
          displayText = selectedVideo?.altTag
          key = 8
        } else if (selectedText === "Action Button Text") {
          displayText = selectedVideo?.action
          key = 9
        } else if (selectedText === "Action Button Link") {
          displayText = selectedVideo?.action_link
          key = 10
        } else if (selectedText === "Custom URL") {
          key = 11
          displayText = selectedVideo?.custom_url
        }
        switch (selectedText) {
          case "Thumbnail":
          case "Cover Photo":
            return (
              <>
                <div>
                  <img src={displayText} alt="" className="category-img" />
                </div>
                <div className="breakLine">
                  <div className="horizantalLine"></div>
                  &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                  <div className="horizantalLine"></div>
                </div>
                <div className="bottomSubmit" onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text">Submit Edit</p>
                </div>
                <label className="fileInp icon centerIco">
                  <img
                    className={`${Boolean(newField)} centerImg`}
                    src={
                      colouredIconLoading
                        ? loadingGif
                        : newField || UploadIconImg
                    }
                    alt=""
                    style={{ width: "40px" }}
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(
                        e,
                        setNewField,
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
          // case "Article":
          //   return (
          //     <EditEnterArticle
          //       articleBody={articleBody}
          //       setArticleBody={setArticleBody}
          //       onClose={() => {
          //         setSelectedText("")
          //         setPath(path.slice(0, -1))                 
          //         setTheTitle("What Do You Want To Change?");
          //         setWideDrawer(false);
          //       }}
          //       btnSubmit={(e) => validateArticle(e, 3)}
          //     />
          //   )
          case "Categories":
            return (
              <>
                <div className="category-scroll">
                  {CategoryArr.map((category, i) => {
                    return (
                      <div className="sidebarInputBox">
                        <img src={closeIconRed} alt="close-icon" className="closeBox" onClick={() => removeFetchCategory(category)} />
                        <div>{category?.title}</div>
                      </div>
                    )
                  })}
                  <div className="breakLine">
                    <div className="horizantalLine"></div>
                    &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                    <div className="horizantalLine"></div>
                  </div>
                  <div className="inputWrap" style={{ marginTop: "20px" }} onClick={() => {
                    setStep("Add Categories");
                    setPath([...path, "Add Categories"]);
                    setTheTitle("Add Categories");
                  }} >
                    <input
                      type="text"
                      className="text"
                      placeholder="Enter New Category.."
                    />
                    <img src={plusIcon} alt="plus" className="plusImg1" />
                  </div>
                  <div className="metaFields">
                    {categories.map((item, index) => {
                      return (
                        <div className="metaField">
                          <div className="metaTitle">{item.title}</div>
                          <div className="metaClose">
                            <img src={closeIconRed} alt="close" onClick={() => removeCategory(item)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="bottomSubmit" onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text">Submit Edit</p>
                </div>
              </>
            )
          case "Navbars":
            return (
              <>
                <div className="category-scroll">
                  {navBarArr.map((nav, i) => {
                    return (
                      <div className="sidebarInputBox">
                        <img src={closeIconRed} alt="close-icon" className="closeBox" onClick={() => removeFetchNav(nav)} />
                        <div>{nav?.navTitle}</div>
                      </div>
                    )
                  })}
                  <div className="breakLine">
                    <div className="horizantalLine"></div>
                    &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                    <div className="horizantalLine"></div>
                  </div>
                  <div className="inputWrap" style={{ marginTop: "20px" }} onClick={() => {
                    setStep("Add Navbars");
                    setPath([...path, "Add Navbars"]);
                    setTheTitle("Add Navbars");
                  }} >
                    <input
                      type="text"
                      className="text"
                      placeholder="Enter New Navbar.."
                    />
                    <img src={plusIcon} alt="plus" className="plusImg1" />
                  </div>
                  <div className="metaFields">
                    {navBars.map((item, index) => {
                      return (
                        <div className="metaField">
                          <div className="metaTitle">{item.navTitle}</div>
                          <div className="metaClose">
                            <img src={closeIconRed} alt="close" onClick={() => removeNavbar(item)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="bottomSubmit" onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text">Submit Edit</p>
                </div>
              </>
            )
          case "Keywords":
            return (
              <>
                <div className="category-scroll">
                  {selectKeywords.map((keyword, i) => {
                    return (
                      <div className="sidebarInputBox">
                        <img src={closeIconRed} alt="close-icon" className="closeBox" onClick={() => removeFetchKeyword(keyword)} />
                        <div>{keyword}</div>
                      </div>
                    )
                  })}
                  <div className="breakLine">
                    <div className="horizantalLine"></div>
                    &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                    <div className="horizantalLine"></div>
                  </div>
                  <div className="inputWrap" style={{ marginTop: "20px" }}>
                    <input
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      type="text"
                      className="text"
                      placeholder="Enter New Keyword.."
                    />
                    <img src={plusIcon} alt="plus" className="plusImg1" onClick={() => addKeyword(keywords)} />
                  </div>

                  <div className="metaFields">
                    {keywordsArr.map((item, index) => {
                      return (
                        <div className="metaField">
                          <div className="metaTitle">{item}</div>
                          <div className="metaClose">
                            <img src={closeIconRed} alt="close" onClick={() => removeKeyword(item)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="bottomSubmit" onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text">Submit Edit</p>
                </div>
              </>
            )

          case "Metatags":
            return (
              <>
                <div className="category-scroll">
                  {selectMeta.map((keyword, i) => {
                    return (
                      <div className="sidebarInputBox">
                        <img src={closeIconRed} alt="close-icon" className="closeBox" onClick={() => removeFetchMeta(keyword)} />
                        <div>{keyword}</div>
                      </div>
                    )
                  })}
                  <div className="breakLine">
                    <div className="horizantalLine"></div>
                    &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                    <div className="horizantalLine"></div>
                  </div>
                  <div className="inputWrap" style={{ marginTop: "20px" }}>
                    <input
                      value={metaTag}
                      onChange={(e) => setMetaTag(e.target.value)}
                      type="text"
                      className="text"
                      placeholder="Enter New Metatag.."
                    />
                    <img src={plusIcon} alt="plus" className="plusImg1" onClick={() => addMetaTag(metaTag)} />
                  </div>

                  <div className="metaFields">
                    {metaArr.map((item, index) => {
                      return (
                        <div className="metaField">
                          <div className="metaTitle">{item}</div>
                          <div className="metaClose">
                            <img src={closeIconRed} alt="close" onClick={() => removeTag(item)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="bottomSubmit" onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text">Submit Edit</p>
                </div>
              </>
            )

          default:
            return (
              <div className="editor-box">
                <div className="sidebarInputBox">
                  <div>{selectedText === "Custom URL" ? displayText.length > 40 ? displayText.slice(0, 40) : displayText : displayText}<span style={{ display: selectedText === "Custom URL" ? displayText.length > 40 ? "" : "none" : "none" }}>...</span></div>
                </div>
                <div className="breakLine">
                  <div className="horizantalLine"></div>
                  &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                  <div className="horizantalLine"></div>
                </div>
                <div className="sidebarInputBox">
                  <input type="text" value={newField} className="inputBox" placeholder={`Enter New ${selectedText}`} onChange={(e) => setNewField(e.target.value)} />
                </div>
                <div className="bottomSubmit" key={key} onClick={(e) => validateArticle(e, key)}>
                  <p className="btm-text" >Submit Edit</p>
                </div>
              </div>
            );
        }

      case "Add Categories":
        return (
          <div className="newConglomerate selectDropDown">
            <NotInCategoryList
              categories={categories}
              setCategories={setCategories}
              CategoryArr={CategoryArr}
              setCategoryArr={setCategoryArr}
              onClose={() => (setStep("Edit Categories field"), setPath(path.slice(0, -1)))}
              display={display}
            />
          </div>
        );
      case "Add Navbars":
        return (
          <div className="newConglomerate selectDropDown">
            <NotInNavBarList
              navBars={navBars}
              setNavBars={setNavBars}
              onClose={() => (setStep("Edit Navbars field"), setPath(path.slice(0, -1)))}
              navBarArr={navBarArr}
              setNavBarArr={setNavBarArr}
              display={display}
            />
          </div>
        );





      default:
        return (
          <>
            <div className="sidebarTitle">What Would You Like To Do? </div>
            <div className="sidebarSelect">
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Video");
                  setPath([...path, "Edit Video"]);
                  setTheTitle("What Do You Want To Change?");
                }}
              >
                <div>Edit Video</div>
              </div>
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Add A Question");
                  setPath([...path, "Add A Question"]);
                  setTheTitle("Add A Question");
                }}
              >
                <div>Add Question</div>
              </div>
              <div
                className="sidebarCard"
              >
                <div style={{ opacity: "0.5" }}>Edit Question</div>
              </div>
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Delete Video");
                  setPath([...path, "Delete Video"]);
                  setTheTitle("Delete Video");
                }}
              >
                {/* <img
                src={deletePub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
                <div>Delete Video</div>
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
                    {theTitle}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* {path.length > 1 ? (
                  <div
                    className="backButton icon-imgs"
                    onClick={(e) => handleBackStep()}
                  >
                    <img src={back} alt="" />
                  </div>
                ) : (
                  ""
                )} */}
                <div
                  className="backButton icon-imgs close-img"
                  onClick={(e) => {
                    setPath([]);
                    setVideoActionsSubDrawer(false);
                    setCategories([]);
                    setNavBars([]);
                    setMetaArr([]);
                    setKeywordsArr([]);
                    setTheTitle("Select An Action")
                  }}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <img src={close} alt="" />
                </div>
              </div>
              {path.length > 0 && selectedText !== "Article" ? (
                <div className="back-btm-button" onClick={pathAdjust}>
                  <p className="btm-text" onClick={() => setNewField("")}>Go Back</p>
                  {/* <button className="btm-text">go back</button> */}
                </div>
              ) : (
                ""
              )}
            </div>


            {/* <div
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
            </div> */}
          </div>
        )}
        {conditionalSteps()}
        <ToastContainer />
      </div>
    </>
  );
};


export default Actions;