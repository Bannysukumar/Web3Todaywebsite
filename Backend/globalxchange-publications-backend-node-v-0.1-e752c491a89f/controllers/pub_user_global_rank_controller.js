const mongoose = require('mongoose');
const router = require('express').Router();
const axios = require('axios');
const cron = require('node-cron');
const userProfile = require('../models/pub_user_profile');
const PubUserGlobalRank = require('../models/pub_user_global_rank');

router.get('/list', async (req, res) => {
    if (!req.query.publication_id) {
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    }
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    }
    if (req.query.publication_id) {
        filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id);
    }
    if (req.query.user_id) {
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id);
    }
    if (req.query.email) {
        let userDetail = await userProfile.findOne({ email: req.query.email, status: "active" });
        if (userDetail) {
            filter.user_id = mongoose.Types.ObjectId(userDetail._id);
        } else {
            return res.json({
                status: false,
                message: "User not found"
            })
        }
    }
    if (req.query.username) {
        let userDetail = await userProfile.findOne({ username: req.query.username, status: "active" });
        if (userDetail) {
            filter.user_id = mongoose.Types.ObjectId(userDetail._id);
        } else {
            return res.json({
                status: false,
                message: "User not found"
            })
        }
    }
    // if(req.query.user_type){
    //     let userDetail = await userProfile.find({ user_type: req.query.user_type, status: "active" });
    //     if (userDetail) {
    //         filter.user_id = mongoose.Types.ObjectId(userDetail._id);
    //     }else{
    //         return res.json({
    //             status: false,
    //             message: "User not found"
    //         })
    //     }
    // }
    PubUserGlobalRank.find(filter, null, { sort: { "global_rank": 1 } })
        .then((result) => {
            if (result.length == 0) {
                return res.json({
                    status: false,
                    message: "No data found"
                })
            }
            return res.json({
                status: true,
                message: "User global rank list",
                data: result
            })
        }).catch((err) => {
            return res.json({
                status: false,
                message: "Something went wrong" + err
            })
        })
})


async function calculateRanks() {
    try {
        let userPointsData = await axios.get(`https://publications.apimachine.com/userpublication/?publication_id=638dd769b257b3715a8fbe07`)
        if (userPointsData.data.status) {
            userPointsData.data.data = userPointsData.data.data.sort((a, b) => {
                return b.total_points - a.total_points;
            });
            let currentRank = 1;
            const ranks = userPointsData.data.data.map((user, index) => {
                if (index > 0 && user.total_points < userPointsData.data.data[index - 1].total_points) {
                    currentRank = index + 1;
                }
                return {
                    user_id: user.userDetail[0]._id,
                    publication_id: "638dd769b257b3715a8fbe07",
                    points: user.total_points,
                    daily_points: user.userDailyPoints,
                    per_minute_article_points: user.userPerMinuteArticlePoints,
                    article_read_points: user.userArticleReads,
                    article_bonus_points: user.userBonusPoints,
                    per_minute_video_points: user.userPerMinuteVideoPoints,
                    video_read_points: user.userVideoReads,
                    video_bonus_points: user.userVideoBonus,
                    article_answer_points: user.userArticleAnswers,
                    video_answer_points: user.userVideoAnswers,
                    global_rank: currentRank,
                };
            })
            await PubUserGlobalRank.deleteMany();
            await PubUserGlobalRank.insertMany(ranks);
        }
    } catch (err) {
        console.log("err", err);
    }
}

cron.schedule('0 0 * * *', async () => {
    console.log('running a task every day at 12:00 AM');
    // Execute your asynchronous function here
    await calculateRanks();
});

module.exports = router;
