import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import Scrollbars from "react-custom-scrollbars";
import * as jose from "jose";
import cloudUploadIcon from "../../../static/images/clipIcons/cloudUpload.svg";

import loadingGif from "../../../static/images/loading.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAllergies, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// import LoadingAnimation from "../LoadingAnimation";
import { useNavigate } from "react-router-dom";
// import { selectLoginData } from "../../app/loginSlice";
import { toast } from "react-toastify";
import axios from "axios";
import clearInput from "../../../static/images/icons/refresh.svg";
import "../NewCategory/numberInput.css";
import { GlobalContex } from "../../../globalContex";

import plus from "../../../static/images/globaldrawer/plus.svg";

import LoadingAnimation from "../../LoadingAnimation";
import PublicationList from "../NewCategory/PublicationList";
import defaultImg from "../../../static/images/icons/defaultImg.svg";
import CategoryList from "./categoryList";
import closeWhite from "../../../static/images/icons/closeWhite.svg";


function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

const NewSubCategory = ({ step, setStep, setMainMenu, loading, setLoading }) => {
    const navigate = useNavigate();

    const {
        loginData,
        bankerEmail,
        refetchAppData,
        setRefetchAppData,
        globalMenuAdd,
        setGlobalMenuAdd,
        tabSelected,
        setTabSelected,
        selectedPublication,
        wideDrawer,
        setWideDrawer,
        setSlider,
        handleButtonClick
    } = useContext(GlobalContex);

    //
    const [publication, setPublication] = useState(null);
    const [categoryTitle, setCategoryTitle] = useState("");

    const [colouredIcon, setColouredIcon] = useState("");
    const [colouredIconLoading, setColouredIconLoading] = useState("");

    // Form Variables

    const [company, setCompany] = useState();
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenAvailable, setTokenAvailable] = useState(null);

    //Publishers New Publication
    const [publicationName, setPublicationName] = useState("");
    const [app, setApp] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [country, setCountry] = useState(null);

    const [visibleSubmit, setVisibleSubmit] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        localStorage.setItem("step", step);
    }, [step]);

    useEffect(() => {
        setPublication(selectedPublication)
    }, [publication, selectedPublication])

    const handleCheckTokenAvailability = () => {
        if (tokenAvailable === null && tokenSymbol !== "") {
            axios
                .get(
                    `https://comms.globalxchange.io/coin/investment/path/get?token=${tokenSymbol}`
                )
                .then((res) => {
                    if (res.data.status) {
                        setTokenAvailable(false);
                    } else {
                        setTokenAvailable(true);
                    }
                });
        } else {
            setTokenAvailable(null);
            setTokenSymbol("");
        }
    };

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
        const path_inside_brain = "root/";

        const jwts = await signJwt(fileName, emailDev, secret);
        console.log(jwts, "lkjkswedcf");
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
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    };

    const removeCategory = (category) => {
        setCategories(categories.filter((item) => item !== category));
    };

    const getContent = () => {
        switch (step) {
            case "success":
                setTimeout(() => {
                    // // navigate("/ventures/Brands");
                    // window.location.reload();
                    setSlider(false);
                }, 1000);
                setRefetchAppData(true);
                return (
                    <div className="newConglomerate">
                        <div className="succesView">
                            <div className="labelItm" style={{ textAlign: "center" }}>
                                You Have Successfully Added A New Category called{" "}
                                {categoryTitle}
                            </div>
                        </div>
                    </div>
                );

            case "Token Expired":
                return (
                    <>
                        <div className="newConglomerate">
                            <div className="succesView">
                                <div className="labelItm" style={{ textAlign: "center" }}>
                                    Token Expired. Login Again.
                                </div>
                            </div>
                        </div>

                        <div className="footerBtns">
                            <div
                            // onClick={(e) => handleBackStep()}
                            >
                                Go Back
                            </div>
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

            case "Select Publication":
                return (
                    <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
                        <PublicationList
                            setPublication={setPublication}
                            onClose={() => setStep("")}
                        />
                    </div>
                );
            case "Add Category":
                return (
                    <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
                        <CategoryList
                            categories={categories}
                            setCategories={setCategories}
                            onClose={() => setStep("")}
                        />
                    </div>
                );

            default:
                return (
                    <>
                        <div className="newConglomerate">
                            <Scrollbars
                                className="scrollForm"
                                renderTrackHorizontal={() => <div />}
                                renderThumbHorizontal={() => <div />}
                                renderTrackVertical={() => <div />}
                                renderThumbVertical={() => <div />}
                            >
                                {/* Select Publication */}
                                <div className="name">Select Publication</div>
                                {publication?.fxa_app_id ? (
                                    <div
                                        className="user"
                                        onClick={() => setStep("Select Publication")}
                                    >
                                        <img
                                            className="dp"
                                            src={
                                                publication?.profile_pic
                                                    ? publication?.profile_pic
                                                    : defaultImg
                                            }
                                            alt=""
                                        />
                                        <div className="userDetail">
                                            <div className="name">{publication?.name}</div>
                                            <div className="email">{publication?.fxa_app_id}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="inputWrap"
                                        onClick={() => setStep("Select Publication")}
                                    >
                                        <input
                                            type="text"
                                            className="text"
                                            placeholder="Click To Select"
                                            readOnly
                                        />
                                        <div
                                            className="btnCheck"
                                            style={{
                                                border: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </div>
                                    </div>
                                )}


                                <div className="name">Add Category</div>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {categories?.map((item, index) => {
                                        return (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",

                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        border: "0.5px solid #E7E7E7",
                                                        padding: "30px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        margin: "10px",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <div style={{
                                                        background: "black",
                                                        width: "15px",
                                                        padding: "3px",
                                                        borderRadius: "20px",
                                                        position: "absolute",
                                                        height: "15px",
                                                        top: "0px",
                                                        right: "-6px",
                                                        marginTop: "-5px",
                                                    }}
                                                        onClick={() => removeCategory(item)}
                                                    >
                                                        <img style={{
                                                            marginTop: "-15px",
                                                            width: "10px",
                                                            height: "10px",
                                                            cursor: "pointer"
                                                        }} src={closeWhite} alt="" />
                                                    </div>
                                                    <img
                                                        src={item?.thumbnail}
                                                        alt=""
                                                        style={{ width: "60px", height: "60px" }}
                                                    />
                                                </div>

                                                <div
                                                    style={{
                                                        wordWrap: "break-word",
                                                        width: "100px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item?.title}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div
                                        onClick={(e) => {
                                            setStep("Add Category")
                                            handleButtonClick()
                                        }}
                                        style={{
                                            display: categories.length > 0 ? "none" : "flex",
                                            width: "100px",
                                            height: "100px",
                                            border: "0.5px solid #E7E7E7",
                                            padding: "30px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: "10px",
                                        }}
                                    >
                                        <img src={plus} alt="" />
                                    </div>
                                </div>
                                <br/>
                                {/* Category Title */}
                                <div className="name">Category Title</div>
                                <div className="inputWrap">
                                    <input
                                        value={categoryTitle}
                                        onChange={(e) => setCategoryTitle(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Enter Title..."
                                    />
                                </div>

                                {/* Upload Logos */}
                                <div className="name">Upload Logos</div>

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

                                        {/* <label
      className="fileInp icon"
      style={{ visibility: "hidden" }}
    ></label> */}
                                    </div>
                                </div>

                                <div className="space"></div>
                            </Scrollbars>
                        </div>

                        <div className="footerBtns">
                            <div
                                className="newField"
                                style={{ fontWeight: 700 }}
                                onClick={(e) => {
                                    setStep("");
                                    setMainMenu("");
                                }}
                            >
                                Go Back
                            </div>
                            <div
                                className="btnSubmit"
                                onClick={() => validate()}
                                style={{
                                    fontWeight: 700,
                                    opacity:
                                        publication && categoryTitle && colouredIcon ? 1 : 0.3,
                                }}
                            >
                                Add Sub Category
                            </div>
                        </div>

                        {/* <div className="ftBtns">
              <div
                className="newField"
                style={{ fontWeight: 700 }}
                onClick={(e) => {
                  setStep("");
                  setMainMenu("");
                }}
              >
                Go Back
              </div>
              <div
                className="btnSubmit"
                onClick={() => validate()}
                style={{ fontWeight: 700, opacity: visibleSubmit ? 1 : 0.3 }}
              >
                Submit App
              </div>
            </div> */}
                    </>
                );
        }
    };

    const validate = () => {
        if (publication && categoryTitle && colouredIcon) {
            setVisibleSubmit(true);
            addNewNav();
        } else {
            toast.warning("All Fields Are Mandatory");
        }
    };

    const addNewNav = () => {
        setLoading(true);
        axios
            .post(`https://publications.apimachine.com/subcategory/new`, {
                publication_id: publication?._id,
                title: categoryTitle,
                thumbnail: colouredIcon,
                category_id:categories[0]._id
            })
            .then(({ data }) => {
                if (data.status === false) {
                    if (data.message === "jwt expired") {
                        setStep("Token Expired");
                    }
                    toast.success(data.message || "API Error");
                } else setStep("success");
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => {
                setLoading(false);
                setTabSelected("Categories");
            });
    };

    return (
        <>
            {loading ? (
                // <div
                //   style={{
                //     display: "flex",
                //     flexDirection: "column",
                //     justifyContent: "center",
                //     alignItems: "center",
                //     height: "70vh",
                //   }}
                // >
                //   <div className="loader"></div>
                //   <div style={{ padding: "20px", fontWeight: 600, color: "#18191D" }}>
                //     Creating New Publication ...
                //   </div>
                // </div>
                <div
                    style={{
                        height: window.innerHeight,
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
                            marginBottom: "40px",
                            fontWeight: 600,
                            color: "#18191D",
                            fontSize: "20px",
                        }}
                    >
                        Adding New Sub Category...
                    </div>
                </div>
            ) : (
                getContent()
            )}
        </>
    );
};

export default NewSubCategory;
