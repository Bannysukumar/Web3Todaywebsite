const router = require('express').Router();
const userProfile = require('../models/pub_user_profile');
const publication = require('../models/pub_publication_detail');
const userSubscription = require('../models/pub_user_subscription');
const pub_user_subscription = require('../models/pub_user_subscription');
const mongoose = require('mongoose');
// var fcm = require('fcm-notification');

router.post('/add', async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            status: false,
            message: "User id is required"
        })
    }

    let userDetail = await userProfile.findOne({ _id: req.body.user_id });
    if (!userDetail) {
        return res.json({
            status: false,
            message: "User not found"
        })
    }

    if (!req.body.publication_id) {
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    }
    let publicationDetail = await publication.findOne({ _id: req.body.publication_id });
    if (!publicationDetail) {
        return res.json({
            status: false,
            message: "Publication not found"
        })
    }

    userSubscription.create({
        user_id: req.body.user_id,
        publication_id: req.body.publication_id,
        article_subscription: req.body.article_subscription,
        video_subscription: req.body.video_subscription
    }).then((result) => {
        return res.json({
            status: true,
            message: "Subscription added successfully",
            data: result
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});


router.get('/list', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    }
    if (req.query.user_id) {
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id);
    }
    if (req.query.publication_id) {
        filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id);
    }
    if (req.query.email) {
        let userDetail = userProfile.findOne({ email: req.query.email, status: "active" });
        if (userDetail) {
            filter.user_id = mongoose.Types.ObjectId(userDetail._id);
        } else {
            return res.json({
                status: false,
                message: "User not found"
            })
        }
    }

    pub_user_subscription.find(filter, null, { sort: { "createdAt": -1 } })
        .then((result) => {
            if (result.length == 0) {
                return res.json({
                    status: false,
                    message: "No data found"
                })
            }
            return res.json({
                status: true,
                total: result.length,
                data: result
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: "Something went wrong" + err
            })
        })
});

module.exports = router;