import React, { useContext, useEffect, useState } from "react";

import classNames from "./questions.module.scss";
import { GlobalContex } from "../../globalContext";
import axios from "axios";
import { useNavigate } from "react-router";
import useWindowDimensions from "../../services/WindowSize";

const Questions = ({ allQuestions, type }) => {
  return (
    <div>
      {allQuestions?.length > 0 &&
        allQuestions?.map((eachQues, index) => {
          return (
            <EachQuesAnswer
              {...eachQues}
              key={eachQues?.question + index}
              type={type}
            />
          );
        })}
    </div>
  );
};

export default Questions;

const EachQuesAnswer = ({ question, options, _id, type }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [pointsGot, setPointsGot] = useState("");
  const [gotResponse, setGotResponse] = useState("");
  const [balances, setBalances] = useState({
    newBalance: "",
    previousBalance: "",
  });
  const { userProfile, loginData, setRegisterUser } = useContext(GlobalContex);

  const responses = [
    {
      title: "Congratulations",
      response1:
        "You have selected the correct answer and you have claimed earned ",
      response2: " W3T Point From This Question.",
      balance1: "Previous Balance",
      balance2: "Updated Balance",
      btn1: "Go To Players App",
      btn2: "Keep Earning",
    },
    {
      title: "Nice Try",
      response1:
        "But you have already tried to answer the question for this article. Unfortunately you can only submit one answer",
      btn1: "Close",
    },
    {
      title: "Don’t Worry",
      response1:
        "Unfortunately that is not the correct answer. Worry not, there are many more articles and questions for you to try again.",
      btn1: "Close",
    },
  ];

  function submitAnswer() {
    // setGotResponse(responses[0]);
    // setPointsGot(5);
    let obj = {
      user_id: userProfile?._id,
      question_id: _id,
      publication_id: "638dd769b257b3715a8fbe07",
      answer: selectedAnswer,
    };
    // console.log(obj, "answer objj");

    let url;

    if (type == "video") {
      url = "https://publications.apimachine.com/uservideoanswers/new";
    } else {
      url = "https://publications.apimachine.com/userarticleanswers/new";
    }

    axios
      .post(url, obj)
      .then((response) => {
        let res = response?.data;
        // console.log(response?.data, "submit answer response");
        if (!res?.status) {
          setGotResponse(responses[1]);
        } else if (res?.status && res?.data?.is_correct) {
          setGotResponse(responses[0]);
          setBalances({
            newBalance: res?.newBalance,
            previousBalance: res?.previousBalance,
          });
          setPointsGot(res?.data?.points);
        } else if (res?.status && !res?.data?.is_correct) {
          setGotResponse(responses[2]);
        }
      })
      .catch((error) => {
        console.log(error?.message, "submit answer error");
      });
  }

  useEffect(() => {
    if (selectedAnswer) {
      submitAnswer();
    }
  }, [selectedAnswer]);

  return (
    <div
      className={` ${classNames.eachQuesAnswer} ${
        width > 900 || width > height ? "" : classNames.eachQuesAnswerMobile
      }`}
    >
      <div className={classNames.title}>{question}</div>
      <div className={classNames.options}>
        {options?.length > 0 &&
          options?.map((eachoption, index) => {
            return (
              <div
                key={eachoption?.option + index}
                onClick={() => {
                  if (!loginData) {
                    setRegisterUser("");
                  } else {
                    setSelectedAnswer(eachoption?.option);
                  }
                }}
                style={{
                  background:
                    eachoption?.option == selectedAnswer && gotResponse
                      ? "#4b2a91"
                      : "",
                  color:
                    eachoption?.option == selectedAnswer && gotResponse
                      ? "#ffffff"
                      : "",
                }}
              >
                {index + 1 + ". "}
                {eachoption?.option}
              </div>
            );
          })}
      </div>
      {gotResponse?.title == "Congratulations" ? (
        <div className={classNames.resultDiv}>
          <div className={classNames.result}>
            <div className={classNames.title}>{gotResponse?.title}</div>
            <div className={classNames.response}>
              {gotResponse?.response1}
              {pointsGot ? pointsGot : ""} {gotResponse?.response2}
            </div>
            <div className={classNames.balances}>
              <div>
                <span>{gotResponse?.balance1}</span>

                <span>
                  {balances?.previousBalance
                    ? balances?.previousBalance?.toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div>
                <span>{gotResponse?.balance2}</span>
                <span>
                  {balances?.newBalance
                    ? balances?.newBalance?.toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div
              className={classNames.btnDiv}
              style={{ flexDirection: "column" }}
            >
              <div
                className={classNames.purpleBtn}
                onClick={() => {
                  navigate("/earn/ads");
                  setGotResponse("");
                }}
              >
                {gotResponse?.btn1}
              </div>
              <div
                className={classNames.blackBtn}
                onClick={() => setGotResponse("")}
              >
                {gotResponse?.btn2}
              </div>
            </div>
          </div>
          <div
            className={classNames.overlay}
            onClick={() => setGotResponse("")}
          ></div>
        </div>
      ) : gotResponse ? (
        <div className={classNames.resultDiv}>
          <div className={classNames.result}>
            <div className={classNames.title}>{gotResponse?.title}</div>
            <div className={classNames.response}>{gotResponse?.response1}</div>
            <div className={classNames.btnDiv}>
              <div
                className={classNames.purpleBtn}
                onClick={() => setGotResponse("")}
              >
                {gotResponse?.btn1}
              </div>
            </div>
          </div>
          <div
            className={classNames.overlay}
            onClick={() => setGotResponse("")}
          ></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
