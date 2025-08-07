const express = require('express');
const router = express.Router();
const PubWebStoryTemplate = require('../models/pub_web_story_template');
const Publication = require('../models/pub_publication_detail');
const Publisher = require('../models/pub_publisher_detail');
const mongoose = require('mongoose');

//create a new web story template
router.post('/new', async (req, res) => {
    let publisherDetail = await Publisher.findOne({ email: req.body.email, status: 'active' });
    if (!publisherDetail) {
        return res.json({
            status: false,
            message: "Publisher not found"
        });
    }

    if (req.body.publication_id) {
        let publicationdetail = await Publication.findOne({ _id: req.body.publication_id, status: 'active' })
        if (publicationdetail) {
            PubWebStoryTemplate.create({
                application_id: publicationdetail.fxa_app_id,
                name: req.body.name,
                icon: req.body.icon,
                desc: req.body.desc,
                email: req.body.email,
                link: req.body.link
            }).then((data) => {
                res.json({
                    status: true,
                    message: "Web Story Template Created Successfully",
                    data: data
                });
            }).catch((err) => {
                res.json({
                    status: false,
                    message: "Something went wrong", data: err
                });
            });
        } else {
            res.json({
                status: false,
                message: "Publication not found"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Publication id is required"
        });
    }
});

//get all web story template
router.get('/', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.email) {
        filter.email = req.query.email;
    }

    if (req.query.publication_id) {
        let publicationExist = await Publication.findOne({ _id: req.query.publication_id, status: "active" });
        if (publicationExist) {
            console.log(publicationExist.fxa_app_id)
            filter.application_id = publicationExist.fxa_app_id;
        } else {
            return res.json({
                status: false,
                message: "Publication not found"
            });
        }
    }
    PubWebStoryTemplate.aggregate([
        {
            $match: filter
        },
        {
            $sort: { "createdAt": -1 }
        },
        {
            $lookup: {
                from: "pub_stories",
                let: { "web_story_id": "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$web_story_id", "$$web_story_id"] } } },
                    { $match: { status: "active" } },
                    {
                        $group: {
                            _id: "$web_story_id",
                            count: { $sum: 1 }
                        }
                    }
                ],
                as: "stories"
            }
        },
        {
            $lookup: {
                from: "pub_publisher_details",
                let: { email: "$email" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$email", "$$email"] } } },
                    { $match: { status: "active" } },
                    {
                        $group: {
                            _id: "$email",
                            publisherDetail: { $push: "$$ROOT" }
                        }
                    }
                ],
                as: "publisher"
            }
        }
    ]).then((data) => {
        let firstData = data.filter((item) => {
              console.log(item._id.toString(), typeof item._id)
            return item._id.toString() === "6444dd4702a7ab41d6e5115d"
        })
        let filterData = data.filter((item) => {
            return item._id.toString() !== "6444dd4702a7ab41d6e5115d"
        })
        if (data.length > 0) {
            res.json({
                status: true,
                message: "Web Story Template List",
                total_count: data.length,
                data: firstData.concat(filterData)
            });
        } else {
            res.json({
                status: false,
                message: "Web Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//get web story template by id
router.get('/:id', async (req, res) => {
    PubWebStoryTemplate.findOne({ _id: req.params.id, status: "active" }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Web Story Template",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Web Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
})

//update web story template
router.put('/:id', async (req, res) => {
    let updateObj = {};
    if (req.body.name) {
        updateObj.name = req.body.name;
    }
    if (req.body.icon) {
        updateObj.icon = req.body.icon;
    }
    if (req.body.desc) {
        updateObj.desc = req.body.desc;
    }
    if (req.body.link) {
        updateObj.link = req.body.link;
    }
    PubWebStoryTemplate.findOneAndUpdate({ _id: req.params.id, status: "active" }, updateObj
    ).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Web Story Template Updated Successfully"
            });
        } else {
            res.json({
                status: false,
                message: "Web Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//delete web story template
router.delete('/:id', async (req, res) => {
    PubWebStoryTemplate.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Web Story Template Deleted Successfully",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Web Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", 
            data: err
        });
    });
});


router.post('/update', (req, res) => {
    PubWebStoryTemplate.updateMany({}, { $set: { email: 'shorupan@gmail.com' } }).then((data) => {
        res.json({
            status: true,
            message: "Story Template Updated Successfully",
            data: data
        });

    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
})


router.put("/updatemail/:application_id", (req,res) => {
    PubWebStoryTemplate.updateMany({application_id:req.params.application_id},{email:"web3today@gmail.com"})
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