const express = require('express');
const router = express.Router();
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const publicationDetails = require('../models/pub_publication_detail');
const videoRead = require('../models/pub_video_read');
const userVideoBonus = require('../models/pub_user_video_bonus');


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

    let videoBonus

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.fiveVideoRead == undefined) {
            videoBonus = 0
        }
        videoBonus = publicationData.fiveVideoRead
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


    let videoReadData = await videoRead.find({ user_id: req.body.user_id, publication_id: req.body.publication_id, date: today })
    // console.log(articleReadData.length);



    let userVideoBonusData = await userVideoBonus.findOne({ user_id: req.body.user_id, publication_id: req.body.publication_id, date: today });
    if (userVideoBonusData) {
        res.json({
            status: false,
            message: 'User already read 5 videos',
            previousBalance,
            newBalance: previousBalance
        })
    } else {
        if (videoReadData.length == 5) {
            userVideoBonus.create({
                user_id: req.body.user_id,
                publication_id: req.body.publication_id,
                date: today,
                points: videoBonus,
            }).then((data) => {
                res.json({
                    status: true,
                    message: 'User video bonus added',
                    previousBalance,
                    newBalance: parseInt(previousBalance) + parseInt(videoBonus)
                })
            }).catch((err) => {
                res.json({
                    status: false,
                    message: 'Error while adding user video bonus'
                })
            })
        } else {
            return res.json({
                status: false,
                message: 'User has not read 5 videos'
            })
        }
    }
})

module.exports = router;
