const express = require('express');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const article = require('../models/pub_article');
const articleRead = require('../models/pub_article_read');
const publicationDetails = require('../models/pub_publication_detail');
const signUpUserPoints = require('../models/pub_user_signup_points');
const dailypoints = require('../models/pub_user_daily_points');
const perMinuteUserPoints = require('../models/pub_action_track');
const userBonus = require('../models/pub_user_bonus');
const perMinuteVideoPoints = require('../models/pub_action_video_track');
const videoRead = require('../models/pub_video_read');
const videoBonus = require('../models/pub_user_video_bonus');
const userArticleAnswers = require('../models/pub_user_article_answers');
const userVideoAnswers = require('../models/pub_user_video_answers');
const globalRank = require('../models/pub_user_global_rank');
const convertedPoints = require('../models/pub_user_redeem_points');
const userPointsRequest = require('../models/pub_user_points_request');


router.post('/', async (req, res) => {
    let date = new Date();

    let userDataList = await userDetails.findOne({ _id: req.body.user_id });
    if (!userDataList) {
        return res.json({
            status: false,
            message: 'User not found'
        })
    }

    let today = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();

    let articleData = await article.findOne({ _id: req.body.article_id });
    if (!articleData) {
        return res.json({
            status: false,
            message: 'Article not found'
        })
    }

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.articleRead == undefined) {
            articlePoints = 0
        }
        articlePoints = publicationData.articleRead
    } else {
        return res.json({
            status: false,
            message: 'Publication not found'
        })
    }

    let previousBalance = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
    if (previousBalance.data.status == false) {
        previousBalance = 0
    } else {
        previousBalance = previousBalance.data.totalPoints
    }

    let condition = {
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        publication_id: req.body.publication_id,
        date: today
    }

    let articleReadData = await articleRead.findOne(condition);
    if (!articleReadData) {
        articleRead.create({
            article_id: req.body.article_id,
            publication_id: req.body.publication_id,
            date: today,
            user_id: req.body.user_id,
            readStats: "started",
        }).then((data) => {
            return res.json({
                status: true,
                message: 'Started article read',
                previousBalance,
                newBalance: parseInt(previousBalance) + parseInt(articlePoints)
            })
        }).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while adding article read'
            })
        })
    } else {
        return res.json({
            status: false,
            message: 'User already started reading article',
            previousBalance,
            newBalance: previousBalance
        })
    }
    // else {
    //     let conditionStarted = {
    //         ...condition,
    //         readStats: "started"
    //     }
    //     let articleReadDataStarted = await articleRead.findOne(conditionStarted);
    //     if (articleReadDataStarted) {
    //         articleRead.findOneAndUpdate(conditionStarted, {
    //             readCount: 1,
    //             points: articlePoints,
    //             readStats: "completed",
    //         }).then((data) => {
    //             return res.json({
    //                 status: true,
    //                 message: 'Completed reading article',
    //                 previousBalance,
    //                 newBalance: parseInt(previousBalance) + parseInt(articlePoints)
    //             })
    //         }
    //         ).catch((err) => {
    //             return res.json({
    //                 status: false,
    //                 message: 'Error while adding article read'
    //             })
    //         })
    //     } else {
    //         articleReadData.readCount = articleReadData.readCount + 1
    //         articleReadData.save()
    //         return res.json({
    //             status: true,
    //             message: 'updated article read count to user',
    //             previousBalance,
    //             newBalance: previousBalance
    //         })
    //     }
    // }
})

//get all article read

router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }

    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }

    if (req.query.article_id) {
        filter.article_id = req.query.article_id;
    }

    if (req.query.date) {
        filter.date = req.query.date;
    }
    if (req.query.from_date && req.query.to_date) {
        filter.updatedAt = {
            $gte: new Date(req.query.from_date),
            $lt: new Date(req.query.to_date)
        }
    }

    if (req.query.readStats) {
        filter.readStats = req.query.readStats;
    }


    articleRead.find(filter, null, { sort: { "createdAt": -1 } })
        .then((data) => {
            if (data.length > 0) {
                // console.log(data)
                //add all read count
                let readCount = 0
                data.forEach(element => {
                    readCount = readCount + element.readCount
                });
                //Fetch unique article count
                let uniqueArticle = []
                data.forEach(element => {
                    if (uniqueArticle.indexOf(element.article_id) == -1) {
                        uniqueArticle.push(element.article_id)
                    }
                });
                // console.log(uniqueArticle)
                // console.log(readCount)
                return res.json({
                    status: true,
                    message: 'Article read list',
                    count: data.length,
                    data: data,
                    TotalArticlesRead: readCount,
                    TotalUniqueArticlesRead: uniqueArticle.length
                })
            } else {
                return res.json({
                    status: false,
                    message: 'No article read list'
                })
            }
        }).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while getting article read list'
            })
        })
})

//update article read
router.put('/', async (req, res) => {
    let date = new Date();
    let today = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.articleRead == undefined) {
            articlePoints = 0
        }
        articlePoints = publicationData.articleRead
    } else {
        return res.json({
            status: false,
            message: 'Publication not found'
        })
    }

    let previousBalance = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
    if (previousBalance.data.status == false) {
        previousBalance = 0
    } else {
        previousBalance = previousBalance.data.totalPoints
    }

    let checkCondition = {
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        publication_id: req.body.publication_id,
        date: today
    }
    let articleCheck = await articleRead.findOne(checkCondition);
    if (!articleCheck) {
        return res.json({
            status: false,
            message: 'User not started reading article'
        })
    }

    let condition = {
        ...checkCondition,  
        readStats: "started"
    }
    let articleReadData = await articleRead.findOne(condition);
    if (articleReadData) {
        articleRead.findOneAndUpdate(condition, {
            readCount: 1,
            points: articlePoints,
            readStats: "completed",
        }).then((data) => {
            return res.json({
                status: true,
                message: 'Completed reading article',
                previousBalance,
                newBalance: parseInt(previousBalance) + parseInt(articlePoints)
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while adding article read'
            })
        })
    } else {
        articleCheck.readCount = articleCheck.readCount + 1
        articleCheck.save()
        return res.json({
            status: true,
            message: 'updated article read count to user',
            previousBalance,
            newBalance: previousBalance
        })
    }
    })


//get all final points for a user

router.get('/finalPoints', async (req, res) => {
    let publicationExist

    if (!req.query.user_id) {
        return res.json({
            status: false,
            message: "User Id Required"
        });
    }

    if (!req.query.publication_id) {
        return res.json({
            status: false,
            message: "Publication Id Required"
        });
    }

    let filter = {}
    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }

    let filter1 = {}
    if (req.query.user_id) {
        filter1.user_id = req.query.user_id;
    }
    if (req.query.publication_id) {
        publicationExist = await publicationDetails.findOne({ _id: req.query.publication_id });
        if (publicationExist) {
            filter1.application_id = publicationExist.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }

    let signUpData = signUpUserPoints.find(filter, null, { sort: { "createdAt": -1 } });
    let dailyPointsData = dailypoints.find(filter, null, { sort: { "createdAt": -1 } });
    let perMinutePointsData = perMinuteUserPoints.find(filter, null, { sort: { "createdAt": -1 } });
    let perMinuteVideoPointsData = perMinuteVideoPoints.find(filter, null, { sort: { "createdAt": -1 } });
    let articleReadData = articleRead.find(filter, null, { sort: { "createdAt": -1 } });
    let userBonusData = userBonus.find(filter, null, { sort: { "createdAt": -1 } });
    let videoReadData = videoRead.find(filter, null, { sort: { "createdAt": -1 } });
    let videoBonusData = videoBonus.find(filter, null, { sort: { "createdAt": -1 } });
    let userArticleAnswersData = userArticleAnswers.find(filter, null, { sort: { "createdAt": -1 } });
    let userVideoAnswersData = userVideoAnswers.find(filter, null, { sort: { "createdAt": -1 } });
    let globalRankData = await globalRank.find(filter, null, { sort: { "createdAt": -1 } });
    let convertedPointsData = await convertedPoints.find(filter, null, { sort: { "createdAt": -1 } });
    let isApprovedPoints = await userPointsRequest.find({ ...filter, is_approved: { $in: ["completed", "pending"] } }, null, { sort: { "createdAt": -1 } });
    console.log(convertedPointsData)

    if (convertedPointsData.length === 0) {
        convertedPointsData[0] = {
            converted_points: 0
        }
    }


    Promise.all([signUpData, dailyPointsData, perMinutePointsData, articleReadData, userBonusData, perMinuteVideoPointsData, videoReadData, videoBonusData, userArticleAnswersData, userVideoAnswersData]).then((data) => {
        return res.json({
            status: true,
            message: 'Final points list',
            signUpData: data[0],
            dailyPointsData: data[1],
            Last24HoursDailyPointsData: data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysDailyPointsData: data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            perMinuteArticlePointsData: data[2],
            Last24HoursPerMinuteArticlePoints: data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysPerMinuteArticlePoints: data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            articleReadData: data[3],
            Last24HoursArticleReadData: data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysArticleReadData: data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            userBonusData: data[4],
            Last24HoursUserBonusData: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysUserBonusData: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            perMinuteVideoPointsData: data[5],
            Last24HoursPerMinuteVideoPoints: data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysPerMinuteVideoPoints: data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            videoReadData: data[6],
            Last24HoursVideoReadData: data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysVideoReadData: data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            videoBonusData: data[7],
            Last24HoursVideoBonusData: data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysVideoBonusData: data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            userArticleAnswersData: data[8],
            Last24HoursUserArticleAnswersData: data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysUserArticleAnswersData: data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            userVideoAnswersData: data[9],
            Last24HoursUserVideoAnswersData: data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }),
            Last30DaysUserVideoAnswersData: data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }),
            totalSignUpPoints: data[0].reduce((a, b) => a + b.points, 0),
            totalDailyPoints: data[1].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalDailyPoints: data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalDailyPoints: data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalPerMinuteArticlePoints: data[2].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalPerMinuteArticlePoints: data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalPerMinuteArticlePoints: data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalPerMinuteVideoPoints: data[5].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalPerMinuteVideoPoints: data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalPerMinuteVideoPoints: data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalArticlePoints: data[3].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalArticlePoints: data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalArticlePoints: data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalArticleBonusPoints: data[4].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalArticleBonusPoints: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalArticleBonusPoints: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalBonusPoints: data[4].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalBonusPoints: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalBonusPoints: data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalVideoPoints: data[6].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalVideoPoints: data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalVideoPoints: data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalVideoBonusPoints: data[7].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalVideoBonusPoints: data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalVideoBonusPoints: data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalUserAnswerArticlePoints: data[8].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalUserAnswerArticlePoints: data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalUserAnswerArticlePoints: data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            totalUserAnswerVideoPoints: data[9].reduce((a, b) => a + b.points, 0),
            Last24HoursTotalUserAnswerVideoPoints: data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysTotalUserAnswerVideoPoints: data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last24HoursPoints: data[0].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(1, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            Last30DaysPoints: data[0].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[1].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[2].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[3].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[4].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[5].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[6].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[7].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[8].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0) + data[9].filter((item) => {
                return moment(item.updatedAt).isAfter(moment().subtract(30, 'days'))
            }).reduce((a, b) => a + b.points, 0),
            //add all points
            totalPoints: data[0].reduce((a, b) => a + b.points, 0) + data[1].reduce((a, b) => a + b.points, 0) + data[2].reduce((a, b) => a + b.points, 0) + data[3].reduce((a, b) => a + b.points, 0) + data[4].reduce((a, b) => a + b.points, 0) + data[5].reduce((a, b) => a + b.points, 0) + data[6].reduce((a, b) => a + b.points, 0) + data[7].reduce((a, b) => a + b.points, 0) + data[8].reduce((a, b) => a + b.points, 0) + data[9].reduce((a, b) => a + b.points, 0),
            convertedPoints: isApprovedPoints.reduce((a, b) => a + b.points_requested, 0),
            updatedPoints: data[0].reduce((a, b) => a + b.points, 0) + data[1].reduce((a, b) => a + b.points, 0) + data[2].reduce((a, b) => a + b.points, 0) + data[3].reduce((a, b) => a + b.points, 0) + data[4].reduce((a, b) => a + b.points, 0) + data[5].reduce((a, b) => a + b.points, 0) + data[6].reduce((a, b) => a + b.points, 0) + data[7].reduce((a, b) => a + b.points, 0) + data[8].reduce((a, b) => a + b.points, 0) + data[9].reduce((a, b) => a + b.points, 0) - isApprovedPoints.reduce((a, b) => a + b.points_requested, 0),
            globalRank: globalRankData[0]?.global_rank
        })
    }).catch((err) => {
        console.log(err)
        return res.json({
            status: false,
            message: err
        })
    })
})


module.exports = router;


