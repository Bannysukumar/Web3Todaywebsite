const express = require('express');
const router = express.Router();
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const video = require('../models/pub_video');
const videoRead = require('../models/pub_video_read');
const publicationDetails = require('../models/pub_publication_detail');

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

    let videoData = await video.findOne({ _id: req.body.video_id });
    if (!videoData) {
        return res.json({
            status: false,
            message: 'Video not found'
        })
    }

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.videoRead == undefined) {
            videoPoints = 0
        }
        videoPoints = publicationData.videoRead
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

    // console.log(previousBalance)

    let condition = {
        user_id: req.body.user_id,
        video_id: req.body.video_id,
        publication_id: req.body.publication_id,
        date: today
    }

    let videoReadData = await videoRead.findOne(condition);
    if (!videoReadData) {
        videoRead.create({
            video_id: req.body.video_id,
            publication_id: req.body.publication_id,
            date: today,
            user_id: req.body.user_id,
            readStats: "started",
        }).then((data) => {
            return res.json({
                status: true,
                message: 'started video read',
                previousBalance,
                newBalance: previousBalance
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while adding article read'
            })
        })
    } else {
        return res.json({
            status: false,
            message: 'Video read already started',
            previousBalance,
            newBalance: previousBalance
        })
    }
    // else {
    //     let conditionStarted = {
    //         ...condition,
    //         readStats: "started"
    //     }
    //     let videoReadDataStarted = await videoRead.findOne(conditionStarted);
    //     if (videoReadDataStarted) {
    //         videoRead.findOneAndUpdate(conditionStarted, {
    //             readStats: "completed",
    //             readCount: 1,
    //             points: videoPoints
    //         }).then((data) => {
    //             return res.json({
    //                 status: true,
    //                 message: 'Video read completed',
    //                 previousBalance,
    //                 newBalance: parseInt(previousBalance) + parseInt(videoPoints)
    //             })
    //         })
    //     } else {
    //         videoReadData.readCount = videoReadData.readCount + 1
    //         videoReadData.save()
    //         return res.json({
    //             status: true,
    //             message: 'updated video read count to user',
    //             previousBalance,
    //             newBalance: previousBalance
    //         })
    //     }
    // }
})

//get all video read

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

    if (req.query.video_id) {
        filter.video_id = req.query.video_id;
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
    if(req.query.readStats){
        filter.readStats = req.query.readStats;
    }



    videoRead.find(filter, null, { sort: { "createdAt": -1 } })
        .then((data) => {
            if (data.length > 0) {
                // console.log(data)
                //add all read count
                let readCount = 0
                data.forEach(element => {
                    readCount = readCount + element.readCount
                });
                //Fetch unique article count
                let uniqueVideo = []
                data.forEach(element => {
                    if (uniqueVideo.indexOf(element.video_id) == -1) {
                        uniqueVideo.push(element.video_id)
                    }
                });
                // console.log(uniqueArticle)
                // console.log(readCount)
                return res.json({
                    status: true,
                    message: 'Video read list',
                    count: data.length,
                    data: data,
                    TotalVideosRead: readCount,
                    TotalUniqueVideosRead: uniqueVideo.length
                })
            } else {
                return res.json({
                    status: false,
                    message: 'No video read list'
                })
            }
        }).catch((err) => {
            return res.json({
                status: false,
                message: err
            })
        })
})

router.put('/', async (req, res) => {
    let date = new Date();
    let today = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.videoRead == undefined) {
            videoPoints = 0
        }
        videoPoints = publicationData.videoRead
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
        video_id: req.body.video_id,
        publication_id: req.body.publication_id,
        date: today
    }
    let videoCheck = await videoRead.findOne(checkCondition);
    if (!videoCheck) {
        return res.json({
            status: false,
            message: 'User not started watching video'
        })
    }

    let condition = {
        ...checkCondition,
        readStats: "started",
    }
    let videoReadData = await videoRead.findOne(condition);
    if (videoReadData) {
        videoRead.findOneAndUpdate(condition, {
            readStats: "completed",
            readCount: 1,
            points: videoPoints
        }).then((data) => {
            return res.json({
                status: true,
                message: 'Video read completed',
                previousBalance,
                newBalance: parseInt(previousBalance) + parseInt(videoPoints)
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while adding video read'
            })
        })
    } else {
        videoCheck.readCount = videoCheck.readCount + 1
        videoCheck.save()
        return res.json({
            status: true,
            message: 'updated video read count to user',
            previousBalance,
            newBalance: previousBalance
        })
    }
})

module.exports = router;
