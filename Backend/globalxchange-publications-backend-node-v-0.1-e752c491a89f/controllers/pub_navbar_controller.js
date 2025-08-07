const express = require('express');
const router = express.Router();

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const navbar = require('../models/pub_navbar');
const video = require('../models/pub_video');
const article = require('../models/pub_article');
const publication = require('../models/pub_publication_detail');
const { publicationsOwner, authenticateFun } = require('../middleware/authenticate');

// Creating a new navbar
router.post('/', (req, res) => {
    // router.post('/', publicationsOwner, authenticateFun, (req, res) => {
    if (req.body.navTitle && req.body.desc && req.body.icon && req.body.application_id && req.body.email) {
        navbar.findOne({ application_id: req.body.application_id, navTitle: { $regex: req.body.navTitle, $options: 'i' } }).then(existingNavbar => {
            if (existingNavbar) {
                res.json({
                    status: false,
                    message: 'navbar already Exist with same nav title'
                });
            } else {
                navbar.create({
                    application_id: req.body.application_id,
                    user_id: req.body.user_id,
                    email: req.body.email,
                    navTitle: req.body.navTitle,
                    desc: req.body.desc,
                    icon: req.body.icon,
                }).then(navDetails => {
                    res.json({
                        status: true,
                        data: navDetails
                    });
                }).catch(err => {
                    console.log('err=====>', err);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
            }
        }).catch(err => {
            console.log('err=====>', err);
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

// Creating a new navbar using publication id
router.post('/new', async (req, res) => {
    // router.post('/new', publicationsOwner, authenticateFun, async (req, res) => {
    if (req.body.publication_id) {
        let publicationdetail = await publication.findOne({ _id: req.body.publication_id });
        // console.log("publicationDetails-----",publicationdetail.fxa_app_id);  
        if (req.body.navTitle && req.body.desc && req.body.icon && req.body.email) {
            navbar.create({
                application_id: publicationdetail.fxa_app_id,
                user_id: req.body.user_id,
                email: req.body.email,
                navTitle: req.body.navTitle,
                desc: req.body.desc,
                icon: req.body.icon,
            }).then(navDetails => {
                res.json({
                    status: true,
                    data: navDetails
                });
            }).catch(err => {
                console.log('err=====>', err);
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

// get all the navbardetails
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
    navbar.find(filter, null, { sort: { "createdAt": -1 } })
        .then(navDetails => {
            res.json({
                status: true,
                total_count: navDetails.length,
                data: navDetails
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// Get filter navbar Content using email of publication creator, app code atleast one or an array, publication title/name, nav bar title
router.get('/filter/', (req, res) => {
    // router.get('/filter/', publicationsOwner, authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.email) filter.email = req.query.email;
    if (req.query.name) filter.name = req.query.name;
    if (req.query.app_code) {
        var array = [];
        if (Array.isArray(req.query.app_code))
            array.push(...req.query.app_code);
        else
            array.push(req.query.app_code);
        console.log(req.query.app_code);
        // filter.app_code = [...array];
        // enabling array regex array
        var arrayRegexp = [];
        array.forEach(function (opt) {
            arrayRegexp.push(new RegExp(opt, "i"));
        });
    }
    publication.find({ app_code: { $in: arrayRegexp }, ...filter }, null, { sort: { "createdAt": -1 } }).then(publications => {
        let pubappid = [];
        for (let i = 0; i < publications.length; i++) {
            pubappid.push(publications[i].fxa_app_id)
        }
        let subfilter = {};
        subfilter.application_id = pubappid;
        if (req.query.navtitle) subfilter.navTitle = (req.query.navtitle).toLowerCase();
        navbar.find({ ...subfilter }, null, { sort: { "createdAt": -1 } })
            .then(async navbars => {
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
                        // message: `${req.params.email} doesn't have a nav bar with name ${title}`
                        message: `${req.query.email} doesn't have a nav bar with name ${subfilter.navTitle}`
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
        // console.log('err=====>', err);
        res.json({
            status: false,
            message: err.message
        });
    });
});


// get all the navbardetails for specific application
router.get('/application/:id', (req, res) => {
    // router.get('/application/:id', publicationsOwner, authenticateFun, (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.application_id = req.params.id;
    navbar.find(filter, null, { sort: { "createdAt": -1 } })
        .then(navDetails => {
            res.json({
                status: true,
                data: navDetails
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// get all the navbardetails for specific publication
router.get('/publication/:id', (req, res) => {
    // router.get('/publication/:id', publicationsOwner, authenticateFun, (req, res) => {
    publication.findById(req.params.id)
        .then(publicationDetail => {
            // console.log(publicationDetail);
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
                navbar.find(filter, null, { sort: { "createdAt": -1 } })
                    .then(navDetails => {
                        if(navDetails.length > 0) {
                        res.json({
                            status: true,
                            data: navDetails
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "No navbar found for this publication"
                        });
                    }
                    }).catch(err => {
                        console.log('err=====>', err);
                        res.json({
                            status: false,
                            message: err.message
                        });
                    });
            } else {
                res.json({
                    status: false,
                    message: "Publication not found"
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

// get all the navbardetails for specific user
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
    navbar.find(filter, null, { sort: { "createdAt": -1 } })
        .then(navDetails => {
            res.json({
                status: true,
                data: navDetails
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// Get all content for a specific navbar by Id
router.get('/content/:id', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    filter.navbar_id = req.params.id;
    try {
        let allVideos = await video.find(filter, null, { sort: { "createdAt": -1 } });
        let allArticles = await article.find(filter, null, { sort: { "createdAt": -1 } });
        res.json({
            status: true,
            data: {
                videos: allVideos,
                articles: allArticles
            }
        });
    }
    catch (err) {
        console.log("err====>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    }
});

// get a specific navbardetail
router.get('/:id', (req, res) => {
    navbar.findOne({ _id: req.params.id })
        .then(navDetail => {
            res.json({
                status: true,
                data: navDetail
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

// update a specific navbardetail
router.put('/:id', async (req, res) => {
    const objForUpdate = {};
    if (req.body.navTitle) objForUpdate.navTitle = req.body.navTitle;
    if (req.body.desc) objForUpdate.desc = req.body.desc;
    if (req.body.icon) objForUpdate.icon = req.body.icon;
    if (req.body.status) objForUpdate.status = req.body.status;
    navbar.updateOne({ _id: req.params.id }, objForUpdate)
        .then(navDetail => {
            res.json({
                status: true,
                message: "Successfully updated"
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

router.put('/set/:id', (req, res) => {
    const collection_name = "pub_navbars";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.navTitle) objForUpdate.navTitle = req.body.navTitle;
        if (req.body.desc) objForUpdate.desc = req.body.desc;
        if (req.body.icon) objForUpdate.icon = req.body.icon;
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
            //     // db.collection(collection_name).updateOne({ shop_code: req.params.id }, { $set: { ...cleanData.data } }, function (err, result) {
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

// Delete a specific navbardetail by ID
router.delete('/:id', (req, res) => {
    navbar.updateOne({ _id: req.params.id }, { status: 'inactive' })
        .then(navDetail => {
            res.json({
                status: true,
                message: 'Deleted the Navbar'
            });
        }).catch(err => {
            console.log('err=====>', err);
            res.json({
                status: false,
                message: err.message
            });
        });
});

module.exports = router;