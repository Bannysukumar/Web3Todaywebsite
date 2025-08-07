const express = require('express');
const router = express.Router();

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const category = require('../models/pub_categories');
const publication = require('../models/pub_publication_detail');
const { publicationsOwner, authenticateFun } = require('../middleware/authenticate');
const mongoose = require('mongoose');

// Creating a new category
router.post('/', (req, res) => {
    // router.post('/', publicationsOwner, authenticateFun, (req, res) => {
    if (req.body.title && req.body.thumbnail && req.body.application_id) {
        // if (req.body.categoryType && req.body.title && req.body.cv && req.body.thumbnail && req.body.application_id) {
        category.create({
            application_id: req.body.application_id,
            // categoryType: req.body.categoryType,
            title: req.body.title,
            // cv: req.body.cv,
            thumbnail: req.body.thumbnail,
        }).then(categoryDetails => {
            res.json({
                status: true,
                data: categoryDetails
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
    }
    else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

// Creating a new category with publication id
router.post('/new', async (req, res) => {
    // router.post('/new', publicationsOwner, authenticateFun, async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        // console.log("publicationDetails-----",publicationdetail.fxa_app_id);
        if (req.body.title && req.body.thumbnail) {
            // if (req.body.categoryType && req.body.title && req.body.cv && req.body.thumbnail) {
            category.create({
                application_id: publicationdetail.fxa_app_id,
                // categoryType: req.body.categoryType,
                title: req.body.title,
                // cv: req.body.cv,
                thumbnail: req.body.thumbnail,
                description: req.body.description,
                colorCode: req.body.colorCode
            }).then(categoryDetails => {
                res.json({
                    status: true,
                    data: categoryDetails
                });
            }).catch(err => {
                // console.log('err=====>', err);
                res.json({
                    status: false,
                    message: err.message
                });
            });
        }
        else {
            res.json({
                status: false,
                message: "All field Required"
            });
        }
    } else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

// fetching details all categories available
router.get('/', (req, res) => {
    // router.get('/', authenticateFun, (req, res) => {
    let flag = {}
    if (req.query.status) {
        flag.status = req.query.status;
        if (req.query.status == "all")
            flag = {};
    } else {
        flag.status = "active";
    }
    category.find(flag, null, { sort: { "createdAt": -1 } })
        .then(categories => {
            res.json({
                status: true,
                data: categories
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// fetching details all categories for a specific application
router.get('/application/:id', (req, res) => {
    // router.get('/application/:id', authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.application_id = req.params.id;
    category.find(filter, null, { sort: { "createdAt": -1 } })
        .then(categories => {
            res.json({
                status: true,
                data: categories
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// fetching details all categories for a specific publication
router.get('/publication/:id', (req, res) => {
    // router.get('/publication/:id', authenticateFun, (req, res) => {
    publication.findById(req.params.id)
        .then(publicationDetail => {
            if (publicationDetail) {
                let filter = {}
                if (req.query.status) {
                    filter.status = req.query.status;
                    if (req.query.status == "all")
                        filter = {};
                } else {
                    filter.status = "active";
                }
                filter.application_id = publicationDetail.fxa_app_id;
                let theFilter = { "createdAt": -1 };
                if (req.query.articleSort) theFilter = { "articlesCount": -1 };
                if (req.query.videoSort) theFilter = { "videosCount": -1 };
                let matchfilter = {}
                let articleMatchFilter = {}
                if (req.query.atleastOneArticle) matchfilter = { ...matchfilter, "articlesCount": { $gt: 0 } }
                if (req.query.atleastOneVideo) matchfilter = { ...matchfilter, "videosCount": { $gt: 0 } }
                if(req.query.atleastOneCaseStudy) matchfilter = { ...matchfilter, "caseStudiesCount": { $gt: 0 } }
                // if (req.query.ArticleAuthor) {
                //     articleMatchFilter = { ...articleMatchFilter, "articles.email": req.query.ArticleAuthor, "articles.status": "active" }
                //     matchfilter = { ...matchfilter, "articles.email": req.query.ArticleAuthor, "articles.status": "active" }
                // }
                if (req.query.VideoAuthor) {
                    matchfilter = { ...matchfilter, "videos_publishers.email": req.query.VideoAuthor, "videos.status": "active" }
                }
                // console.log("articleMatch", articleMatchFilter)
                // console.log("matchfilter", matchfilter)
                category.aggregate([
                    {
                        $match: filter
                    },
                    {
                        $lookup: {
                            from: "pub_articles",
                            let: { "categoryType": "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $in: ["$$categoryType", "$categoryType"] },
                                                { $eq: ["$status", "active"] },
                                                req.query.ArticleAuthor ? { $eq: ["$email", req.query.ArticleAuthor] } : "",
                                                { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$email",
                                        CategoryUsedInArticles: { $sum: 1 },
                                        // articles: { $push: {
                                        //     email: "$email"
                                        // } }
                                    }
                                },
                            ],
                            as: "articlesDetails"
                            // localField: "_id",
                            // foreignField: "categoryType",
                            // as: "articles",
                        },
                    },
                    {
                        $addFields: {
                            articlesCount: { $size: "$articlesDetails" }
                        }
                    },
                    {
                        $lookup: {
                            from: "pub_videos",
                            let: { "categoryType": "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $in: ["$$categoryType", "$categoryType"] },
                                                { $eq: ["$status", "active"] },
                                                req.query.VideoAuthor ? { $eq: ["$email", req.query.VideoAuthor] } : "",
                                                { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$email",
                                        CategoryUsedInVideos: { $sum: 1 },
                                        // videos: { $push: {
                                        //     email: "$email"
                                        // } }
                                    }
                                }
                            ],
                            as: "videosDetails"
                            // localField: "_id",
                            // foreignField: "categoryType",
                            // as: "videos",
                        },
                    },
                    {
                        $addFields: {
                            videosCount: { $size: "$videosDetails" }
                        }
                    },
                    {
                        $lookup: {
                            from: "pub_casestudies",
                            let: { "categoryType": "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $in: ["$$categoryType", "$categoryType"] },
                                                { $eq: ["$status", "active"] },
                                                // req.query.ArticleAuthor ? { $eq: ["$email", req.query.ArticleAuthor] } : "",
                                                { $eq: ["$application_id", mongoose.Types.ObjectId(publicationDetail.fxa_app_id)] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$_id",
                                        CategoryUsedInCaseStudy: { $sum: 1 },
                                        // articles: { $push: {
                                        //     email: "$email"
                                        // } }
                                    }
                                },
                            ],
                            as: "caseStudyDetails"
                            // localField: "_id",
                            // foreignField: "categoryType",
                            // as: "articles",
                        },
                    },
                    {
                        $addFields: {
                            caseStudiesCount: { $size: "$caseStudyDetails" }
                        }
                    },
                    {
                        $match: matchfilter
                    }
                ])
                    .then(categories => {
                        // console.log(categories)

                        let key_to_remove

                        if (req.query.ArticleAuthor) key_to_remove = "videosDetails";
                        if (req.query.VideoAuthor) key_to_remove = "articlesDetails";

                        categories.forEach(obj => {
                            if (obj.hasOwnProperty(key_to_remove)) {
                                delete obj[key_to_remove];
                            }
                        });
                        //remove all the object with articlecount 0
                        // if(req.query.ArticleAuthor) categories = categories.forEach((category) => {
                        //     delete category.videosDetails
                        // })
                        // console.log("categories", categories)
                        if (req.query.ArticleAuthor) categories = categories.filter((category) => category.articlesDetails.length > 0)
                        if (req.query.VideoAuthor) categories = categories.filter((category) => category.videosDetails.length > 0)
                        // let totalArticlesCount = 0;
                        // let totalVideosCount = 0;
                        // categories.forEach((category) => {
                        //     totalArticlesCount += category.articlesDetails[0]?.ArticlesCount;
                        //     totalVideosCount += category.videosDetails[0]?.videosCount;
                        // })
                        // console.log("categories", categories)
                        if (categories.length > 0) {

                            res.json({
                                status: true,
                                count: categories.length,
                                data: categories
                            });
                        } else {
                            res.json({
                                status: true,
                                message: "No categories found for this publication"
                            });
                        }
                    }).catch(err => {
                        // console.log('err=====>', err);
                        res.json({
                            status: false,
                            message: err.message
                        });
                    });
            } else {
                res.json({
                    status: false,
                    message: "publication not found"
                });
            }
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// fetching a specific category detail
router.get('/:id', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter._id = mongoose.Types.ObjectId(req.params.id);
    let PublicationDetail
    if (req.query.publication_id) {
        PublicationDetail = await publication.findById(req.query.publication_id);
        if (PublicationDetail) {
            filter.application_id = PublicationDetail.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "publication not found"
            });
        }
    }
    category.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "pub_articles",
                // localField: "_id",
                // foreignField: "categoryType",
                // as: "articles"
                let: { category_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ["$$category_id", "$categoryType"] },
                                    { $eq: ["$status", "active"] },
                                    req.query.publication_id ? { $eq: ["$application_id", mongoose.Types.ObjectId(PublicationDetail.fxa_app_id)] } : ""
                                ]
                            }
                        }
                    }
                ],
                as: "articles"
            }
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                localField: "articles.email",
                foreignField: "email",
                as: "articles_publishers"
            }

        },
        {
            $lookup: {
                from: "pub_videos",
                // localField: "_id",
                // foreignField: "categoryType",
                // as: "videos"
                let: { category_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ["$$category_id", "$categoryType"] },
                                    { $eq: ["$status", "active"] },
                                    req.query.publication_id ? { $eq: ["$application_id", mongoose.Types.ObjectId(PublicationDetail.fxa_app_id)] } : ""
                                ]
                            }
                        }
                    }
                ],
                as: "videos"
            },
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                localField: "videos.email",
                foreignField: "email",
                as: "videos_publishers"
            }
        },
        {
            $lookup: {
                from: "pub_reports",
                // localField: "_id",
                // foreignField: "categoryType",
                // as: "videos"
                let: { category_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ["$$category_id", "$categoryType"] },
                                    { $eq: ["$status", "active"] },
                                    req.query.publication_id ? { $eq: ["$application_id", mongoose.Types.ObjectId(PublicationDetail.fxa_app_id)] } : ""
                                ]
                            }
                        }
                    }
                ],
                as: "reports"
            },
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                localField: "reports.email",
                foreignField: "email",
                as: "reports_publishers"
            }
        },
        {
            $project: {
                title: 1,
                application_id: 1,
                thumbnail: 1,
                status: 1,
                colorCode: 1,
                description: 1,
                createdAt: 1,
                updatedAt: 1,
                "articles_publishers.name": 1,
                "articles_publishers.email": 1,
                "articles_publishers.profile_pic": 1,
                "videos_publishers.name": 1,
                "videos_publishers.email": 1,
                "videos_publishers.profile_pic": 1,
                "reports_publishers.name": 1,
                "reports_publishers.email": 1,
                "reports_publishers.profile_pic": 1,
            }
        }
    ])
        .then(categoryDetails => {
            res.json({
                status: true,
                data: categoryDetails
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// updating a specific category detail
router.put('/:id', (req, res) => {
    // router.put('/:id', publicationsOwner, authenticateFun, (req, res) => {
    const objForUpdate = {};
    // if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
    if (req.body.title) objForUpdate.title = req.body.title;
    // if (req.body.cv) objForUpdate.cv = req.body.cv;
    if (req.body.thumbnail) objForUpdate.thumbnail = req.body.thumbnail;
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.description) objForUpdate.description = req.body.description
    if (req.body.colorCode) objForUpdate.colorCode = req.body.colorCode
    category.updateOne({ _id: req.params.id }, objForUpdate)
        .then(categoryDetails => {
            res.json({
                status: true,
                message: "Update successfully"
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

//update category data for specific publication
router.put('/application/:application_id', (req, res) => {
    let updateData = {
        colorCode: "#4B2A91",
        description: "Web 3.0 describes the next evolution of the World Wide Web, the user interface that provides access to documents, applications and multimedia on the internet. Web 3.0 is still being developed, so there isn't a universally accepted definition. Even the proper spelling isn't nailed down, with analyst firms like Forrester, Gartner and IDC toggling between `Web3` and `Web 3.0`"
    }
    category.updateMany({ application_id: req.params.application_id }, updateData)
        .then(categoryDetails => {
            // console.log(categoryDetails)
            res.json({
                success: true,
                message: "Added data"
            })
        }).catch(err => {
            res.json({
                success: false,
                message: err.message
            })
        })
})


router.put('/set/:id', (req, res) => {
    const collection_name = "pub_categories";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        // if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
        if (req.body.title) objForUpdate.title = req.body.title;
        // if (req.body.cv) objForUpdate.cv = req.body.cv;
        if (req.body.thumbnail) objForUpdate.thumbnail = req.body.thumbnail;
        if (req.body.status) objForUpdate.status = req.body.status;
        // const db = await database;
        if (!(Object.keys(objForUpdate).length === 0 && objForUpdate.constructor === Object)) {
            let updatedBusiness = await dynamicMiddleware.updatedynamicObject(collection_name, condition, objForUpdate);
            if (updatedBusiness.status) {
                res.json({
                    status: true,
                    message: 'Successfully Updated!',
                });
            }
            // db.collection(collection_name).updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: { ...objForUpdate } }, function (err, result) {
            //     // db.collection(collection_name).updateOne({ _id: req.params.id }, { $set: { ...cleanData.data } }, function (err, result) {
            //     if (err) {
            //         res.json({
            //             status: false,
            //             message: err.message
            //         });
            //     }
            //     else {
            //         res.json({
            //             status: true,
            //             message: 'Updated Successfully'
            //         });
            //     }
            // });
        } else {
            res.json({
                status: false,
                message: "Atlest one field is required to update"
            });
        }
    }).catch(err => {
        // console.log("err==>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// delete a specific category detail by ID
router.delete('/:id', (req, res) => {
    category.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(categoryDetails => {
            res.json({
                status: true,
                data: categoryDetails
            });
        }).catch(err => {
            // console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});


module.exports = router;