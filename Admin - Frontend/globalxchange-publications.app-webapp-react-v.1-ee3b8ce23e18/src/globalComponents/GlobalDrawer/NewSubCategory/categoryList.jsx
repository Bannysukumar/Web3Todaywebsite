import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Skeleton from "react-loading-skeleton";
import { GlobalContex } from "../../../globalContex";
// import { useAppsList } from "../../../queryHooks";
import defaultImg from "../../../static/images/icons/defaultImg.svg";

const CategoryList = ({ categories, setCategories, onClose }) => {
  // const { data: allapps, isLoading: allappsLoading } = useAppsList();
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { selectedPublication } = useContext(GlobalContex);

  const getAllApps = async () => {
    setLoading(true);
    const { data } = await axios
      .get(
        `https://publications.apimachine.com/category/publication/${selectedPublication?._id}`
      )
      // .get("https://publications.apimachine.com/navbar")
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || error.message || "API Error"
        );
      });
    if (!data?.status) {
      throw new Error(data?.message);
    } else {
    console.log(data.data)
      setLoading(false);
      setAllCategories(data.data);
    }
  };

  useEffect(() => {
    getAllApps();
  }, []);

  return (
    <Fragment>
      <div className="titleOp">Add Cateogry</div>
      <div className="searchWrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Cateogry....|"
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
          : allCategories
              .filter((o) =>
                o.title?.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <div
                  style={{
                    opacity: categories.find((o) => o.title === item.title)
                      ? 0.5
                      : 1,
                  }}
                  className="user"
                  key={item._id}
                  onClick={() => {
                    if (categories.find((o) => o.title === item.title)) {
                      onClose();
                    } else {
                      setCategories([...categories, item]);
                      onClose();
                    }
                  }}
                >
                  <img
                    className="dp"
                    src={item?.thumbnail ? item?.thumbnail : defaultImg}
                    alt=""
                  />
                  <div className="userDetail">
                    <div className="name">{item?.title}</div>
                    <div className="email">{item?._id}</div>
                  </div>
                </div>
              ))}
        <div className="space"></div>
      </Scrollbars>
      {/* <div className="ftBtns">
        <div className="newField" onClick={() => onClose()}>
          Go Back
        </div>
        <div className="btnSubmit" onClick={() => onClose()}>
          Submit
        </div>
      </div> */}
    </Fragment>
  );
};

export default CategoryList;
