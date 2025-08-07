const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require("axios")

// const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
const formatData = require('../utils/formatData');
const dynamicMiddleware = require('../middleware/pub_dynamic_middleware');

const userProfile = require('../models/pub_user_profile');
const publisher = require('../models/pub_publisher_detail');
const publication = require('../models/pub_publication_detail');
const countryuri = "https://comms.globalxchange.io/coin/vault/countries/data/get";
const userPublication = require('../models/pub_user_publication');

//import countries collection using mongoose



// Create a User Profile
router.post('/', async (req, res) => {
    if (req.body.email && req.body.username && req.body.user_type) {
        if (req.body.country) {
            let countryDetail = await axios.get(countryuri);
            // console.log("countryDetail======>", countryDetail.data);
            if (!req.body.countryIcon) {
                // console.log("req.body.country======>", countryDetail.data.countries);
                countryDetail.data.countries.map(element => {
                    if (element.name.toLowerCase() == req.body.country.toLowerCase()) {
                        console.log("element======>", element);
                        req.body.countryIcon = element.image;
                    }
                })
            }

            if (!req.body.countryIcon) {
                return res.json({
                    status: false,
                    message: "Country not found"
                });
            }
        }

        // let publisherDetail = await publisher.findOne({ email: req.body.email });
        // console.log("eeeeeeee====", publisherDetail);
        // let publicationDetail = await publication.findOne({ _id: req.body.publication_id });
        // console.log("publicationDetail======>", publicationDetail);
        // if (publicationDetail) {
        let refined = {}
        refined.username = req.body.username;
        refined.username = refined.username.replace(/[^a-zA-Z]/g, "");
        refined.username = refined.username.toLowerCase();
        refined.publication = req.body.publication;
        // refined.publication = refined.publication.replace(/[^a-zA-Z]/g, "");
        // refined.publication = refined.publication.toLowerCase();
        // refined.country = req.body.country;
        // refined.country = refined.country.replace(/[^a-zA-Z]/g, "");
        refined.countryIcon = req.body.countryIcon;
        // refined.country = refined.country.toLowerCase();
        refined.publication_id = req.body.publication_id;
        refined.phoneNumber = req.body.phoneNumber;
        let userRecord = await userProfile.findOne({ unique_user_id: req.body.email?.split("@")[0] + "@" + refined.username });
        if (userRecord) {
            res.json({
                status: true,
                message: "Username Already Exist"
            });
        } else {
            // console.log("aaaaaa", refined.username + "@" + refined.publication + "@" + refined.country);
            let userData = ["Reader", "Advertiser", "Founder", "Author", "Web3 Marketplace Creator", "Hiring Representative"]
            if (userData.includes(req.body.user_type)) {
                userProfile.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    email: req.body.email,
                    profile_pic: req.body.profile_pic,
                    cover_pic: req.body.cover_pic,
                    age: req.body.age,
                    school: req.body.school,
                    bio: req.body.bio,
                    address: req.body.address,
                    country: req.body.country,
                    countryIcon: req.body.countryIcon,
                    publication: req.body.publication,
                    publication_id: req.body.publication_id,
                    user_type: req.body.user_type,
                    phoneNumber: req.body.phoneNumber,
                    socialMedia: req.body.socialMedia,
                    // unique_user_id: req.body.username + "@" + req.body.publication + "@" + req.body.country,
                    unique_user_id: req.body.email?.split("@")[0] + "@" + refined.username,
                }).then(userDetail => {
                    res.json({
                        status: true,
                        data: userDetail
                    });
                }).catch(err => {
                    console.log("err===>", err.message);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
            } else {
                res.json({
                    status: false,
                    message: "Invalid User Type"
                });
            }
        }
        // } else {
        //     res.json({
        //         status: true,
        //         message: "Invalid Input"
        //     });
        // }
    } else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

router.get('/check', async (req, res) => {
    userProfile.findOne({ username: req.query.username, status: "active" }).then(userDetail => {
        if (userDetail) {
            return res.json({
                status: false,
                message: "Username Already Exist"
            });
        } else {
            return res.json({
                status: true,
                message: "Username Available"
            });
        }
    }).catch(err => {
        res.json({
            status: false,
            message: err.message
        });
    })
})

// Register a userProfile using Publisher mail Id and other Details
router.post('/register', async (req, res) => {
    if (req.body.email && req.body.username && req.body.publication && req.body.user_type) {
        let publisherDetail = await publisher.findOne({ email: req.body.email });
        // console.log("eeeeeeee====", publisherDetail);
        let publicationDetail = await publication.findOne({ name: req.body.publication, usertypes: req.body.user_type });
        // console.log("publicationDetail======>", publicationDetail);
        if (publisherDetail && publicationDetail) {
            let refined = {}
            refined.username = req.body.username;
            refined.username = refined.username.replace(/[^a-zA-Z]/g, "");
            refined.username = refined.username.toLowerCase();
            refined.publication = req.body.publication;
            refined.publication = refined.publication.replace(/[^a-zA-Z]/g, "");
            refined.publication = refined.publication.toLowerCase();
            refined.country = req.body.country;
            refined.country = refined.country.replace(/[^a-zA-Z]/g, "");
            refined.country = refined.country.toLowerCase();
            let userRecord = await userProfile.findOne({ unique_user_id: refined.username + "@" + refined.publication + "@" + refined.country });
            if (userRecord) {
                res.json({
                    status: true,
                    message: "Username Already Exist"
                });
            } else {
                userProfile.create({
                    email: req.body.email,
                    username: req.body.username,
                    publication: req.body.publication,
                    user_type: req.body.user_type,
                    // unique_user_id: req.body.username + "@" + req.body.publication + "@" + req.body.country,
                    unique_user_id: refined.username + "@" + refined.publication + "@" + refined.country,
                }).then(userDetail => {
                    res.json({
                        status: true,
                        data: userDetail
                    });
                }).catch(err => {
                    console.log("err===>", err.message);
                    res.json({
                        status: false,
                        message: err.message
                    });
                });
            }
        } else {
            res.json({
                status: false,
                message: "Invalid Input"
            });
        }
    } else {
        res.json({
            status: false,
            message: "All field Required"
        });
    }
});

// Get all User Profile
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
    if (req.query.username)
        filter.username = req.query.username;
    if (req.body.user_type)
        filter.user_type = req.body.user_type;
    if (req.query.publication) {
        filter.publication = req.query.publication;
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
    }
    userProfile.find(filter, null, { sort: { "createdAt": -1 } }).then(userDetail => {
        if (userDetail.length > 0) {
            res.json({
                status: true,
                data: userDetail
            });
        } else {
            res.json({
                status: false,
                message: "No Record Found"
            });
        }
    }).catch(err => {
        console.log("err===>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Get a specific User Profile by ID
router.get('/:id', (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    userProfile.findOne({ _id: req.params.id, status: "active" }).then(userDetail => {
        if (!userDetail) {
            return res.json({
                status: false,
                message: "No Record Found"
            });
        }
        res.json({
            status: true,
            data: userDetail
        });
    }).catch(err => {
        console.log("err===>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    userProfile.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }).then(userDetail => {
        if (!userDetail) {
            return res.json({
                status: false,
                message: "No Record Found"
            });
        }
        userPublication.findOneAndUpdate({ user_id: req.params.id, status: "active" }, { status: "inactive" }).then(userPublicationDetail => {
            if (!userPublicationDetail) {
                return res.json({
                    status: false,
                    message: "No Record Found"
                });
            } else {
                res.json({
                    status: true,
                    data: "Deleted profile successfully"
                });
            }
        }).catch(err => {
            console.log("err===>", err.message);
            res.json({
                status: false,
                message: err.message
            });
        });
    }).catch(err => {
        console.log("err===>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});
// Update a specific User Profile by ID
router.put('/:id', (req, res) => {
    const objForUpdate = {};
    if (req.body.first_name) objForUpdate.first_name = req.body.first_name;
    if (req.body.last_name) objForUpdate.last_name = req.body.last_name;
    if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
    if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
    if (req.body.age) objForUpdate.age = req.body.age;
    if (req.body.school) objForUpdate.school = req.body.school;
    if (req.body.bio) objForUpdate.bio = req.body.bio;
    if (req.body.address) objForUpdate.address = req.body.address;
    userProfile.updateOne({ _id: req.params.id }, objForUpdate).then(userDetail => {
        res.json({
            status: true,
            message: "Successfully Updated"
        });
    }).catch(err => {
        console.log("err===>", err.message);
        res.json({
            status: false,
            message: err.message
        });
    });
});

// Update a specific User Profile by ID (Dynamic)
router.put('/set/:id', (req, res) => {
    const collection_name = "pub_articles";
    formatData.sanitizeData(collection_name, req.body).then(async cleanData => {
        let objForUpdate = {};
        let condition = {};
        if (req.params.id) condition._id = mongodb.ObjectID(req.params.id);
        if (cleanData.data) objForUpdate = cleanData.data;
        if (req.body.first_name) objForUpdate.first_name = req.body.first_name;
        if (req.body.last_name) objForUpdate.last_name = req.body.last_name;
        if (req.body.profile_pic) objForUpdate.profile_pic = req.body.profile_pic;
        if (req.body.cover_pic) objForUpdate.cover_pic = req.body.cover_pic;
        if (req.body.age) objForUpdate.age = req.body.age;
        if (req.body.school) objForUpdate.school = req.body.school;
        if (req.body.bio) objForUpdate.bio = req.body.bio;
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

module.exports = router;