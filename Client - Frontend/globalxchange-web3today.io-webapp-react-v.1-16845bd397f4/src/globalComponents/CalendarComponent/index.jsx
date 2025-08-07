import React from "react";

const CalendarComponent = () => {
  //blah

  const getMonthDuration = (selectedMonthIndex) => {
    // console.log(selectedMonthIndex, ":kjwbkwe");
    if (thirtyDays.find((o) => o === selectedMonthIndex)) {
      if (selectedMonthIndex !== 1) {
        return 30;
      } else {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          return 29;
        } else {
          return 28;
        }
      }
    } else {
      return 31;
    }
  };

  const handleDaySelection = (index) => {
    const prevDate =
      getMonthDuration(monthIndex - 1) - firstDay + index <= 31
        ? getMonthDuration(monthIndex - 1) - firstDay + index
        : 0;
    const currentDate =
      getMonthDuration(monthIndex) + firstDay >= index ? index - firstDay : 0;
    const nextDate =
      index > getMonthDuration(monthIndex) + firstDay
        ? index - getMonthDuration(monthIndex) - firstDay
        : 0;

    if (prevDate !== 0) {
      setSelectedDay({
        dateNumber: `${monthIndex === 0 ? 12 : monthIndex}/${prevDate}/${
          monthIndex === 0 ? year - 1 : year
        }`,
        day: ``,
        date: prevDate,
      });
    } else if (currentDate !== 0) {
      setSelectedDay({
        dateNumber: `${monthIndex + 1}/${currentDate}/${year}`,
        day: ``,
        date: currentDate,
      });
    } else if (nextDate !== 0) {
      setSelectedDay({
        dateNumber: `${monthIndex === 11 ? 1 : monthIndex + 2}/${nextDate}/${
          monthIndex === 11 ? year + 1 : year
        }`,
        day: ``,
        date: nextDate,
      });
    }
  };

  return (
    <>
      <div>
        {Array(35)
          .fill("")
          .map((item, index) => {
            return (
              <div
                style={{ textAlign: "center" }}
                onClick={(e) => handleDaySelection(index)}
              >
                <div
                  style={{
                    height: (window.innerHeight - 183) / 5,
                    border: "0.5px solid var(--bordercolor-main)",
                    borderWidth: "0px 0.5px 0.5px 0px",
                  }}
                >
                  {/* days */}
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      paddingTop: "10px",
                    }}
                  >
                    {index < 7 ? <div>{allDays[index]}</div> : ""}
                  </div>
                  {/* Previous Month Dates */}
                  {index <= firstDay ? (
                    <>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                        }}
                      >
                        {getMonthDuration(monthIndex - 1) - firstDay + index}
                      </div>
                      <div
                        style={{
                          padding: "15px 18px",
                          overflowY: "scroll",
                          height:
                            index < 7
                              ? (window.innerHeight - 140) / 8
                              : (window.innerHeight - 140) / 9,
                        }}
                      >
                        {loading ? (
                          <>
                            <Skeleton className="name" width="100%" />
                            <Skeleton className="email" width="100%" />
                          </>
                        ) : (
                          getPreviousData(
                            getMonthDuration(monthIndex - 1) - firstDay + index
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {/* Current Month Dates */}
                  {index > firstDay &&
                  getMonthDuration(monthIndex) + firstDay >= index ? (
                    <>
                      <div
                        style={{
                          // paddingTop: "5px",
                          fontSize: "10px",
                          fontWeight: 700,
                        }}
                      >
                        {index - firstDay}
                      </div>
                      <div
                        style={{
                          padding: "15px 18px",
                          overflowY: "scroll",
                          height:
                            index < 7
                              ? (window.innerHeight - 140) / 8
                              : (window.innerHeight - 140) / 7,
                        }}
                      >
                        {loading ? (
                          <>
                            <Skeleton className="name" width="100%" />
                            <Skeleton className="email" width="100%" />
                          </>
                        ) : (
                          getData(index - firstDay)
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {/* Next Month Dates */}
                  {index > getMonthDuration(monthIndex) + firstDay ? (
                    <>
                      <div
                        style={{
                          paddingTop: "5px",
                          fontSize: "10px",
                          fontWeight: 700,
                        }}
                      >
                        {index - getMonthDuration(monthIndex) - firstDay}
                      </div>
                      <div
                        style={{
                          padding: "15px 18px",
                          overflowY: "scroll",
                          height: (window.innerHeight - 140) / 7,
                        }}
                      >
                        {loading ? (
                          <>
                            <Skeleton className="name" width="100%" />
                            <Skeleton className="email" width="100%" />
                          </>
                        ) : (
                          getNextData(
                            index - getMonthDuration(monthIndex) - firstDay
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CalendarComponent;
