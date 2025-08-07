const express = require('express');
const router = express.Router();
const actionTrack = require('../models/pub_action_track');
const publication = require('../models/pub_publication_detail');
const article = require('../models/pub_article');
const userPoints = require('../models/pub_user_points');
const actionTrackController = require('../controllers/pub_action_track_controller');
const axios = require('axios');


//add points to user
router.post("/add", async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            status: false,
            message: "User id is required"
        })
    }
    let userTrackDetails = await axios.get(`https://publications.apimachine.com/action/user?user_id=${req.body.user_id}`);
    userTrackDetails = userTrackDetails.data.data;
    if (userTrackDetails) {
        //fetch application ids and duration from user track details
        let userData = [];
        userTrackDetails.detail.forEach(element => {
            if (element.articleDetails.application_id == req.body.application_id) {
                userData.push({ application_id: element.articleDetails.application_id, duration: element.total_duration, article_id: element.article_id });
            }
        });

        if (userData.length == 0) {
            return res.json({
                status: false,
                message: "No data found for this publication"
            })
        }

        let PublicationDetail = await publication.findOne({ fxa_app_id: req.body.application_id });
        if (!PublicationDetail) return res.json({
            status: false,
            message: "Publication not found"
        })
        let userPointsDetail = await userPoints.findOne({ user_id: req.body.user_id, application_id: req.body.application_id });
        let theRewardPoints
        if (!PublicationDetail.rewardPoints) {
            theRewardPoints = 0
        } else {
            theRewardPoints = PublicationDetail.rewardPoints
        }

        let articlePointsData = []
        userData.forEach(element => {
            articlePointsData.push({
                application_id: element.application_id,
                article_id: element.article_id,
                duration: element.duration,
                minutes_read: Math.floor(element.duration / 60000),
                points: parseInt(theRewardPoints) * Math.floor(element.duration / 60000)
            })
        })
        if (userPointsDetail) {
            userPoints.updateOne({ user_id: req.body.user_id, application_id: req.body.application_id }, {
                $set: {
                    total_articles_data: articlePointsData,
                    total_points: articlePointsData.reduce((a, b) => a + (b.points || 0), 0)
                }
            }).then((data) => {
                return res.json({
                    status: true,
                    message: "Points updated successfully"
                })
            })
        } else {
            userPoints.create({
                user_id: req.body.user_id,
                application_id: req.body.application_id,
                total_articles_data: articlePointsData,
                total_points: articlePointsData.reduce((a, b) => a + (b.points || 0), 0)
            }).then((data) => {
                return res.json({
                    status: true,
                    message: "Points added successfully",
                    data: data
                })
            })
                .catch((err) => {
                    return res.json({
                        status: false,
                        message: "Error while adding points",
                        error: err
                    })
                })
        }
    } else {
        return res.json({
            status: false,
            message: "User data not found"
        })
    }
});

//get points of user
router.get("/get", async (req, res) => {

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
        let publicationExist = await publication.findOne({ _id: req.query.publication_id });
        if (publicationExist) {
            filter.application_id = publicationExist.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }
    userPoints.find(filter).then((data) => {
        if(data.length == 0){
            return res.json({
                status: false,
                message: "No data found"
            })
        }
         res.json({
            status: true,
            total_records: data.length,
            message: "Points fetched successfully",
            data: data
        })
    })
        .catch((err) => {
            return res.json({
                status: false,
                message: "Error while fetching points",
                error: err
            })
        }
        )
})


module.exports = router;