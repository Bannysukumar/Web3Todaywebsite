const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const video = require('../models/pub_video');
const publisher = require('../models/pub_publisher_detail');
const publication = require('../models/pub_publication_detail');

// Creating a new video
router.post('/', (req, res) => {
    if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.image && req.body.video && req.body.application_id && req.body.email && req.body.country) {
        video.create({
            categoryType: req.body.categoryType,
            application_id: req.body.application_id,
            user_id: req.body.user_id,
            email: req.body.email,
            navbar_id: req.body.navbar_id,
            title: req.body.title,
            desc: req.body.desc,
            image: req.body.image,
            video: req.body.video,
            action_link: req.body.action_link,
            action: req.body.action,
            attachment: req.body.attachment,
            country: req.body.country,
            metatags: req.body.metatags,
            keywords: req.body.keywords,
            joinTags: req.body.metatags.join(", "),
            joinKeywords: req.body.keywords.join(", "),
            altTag: req.body.altTag,
        }).then(videoDetails => {
            res.json({
                status: true,
                data: videoDetails
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

router.post('/new', async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        if (publicationdetail) {
            if (req.body.categoryType && req.body.navbar_id && req.body.title && req.body.image && req.body.video && req.body.publication_id && req.body.email && req.body.country) {

                let titleExist = await video.findOne({ title: req.body.title , status : "active" });
                if (titleExist) {
                    return res.json({
                        status: false,
                        message: 'Title already exist'
                    });
                }
                let videoDetails = await video.findOne({ custom_url: req.body.custom_url, status : "active" });
                if (videoDetails) {
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
                let allJoinTags
                if (req.body.metatags) {
                    allJoinTags = req.body.metatags.join(", ");
                }
                let allJoinKeywords
                if (req.body.keywords) {
                    allJoinKeywords = req.body.keywords.join(", ");
                }

                video.create({
                    categoryType: req.body.categoryType,
                    application_id: publicationdetail.fxa_app_id,
                    user_id: req.body.user_id,
                    email: req.body.email,
                    navbar_id: req.body.navbar_id,
                    title: req.body.title,
                    desc: req.body.desc,
                    image: req.body.image,
                    video: req.body.video,
                    action_link: req.body.action_link,
                    action: req.body.action,
                    attachment: req.body.attachment,
                    country: req.body.country,
                    metatags: req.body.metatags,
                    keywords: req.body.keywords,
                    joinTags: allJoinTags,
                    joinKeywords: allJoinKeywords,
                    altTag: req.body.altTag,
                    custom_url: req.body.custom_url,
                }).then(videoDetails => {
                    res.json({
                        status: true,
                        data: videoDetails
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
                filter.application_id = publicationDetail.fxa_app_id;
                console.log('instede ffunc')
                if (req.query.user_id) {
                    filter.user_id = req.query.user_id;
                }
                if (req.query.email) {
                    filter.email = req.query.email;
                }
                // video.find(filter, null, { sort: { "createdAt": -1 } })
                //     .then(videos => {
                //         if (videos.length > 0) {
                //             res.json({
                //                 status: true,
                //                 total_count: videos.length,
                //                 data: videos
                //             });
                //         } else {
                //             res.json({
                //                 status: false,
                //                 message: "No videos Found for this Publication"
                //             });
                //         }
                //     }).catch(err => {
                //         console.log('err=========>', err);
                //         res.json({
                //             status: false,
                //             message: err.message
                //         });
                //     });
                video.aggregate([
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
                ]).then(videos => {
                    if (videos.length > 0) {
                        res.json({
                            status: true,
                            total_count: videos.length,
                            data: videos
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "No videos Found for this Publication"
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

// get all the videos
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
    if (req.body.email)
        filter.email = req.body.email;
    if (req.query.user_id) {
        filter.user_id = req.query.user_id
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
    video.find(filter, null, { sort: { "createdAt": -1 } })
        .then(videos => {
            if (videos.length > 0) {
                res.json({
                    status: true,
                    total_count: videos.length,
                    data: videos
                })
            } else {
                res.json({
                    status: false,
                    message: "Videos not found"
                })
            }
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all the videos for a specific application
router.get('/application/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.application_id = req.params.id;
    video.find(filter, null, { sort: { "createdAt": -1 } })
        .then(videos => {
            res.json({
                status: true,
                total_count: videos.length,
                data: videos
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all the videos for a specific user
router.get('/user/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.user_id = req.params.id;
    video.find(filter, null, { sort: { "createdAt": -1 } })
        .then(async videos => {
            let userDetail = await publisher.findOne({ bos_user_id: req.params.id })

            res.json({
                status: true,
                data: {
                    userDetail: userDetail,
                    total_count: videos.length,
                    video: videos
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

// get all videos for a specific categories ID
router.get('/category/', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
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
    video.find({ categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(videoDetails => {
            res.json({
                status: true,
                total_count: videoDetails.length,
                data: videoDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all videos for a specific navbar ID
router.get('/navbar/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.navbar_id = req.params.id;
    video.find(filter, null, { sort: { "createdAt": -1 } })
        .then(videoDetails => {
            res.json({
                status: true,
                total_count: videoDetails.length,
                data: videoDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all videos for a specific navbar ID's array
router.get('/navbars', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    video.find({ navbar_id: { $in: req.query.navbar }, ...filter }, null, { sort: { "createdAt": -1 } })
        .then(videoDetails => {
            res.json({
                status: true,
                total_count: videoDetails.length,
                data: videoDetails
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all videos for a specific navbar ID's array / categories ID array
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
        video.find({ navbar_id: { $in: req.query.navbar }, categoryType: { $in: req.query.category }, ...filter }, null, { sort: { "createdAt": -1 } })
            .then(videoDetails => {
                res.json({
                    status: true,
                    total_count: videoDetails.length,
                    data: videoDetails
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

// get a specific video by ID
router.get('/:custom_url', (req, res) => {
    video.aggregate([
        {
            $match: { custom_url: req.params.custom_url }
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
                from: "pub_video_questions",
                let: { "video_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$video_id", "$video_id"]
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
                    }
                ],
                as: "video_questions"
            }
        },

    ])
        .then(async videoDetails => {
            let userDetail = await publisher.findOne({ bos_user_id: videoDetails.user_id })
            res.json({
                status: true,
                data: {
                    // userDetail: userDetail,
                    video: videoDetails
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

// upload the file attachment for the video body for a specific article ID
router.put('/attachment/:id', (req, res) => {
    if (req.body.attachment) {
        video.updateOne({ _id: req.params.id }, { $push: { "attachment": req.body.attachment } })
            .then(videoDetails => {
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

// update a specific video by ID
router.put('/:id', async (req, res) => {
    const objForUpdate = {};
    if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
    if (req.body.navbar_id) objForUpdate.navbar_id = req.body.navbar_id;
    if (req.body.title) {
        let titleExist = await video.findOne
            ({ title: req.body.title, _id: { $ne: req.params.id }, status: "active" });
        if (titleExist) {
            return res.json({
                status: false,
                message: "Title already exist."
            });
        }
        objForUpdate.title = req.body.title;
        let newArr = req.body.title.split(' ')
        objForUpdate.link_name = newArr.map(item => item.replace(/[^\w]/gi, '')).join('_');
    }
    if (req.body.desc) objForUpdate.desc = req.body.desc;
    if (req.body.image) objForUpdate.image = req.body.image;
    if (req.body.video) objForUpdate.video = req.body.video;
    if (req.body.status) objForUpdate.status = req.body.status;
    if (req.body.action_link) objForUpdate.action_link = req.body.action_link;
    if (req.body.action) objForUpdate.action = req.body.action;
    if (req.body.attachment) objForUpdate.attachment = req.body.attachment;
    if (req.body.altTag) objForUpdate.altTag = req.body.altTag;
    if (req.body.metatags) {
        objForUpdate.metatags = req.body.metatags;
        objForUpdate.joinTags = req.body.metatags.join(",")
    }
    if (req.body.keywords) {
        objForUpdate.keywords = req.body.keywords;
        objForUpdate.joinKeywords = req.body.keywords.join(",")
    }
    if (req.body.custom_url) {
        let custom_urlExist = await video.findOne({ custom_url: req.body.custom_url, _id: { $ne: req.params.id }, status: "active" });
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

    video.updateOne({ _id: req.params.id }, objForUpdate)
        .then(videoDetails => {
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
});


router.put('/set/:id', (req, res) => {
    const collection_name = "pub_videos";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.categoryType) objForUpdate.categoryType = req.body.categoryType;
        if (req.body.navbar_id) objForUpdate.navbar_id = req.body.navbar_id;
        if (req.body.title) objForUpdate.title = req.body.title;
        if (req.body.desc) objForUpdate.desc = req.body.desc;
        if (req.body.image) objForUpdate.image = req.body.image;
        if (req.body.video) objForUpdate.video = req.body.video;
        if (req.body.status) objForUpdate.status = req.body.status;
        if (req.body.action_link) objForUpdate.action_link = req.body.action_link;
        if (req.body.action) objForUpdate.action = req.body.action;
        if (req.body.attachment) objForUpdate.attachment = req.body.attachment;
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

// Delete a specific video by ID
router.delete('/:id', (req, res) => {
    video.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(videoDetails => {
            res.json({
                status: true,
                message: 'Deleted the video'
            });
        }).catch(err => {
            console.log('err=========>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

router.post('/restore', (req, res) => {
    video.updateMany({ application_id: req.body.application_id, status: "inactive" }, { status: 'active' })
        .then(videoDetails => {
            if (videoDetails) {
                res.json({
                    status: true,
                    message: 'Restored the Video'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Video not found'
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
    video.updateMany({ application_id: req.body.application_id, status: "active" }, { status: 'inactive' })
        .then(videoDetails => {
            if (videoDetails) {
                res.json({
                    status: true,
                    message: 'Deleted the Video'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Video not found'
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

router.put("/updatemail/:application_id", (req,res) => {
    video.updateMany({application_id:req.params.application_id},{user_id:"64c3910efaa4a7072d3cd6a6",email:"web3today@gmail.com"})
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


module.exports = router;