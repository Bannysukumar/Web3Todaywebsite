const express = require('express');
const router = express.Router();
const axios = require('axios');

const actionMiddleware = require("../middleware/pub_action_video_track_middleware");

const actionVideo = require('../models/pub_action_video_track');
const publications = require('../models/pub_publication_detail');

const getDateTime = async () => {
    return new Promise(async (resolve, reject) => {
        let date = new Date();
        date = date.toLocaleString("en-US", { timeZone: "America/New_York" });
        let timestamp = Date.now();

        return resolve({ date, timestamp });
    })

}

router.post('/create', async (req, res) => {
    try {
        let { date, timestamp } = await getDateTime();

        let condObj = {
            user_id: req.body.user_id,
            video_id: req.body.video_id,
            publication_id: req.body.publication_id,
            track_status: 'active',
        };
        let recordExist = await actionMiddleware.getAction({ condObj: condObj });
        if (recordExist.data) {
            res.json({ ...recordExist });
        } else {
            let recordObj = {
                ...condObj,
                startTimeStamp: timestamp,
            }
            let makeRecord = await actionMiddleware.createAction(recordObj);
            res.json({
                ...makeRecord,
            });
        }
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
        });
    }
});


router.post('/stop', async (req, res) => {
    try {
        let { date, timestamp } = await getDateTime();

        let condObj = {
            user_id: req.body.user_id,
            video_id: req.body.video_id,
            publication_id: req.body.publication_id,
            track_status: 'active',
        };
        let theRewardPoints
        let publicationDetail = await publications.findOne({ _id: req.body.publication_id });
        if(!publicationDetail){
            theRewardPoints = 0;
        }else{
            theRewardPoints = publicationDetail.rewardPoints;
        }
        let recordExist = await actionMiddleware.getAction({ condObj: condObj });
        if (recordExist.data) {
            // TODO get the timestamp difference
            let differenceTime = timestamp - recordExist.data.startTimeStamp;
            let updateObj = {
                $inc: { duration: differenceTime },
                scroll: req.body.scroll,
                track_status: 'stop',
                minutes_read: Math.floor(differenceTime / 60000),
                points: parseInt(theRewardPoints) * Math.floor(differenceTime / 60000)
            }

            let previousBalance = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
            if (previousBalance.data.status == false) {
                previousBalance = 0
            } else {
                previousBalance = previousBalance.data.totalPoints
            }

            let UpdateRecord = await actionMiddleware.updateAction({ condObj: condObj, updateObj: updateObj });
            res.json({
                ...UpdateRecord,
                previousBalance,
                newBalance: parseInt(previousBalance) + parseInt(updateObj.points)
            });
        } else {
            res.json({
                status: false,
                message: "Data not found / already stopped"
            })
        }
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
        });
    }
});


router.get('/', async (req, res) => {
    try {

        // let recordExist = await actionMiddleware.getAction({condObj:{track_status:['active', 'stop']}});
        let recordExist = await actionMiddleware.getallAction({ condObj: { track_status: ['active', 'stop'] } });
        res.json({
            ...recordExist,
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
        });
    }
});


//get all articles read by a user with time spent

router.get('/user', async (req, res) => {
    try {
        let objArray = [];
        if (req.query.user_id) {
            objArray.push({
                $match: {
                    user_id: req.query.user_id,
                    status: 'active'
                }
            });
        } else {
            // objArray.push({
            //     $match:{
            //         status:'active'
            //     }
            // });
            throw ({ message: 'user_id field is required' });
        }
        // console.log(objArray);
        objArray.push({
            $group: {
                _id: '$video_id',
                // data:{$push:'$$ROOT'},
                open_count: { $sum: 1 },
                total_duration: { $sum: '$duration' },
                total_minutes: { $sum: '$minutes_read' },
                total_points: { $sum: '$points' },
            }
        });
        objArray.push({
            $lookup: {
                from: "pub_videos",
                let: { "video_id": "$_id" },
                pipeline: [
                    {
                        $addFields: {
                            id: { "$toString": "$_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $eq: ["$id", "$$video_id"],
                            }
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            image: 1,
                            application_id: 1,
                            _id: 0,
                        },
                    },
                ],
                as: "videoDetails",
            },
        });
        objArray.push({
            $unwind: '$videoDetails'
        });
        objArray.push({
            $project: {
                video_id: '$_id',
                open_count: '$open_count',
                total_duration: '$total_duration',
                total_minutes: '$total_minutes',
                total_points: '$total_points',
                videoDetails: '$videoDetails',
                _id: 0,
            }
        });
        let recordDetail = await actionMiddleware.aggregateAction(objArray);
        let totalReadDuration = 0;
        totalReadDuration = recordDetail.data.reduce((total, obj) => obj.total_duration + total, 0);
        let total_video_open_count = 0;
        total_video_open_count = recordDetail.data.reduce((total, obj) => obj.open_count + total, 0);
        let total_video_watch_minutes = 0;
        total_video_watch_minutes = recordDetail.data.reduce((total, obj) => obj.total_minutes + total, 0);
        let total_video_watch_points = 0;
        total_video_watch_points = recordDetail.data.reduce((total, obj) => obj.total_points + total, 0);
        res.json({
            status: true,
            data: {
                detail: recordDetail.data,
                total_video: recordDetail.data.length,
                total_video_open_count,
                totalReadDuration,
                total_video_watch_minutes,
                total_video_watch_points,
            }
            // ...recordDetail,
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
        });
    }
});

router.get('/video', async (req, res) => {
    try {
        let objArray = [];
        if (req.query.video_id) {
            objArray.push({
                $match: {
                    video_id: req.query.video_id,
                    status: 'active'
                }
            });
        } else {
            // objArray.push({
            //     $match:{
            //         status:'active'
            //     }
            // });
            throw ({ message: 'user_id field is required' });
        }
        objArray.push({
            $group: {
                _id: '$user_id',
                // data:{$push:'$$ROOT'},
                open_count: { $sum: 1 },
                total_duration: { $sum: '$duration' },
            }
        });
        objArray.push({
            $lookup: {
                from: "pub_user_profiles",
                let: { "user_id": "$_id" },
                pipeline: [
                    {
                        $addFields: {
                            id: { "$toString": "$_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $eq: ["$id", "$$user_id"],
                            }
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            email: 1,
                            profile_pic: 1,
                            _id: 0,
                        },
                    },
                ],
                as: "userDetails",
            },
        });
        objArray.push({
            $unwind: '$userDetails'
        });
        objArray.push({
            $project: {
                user_id: '$_id',
                open_count: '$open_count',
                total_duration: '$total_duration',
                userDetails: '$userDetails',
                _id: 0,
            }
        });
        let recordDetail = await actionMiddleware.aggregateAction(objArray);
        // recordDetail.unique_user =recordDetail.data.length;
        let totalReadDuration = 0; //TODO sum from the data,
        totalReadDuration = recordDetail.data.reduce((total, obj) => obj.total_duration + total, 0);
        res.json({
            status: true,
            data: {
                detail: recordDetail.data,
                unique_user: recordDetail.data.length,
                totalReadDuration,
            }
            // ...recordDetail,
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
        });
    }
});

module.exports = router;