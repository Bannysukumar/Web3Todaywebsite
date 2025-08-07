const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { authenticateFun } = require('../middleware/authenticate');
// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const article = require('../models/pub_article');
const publisher = require('../models/pub_publisher_detail');
const publication = require('../models/pub_publication_detail');
const navbar = require('../models/pub_navbar');
const category = require('../models/pub_categories');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const maxSize = 50 * 1024 * 1024; // for 50MB
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('public/images/')); // Storage Path for the Network File System user
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
}).any();

router.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("multer error")
            return res.status(500).json(err)
        } else if (err) {
            console.log("error", err)
            return res.status(500).json(err)
        }
        console.log("success123")
        // console.log(req.files)
        //restructure the url with localhost
        req.files.map((file) => {
            file.urlName = `https://publications.apimachine.com/images/${file.filename}`
        })
        console.log("SDSD", req.files)
        return res.status(200).send(req.files)
    })
})

// Creating a new article
router.post('/', (req, res) => {
    // router.post('/', authenticateFun, (req, res) => {
    if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.desc && req.body.icon && req.body.media && req.body.application_id && req.body.email) {
        let titleExist = article.findOne({ title: req.body.title });
        if (titleExist) {
            return res.json({
                status: false,
                message: 'Title already exist'
            });
        }
        article.create({
            application_id: req.body.application_id,
            user_id: req.body.user_id,
            email: req.body.email,
            categoryType: req.body.categoryType,
            navbar_id: req.body.navbar_id,
            title: req.body.title,
            link_name: req.body.title.split(' ').join('_'),
            desc: req.body.desc,
            icon: req.body.icon,
            media: req.body.media,
            metatags: req.body.metatags,
            altTag: req.body.altTag,
            keywords: req.body.keywords,
            article: req.body.article,
            action_link: req.body.action_link,
            action: req.body.action,
            attachment: req.body.attachment,
            country: req.body.country,

        }).then(articleDetails => {
            res.json({
                status: true,
                data: articleDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
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


//Create a new article using publication id

router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id, status: 'active' });
        let titleExist = await article.findOne({ title: req.body.title, status: 'active' });
        if (titleExist) {
            return res.json({
                status: false,
                message: 'Title already exist'
            });
        }

        let articleDetails = await article.findOne({ custom_url: req.body.custom_url, status: 'active' });
        if (articleDetails) {
            return res.json({
                status: false,
                message: 'Custom url already exist'
            });
        }

        if (!req.body.custom_url) {
            let newArr = req.body.title.split(' ')
            req.body.custom_url = newArr.map(item => item.replace(/[^\w]/gi, '')).join('_');
        } else {
            let newArr = req.body.custom_url.split(' ')
            req.body.custom_url = newArr.map(item => item.replace(/[^\w]/gi, '')).join('_');
        }



        let articleTitle = await article.findOne({ title: req.body.title, status: 'active' });
        if (articleTitle) {
            return res.json({
                status: false,
                message: 'Title already exist'
            });
        }



        // if (req.body.custom_url) {
        //     const noSpacesOrSpecialChars = /^[^ .\/]+$/;
        //     const isMatch = noSpacesOrSpecialChars.test(req.body.custom_url);
        //     console.log('isMatch', isMatch, req.body.custom_url);
        //     if (!isMatch) {
        //         return res.json({
        //             status: false,
        //             message: 'Custom url should not contain spaces or special characters'
        //         });
        //     }
        // }

        if (!req.body.metatags) {
            req.body.metatags = [];
        }
        if (!req.body.keywords) {
            req.body.keywords = [];
        }

        if (publicationdetail) {
            if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.desc && req.body.icon && req.body.media && req.body.publication_id && req.body.email) {
                article.create({
                    application_id: publicationdetail.fxa_app_id,
                    user_id: req.body.user_id,
                    email: req.body.email,
                    categoryType: req.body.categoryType,
                    navbar_id: req.body.navbar_id,
                    title: req.body.title,
                    link_name: req.body.title.split(' ').join('_'),
                    desc: req.body.desc,
                    icon: req.body.icon,
                    media: req.body.media,
                    article: req.body.article,
                    action_link: req.body.action_link,
                    action: req.body.action,
                    attachment: req.body.attachment,
                    country: req.body.country,
                    metatags: req.body.metatags,
                    joinTags: req.body.metatags.join(", "),
                    joinKeywords: req.body.keywords.join(", "),
                    altTag: req.body.altTag,
                    keywords: req.body.keywords,
                    publication_id: req.body.publication_id,
                    publication_name: publicationdetail.publication_name,
                    custom_url: req.body.custom_url,
                }).then(articleDetails => {
                    res.json({
                        status: true,
                        data: articleDetails
                    });
                }).catch(err => {
                    console.log('err=========>', err);
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
                message: "Publication not found"
            });
        }
    }
})

// get all the article
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.country)
        filter.country = req.query.country;
    if (req.query.email)
        filter.email = req.query.email;
    if (req.query.user_id) {
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id);
        console.log(req.query.user_id)
    }
    let data = [];
    if (req.query.category) {
        if (Array.isArray(req.query.category)) {
            req.query.category.forEach(element => {
                data.push(mongoose.Types.ObjectId(element));
            });
        } else {
            data.push(mongoose.Types.ObjectId(req.query.category));
        }
        filter = { categoryType: { $in: data }, ...filter }
    }
    if (req.query.publication_id) {
        let publicationExist = await publication.findOne({ _id: req.query.publication_id });
        if (publicationExist) {
            filter.application_id = publicationExist.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }

    console.log(filter)
    let itemsPerPage, pageNo;
    itemsPerPage = parseInt(req.query.limit ? req.query.limit : 1000);
    pageNo = parseInt(req.query.skip ? req.query.skip : 1);
    if (req.query.atleastOneQuestion) filter = { ...filter, "articlesQuestionCount": { $gt: 0 } }
    article.aggregate([
        // {
        //     $match: filter
        // },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $skip: itemsPerPage * (pageNo - 1)
        },
        {
            $limit: itemsPerPage
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { "user_id": "$user_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$user_id", "$_id"] },
                                    { $eq: ["$status", "active"] },
                                ],
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
                                $and: [
                                    { $in: ["$_id", "$$navbar_id"] },
                                    { $eq: ["$status", "active"] },
                                ]
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
                                $and: [
                                    { $in: ["$_id", "$$categoryType"] },
                                    { $eq: ["$status", "active"] },
                                ]
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
        },
        {
            $lookup: {
                from: "pub_article_questions",
                let: { "article_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$article_id", "$article_id"] },
                                    { $eq: ["$status", "active"] },
                                ]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            questions: {
                                $push: "$$ROOT"
                            }
                        }
                    },
                ],
                as: "article_questions"
            }
        },
        {
            $addFields: {
                articlesQuestionCount: { $size: "$article_questions" }
            }
        },
        {
            $match: filter
        }
    ])
        .then(articles => {
            if (articles.length == 0) {
                return res.json({
                    status: false,
                    message: "No article found"
                });
            }
            res.json({
                status: true,
                total_count: articles.length,
                data: articles
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all the article for a specific publication
router.get('/publication/:id', (req, res) => {
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
                // filter.application_id = publicationDetail.fxa_app_id;
                // filter.publication_id = mongoose.Types.ObjectId(publicationDetail.fxa_app_id);
                article.aggregate([
                    {
                        $match: { application_id: mongoose.Types.ObjectId(publicationDetail.fxa_app_id), ...filter }
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

                ])
                    .then(articles => {
                        if (articles.length > 0) {
                            res.json({
                                status: true,
                                total_count: articles.length,
                                data: articles
                            });
                        } else {
                            res.json({
                                status: false,
                                message: "No Article Found for this Publication"
                            });
                        }
                    }).catch(err => {
                        console.log('err=========>', err);
                        res.json({
                            status: false,
                            message: err.message
                        });
                    });
            } else {
                res.json({
                    status: false,
                    message: "No publication found"
                });
            }
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all the article for a specific application
router.get('/application/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    // filter.application_id = req.params.id;
    filter.application_id = mongoose.Types.ObjectId(req.params.id);
    article.aggregate([
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

    ])
        .then(articles => {
            res.json({
                status: true,
                total_count: articles.length,
                data: articles
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});


// get all the article for a specific user
router.get('/user/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    // filter.user_id = req.params.id;
    filter.user_id = mongoose.Types.ObjectId(req.params.id);
    article.aggregate([
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

    ])
        .then(async articles => {
            let userDetail = await publisher.findOne({ bos_user_id: req.params.id })
            res.json({
                status: true,
                data: {
                    userDetail: userDetail,
                    total_count: articles.length,
                    article: articles
                }
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all article for a specific category ID's Array
router.get('/category/', async (req, res) => {
    // router.get('/category/:id', (req, res) => {
    //     article.find({ categoryType: req.params.id })
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    let data = [];
    if (Array.isArray(req.query.category)) {
        req.query.category.forEach(element => {
            data.push(mongoose.Types.ObjectId(element));
        });
    } else {
        data.push(mongoose.Types.ObjectId(req.query.category));
    }
    if (req.query.publication_id) {
        PublisherDetail = await publication.findOne({ _id: req.query.publication_id })
        if (PublisherDetail) {
            filter.application_id = PublisherDetail.fxa_app_id
        } else {
            return res.json({
                status: false,
                message: "No publication found"
            });
        }
    }

    // article.find({ categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
    article.aggregate([
        {
            $match: { categoryType: { $in: data }, ...filter }
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
            //look up from pub article questions and if there is no data display false in isQuestion field else true
            $lookup: {
                from: "pub_article_questions",
                let: { "article_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$article_id", "$article_id"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            isQuestion: {
                                $push: { $cond: { if: { $eq: ["$article_id", "$$article_id"] }, then: true, else: false } }
                            }
                        }
                    }
                ],
                as: "questions"
            }
        }
    ])
        .then(articleDetails => {
            if (articleDetails.length == 0) {
                return res.json({
                    status: false,
                    message: "No article found"
                });
            }
            articleDetails.map((article) => {
                if (article.questions.length == 0) {
                    article.questions = false;
                } else {
                    article.questions = true;
                }
            })
            res.json({
                status: true,
                total_count: articleDetails.length,
                data: articleDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all article for a specific navbar ID
router.get('/navbar/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    article.aggregate([
        {
            $match: { navbar_id: mongoose.Types.ObjectId(req.params.id), ...filter }
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

    ])
        .then(articleDetails => {
            res.json({
                status: true,
                total_count: articleDetails.length,
                data: articleDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});



// get all article for a specific navbar ID's array
router.get('/navbars', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    // console.log('req.query.navbar=========>', req.query.navbar);
    let data = [];
    if (Array.isArray(req.query.navbar)) {
        req.query.navbar.forEach(element => {
            data.push(mongoose.Types.ObjectId(element));
        });
    } else {
        data.push(mongoose.Types.ObjectId(req.query.navbar));
    }

    // console.log('data=========>', data);
    // var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
    // article.find({ navbar_id: { $in: req.query.navbar }, ...filter }, null, { sort: { "createdAt": -1 } })
    article.aggregate([
        {
            $match: { navbar_id: { $in: data }, ...filter }
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

    ])
        .then(articleDetails => {
            console.log('articleDetails=========>', articleDetails)
            res.json({
                status: true,
                total_count: articleDetails.length,
                data: articleDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all article for a specific navbar ID's array / categories ID array
router.get('/filter', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.navbar && req.query.category) {
        article.find({ navbar_id: { $in: req.query.navbar }, categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
            .then(articleDetails => {
                res.json({
                    status: true,
                    total_count: articleDetails.length,
                    data: articleDetails
                });
            }).catch(err => {
                console.log('err=========>', err);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        res.json({
            status: false,
            message: "Required fields are missing"
        });
    }
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
// search (Dynamic)
router.get('/set/', async (req, res) => {
    const collection_name = "pub_articles";
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // let regex = req.query.search;
    // regex = regex.replace(/[^a-zA-Z]/g, "");
    // regex = "/" + regex + "/i"
    const db = await database;
    db.collection(collection_name).find({ title: regex }).toArray((err, docs) => {
        if (err) {
            res.json({
                status: false,
                message: err.message
            });
        } else {
            docs.length > 0
                ? res.json({
                    status: true,
                    data: docs
                })
                : res.json({
                    status: true,
                    data: 'No record'
                });
        }
    });
});

// get a specific article by ID
router.get('/:custom_url', (req, res) => {
    // article.findOne({ _id: req.params.id })
    article.aggregate([
        {
            $match: { custom_url: req.params.custom_url, status: 'active' }
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
                                $push: { _id: "$_id", profile_pic: "$profile_pic", name: "$name", email: "$email" }
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
        },
        {
            $lookup: {
                from: "pub_article_questions",
                let: { "article_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$article_id", "$article_id"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            questions: {
                                $push: "$$ROOT"
                            }
                        }
                    },
                ],
                as: "article_questions"
            }
        }

    ])
        .then(async articleDetails => {
            let userDetail = await publisher.findOne({ bos_user_id: articleDetails.user_id })
            res.json({
                status: true,
                data: {
                    userDetail: userDetail,
                    article: articleDetails
                }
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// upload the media content for the article body for a specific article ID
router.put('/article_media/:id', (req, res) => {
    if (req.body.article_media) {
        article.updateOne({ _id: req.params.id }, { $push: { "article_media": req.body.article_media } })
            .then(articleDetails => {
                res.json({
                    status: true,
                    message: "Successfully updated."
                });
            }).catch(err => {
                console.log('err=========>', err);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        res.json({
            status: false,
            message: 'No File uploaded'
        });
    }
});

// update the article content for a specific article ID
router.put('/article_content/:id', (req, res) => {
    const objForUpdate = {};
    objForUpdate.article = req.body.article;
    article.updateOne({ _id: req.params.id }, objForUpdate)
        .then(articleDetails => {
            res.json({
                status: true,
                message: "Successfully updated the article."
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// update a specific article by ID
router.put('/:id', async (req, res) => {
    let articleExist = await article.findOne({ _id: req.params.id });
    if (articleExist) {
        const objForUpdate = {};
        if (req.body.title) {
            let titleExist = await article.findOne
                ({ title: req.body.title, _id: { $ne: req.params.id }, status: "active" });
            if (titleExist) {
                return res.json({
                    status: false,
                    message: "Title already exist."
                });
            }
            objForUpdate.title = req.body.title;
            objForUpdate.link_name = req.body.title.split(' ').join('_');
        }

        if (req.body.custom_url) {
            let custom_urlExist = await article.findOne({ custom_url: req.body.custom_url, _id: { $ne: req.params.id }, status: "active" });
            if (custom_urlExist) {
                return res.json({
                    status: false,
                    message: "Custom url already exist."
                });
            } else {
                let newArr = req.body.custom_url.split(' ')
                objForUpdate.custom_url = newArr.map(item => item.replace(/[^\w]/gi, '')).join('_');
            }
        }
        if (req.body.navbar_id) {
            let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id }, status: "active" });
            if (navbarExist.length === req.body.navbar_id.length) {
                objForUpdate.navbar_id = req.body.navbar_id;
            } else {
                return res.json({
                    status: false,
                    message: "Invalid navbar id"
                });
            }
        }
        if (req.body.categoryType) {
            let categoryExist = await category.find({ _id: { $in: req.body.categoryType }, status: "active" });
            if (categoryExist.length === req.body.categoryType.length) {
                objForUpdate.categoryType = req.body.categoryType;
            } else {
                return res.json({
                    status: false,
                    message: "Invalid category id"
                });
            }
        }
        // if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
        if (req.body.desc) objForUpdate.desc = req.body.desc;
        if (req.body.icon) objForUpdate.icon = req.body.icon;
        if (req.body.media) objForUpdate.media = req.body.media;
        if (req.body.status) objForUpdate.status = req.body.status;
        if (req.body.action_link) objForUpdate.action_link = req.body.action_link;
        if (req.body.action) objForUpdate.action = req.body.action;
        if (req.body.attachment) objForUpdate.attachment = req.body.attachment;
        if (req.body.article) objForUpdate.article = req.body.article;
        if (req.body.metatags) {
            objForUpdate.metatags = req.body.metatags;
            objForUpdate.joinTags = req.body.metatags.join(",")
        }
        if (req.body.keywords) {
            objForUpdate.keywords = req.body.keywords;
            objForUpdate.joinKeywords = req.body.keywords.join(",")
        }
        if (req.body.altTag) objForUpdate.altTag = req.body.altTag;


        article.updateOne({ _id: req.params.id }, objForUpdate)
            .then(articleDetails => {
                res.json({
                    status: true,
                    message: "Successfully updated."
                });
            }).catch(err => {
                console.log('err=========>', err);
                res.json({
                    status: false,
                    message: err.message
                });
            });
    } else {
        res.json({
            status: false,
            message: "Article not found."
        });
    }
});

//add navbar to article
router.put('/add/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id }, status: "active" });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length === req.body.navbar_id.length) {
            article.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { navbar_id: { $each: req.body.navbar_id } } })
                .then(articleDetails => {
                    if (articleDetails) {
                        res.json({
                            status: true,
                            message: "Added navbars to articles successfully."
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Article not found."
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    })
                });
        } else {
            res.json({
                status: false,
                message: "Invalid navbar id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid navbar id / navbar id should be an array"
        });
    }
});

//remove navbar from article
router.put('/remove/navbar/:id', async (req, res) => {
    let navbarExist = await navbar.find({ _id: { $in: req.body.navbar_id }, status: "active" });
    if (Array.isArray(req.body.navbar_id)) {
        if (navbarExist.length === req.body.navbar_id.length) {
            article.findOneAndUpdate({ _id: req.params.id }, { $pullAll: { navbar_id: req.body.navbar_id } })
                .then(articleDetails => {
                    if (articleDetails) {
                        res.json({
                            status: true,
                            message: "Removed navbars from articles successfully."
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Article not found."
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    })
                });
        } else {
            res.json({
                status: false,
                message: "Invalid navbar id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid navbar id / navbar id should be an array"
        });
    }
});

//add category to article
router.put('/add/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType }, status: "active" });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length === req.body.categoryType.length) {
            article.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { categoryType: { $each: req.body.categoryType } } })
                .then(articleDetails => {
                    if (articleDetails) {
                        res.json({
                            status: true,
                            message: "Added categories to articles successfully."
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Article not found."
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    })
                });
        } else {
            res.json({
                status: false,
                message: "Invalid category id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid category id / category id should be an array"
        });
    }
});

//remove category from article
router.put('/remove/category/:id', async (req, res) => {
    let categoryExist = await category.find({ _id: { $in: req.body.categoryType }, status: "active" });
    if (Array.isArray(req.body.categoryType)) {
        if (categoryExist.length === req.body.categoryType.length) {
            article.findOneAndUpdate({ _id: req.params.id }, { $pullAll: { categoryType: req.body.categoryType } })
                .then(articleDetails => {
                    if (articleDetails) {
                        res.json({
                            status: true,
                            message: "Removed categories from articles successfully."
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Article not found."
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: false,
                        message: err.message
                    })
                });
        } else {
            res.json({
                status: false,
                message: "Invalid category id"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Invalid category id / category id should be an array"
        });
    }
});



router.put('/set/:id', (req, res) => {
    const collection_name = "pub_articles";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
        if (req.body.navbar_id) objForUpdate.navbar_id = req.body.navbar_id;
        if (req.body.title) objForUpdate.title = req.body.title;
        if (req.body.desc) objForUpdate.desc = req.body.desc;
        if (req.body.icon) objForUpdate.icon = req.body.icon;
        if (req.body.media) objForUpdate.media = req.body.media;
        if (req.body.status) objForUpdate.status = req.body.status;
        if (req.body.action_link) objForUpdate.action_link = req.body.action_link;
        if (req.body.action) objForUpdate.action = req.body.action;
        if (req.body.attachment) objForUpdate.attachment = req.body.attachment;
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

// Delete a specific article by ID
router.delete('/:id', (req, res) => {
    article.updateOne({ _id: req.params.id, status: "active" }, { status: 'inactive' })
        .then(articleDetails => {
            if (articleDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the Article'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Article not found'
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

router.post('/restore', (req, res) => {
    article.updateMany({ application_id: req.body.application_id, status: "inactive" }, { status: 'active' })
        .then(articleDetails => {
            if (articleDetails) {
                res.json({
                    status: true,
                    message: 'Restored the Article'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Article not found'
                });
            }
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            })
        });
});

router.delete('/remove', (req, res) => {
    article.updateMany({ application_id: req.body.application_id, status: "active" }, { status: 'inactive' })
        .then(articleDetails => {
            if (articleDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the Article'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Article not found'
                });
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

router.post('/deltitle', (req, res) => {
    article.updateMany({ title: req.body.title, status: "active" }, { status: 'inactive' })
        .then(articleDetails => {
            if (articleDetails) {
                res.json({
                    status: true,
                    message: 'deleted the Article'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Article not found'
                });
            }
        }).catch(err => {
            res.json({
                status: false,
                message: err.message
            })
        });
});

//add categories to articles
router.post('/addCategory', (req, res) => {
    article.updateMany({}, { $addToSet: { categoryType: req.body.categoryType } })
        .then(articleDetails => {
            res.json({
                status: true,
                message: 'Added the Category'
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
})

router.put("/updatemail/:application_id", (req, res) => {
    article.updateMany({ application_id: req.params.application_id }, { user_id: "64c3910efaa4a7072d3cd6a6" })
        .then(articleDetails => {
            res.json({
                status: true,
                message: 'Update email'
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
})

router.delete('/records/:application_id', async (req, res) => {
    const { titles } = req.body;
    let publication_id = req.params.publication_id

    try {
        // Use the $in operator to find records by title in the provided array
        const result = await article.updateMany(
            { title: { $in: titles }, status: 'active' }, // Add more conditions if needed
            { $set: { status: 'inactive' } }
        );

        if (result.nModified > 0) {
            res.status(200).json({ status: true, message: `records deleted successfully` });
        } else {
            res.status(404).json({ status: false, message: 'No matching records found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;