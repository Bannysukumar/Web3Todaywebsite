const express = require('express');
const router = express.Router();

const sections = require('../models/pub_section');
const videoSection = require('../models/pub_video_section');
const mongoose = require('mongoose');

//create a new video for a section
router.post('/create', async (req, res) => {

    if (isNaN(req.body.video_order)) {
        return res.json({
            status: false,
            message: "video order must be a number"
        });
    }

    if (!req.body.section_id) {
        return res.json({
            status: false,
            message: "section id can not be empty"
        });
    } else {
        let SectionDetail = await sections.findOne({ _id: req.body.section_id });
        if (!SectionDetail) {
            return res.json({
                status: false,
                message: "section id not found"
            });
        }
    }
    let nameCheck = await videoSection.findOne({ name: req.body.name });
    if (nameCheck) {
        return res.json({
            status: false,
            message: "video name already exist"
        });
    }

    let orderCheck = await videoSection.findOne({ video_order: req.body.video_order, section_id: req.body.section_id });
    if (orderCheck) {
        return res.json({
            status: false,
            message: "video order already exist"
        });
    }

    videoSection.create({
        section_id: req.body.section_id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        video_link: req.body.video_link,
        video_length: req.body.video_length,
        video_order: req.body.video_order,
    }).then((result) => {
        return res.json({
            status: true,
            message: "video added successfully",
            data: result
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong",
            data: err
        })
    })
});

//get all videos

router.get('/list', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.video_id) {
        filter._id = req.query.video_id;
    }

    if (req.query.section_id) {
        filter.section_id = req.query.section_id;
    }
    if (req.query.name) {
        filter.name = req.query.name;
    }
    if (req.query.description) {
        filter.description = req.query.description;
    }
    if (req.query.image) {
        filter.image = req.query.image;
    }
    if (req.query.video_link) {
        filter.video_link = req.query.video_link;
    }
    if (req.query.video_length) {
        filter.video_length = req.query.video_length;
    }
    if (req.query.video_order) {
        filter.video_order = req.query.video_order;
    }
    if (req.query.email) {
        filter = { ...filter, "pub_sections.pub_courses.email": req.query.email }
    }
    if (req.query.publication_id) {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if(!objectIdRegex.test(req.query.publication_id)){
            return res.json({
                status: false,
                message: "ID is not valid"
            });
        }
        filter = { ...filter, "pub_sections.pub_courses.publication_id": mongoose.Types.ObjectId(req.query.publication_id) }
    }

    videoSection.aggregate([
        {
            $lookup: {
                from: "pub_sections",
                let: { section_id: "$section_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$section_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $sort: {
                            "order": 1
                        }
                    },
                    {
                        $lookup: {
                            from: "pub_courses",
                            let: { course_id: "$course_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$_id", "$$course_id"] },
                                                { $eq: ["$status", "active"] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        name: 1,
                                        email: 1,
                                        publication_id: 1,
                                        order: 1,
                                    }
                                }
                            ],
                            as: "pub_courses"
                        }
                    },
                    {
                        $project: {
                            course_id: 1,
                            section_name: 1,
                            section_description: 1,
                            section_order: 1,
                            pub_courses: 1,
                        }
                    },
                    {
                        $addFields: {
                            "course_count": { $size: "$pub_courses" }
                        }
                    }
                ],
                as: "pub_sections"
            }
        },
        {
            $addFields: {
                "section_count": { $size: "$pub_sections" }
            }
        },
        {
            $addFields: {
                "total_courses_count": { $sum: "$pub_sections.course_count" }
            }
        },
        {
            $match: filter
        }
    ])
        .then((result) => {
            if (!result || result.length == 0) {
                return res.json({
                    status: false,
                    message: "no video found",
                })
            }
            return res.json({
                status: true,
                message: "video list",
                total_videos: result.length,
                data: result
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: "something went wrong",
                data: err
            })
        })
});

//update video details
router.put('/update/:id', async (req, res) => {
    let objForUpdate = {};
    if (req.body.section_id) {
        let SectionDetail = await sections.findOne({ _id: req.body.section_id });
        if (!SectionDetail) {
            return res.json({
                status: false,
                message: "section id not found"
            });
        }
        objForUpdate.section_id = req.body.section_id;
    }
    if (req.body.name) {
        let nameCheck = await videoSection.findOne({ name: req.body.name, _id: { $ne: req.params.id }, active: true });
        if (nameCheck) {
            return res.json({
                status: false,
                message: "video name already exist"
            });
        }
        objForUpdate.name = req.body.name;
    }
    if (req.body.description) {
        objForUpdate.description = req.body.description;
    }
    if (req.body.image) {
        objForUpdate.image = req.body.image;
    }
    if (req.body.video_link) {
        objForUpdate.video_link = req.body.video_link;
    }
    if (req.body.video_length) {
        objForUpdate.video_length = req.body.video_length;
    }
    if (req.body.video_order) {
        if (isNaN(req.body.video_order)) {
            return res.json({
                status: false,
                message: "video order must be a number"
            });
        }
        let videoDetails = await videoSection.findOne({ _id: req.params.id });
        if (!videoDetails) {
            return res.json({
                status: false,
                message: "video id not found"
            });
        }
        let orderCheck = await videoSection.findOne({ video_order: req.body.video_order, section_id: videoDetails.section_id, _id: { $ne: req.params.id }, active: true });

        if (orderCheck) {
            return res.json({
                status: false,
                message: "video order already exist"
            });
        }
        objForUpdate.video_order = req.body.video_order;
    }
    videoSection.findOneAndUpdate({ _id: req.params.id, status: "active" }, objForUpdate, { new: true }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "video id not found"
            });
        }
        return res.json({
            status: true,
            message: "video updated successfully",
            data: result
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong",
            data: err
        })
    })
})

//delete video
router.delete('/delete/:id', async (req, res) => {

    videoSection.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }, { new: true }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "video id not found"
            });
        }
        return res.json({
            status: true,
            message: "video deleted successfully",
            data: result
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: "something went wrong",
            data: err
        })
    })
});

module.exports = router;
