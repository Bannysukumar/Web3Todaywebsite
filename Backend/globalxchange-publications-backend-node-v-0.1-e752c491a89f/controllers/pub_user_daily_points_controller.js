const express = require('express');
const router = express.Router();
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const userDailyPoints = require('../models/pub_user_daily_points');
const publicationDetails = require('../models/pub_publication_detail');

router.post('/', async (req, res) => {
    let date = new Date();

    let userDataList = userDetails.findOne({ _id: req.body.user_id });
    if (!userDataList) {
        return res.json({
            status: false,
            message: 'User not found'
        })
    }

    // console.log(date.getDate());
    // console.log(("0" + (date.getMonth() + 1)).slice(-2));
    // console.log(date.getFullYear());

    let today = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();

    let userData = await userDailyPoints.findOne({ user_id: req.body.user_id, date: today, publication_id: req.body.publication_id });
    if (userData) {
        return res.json({
            status: false,
            message: 'User already logged in today'
        })
    }
    let userPoints
    let publication = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publication) {
        if (publication.dailyLogin == undefined) {
            userPoints = 0
        }
        userPoints = publication.dailyLogin
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



    userDailyPoints.create({
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        date: today,
        points: userPoints,
    }).then((data) => {
        return res.json({
            status: true,
            message: 'Added daily points to user',
            previousBalance,
            newBalance: parseInt(previousBalance) + parseInt(userPoints)
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: 'Error while adding user points'
        })
    })
});

//get user points
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

    userDailyPoints.find(filter, null, { sort: { "createdAt": -1 } })
        .then((data) => {
            if (data.length > 0) {
                return res.json({
                    status: true,
                    message: 'daily points fetched successfully',
                    data: data
                })
            } else {
                return res.json({
                    status: false,
                    message: 'No data found'
                })
            }
        }).catch((err) => {
            return res.json({
                status: false,
                message: 'Error while fetching data'
            })
        })
});

module.exports = router;