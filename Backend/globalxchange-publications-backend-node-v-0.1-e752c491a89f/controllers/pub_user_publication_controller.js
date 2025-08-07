const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userProfile = require('../models/pub_user_profile')
const publication = require('../models/pub_publication_detail')
const userPublication = require('../models/pub_user_publication')
const userSignupPoints = require('../models/pub_user_signup_points')


//Add publications to user profile
router.post('/', async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            status: false,
            message: 'User Id is required',
        });
    }
    // let userEmail
    // let userDetail = await userProfile.findOne({ _id: req.body.user_id })
    // if (!userDetail) {
    //     return res.json({
    //         status: false,
    //         message: 'User does not exist',
    //     });
    // } else {
    //     userEmail = userDetail.email
    // }
    let publicationDetail = await publication.find({ _id: { $in: req.body.publication_ids } });
    if (publicationDetail.length !== req.body.publication_ids.length) {
        return res.json({
            status: false,
            message: 'Publication does not exist',
        });
    }
    let userSignUpData = await userSignupPoints.findOne({ user_id: req.body.user_id, publication_id: req.body.publication_ids[0] });
    if (userSignUpData) {
      return res.json({
        status: false,
        message: 'User already added'
      })
    }

    let userPublicationDetail = await userPublication.findOne({ user_id: req.body.user_id })
    if (userPublicationDetail) {
        let signupData = await userSignupPoints.create({
            email: req.body.email,
            user_id: req.body.user_id,
            publication_id: req.body.publication_ids[0],
            points: publicationDetail[0].signUpBonus,
        })
        userPublication.findOneAndUpdate({ user_id: req.body.user_id, status: "active" }, { $addToSet: { publication_ids: { $each: req.body.publication_ids } } })
            .then(userDetails => {
                if (userDetails) {
                    res.json({
                        status: true,
                        message: 'Joined publications successfully',
                        signupData
                    })
                } else {
                    res.json({
                        status: true,
                        message: 'publication not found'
                    })
                }
            }).catch(err => {
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        let signupData = await userSignupPoints.create({
            user_id: req.body.user_id,
            publication_id: req.body.publication_ids[0],
            points: publicationDetail[0].signUpBonus,
        })
        userPublication.create({
            user_id: req.body.user_id,
            publication_ids: req.body.publication_ids,
            email: req.body.email
        }).then(userPubDetail => {
            res.json({
                status: true,
                message: "Publication added to the user successfully",
                signupData
            })
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            });
        });
    }
})


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
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id)
    }
    if (req.query.email) {
        let userDetail = await userProfile.findOne({ email: req.query.email, status: "active" })
        if (!userDetail) {
            return res.json({
                status: false,
                message: 'User does not exist',
            });
        }
        filter.email = req.query.email
    }
    if (req.query.publication_id) {
        filter.publication_ids = mongoose.Types.ObjectId(req.query.publication_id)
    }
    console.log(filter)
    //fetch user profile details using aggregation
    userPublication.aggregate(
        [{
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_user_profiles",
                let: { "user_id": "$user_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$user_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                ]
                ,
                as: "userDetail"
            }
        },
        {
            $lookup: {
                from: "pub_publication_details",
                let: { "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            publicationDetail: { $first: "$$ROOT" }
                        }
                    }
                ],
                as: "publicationDetail"
            },
        },
        {
            $lookup: {
                from: "pub_user_signup_points",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                ],
                as: "userSignupPoints"
            }
        },
        {
            $lookup: {
                from: "pub_user_daily_points",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userDailyPoints"
            },
        },
        {
            $lookup: {
                from: "pub_action_tracks",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        },
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userPerMinuteArticlePoints"
            },
        },
        {
            $lookup: {
                from: "pub_article_reads",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userArticleReads"
            }
        },
        {
            $lookup: {
                from: "pub_user_bonus",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        },
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userBonusPoints"
            }
        },
        {
            $lookup: {
                from: "pub_action_video_tracks",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        },
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userPerMinuteVideoPoints"
            }
        },
        {
            $lookup: {
                from: "pub_video_reads",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        },
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userVideoReads"
            }
        },
        {
            $lookup: {
                from: "pub_user_video_bonus",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userVideoBonus"
            }
        },
        {
            $lookup: {
                from: "pub_user_article_answers",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userArticleAnswers"
            }
        },
        {
            $lookup: {
                from: "pub_user_video_answers",
                let: { "user_id": "$user_id", "publication_id": mongoose.Types.ObjectId(req.query.publication_id) },
                pipeline: [
                    {
                        $addFields: {
                            user_id: { $toObjectId: "$user_id" },
                            publication_id: { $toObjectId: "$publication_id" },
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] },
                                    { $eq: ["$publication_id", "$$publication_id"] }
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$user_id",
                            publication_id: { $first: "$publication_id" },
                            points: { $sum: "$points" }
                        }
                    }
                ],
                as: "userVideoAnswers"
            }
        },
        {
            $project: {
                _id: 1,
                userDetail: 1,
                publication_ids: 1,
                publicationDetail: 1,
                status: 1,
                userSignupPoints: { $arrayElemAt: ["$userSignupPoints.points", 0] },
                userDailyPoints: { $arrayElemAt: ["$userDailyPoints.points", 0] },
                userPerMinuteArticlePoints: { $arrayElemAt: ["$userPerMinuteArticlePoints.points", 0] },
                userArticleReads: { $arrayElemAt: ["$userArticleReads.points", 0] },
                userBonusPoints: { $arrayElemAt: ["$userBonusPoints.points", 0] },
                userPerMinuteVideoPoints: { $arrayElemAt: ["$userPerMinuteVideoPoints.points", 0] },
                userVideoReads: { $arrayElemAt: ["$userVideoReads.points", 0] },
                userVideoBonus: { $arrayElemAt: ["$userVideoBonus.points", 0] },
                userArticleAnswers: { $arrayElemAt: ["$userArticleAnswers.points", 0] },
                userVideoAnswers: { $arrayElemAt: ["$userVideoAnswers.points", 0] },
                total_points: {
                    $sum: [
                        { $sum: "$userSignupPoints.points" },
                        { $sum: "$userDailyPoints.points" },
                        { $sum: "$userPerMinuteArticlePoints.points" },
                        { $sum: "$userArticleReads.points" },
                        { $sum: "$userBonusPoints.points" },
                        { $sum: "$userPerMinuteVideoPoints.points" },
                        { $sum: "$userVideoReads.points" },
                        { $sum: "$userVideoBonus.points" },
                        { $sum: "$userArticleAnswers.points" },
                        { $sum: "$userVideoAnswers.points" }
                    ]
                },
            }
        },
        {
            $sort: { "total_points": -1 }
        }
            // {
            //     $setWindowFields: {
            //        partitionBy: "$user_id",
            //        sortBy: { total_points: -1 },
            //        output: {
            //           rank: {
            //              $rank: {}
            //           }
            //        }
            //     }
            //  }
        ])
        .then(userDetail => {
            if (userDetail.length > 0) {
                res.json({
                    status: true,
                    total_count: userDetail.length,
                    data: userDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "No data found"
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
})


module.exports = router