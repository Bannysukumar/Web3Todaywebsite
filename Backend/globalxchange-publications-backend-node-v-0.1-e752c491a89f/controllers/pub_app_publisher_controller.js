const express = require('express');
const router = express.Router();

const application = require('../models/pub_app_publisher');
const publication = require('../models/pub_publication_detail');
const publisher = require('../models/pub_publisher_detail');
const mongoose = require("mongoose")

// Register a publisher to application 
router.post('/', (req, res) => {
    if (req.body.bos_user_id && req.body.fxa_app_id) {
        application.findOneAndUpdate({ fxa_app_id: req.body.fxa_app_id }, { fxa_app_id: req.body.fxa_app_id, $addToSet: { bos_user_id: req.body.bos_user_id } }, { upsert: true })
            .then(userApps => {
                res.json({
                    status: true,
                    message: "Sucessfully added a publisher"
                });
            }).catch(err => {
                console.log("err====>", err.message);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    }
    else {
        res.json({
            status: false,
            message: "required field are missing"
        });
    }
});

// get all application publishers
router.get('/', (req, res) => {
    application.find({}, null, { sort: { "createdAt": -1 } })
        .then(userApps => {
            res.json({
                status: true,
                data: userApps
            });
        }).catch(err => {
            console.log("err====>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get a specific application's publishers by ID
router.get('/:id', (req, res) => {
    application.findOne({ _id: req.params.id })
        .then(userApps => {
            res.json({
                status: true,
                data: userApps
            });
        }).catch(err => {
            console.log("err====>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get a specific publisher's applications by bos_user_ID
router.get('/publisher/:id', (req, res) => {
    application.find({ bos_user_id: req.params.id }).select({ "fxa_app_id": 1 })
        .then(userApps => {
            res.json({
                status: true,
                data: userApps
            });
        }).catch(err => {
            console.log("err====>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//get all publications details for one author
router.get('/publisher/detail/:email', async (req, res) => {
    let filter = {}
    let publishedData = await publisher.findOne({ email: req.params.email, status: "active" })
    if (!publishedData) {
        return res.json({
            status: false,
            data: "publisher not found"
        });
    }
    // console.log(publishedData)
    filter.publishers = mongoose.Types.ObjectId(publishedData._id)

    if (req.query.publication_id) {
        if (!mongoose.Types.ObjectId.isValid(req.query.publication_id)) {
            return res.json({
                status: false,
                data: "Enter a valid Id"
            });
        } else {
            publicationDetail = await publication.findOne({ _id: req.query.publication_id })
            if (!publicationDetail) {
                return res.json({
                    status: false,
                    data: "publication not found"
                });
            }
            filter.fxa_app_id = mongoose.Types.ObjectId(publicationDetail.fxa_app_id)
        }
    }
    // application.find({ publishers: req.params.id })
    application.aggregate([
        {
            $match: filter
        },
        {
            $project: { "fxa_app_id": 1 }
        },
        {
            $lookup: {
                from: "pub_publication_details",
                let: { "fxa_app_id": "$fxa_app_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$fxa_app_id", "$fxa_app_id"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$fxa_app_id",
                            PublicationDetail: {
                                $push: "$$ROOT"
                            }
                        }
                    }
                ],
                as: "PublicationDetails"
            }
        }
    ])
        .then(userApps => {
            res.json({
                status: true,
                data: userApps
            });
        }).catch(err => {
            console.log("err====>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get a specific application's publishers by fxa_app_id
router.get('/application/:id', (req, res) => {
    application.findOne({ fxa_app_id: req.params.id })
        .then(userApps => {
            res.json({
                status: true,
                data: userApps
            });
        }).catch(err => {
            console.log("err====>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get a specific application's publishers by fxa_app_id
router.get('/publication/:id', (req, res) => {
    publication.findById(req.params.id)
        .then(publicationDetail => {
            if (!publicationDetail)
                return res.json({
                    status: false,
                    message: "couldn't find the given publication detail"
                });
            console.log("fxa_app_id====>", publicationDetail.fxa_app_id);
            application.findOne({
                fxa_app_id: publicationDetail.fxa_app_id
            })
                .then(async userApps => {
                    if (!userApps)
                        return res.json({
                            status: false,
                            message: "couldn't find the application for the given publication"
                        });
                    try {
                        let queryObj = {
                            _id: {
                                $in: userApps.publishers
                            }
                        }

                        let matchFilter = {}
                        if (req.query.atleastOneArticle) {
                            matchFilter = {
                                ...matchFilter, "ArticleDetails.ArticleDetail": { $gt: 0 }
                            }
                        }
                        if (req.query.atleastOneVideo) {
                            matchFilter = {
                                ...matchFilter, "VideoDetails.VideoDetail": { $gt: 0 }
                            }
                        }
                        if(req.query.atleastOneCaseStudy){
                            matchFilter = {
                                ...matchFilter, "CaseStudyDetails.CaseStudyDetail": { $gt: 0 }
                            }
                        }
                        if (req.query.email)
                            queryObj['email'] = req.query.email;
                        // console.log(matchFilter);
                        let publisherDetail = await publisher.aggregate([
                            {
                                $match: queryObj
                            },
                            {
                                $lookup: {
                                    from: "pub_articles",
                                    let: { "email": "$email" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$$email", "$email"] },
                                                        { $eq: ["$status", "active"] },
                                                        { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$email",
                                                ArticleDetail: {
                                                    $sum: 1
                                                }

                                            }
                                        },

                                    ],
                                    as: "ArticleDetails"
                                }
                            },
                            {
                                $lookup: {
                                    from: "pub_videos",
                                    let: { "email": "$email" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$$email", "$email"] },
                                                        { $eq: ["$status", "active"] },
                                                        { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$email",
                                                VideoDetail: {
                                                    $sum: 1
                                                }
                                            }
                                        }
                                    ],
                                    as: "VideoDetails"
                                }
                            },
                            {
                                $lookup: {
                                    from: "pub_casestudies",
                                    let: { "publisher_id": '$_id' },
                                    pipeline: [
                                        // {
                                        //     $addFields: {
                                        //         id: { "$toString": "$_id" },
                                        //         publisher_id: { "$toString": "$_id" }
                                        //     }
                                        // },
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ['$publisher_id', '$$publisher_id'] },
                                                        { $eq: ["$status", "active"] },
                                                        { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$publisher_id",
                                                CaseStudyDetail: {
                                                    $sum: 1
                                                }
                                            }
                                        }
                                    ],
                                    as: "CaseStudyDetails"
                                }
                            },
                            {
                                $match: matchFilter
                            }
                        ]);
                        // let publisherDetail = await publisher.find({bos_user_id:{$in:userApps.bos_user_id}});
                        // console.log("publisherDetail====",publisherDetail);
                        res.json({
                            status: true,
                            count: publisherDetail.length,
                            data: publisherDetail
                        });
                    } catch (e) {
                        res.json({
                            status: false,
                            message: e.message
                        });
                    }
                    // res.json({
                    //     status: true,
                    //     data: userApps
                    // });
                }).catch(err => {
                    console.log("err====>", err.message);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//Fetch all the publishers not present in the application
router.get('/notInPublication/:id', (req, res) => {
    publication.findById(req.params.id)
        .then(publicationDetail => {
            if (!publicationDetail)
                return res.json({
                    status: false,
                    message: "couldn't find the given publication detail"
                });
            application.findOne({
                fxa_app_id: publicationDetail.fxa_app_id
            })
                .then(async userApps => {
                    if (!userApps)
                        return res.json({
                            status: false,
                            message: "couldn't find the application for the given publication"
                        });
                    try {
                        let publisherDetail = await publisher.find({
                            _id: {
                                $in: userApps.publishers
                            }
                        });
                        // console.log("publisherDetail====", publisherDetail);
                        let theFilter = { "createdAt": -1 };
                        let filter = {}
                        if (req.query.status) {
                            filter.status = req.query.status;
                            if (req.query.status == "all")
                                filter = {};
                        } else {
                            filter.status = "active";
                        }
                        publisher.aggregate([
                            {
                                $match: filter
                            },
                            {
                                $sort: theFilter
                            },
                            {
                                $lookup: {
                                    from: "pub_articles",
                                    let: { "email": "$email" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$email", "$$email"] },
                                                        { $eq: ["$status", "active"] }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$email",
                                                ArticleCount: {
                                                    $sum: 1
                                                }
                                            }
                                        }
                                    ],
                                    as: "ArticleDetails"
                                }
                            },
                            {
                                $lookup: {
                                    from: "pub_videos",
                                    let: { "email": "$email" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$email", "$$email"] },
                                                        { $eq: ["$status", "active"] }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$email",
                                                VideoCount: {
                                                    $sum: 1
                                                }
                                            }
                                        }
                                    ],
                                    as: "VideoDetails"
                                }
                            },
                            {
                                $lookup: {
                                    from: "pub_app_publishers",
                                    let: { localId: "$_id" },
                                    pipeline: [
                                        //convert localId to objectId
                                        //convert publishers to array
                                        {
                                            $addFields: {
                                                localId: { $toObjectId: "$$localId" },
                                            }
                                        },
                                        {
                                            $match: {
                                                $expr: {
                                                    $in: ["$$localId", "$publishers"]
                                                }
                                            }
                                        },
                                        {
                                            $group: {
                                                "_id": "$_id",
                                                AppCount: {
                                                    $sum: 1
                                                }
                                            }
                                        }
                                    ],
                                    as: "AppDetails"
                                }
                            }
                        ])
                            .then(publishers => {
                                // console.log("publishers====", publishers[0]);
                                // console.log("publisherDetail====", publisherDetail[0]);
                                let notInPublication = [];
                                for (let i = 0; i < publishers.length; i++) {
                                    let flag = true;
                                    for (let j = 0; j < publisherDetail.length; j++) {
                                        if (publishers[i]._id.toString() == publisherDetail[j]._id.toString()) {
                                            flag = false;
                                            break;
                                        }
                                    }
                                    if (flag)
                                        notInPublication.push(publishers[i]);
                                }
                                res.json({
                                    status: true,
                                    total: notInPublication.length,
                                    data: notInPublication
                                });

                            }).catch(err => {
                                console.log("err======>", err);
                                res.json({
                                    status: true,
                                    message: err.message
                                });
                            });
                    } catch (e) {
                        res.json({
                            status: false,
                            message: e.message
                        });
                    }
                }).catch(err => {
                    console.log("err====>", err.message);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// UnRegister a publisher from application 
router.put('/', (req, res) => {
    if (req.body.bos_user_id && req.body.fxa_app_id) {
        application.findOneAndUpdate({ fxa_app_id: req.body.fxa_app_id }, { fxa_app_id: req.body.fxa_app_id, $pull: { bos_user_id: req.body.bos_user_id } })
            .then(userApps => {
                res.json({
                    status: true,
                    message: "Sucessfully Updated"
                });
            }).catch(err => {
                console.log("err====>", err.message);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    }
    else {
        res.json({
            status: false,
            message: "required field are missing"
        });
    }
});

module.exports = router;