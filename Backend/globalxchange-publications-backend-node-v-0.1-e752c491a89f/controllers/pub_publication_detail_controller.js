const express = require('express');
const router = express.Router();
const axios = require('axios');
const uniqid = require("bson-objectid");
const { mallPlatformUser, publicationsOwner, authenticateFun } = require('../middleware/authenticate');

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const publication = require('../models/pub_publication_detail');
const article = require('../models/pub_article');
const video = require('../models/pub_video');
const application = require('../models/pub_app_publisher');
const publisher = require('../models/pub_publisher_detail');
const sanction = require('../models/pub_app_owner_sanction');
const navbar = require('../models/pub_navbar');

// ==========================================Temporary Blocked==============
// // create a publication
// router.post('/', async (req, res) => {
//     let extPublication = await publication.findOne({ name: { $regex: req.body.name, $options: 'i' }, email: req.body.email });
//     if (extPublication) {
//         res.json({
//             status: false,
//             message: "Publication already Exist"
//         });
//     } else {
//         let logAppPublish = await application.create({
//             fxa_app_id: req.body.fxa_app_id,
//         });
//     }
//     if (req.body.fxa_app_id && req.body.name && req.body.app_code && req.body.email && req.body.description) {
//         if (extPublication) {
//             res.json({
//                 status: false,
//                 message: "Publication already Exist"
//             });
//         } else {
//             publication.create({
//                 fxa_app_id: req.body.fxa_app_id,
//                 name: req.body.name,
//                 app_code: req.body.app_code,
//                 email: req.body.email,
//                 profile_pic: req.body.profile_pic,
//                 cover_pic: req.body.cover_pic,
//                 description: req.body.description,
//                 website: req.body.website,
//                 social_media: req.body.social_media,
//                 usertypes: req.body.usertypes,
//                 country: req.body.country,
//             }).then(async publicationDetail => {
//                 res.json({
//                     status: true,
//                     data: publicationDetail
//                 });
//             }).catch(err => {
//                 console.log("err======>", err);
//                 res.json({
//                     status: false,
//                     message: err.message
//                 });
//             });
//         }
//     } else {
//         res.json({
//             status: false,
//             message: "Required fields are missing"
//         });
//     }
// });
// ==========================================Temporary Blocked==============

// Create a new publication with BOS mail ID which is registerd in malls platform 
router.post('/new', async (req, res) => {
    // router.post('/new', mallPlatformUser, authenticateFun, async (req, res) => {
    const newUsr = {};

    newUsr.email = req.body.email;
    let extPublication = await publication.findOne({ name: { $regex: req.body.name, $options: 'i' }, status: "active" }); //If publication name already used
    if (extPublication) {
        res.json({
            status: false,
            message: "Publication already Exist"
        });
    } else {
        // let bosUser = await axios.post('https://bos.apimachine.com/test/user', newUsr);
        // const usrApp = {};
        // usrApp.bos_user_profile_id = bosUser.data.data.bos_user_id;
        // usrApp.bos_application_id = "6033673940fa4007dab4b04e"; //For Publications
        // usrApp.bos_user_id = bosUser.data.data._id;
        // let bosUserApp = await axios.post('https://bos.apimachine.com/test/appuser', usrApp);


        let appData = await axios.get(`https://comms.globalxchange.io/gxb/apps/get?app_code=${req.body.app_code}`);
        // console.log(appData.data);
        if (req.body.name && req.body.app_code && req.body.email && req.body.description) {
            if (extPublication) {
                res.json({
                    status: false,
                    message: "Publication already Exist"
                });
            } else {
                if (appData.data.apps.length > 0) {
                    publication.create({
                        fxa_app_id: uniqid(),
                        name: req.body.name,
                        app_code: [{ app_name: appData.data.apps[0].app_name }, { app_code: appData.data.apps[0].app_code }, { app_icon: appData.data.apps[0].app_icon }],
                        email: req.body.email,
                        profile_pic: req.body.profile_pic,
                        cover_pic: req.body.cover_pic,
                        description: req.body.description,
                        website: req.body.website,
                        social_media: req.body.social_media,
                        usertypes: req.body.usertypes,
                        rewardPoints: req.body.rewardPoints,
                        videoRewardPoints: req.body.videoRewardPoints,
                        dailyLogin: req.body.dailyLogin,
                        articleRead: req.body.articleRead,
                        videoRead: req.body.videoRead,
                        fiveArticleRead: req.body.fiveArticleRead,
                        fiveVideoRead: req.body.fiveVideoRead,
                        signUpBonus: req.body.signUpBonus,
                        articleQuestionPoints: req.body.articleQuestionPoints,
                        videoQuestionPoints: req.body.videoQuestionPoints,
                        ddsLevel: req.body.ddsLevel,
                        country: req.body.country,
                        payoutCurrency: req.body.payoutCurrency,
                        payoutConversionRate: req.body.payoutConversionRate,
                        primaryColor: req.body.primaryColor,
                        secondaryColor: req.body.secondaryColor,
                        textColor: req.body.textColor,
                        fullColoredLogo: req.body.fullColoredLogo,
                        font: req.body.font,
                        trendingnavbarid: req.body.trendingnavbarid,
                    }).then(async publicationDetail => {
                        let addApplication = await application.create({
                            fxa_app_id: publicationDetail.fxa_app_id,
                        });
                        res.json({
                            status: true,
                            data: publicationDetail
                        });
                    }).catch(err => {
                        console.log("err======>", err);
                        res.json({
                            status: true,
                            message: err.message
                        });
                    });
                } else {
                    res.json({
                        status: false,
                        message: "App Code not found"
                    });
                }
            }
        } else {
            res.json({
                status: false,
                message: "Required fields are missing"
            });
        }
    }
});

// Register both publisher and publications and in bos sys also which is registerd in malls platform
router.post('/register', async (req, res) => {
    // router.post('/register', mallPlatformUser, authenticateFun, async (req, res) => {
    if (req.body.email && req.body.publication_name && req.body.app_code && req.body.publication_email && req.body.publication_description && req.body.publisher_name && req.body.publisher_email && req.body.publisher_description) {
        let extPublication = await publication.findOne({ publication_name: { $regex: req.body.publication_name, $options: 'i' }, email: req.body.email });
        if (extPublication) {
            res.json({
                status: false,
                message: "Publication already Exist"
            });
        } else {
            const newUsr = {};
            newUsr.email = req.body.email;
            let bosUser = await axios.post('https://bos.apimachine.com/test/user', newUsr);
            const usrApp = {};
            usrApp.bos_user_profile_id = bosUser.data.data.bos_user_id;
            usrApp.bos_application_id = "6033673940fa4007dab4b04e"; //For Publications
            // usrApp.bos_application_id = "5f889f5d895d9e41e9c8bdd5"; //for FXAgency
            usrApp.bos_user_id = bosUser.data.data._id;
            let bosUserApp = await axios.post('https://bos.apimachine.com/test/appuser', usrApp);
            let publicationDetail = await publication.create({
                fxa_app_id: bosUserApp.data.data._id,
                name: req.body.publication_name,
                app_code: req.body.app_code,
                email: req.body.email,
                description: req.body.publication_description,
                country: req.body.country,
            });
            let publisherDetail = {};
            let existingPublisherDetail = await publisher.findOne({
                bos_user_id: bosUser.data.data._id, bos_profile_id: bosUser.data.data.bos_user_id,
                name: req.body.publisher_name, email: req.body.publisher_email
            });
            if (existingPublisherDetail) {
                publisherDetail = existingPublisherDetail;
            } else {
                publisherDetail = await publisher.create({
                    bos_user_id: bosUser.data.data._id,
                    bos_profile_id: bosUser.data.data.bos_user_id,
                    name: req.body.publisher_name,
                    email: req.body.email,
                    description: req.body.publisher_description,
                    country: req.body.country,
                });
            }
            // let publishers = [bosUser.data.data._id];
            let logAppPublish = await application.create({
                fxa_app_id: bosUserApp.data.data._id,
                bos_user_id: [bosUser.data.data._id],
                publishers: [publisherDetail._id],
            });
            res.json({
                status: true,
                data: {
                    "publication": publicationDetail,
                    "publisher": publisherDetail
                }
            });
        }
    } else {
        res.json({
            status: false,
            message: "Required fields are missing"
        });
    }
});

// get all publications
router.get('/', (req, res) => {
    // router.get('/', authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.email)
        filter.email = req.query.email;
    if (req.query.country)
        filter.country = req.query.country;
    publication.find(filter, null, { sort: { "createdAt": -1 } })
        .then(publications => {
            if (publications.length > 0) {
                res.json({
                    status: true,
                    total_count: publications.length,
                    data: publications
                });
            } else {
                res.json({
                    status: false,
                    message: "No publication found"
                });
            }
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});


router.post('/addapplication', async (req, res) => {
    let extPublication = await publication.findOne({ name: { $regex: req.body.name, $options: 'i' }, status: "active" });
    console.log(extPublication , "pubb")
    if (!extPublication) {
        res.json({
            status: false,
            message: "Publication already Exist"
        });
    }
    let addApplication = await application.create({
        fxa_app_id: extPublication.fxa_app_id,
    });
})

//add publisher in publication
router.post('/add/publisher', async (req, res, next) => {
    try {
        if (req.body.publication_id && req.body.publisher_id) {
            //get publisher and peblication id and update the application collection
            // validate the publication 
            let publicationExist = await publication.findOne({
                _id: req.body.publication_id
            });
            if (!publicationExist) throw ({
                message: 'couldn\'t find the given publication'
            });
            // validate the publisher
            // console.log(req.body.publisher_id.length);
            let applicationDetail;
            for (let i = 0; i < req.body.publisher_id.length; i++) {
                let publisherExist = await publisher.findOne({
                    _id: req.body.publisher_id[i]
                });
                if (!publisherExist) throw ({
                    message: 'couldn\'t find the given publisher'
                });
                // console.log("publicationExist", publicationExist.fxa_app_id);
                applicationDetail = await application.findOneAndUpdate({
                    fxa_app_id: publicationExist.fxa_app_id
                }, {
                    $addToSet: {
                        bos_user_id: publisherExist.bos_user_id,
                        publishers: publisherExist._id
                    }
                })
            }
            if (applicationDetail) {
                res.json({
                    status: true,
                    message: "Publisher/publisher's added successfully in publication"
                });
            } else {
                res.json({
                    status: false,
                    message: "Something went wrong"
                });
            }



            // .then(applicationDetail => {
            //     res.json({
            //         status: true,
            //         message: 'added the publisher to the publication...'
            //     });
            // }).catch(err => {
            //     console.log("err======>", err);
            //     res.json({
            //         status: true,
            //         message: err.message
            //     });
            // });


        } else {
            res.json({
                status: true,
                message: 'Required fields are missing'
            });
        }
    } catch (e) {
        res.json({
            status: false,
            message: e.message
        });
    }

});

// get all publications media only
router.get('/media', (req, res) => {
    // router.get('/media', publicationsOwner, authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    publication.find(filter, null, { sort: { "createdAt": -1 } }).select({ "_id": 1, "profile_pic": 1, "cover_pic": 1 })
        .then(publications => {
            res.json({
                status: true,
                total_count: publications.length,
                data: publications
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get a specific publication stats
router.get('/stats/:id', async (req, res) => {
    // router.get('/stats/:id', publicationsOwner, authenticateFun, async (req, res) => {
    // call the funtion for publication stats
    let stats = await publication_stat(req.params.id);
    res.send(stats);
});

// get all publications for a specific app code
router.get('/appcode/', (req, res) => {
    // call the funtion for publication stats
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.app_code) {
        var array = [];
        if (Array.isArray(req.query.app_code))
            array.push(...req.query.app_code);
        else
            array.push(req.query.app_code);
        // console.log(req.query.app_code);
        // filter.app_code = [...array];
    }
    if (req.query.email)
        filter.email = req.query.email;
    publication.find({ app_code: { $in: array }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(publications => {
            res.json({
                status: true,
                total_count: publications.length,
                data: publications
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get all publications for a specific email with filter for content
router.get('/filter/:email', (req, res) => {
    // router.get('/filter/:email', publicationsOwner, authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.email = req.params.email;
    if (req.query.app_code) {
        var array = [];
        if (Array.isArray(req.query.app_code))
            array.push(...req.query.app_code);
        else
            array.push(req.query.app_code);
        // console.log(req.query.app_code);
        // filter.app_code = [...array];
    }
    publication.find({ app_code: { $in: array }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(publications => {
            // console.log("publication====", publications);
            let pubappid = [];
            for (let i = 0; i < publications.length; i++) {
                pubappid.push(publications[i].fxa_app_id)
            }
            // console.log("aaaaa", pubappid);
            let subfiter = {};
            subfiter.application_id = pubappid;
            let title = "Home Page";
            if (req.query.navtitle) {
                title = req.query.navtitle;
            }
            navbar.find({ ...subfiter, navTitle: { $regex: title, $options: 'i' } }, null, { sort: { "createdAt": -1 } })
                .then(async navbars => {
                    // console.log("navbarrrrrrr", navbars)
                    if (navbars.length) {
                        let barids = [];
                        for (let i = 0; i < navbars.length; i++)
                            barids.push(navbars[i]._id);

                        let allVideos = await video.find({ navbar_id: { $in: barids } }, null, { sort: { "createdAt": -1 } });
                        let allArticles = await article.find({ navbar_id: { $in: barids } }, null, { sort: { "createdAt": -1 } });
                        res.json({
                            status: true,
                            data: {
                                video_total_count: allVideos.length,
                                videos: allVideos,
                                article_total_count: allArticles.length,
                                articles: allArticles
                            }
                        });
                    } else {
                        res.json({
                            status: false,
                            message: `${req.params.email} doesn't have a nav bar with name ${title}`
                        });
                    }
                }).catch(err => {
                    console.log('err=====>', err);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get a specific publication by Id
router.get('/:id', (req, res) => {
    publication.findOne({ _id: req.params.id, status: "active" })
        .then(publicationDetail => {
            if (publicationDetail) {
                res.json({
                    status: true,
                    data: publicationDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "Publication not found"
                });
            }
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

router.get('/email/:email', (req, res) => {
    // { email: req.params.email, status: "active" }
    publication.aggregate([
        { $match: { email: req.params.email, status: "active" } },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { "email": "$email" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$email", "$email"]
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$email",
                            FounderDetails: {
                                $push: { profile_pic: "$profile_pic", name: "$name" }
                            }
                        }
                    }
                ],
                as: "FounderDetails"
            },
        },
        {
            $lookup: {
                from: "pub_app_publishers",
                localField: "fxa_app_id",
                foreignField: "fxa_app_id",
                as: "PublisherDetails",
            },
        },
        {
            $lookup: {
                from: "pub_user_publications",
                localField: "_id",
                foreignField: "publication_ids",
                as: "UserPublication"
            }
        },
        {
            $addFields: {
                "usersCount": { $size: "$UserPublication" }
            }
        },
    ])
        .then(publicationDetail => {
            if (publicationDetail) {
                res.json({
                    status: true,
                    data: publicationDetail
                });
            } else {
                res.json({
                    status: false,
                    message: "Publication not found"
                });
            }
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// TODO need to add remove logic
// update a specific publications appcode by Id
router.put('/appcode/:id', (req, res) => {
    // let addappcode = true;
    // if (req.query.status =="remove")
    // addappcode = false;
    // publication.updateOne({ _id: req.params.id },{addappcode? $addToSet :{app_code: req.body.app_code} : $pull:{app_code: req.body.app_code}} )
    publication.updateOne({ _id: req.params.id }, { $addToSet: { app_code: req.body.app_code } })
        .then(publisherDetail => {
            res.json({
                status: true,
                message: "successfully update"
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// Change the Publication credentials to a specific user
router.put('/credential', publicationsOwner, authenticateFun, (req, res) => {
    // accepts the fxappid, email and update email
    // axios.get(`https://bos.apimachine.com/test/user/email/?email=${req.body.new_email}`) //Logic from fxAgency Syestem
    axios.get(`https://bos.apimachine.com/test/mallplatform/email/${req.body.new_email}`)
        .then(newUser => {
            // console.log("newUser====>", newUser.data);
            if (newUser.data.status) {
                publication.updateOne({ fxa_app_id: req.body.app_id, email: req.body.email }, { email: req.body.new_email })
                    .then(async publisherDetail => {
                        // updating the bos_app_user record
                        let updatedetail = {}
                        updatedetail.bos_user_id = newUser.data.data._id;
                        updatedetail.bos_user_profile_id = newUser.data.data.bos_user_id;
                        let bos_update_status = await axios.put(`https://bos.apimachine.com/test/appuser/${req.body.app_id}`, updatedetail);
                        // creating the owner change record 
                        let owner_sanction = await sanction.create({
                            application_id: req.body.app_id,
                            oldUser_email: req.body.email,
                            newUser_email: newUser.data.data.email,
                            type: 'publication',
                            comment: req.body.comment,
                            // comment: 'Change of publication credential by acknowlegment',
                        });
                        res.json({
                            status: true,
                            message: "successfully update"
                        });
                    }).catch(err => {
                        console.log("err======>", err);
                        res.json({
                            status: true,
                            message: err.message
                        });
                    });
            } else {
                res.json({
                    status: false,
                    message: 'The email address is not a registered mallsplatform user'
                });
            }
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// update a specific publication by Id
router.put('/:id', async (req, res) => {
    // router.put('/:id', publicationsOwner, authenticateFun, (req, res) => {
    const objForUpdate = {};
    if (!req.files) {
        if (req.body.name) {
            let nameExist = await publication.findOne
                ({ name: req.body.name, _id: { $ne: req.params.id }, status: "active" });
            if (nameExist) {
                return res.json({
                    status: false,
                    message: "name already exist"
                });
            }
            objForUpdate.name = req.body.name;
        }
        if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.website) objForUpdate.website = req.body.website;
        if (req.body.app_code) objForUpdate.app_code = req.body.app_code;
        if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
        if (req.body.description) objForUpdate.description = req.body.description;
        if (req.body.usertypes) objForUpdate.usertypes = req.body.usertypes;
        if (req.body.status) objForUpdate.status = req.body.status;
        if (req.body.rewardPoints) objForUpdate.rewardPoints = req.body.rewardPoints;
        if (req.body.videoRewardPoints) objForUpdate.videoRewardPoints = req.body.videoRewardPoints;
        if (req.body.dailyLogin) objForUpdate.dailyLogin = req.body.dailyLogin;
        if (req.body.articleRead) objForUpdate.articleRead = req.body.articleRead;
        if (req.body.videoRead) objForUpdate.videoRead = req.body.videoRead;
        if (req.body.fiveArticleRead) objForUpdate.fiveArticleRead = req.body.fiveArticleRead;
        if (req.body.fiveVideoRead) objForUpdate.fiveVideoRead = req.body.fiveVideoRead;
        if (req.body.signUpBonus) objForUpdate.signUpBonus = req.body.signUpBonus;
        if (req.body.articleQuestionPoints) objForUpdate.articleQuestionPoints = req.body.articleQuestionPoints;
        if (req.body.videoQuestionPoints) objForUpdate.videoQuestionPoints = req.body.videoQuestionPoints;
        if (req.body.ddsLevel) objForUpdate.ddsLevel = req.body.ddsLevel;
        if (req.body.payoutCurrency) objForUpdate.payoutCurrency = req.body.payoutCurrency;
        if (req.body.payoutConversionRate) objForUpdate.payoutConversionRate = req.body.payoutConversionRate;
        if (req.body.primaryColor) objForUpdate.primaryColor = req.body.primaryColor;
        if (req.body.secondaryColor) objForUpdate.secondaryColor = req.body.secondaryColor;
        if (req.body.textColor) objForUpdate.textColor = req.body.textColor;
        if (req.body.fullColoredLogo) objForUpdate.fullColoredLogo = req.body.fullColoredLogo;
        if (req.body.font) objForUpdate.font = req.body.font;
        if (req.body.trendingnavbarid) objForUpdate.trendingnavbarid = req.body.trendingnavbarid;
        publication.updateOne({ _id: req.params.id }, objForUpdate)
            .then(publisherDetail => {
                res.json({
                    status: true,
                    message: "successfully update"
                });
            }).catch(err => {
                console.log("err======>", err);
                res.json({
                    status: true,
                    message: err.message
                });
            });
    }

});


router.put('/set/:id', (req, res) => {
    const collection_name = "pub_publication_details";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.website) objForUpdate.website = req.body.website;
        if (req.body.app_code) objForUpdate.app_code = req.body.app_code;
        if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
        if (req.body.description) objForUpdate.description = req.body.description;
        if (req.body.usertypes) objForUpdate.usertypes = req.body.usertypes;
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

// Delete a specific publication by Id
router.delete('/:id', (req, res) => {
    publication.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(publicationDetail => {
            res.json({
                status: true,
                message: 'Deleted the Publication'
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

const publication_stat = async (id) => {
    let pubDetail = await publication.findOne({ _id: id });
    let artCount = await article.find({ application_id: pubDetail.fxa_app_id }).countDocuments();
    let vidCount = await video.find({ application_id: pubDetail.fxa_app_id }).countDocuments();
    let publishers = await application.findOne({ fxa_app_id: pubDetail.fxa_app_id });
    let publisherCount = publishers.bos_user_id.length;
    return { "detail": pubDetail, "artCount": artCount, "vidCount": vidCount, "publisherCount": publisherCount };
};

router.put('/appcode/change/:id', async (req, res) => {
    // let addappcode = true;
    // if (req.query.status =="remove")
    // addappcode = false;
    // publication.updateOne({ _id: req.params.id },{addappcode? $addToSet :{app_code: req.body.app_code} : $pull:{app_code: req.body.app_code}} )
    let appData = await axios.get(`https://comms.globalxchange.com/gxb/apps/get?app_code=${req.body.app_code}`);
    publication.updateOne({ _id: req.params.id }, {
        $set: {
            app_code: [{ app_name: appData.data.apps[0].app_name }, { app_code: appData.data.apps[0].app_code }, { app_icon: appData.data.apps[0].app_icon }],
        }
    })
        .then(publisherDetail => {
            res.json({
                status: true,
                message: "successfully update"
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});


router.delete('/remove/publisher', async (req, res) => {
    try {
        if (req.body.publication_id && req.body.publisher_id) {
            //get publisher and peblication id and update the application collection
            // validate the publication 
            let publicationExist = await publication.findOne({
                _id: req.body.publication_id
            });
            if (!publicationExist) throw ({
                message: 'couldn\'t find the given publication'
            });
            // validate the publisher
            let applicationDetail;
            for (let i = 0; i < req.body.publisher_id.length; i++) {
                let publisherExist = await publisher.findOne({
                    _id: req.body.publisher_id[i]
                });
                if (!publisherExist) throw ({
                    message: 'couldn\'t find the given publisher'
                });
                applicationDetail = await application.findOneAndUpdate({
                    fxa_app_id: publicationExist.fxa_app_id
                }, {
                    $pull: {
                        bos_user_id: publisherExist.bos_user_id,
                        publishers: publisherExist._id
                    }
                })
            }
            if (applicationDetail) {
                res.json({
                    status: true,
                    message: "Publisher/publisher's removed from publication"
                });
            } else {
                res.json({
                    status: false,
                    message: "Something went wrong"
                });
            }
        } else {
            res.json({
                status: true,
                message: 'Required fields are missing'
            });
        }
    } catch (e) {
        res.json({
            status: false,
            message: e.message
        });
    }
});

module.exports = router;