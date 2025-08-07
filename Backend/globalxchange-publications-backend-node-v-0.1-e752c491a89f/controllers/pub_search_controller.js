const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

const article = require('../models/pub_article');
const video = require('../models/pub_video');
const publication = require('../models/pub_publication_detail');

router.get('/', async (req, res, next) => {
    if(!req.query.query) {
        return res.json({
            status: false,
            message: "Please enter search query",
        })
    }
    if (req.query.query.length < 3) {
        return res.json({
            status: false,
            message: "Please enter atleast 3 characters",
        })
    }
    const search = req.query.query;
    const regex = new RegExp(search, 'i');
    const query = { $or: [{ title: regex }, { desc: regex }, { metatags: regex }, { keywords: regex }, { altTag: regex }] };
    // console.log(query)
    // const projection = { _id: 1, title: 1, desc: 1, image: 1, video: 1, action_link: 1, action: 1, metatags: 1, keywords: 1, joinTags: 1, joinKeywords: 1, altTag: 1, country: 1, status: 1, createdAt: 1, updatedAt: 1 };
    // const options = { sort: { createdAt: -1 } };
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter = { ...filter, ...query };
    if (req.query.publication_id) {
        let publicationDetail = await publication.findOne({ _id: req.query.publication_id });
        // console.log(publicationDetail)
        if (publicationDetail) {
            filter.application_id = publicationDetail.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "No publication found",
            })
        }

    }

    // console.log(filter)
    // console.log(query, projection, options)
    // const promise = article.find(filter).exec();
    const promise = article.aggregate([
        {
            $match: filter

        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { "user_id": "$user_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$user_id", "$_id"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            PublisherDetails: {
                                $push: { profile_pic: "$profile_pic", name: "$name" }
                            }
                        }
                    }
                ],
                as: "PublisherDetails"
            }
        },
        {
            $lookup: {
                from: "pub_navbars",
                let: { "navbar_id": "$navbar_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$navbar_id"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            navbar: {
                                $push: "$$ROOT"
                            }
                        }
                    }

                ],
                as: "navbar"
            }
        },
        {
            $lookup: {
                from: "pub_categories",
                let: { "categoryType": "$categoryType" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$categoryType"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            categoryType: {
                                $push: "$$ROOT"
                            }
                        }
                    }

                ],
                as: "categories"
            }
        }

    ])
    promise.then((docs) => {
        const promise = video.aggregate([
            {
                $match: {
                    ...filter,
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "pub_publisher_details",
                    let: { "user_id": "$user_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$$user_id", "$_id"]
                                }
                            }
                        },
                        {
                            $group: {
                                "_id": "$_id",
                                PublisherDetails: {
                                    $push: { profile_pic: "$profile_pic", name: "$name" }
                                }
                            }
                        }
                    ],
                    as: "PublisherDetails"
                }
            },
            {
                $lookup: {
                    from: 'pub_categories',
                    let: {
                        categories: '$categoryType',
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$categories"]
                            }
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            thumbnail: 1,
                        }
                    }
                    ],
                    as: "categoryDetail"
                }
            },
            {
                $lookup: {
                    from: 'pub_navbars',
                    let: {
                        navbars: '$navbar_id',
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$navbars"]
                            }
                        }
                    },
                    {
                        $project: {
                            navTitle: 1,
                            icon: 1,
                        }
                    }
                    ],
                    as: "navDetails"
                }
            }
        ])
        promise.then((docs2) => {
            if (docs.length > 0 || docs2.length > 0) {
                res.status(200).json({
                    status: true,
                    count: docs.length + docs2.length,
                    article_count: docs.length,
                    video_count: docs2.length,
                    articles: docs,
                    videos: docs2
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: 'No data found'
                });
            }
        }).catch((err) => {
            res.status(500).json({
                status: false,
                error: err
            });
        });
    }).catch((err) => {
        res.status(500).json({
            status: false,
            error: err
        });
    });
});

module.exports = router;