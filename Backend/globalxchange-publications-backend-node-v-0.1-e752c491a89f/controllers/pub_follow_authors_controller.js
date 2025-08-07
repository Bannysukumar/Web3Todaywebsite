const express = require('express');
const router = express.Router();
const PubAuthors = require('../models/pub_follow_authors');
const mongoose = require('mongoose');

router.post('/followauthor', async (req, res) => {
    let DataCheck = await PubAuthors.findOne({ userEmail: req.body.userEmail,authorEmail:req.body.authorEmail, status: 'active' });
    if (DataCheck) {
        return res.json({
            status: false,
            message: "Already followed author"
        });
    }
    PubAuthors.create({
        userEmail: req.body.userEmail,
        authorEmail: req.body.authorEmail
    }).then((data) => {
        res.json({
            status: true,
            message: "Followed Author Successfully",
            data: data
        });
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//get all followers
router.get('/followers', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.userEmail) {
        filter.userEmail = req.query.userEmail;
    }

    if (req.query.authorEmail) {
        filter.authorEmail = req.query.authorEmail;
    }
    PubAuthors.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_user_profiles",
                let: { "email": "$userEmail" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$email", "$email"] },
                                    { $eq: ["$status", "active"] },
                                ],
                            }
                        }
                    },
                ],
                as: "userDetails"
            }
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { "email": "$authorEmail" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$email", "$email"] },
                                    { $eq: ["$status", "active"] },
                                ]
                            }
                        }
                    },
                ],
                as: "authorDetails"
            }
        }
    ]).then((data) => {
        // let firstData = data.filter((item) => {
        //     console.log(item._id.toString(), typeof item._id)
        //     return item._id.toString() === "6444dd4702a7ab41d6e5115d"
        // })
        // let filterData = data.filter((item) => {
        //     return item._id.toString() !== "6444dd4702a7ab41d6e5115d"
        // })
        if (data.length > 0) {
            res.json({
                status: true,
                message: "Data found",
                total_count: data.length,
                data
            });
        } else {
            res.json({
                status: false,
                message: "Data not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//unfollow author
router.put('/unfollow/:id', async (req, res) => {
    PubAuthors.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Unfollowed Author Successfully",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Data not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong",
            data: err
        });
    });
});


module.exports = router;