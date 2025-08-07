// Package Imports
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// CSS Imports

// Context Imports
import { GlobalContex } from "../../globalContex";

// Image Imports

//cPage/Component Imports

import MobileMenu from "../../globalComponents/MobileMenu";
import Publishers from "../../Apps/Publishers";
import Authors from "../../Apps/Authors";
import Classrooms from "../../Apps/Classrooms";

const HomePage = () => {
  const { loginData, setBankerTag, setBanker, showMobileMenu } =
    useContext(GlobalContex);

  useEffect(() => {
    axios
      .get(
        "https://teller2.apimachine.com/banker/details",

        {
          headers: {
            email: loginData.user.email,
            token: loginData.idToken,
          },
        }
      )
      .then(({ data }) => {
        if (!localStorage.getItem("bankerTag")) {
          // console.log(res.data, "jhffjy");
          localStorage.setItem("bankerTag", data?.data?.bankerTag);
          setBankerTag(data?.data?.bankerTag);

          localStorage.setItem("banker", JSON.stringify(data?.data));
          setBanker(data?.data);
        }
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="Publishers" element={<Publishers />} />
        <Route path="Authors" element={<Authors />} />
        <Route path="Classrooms" element={<Classrooms />} />
      </Routes>
    </>
  );
};

export default HomePage;
