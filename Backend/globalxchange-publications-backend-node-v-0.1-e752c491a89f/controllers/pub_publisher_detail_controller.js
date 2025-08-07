const express = require('express');
const router = express.Router();
const axios = require('axios');
const { mallPlatformUser, Publisher, authenticateFun } = require('../middleware/authenticate');

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const publisher = require('../models/pub_publisher_detail');
const publication = require('../models/pub_publication_detail');
const article = require('../models/pub_article');
const video = require('../models/pub_video');
const application = require('../models/pub_app_publisher');
const navbar = require('../models/pub_navbar');
const sanction = require('../models/pub_app_owner_sanction');

// Create a publisher Profile
router.post('/', async (req, res) => {
    // router.post('/', mallPlatformUser, authenticateFun, (req, res) => {
    if (req.body.bos_user_id && req.body.bos_profile_id && req.body.name && req.body.user_name && req.body.email && req.body.description && req.body.country) {
        let extPublisher = await publisher.findOne({ user_name: { $regex: req.body.user_name, $options: 'i' }, });//If user_name already used
        if (extPublisher) {
            res.json({
                status: false,
                message: "Username already Exist"
            });
        } else {
            publisher.create({
                bos_user_id: req.body.bos_user_id,
                bos_profile_id: req.body.bos_profile_id,
                name: req.body.name,
                user_name: req.body.user_name,
                email: req.body.email,
                profile_pic: req.body.profile_pic,
                cover_pic: req.body.cover_pic,
                description: req.body.description,
                website: req.body.website,
                social_media: req.body.social_media,
                country: req.body.country,
            }).then(publisherDetail => {
                res.json({
                    status: true,
                    data: publisherDetail
                });
            }).catch(err => {
                console.log("err======>", err);
                res.json({
                    status: true,
                    message: err.message
                });
            });
        }
    } else {
        res.json({
            status: false,
            message: "Required fields are missing"
        });
    }
});

// Create publisher using a registered bos_email also which is registerd in malls platform
router.post('/register', async (req, res) => {
    // router.post('/register', mallPlatformUser, authenticateFun, async (req, res) => {
    if (req.body.name && req.body.user_name && req.body.email && req.body.description && req.body.country) {

        // const newUsr = {};
        // newUsr.email = req.body.email;
        // let bosUser = await axios.post('https://bos.apimachine.com/test/user', newUsr);
        // let extPublisher = await publisher.findOne({
        //     user_name: {
        //         $regex: req.body.user_name,
        //         $options: 'i',
        //     },
        // }); 

        let publisherDetail = await publisher.findOne({ email: req.body.email })
        if (publisherDetail) {
            return res.json({
                status: false,
                message: "Email already Exist"
            });
        }
        let publisherUser = await publisher.findOne({ user_name: req.body.user_name })
        if (publisherUser) {
            res.json({
                status: false,
                message: "Username already Exist"
            });
        } else {
            // let currentPublisher
            // let PublisherExist = await axios.get('https://comms.globalxchange.io/gxb/apps/users/get?app_code=web3today');
            // if (PublisherExist.data.users.length > 0) {
            //     PublisherExist.data.users.forEach((e) => {
            //         if (e.email === req.body.email) {
            //             currentPublisher = e
            //         }
            //     })
            //     if (!currentPublisher) {
            //         return res.json({
            //             status: false,
            //             message: "No user found with this email"
            //         })
            //     }
            //     // console.log(currentPublisher)
            // } else {
            //     return res.json({
            //         status: false,
            //         message: "Publisher cannot be validated"
            //     })
            // }

            publisher.create({
                // bos_user_id: bosUser.data.data._id,
                // bos_profile_id: bosUser.data.data.bos_user_id,
                name: req.body.name,
                profile_pic: req.body.profile_pic,
                cover_pic: req.body.cover_pic,
                user_name: req.body.user_name,
                email: req.body.email,
                description: req.body.description,
                country: req.body.country,
                social_media: req.body.social_media,
            }).then(publisherDetail => {
                res.json({
                    status: true,
                    data: publisherDetail
                });
            }).catch(err => {
                console.log("err======>", err);
                res.json({
                    status: true,
                    message: err.message
                });
            });
        }
    } else {
        res.json({
            status: false,
            message: "Required fields are missing"
        });
    }
});

// Create publisher using a registered bos_email also which is registered in malls platform and add to a publication
router.post('/publication/register', async (req, res) => {
    // router.post('/register', mallPlatformUser, authenticateFun, async (req, res) => {
    if (req.body.name && req.body.user_name && req.body.email && req.body.description && req.body.country, req.body.publication_id) {
        console.log('inside function')
        try {
            const newUsr = {};
            newUsr.email = req.body.email;
            let bosUser = await axios.post('https://bos.apimachine.com/test/user', newUsr);
            let extPublisher = await publisher.findOne({
                user_name: {
                    $regex: req.body.user_name,
                    $options: 'i'
                },
            }); //If user_name already used
            if (extPublisher) {
                res.json({
                    status: false,
                    message: "Username already Exist"
                });
            } else {
                let publicationDetail = await publication.findById(req.body.publication_id);
                // console.log("aaaaa",publicationDetail);
                if (!publicationDetail) throw ({ message: "couldn't find the given publiction" });
                publisher.create({
                    bos_user_id: bosUser.data.data._id,
                    bos_profile_id: bosUser.data.data.bos_user_id,
                    name: req.body.name,
                    user_name: req.body.user_name,
                    email: req.body.email,
                    description: req.body.description,
                    country: req.body.country,
                }).then(async publisherDetail => {
                    try {
                        let updateAppPublisher = await application.updateOne({
                            fxa_app_id: publicationDetail.fxa_app_id
                        }, {
                            $addToSet: {
                                bos_user_id: publisherDetail.bos_user_id,
                                publishers: publisherDetail._id
                            }
                        });
                        // console.log("aaaaaasqq", updateAppPublisher);
                        res.json({
                            status: true,
                            data: publisherDetail
                        });
                    } catch (err) {
                        // console.log("err===>", err);
                        res.json({
                            status: false,
                            message: err.message
                        });
                    }
                }).catch(err => {
                    console.log("err======>", err);
                    res.json({
                        status: true,
                        message: err.message
                    });
                });
            }
        } catch (err) {
            // console.log("err===>", err);
            res.json({
                status: false,
                message: err.message
            });
        }

    } else {
        res.json({
            status: false,
            message: "Required fields are missing"
        });
    }
});

// Get publisher profile details based on the BOS mail id 
router.post('/detail', async (req, res) => {
    const newUsr = {};
    newUsr.email = req.body.bos_email;
    let bosUser = await axios.post('https://bos.apimachine.com/test/user', newUsr);
    // console.log("bosUser",bosUser.data.data);
    publisher.findOne({ bos_user_id: bosUser.data.data._id })
        .then(publishers => {
            res.json({
                status: true,
                data: publishers
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get all publishers
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
    if (req.query.email) {
        filter.email = req.query.email
    }
    publisher.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_follow_authors",
                let: { "email": "$email" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$email", "$authorEmail"] },
                                    { $eq: ["$status", "active"] },
                                ]
                            }
                        }
                    },
                    // {
                    //     $group: {
                    //         "_id": "$_id",
                    //         PublisherDetails: {
                    //             $push: { _id: "$_id", profile_pic: "$profile_pic", name: "$name", email: "$email" }
                    //         }
                    //     }
                    // }
                ],
                as: "FollowerDetails"
            }
        },
        {
            $addFields: {
                followersCount: { $size: "$FollowerDetails" }
            }
        },
        {
            $project: {
                _id: 1,
                social_media: 1,
                status: 1,
                name: 1,
                profile_pic: 1,
                user_name: 1,
                email: 1,
                description: 1,
                country: 1,
                createdAt: 1,
                updatedAt: 1,
                __v: 1,
                cover_pic: 1,
                website: 1,
                followersCount: 1
                // Exclude FollowerDetails
            }
        }
    ])
        .then(publishers => {
            res.json({
                status: true,
                total_count: publishers.length,
                data: publishers.filter(item => item != item?.FollowerDetails)
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get a specific publisher by Id
router.get('/:id', (req, res) => {
    // router.get('/:id', Publisher, authenticateFun, (req, res) => {
    publisher.findOne({ _id: req.params.id })
        .then(publisherDetail => {
            res.json({
                status: true,
                data: publisherDetail
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});

// get a specific publisher's detail and article using bos profile_id
router.get('/profile/article/:id', (req, res) => {
    // router.get('/profile/article/:id', Publisher, authenticateFun, (req, res) => {
    let itemsPerPage, pageNo;
    itemsPerPage = parseInt(req.query.itemsPerPage ? req.query.itemsPerPage : 10);
    pageNo = parseInt(req.query.pageNo ? req.query.pageNo : 1);
    publisher.findOne({ bos_profile_id: req.params.id })
        .then(publisherDetail => {
            let filter = {}
            if (req.query.status) {
                filter.status = req.query.status;
                if (req.query.status == "all")
                    filter = {};
            } else {
                filter.status = "active";
            }
            filter.user_id = publisherDetail.bos_user_id;
            article.find(filter, null, { sort: { "createdAt": -1 } })
                .limit(itemsPerPage)
                .skip(itemsPerPage * (pageNo - 1))
                .then(articles => {
                    res.json({
                        status: true,
                        data: {
                            publisher: publisherDetail,
                            total_count: articles.length,
                            articles: articles
                        }
                    });
                }).catch(err => {
                    console.log("err======>", err);
                    res.json({
                        status: true,
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

// get a specific publisher's detail and video using bos profile_id
router.get('/profile/video/:id', (req, res) => {
    // router.get('/profile/video/:id', Publisher, authenticateFun, (req, res) => {
    let itemsPerPage, pageNo;
    itemsPerPage = parseInt(req.query.itemsPerPage ? req.query.itemsPerPage : 10);
    pageNo = parseInt(req.query.pageNo ? req.query.pageNo : 1);
    publisher.findOne({ bos_profile_id: req.params.id })
        .then(publisherDetail => {
            let filter = {}
            if (req.query.status) {
                filter.status = req.query.status;
                if (req.query.status == "all")
                    filter = {};
            } else {
                filter.status = "active";
            }
            filter.user_id = publisherDetail.bos_user_id;
            video.find(filter, null, { sort: { "createdAt": -1 } })
                .limit(itemsPerPage)
                .skip(itemsPerPage * (pageNo - 1))
                .then(videos => {
                    res.json({
                        status: true,
                        data: {
                            publisher: publisherDetail,
                            videos: videos
                        }
                    });
                }).catch(err => {
                    console.log("err======>", err);
                    res.json({
                        status: true,
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

// get a specific publisher stats
router.get('/stats/:id', async (req, res) => {
    // router.get('/stats/:id', Publisher, authenticateFun, async (req, res) => {
    let stats = await publisher_stat(req.params.id);
    res.send(stats);
});

// Change the Publisher credentials to a specific user
router.put('/credential', (req, res) => {
    // router.put('/credential', Publisher, authenticateFun, (req, res) => {
    // TODO need to crosscheck and test this with sample record
    // accepts the email, bos_user_id and new_bos_email, new_user_id
    // need to accept the only the new_bos_email/new_user_id
    publisher.findOne({ email: req.body.newUser_email })
        .then(newPubDetail => {
            if (newPubDetail._id) {
                publisher.findOneAndUpdate({ bos_user_id: req.body.bos_user_id, email: req.body.email }, { email: newPubDetail.email, bos_user_id: newPubDetail.bos_user_id, bos_profile_id: newPubDetail.bos_profile_id })
                    .then(async publisherDetail => {
                        // updating all the various collection where the publisher detail are linked
                        let article_status = await article.updateMany({ user_id: req.body.bos_user_id }, { user_id: newPubDetail.bos_user_id, email: newPubDetail.email });
                        let video_status = await video.updateMany({ user_id: req.body.bos_user_id }, { user_id: req.body.new_user_id, email: req.body.new_email });
                        let nav_status = await navbar.updateMany({ user_id: req.body.bos_user_id }, { user_id: req.body.new_user_id, email: req.body.new_email });
                        // creating a record for owner change
                        let owner_sanction = await sanction.create({
                            application_id: publisherDetail._id,
                            oldUser_email: publisherDetail.email,
                            newUser_email: newPubDetail.email,
                            type: 'publisher',
                            comment: req.body.comment,
                            // comment: 'Change of publisher credential by acknowlegment',
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
                    message: "There is no publisher with specified email"
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

// update a specific publisher by Id
router.put('/:id', (req, res) => {
    // router.put('/:id', Publisher, authenticateFun, (req, res) => {
    const objForUpdate = {};
    if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
    if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
    if (req.body.website) objForUpdate.website = req.body.website;
    if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.user_name) objForUpdate.user_name = req.body.user_name;
    if (req.body.country) objForUpdate.country = req.body.country;
    publisher.updateOne({ _id: req.params.id }, objForUpdate)
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


router.put('/set/:id', (req, res) => {
    const collection_name = "pub_articles";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.website) objForUpdate.website = req.body.website;
        if (req.body.social_media) objForUpdate.social_media = req.body.social_media;
        if (req.body.description) objForUpdate.description = req.body.description;
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


// Delete a publisher by Id
router.delete('/:id', (req, res) => {
    publisher.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(publisherDetail => {
            res.json({
                status: true,
                message: "Deleted the Publisher"
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });
});


const publisher_stat = async (id) => {
    let pubDetail = await publisher.findOne({ _id: id });
    let artCount = await article.find({ user_id: pubDetail.bos_user_id }).countDocuments();
    let vidCount = await video.find({ user_id: pubDetail.bos_user_id }).countDocuments();
    let publication = await application.find({ bos_user_id: pubDetail.bos_user_id }).countDocuments();
    return { "detail": pubDetail, "artCount": artCount, "vidCount": vidCount, "publicationCount": publication };
};

router.post('/addpics', (req, res) => {
    publisher.updateMany({}, { $set: { profile_pic: "https://drivetest.globalxchange.io/gxsharepublic/?full_link=ram.brain.stream/6bb22028c99eeeffd851ef9b5c871f8c", cover_pic: "https://drivetest.globalxchange.io/gxsharepublic/?full_link=ram.brain.stream/6bb22028c99eeeffd851ef9b5c871f8c" } })
        .then(publisherDetail => {
            res.json({
                status: true,
                message: "Added pics to the Publisher"
            });
        }).catch(err => {
            console.log("err======>", err);
            res.json({
                status: true,
                message: err.message
            });
        });

});

module.exports = router;