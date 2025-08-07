const express = require('express');
const router = express.Router();
const PubWebStoryTemplate = require('../models/pub_web_story_template');
const StoryTemplate = require('../models/pub_stories');
const Publication = require('../models/pub_publication_detail');
const Publisher = require('../models/pub_publisher_detail');
const mongoose = require('mongoose');

//create a story template
router.post('/new', async (req, res) => {
    if (req.body.web_story_id) {
        let storyExist = await StoryTemplate.findOne({ web_story_id: req.body.web_story_id, name: req.body.name, status: 'active' });
        if (storyExist) {
            return res.json({
                status: false,
                message: "Story Template already exist"
            });
        }
        let publisherDetail = await Publisher.findOne({ email: req.body.email, status: 'active' });
        if (!publisherDetail) {
            return res.json({
                status: false,
                message: "Publisher not found"
            });
        }
        let webStoryExist = await PubWebStoryTemplate.findOne({ _id: req.body.web_story_id, status: 'active' });
        if (webStoryExist) {
            StoryTemplate.create({
                web_story_id: req.body.web_story_id,
                name: req.body.name,
                image: req.body.image,
                desc: req.body.desc,
                email: req.body.email,
                video_link: req.body.video_link,
                link_to_article: req.body.link_to_article,
            }).then((data) => {
                res.json({
                    status: true,
                    message: "Story Template Created Successfully",
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
                message: "Web Story Template not found"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Web Story Template id is required"
        });
    }
});

//get all story template
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

    if (req.query.web_story_id) filter.web_story_id = mongoose.Types.ObjectId(req.query.web_story_id);

    if (req.query.startDate && req.query.endDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
            $lt: new Date(req.query.endDate)
        }
    }

    // console.log(filter)

    StoryTemplate.aggregate([
        {
            $match: filter
        },
        {
            $sort: { createdAt: -1 }
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
        if (data.length > 0) {
            res.json({
                status: true,
                total_count: data.length,
                message: "Story Template List",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//get story template by id
router.get('/:id', async (req, res) => {
    StoryTemplate.findOne({ _id: req.params.id, status: 'active' }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Story Template",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//remove web story id from story template
router.put('/remove-web-story-id/:id', async (req, res) => {
    StoryTemplate.findOneAndUpdate({ _id: req.params.id, status: 'active' }, { web_story_id: null }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Removed web story id from Story Template Successfully",
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
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

//change web story id in story template
router.put('/change-web-story-id/:id', async (req, res) => {
    if (req.body.web_story_id) {
        let webStoryExist = await PubWebStoryTemplate.findOne({ _id: req.body.web_story_id, status: 'active' });
        if (webStoryExist) {
            StoryTemplate.findOneAndUpdate({ _id: req.params.id, status: 'active' }, { web_story_id: req.body.web_story_id }, { new: true }).then((data) => {
                if (data) {
                    res.json({
                        status: true,
                        message: "Changed web story id in Story Template Successfully"
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Story Template not found"
                    });
                }
            }).catch((err) => {
                res.json({
                    status: false,
                    message: "Something went wrong",
                    data: err
                });
            });
        } else {
            res.json({
                status: false,
                message: "Web Story Template not found"
            });
        }
    } else {
        res.json({
            status: false,
            message: "Web Story Template id is required"
        });
    }
});


//update story template
router.put('/:id', async (req, res) => {
    let updateObj = {}
    if (req.body.name) updateObj.name = req.body.name;
    if (req.body.image) updateObj.image = req.body.image;
    if (req.body.desc) updateObj.desc = req.body.desc;
    if (req.body.link_to_article) updateObj.link_to_article = req.body.link_to_article;
    if (req.body.video_link) updateObj.video_link = req.body.video_link

    StoryTemplate.findOneAndUpdate({ _id: req.params.id, status: 'active' }, updateObj, { new: true }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Story Template Updated Successfully",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});


//delete story template
router.delete('/:id', async (req, res) => {
    StoryTemplate.findOneAndUpdate({ _id: req.params.id, status: 'active' }, { status: 'inactive' }, { new: true }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Story Template Deleted Successfully",
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

//delete multiple
router.delete('/delete/multiple', async (req, res) => {
    StoryTemplate.updateMany({ _id: { $in: req.body.ids } }, { status: 'inactive' }, { new: true }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Story Templates Deleted Successfully",
            });
        } else {
            res.json({
                status: false,
                message: "One or more Story Templates not found"
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
});

router.post('/update', async (req, res) => {
    StoryTemplate.updateMany({}, { $set: { email: 'shorupan@gmail.com' } }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "Story Template Updated Successfully",
                data: data
            });
        } else {
            res.json({
                status: false,
                message: "Story Template not found"
            });
        }
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong", data: err
        });
    });
})

module.exports = router;