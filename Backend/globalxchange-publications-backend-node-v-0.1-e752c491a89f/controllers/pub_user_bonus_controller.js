const express = require('express');
const router = express.Router();
const axios = require('axios');

const userDetails = require('../models/pub_user_profile');
const publicationDetails = require('../models/pub_publication_detail');
const articleRead = require('../models/pub_article_read');
const userBonus = require('../models/pub_user_bonus');

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

    let articleBonus

    let publicationData = await publicationDetails.findOne({ _id: req.body.publication_id });
    if (publicationData) {
        if (publicationData.fiveArticleRead == undefined) {
            articleBonus = 0
        }
        articleBonus = publicationData.fiveArticleRead
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




    let articleReadData = await articleRead.find({ user_id: req.body.user_id, publication_id: req.body.publication_id, date: today })
    // console.log(articleReadData.length);



    let userBonusData = await userBonus.findOne({ user_id: req.body.user_id, publication_id: req.body.publication_id, date: today });
    if (userBonusData) {
        res.json({
            status: false,
            message: 'User already read 5 articles',
            previousBalance,
            newBalance: previousBalance
        })
    } else {
        if (articleReadData.length == 5) {
            userBonus.create({
                user_id: req.body.user_id,
                publication_id: req.body.publication_id,
                date: today,
                points: articleBonus
            }).then((data) => {
                res.json({
                    status: true,
                    message: 'User bonus added',
                    previousBalance,
                    newBalance: parseInt(previousBalance) + parseInt(articleBonus)
                })
            }).catch((err) => {
                res.json({
                    status: false,
                    message: 'Error while adding user bonus'
                })
            })
        } else {
            return res.json({
                status: false,
                message: 'User has not read 5 articles'
            })
        }
    }
})

// get bonus
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.user_id) {
        filter.user_id = req.query.user_id
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id
    }
    if (req.query.date) {
        filter.date = req.query.date
    }

    userBonus.find(filter, null, { sort: { "createdAt": -1 } }).then((data) => {
        if (data.length > 0) {
            res.json({
                status: true,
                message: 'Bonus data fetched',
                data: data
            })
        } else {
            res.json({
                status: false,
                message: 'No bonus found'
            })
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: 'Error while getting bonus'
        })
    })

})



module.exports = router;

