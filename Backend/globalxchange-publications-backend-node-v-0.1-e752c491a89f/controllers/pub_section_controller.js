const express = require('express');
const router = express.Router();

const courses = require('../models/pub_courses');
const sections = require('../models/pub_section');
var mongoose = require('mongoose');


//create a new section
router.post('/create', async (req, res) => {

    if (isNaN(req.body.section_order)) {
        return res.json({
            status: false,
            message: "section order must be a number"
        });
    }

    if (!req.body.course_id) {
        return res.json({
            status: false,
            message: "course id can not be empty"
        });
    } else {
        let CourseDetail = await courses.findOne({ _id: req.body.course_id });
        if (!CourseDetail) {
            return res.json({
                status: false,
                message: "course id not found"
            });
        }
    }
    let nameCheck = await sections.findOne({ section_name: req.body.section_name });

    if (nameCheck) {
        return res.json({
            status: false,
            message: "section name already exist"
        });
    }

    let orderCheck = await sections.findOne({ section_order: req.body.section_order, status: "active", course_id: req.body.course_id });
    if (orderCheck) {
        return res.json({
            status: false,
            message: "section order already exist"
        });
    }

    sections.create({
        course_id: req.body.course_id,
        section_name: req.body.section_name,
        section_description: req.body.section_description,
        section_order: req.body.section_order,
    }).then((result) => {
        return res.json({
            status: true,
            message: "section added successfully",
            data: result
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

//get all sections
router.get('/list', async (req, res) => {
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.course_id) {
        filter.course_id = mongoose.Types.ObjectId(req.query.course_id);
    }
    if (req.query.section_id) {
        filter._id = mongoose.Types.ObjectId(req.query.section_id);
    }
    if (req.query.section_name) {
        filter.section_name = req.query.section_name;
    }
    if (req.query.publication_id) {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(req.query.publication_id)) {
            return res.json({
                status: false,
                message: "ID is not valid"
            });
        }
        filter = { ...filter, "pub_courses.publication_id": mongoose.Types.ObjectId(req.query.publication_id) }
    }
    if (req.query.email) {
        filter = { ...filter, "pub_courses.email": req.query.email }
    }
    // console.log(filter);
    sections.aggregate([
        {
            $lookup: {
                from: "pub_courses",
                let: { "course_id": "$course_id" },
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
                            email: 1,
                            publication_id: 1,
                            name: 1,
                        }
                    },
                    {
                        $sort: {
                            "order": 1
                        }
                    },
                ],
                as: "pub_courses"
            }
        },
        {
            $lookup: {
                from: "pub_videos_sections",
                let: { "section_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$section_id", "$$section_id"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $sort: {
                            "video_order": 1
                        }
                    },
                ],
                as: "pub_video_sections"
            }
        },
        {
            $addFields: {
                "course_count": { $size: "$pub_courses" }
            }
        },
        {
            $addFields: {
                "video_count": { $size: "$pub_video_sections" }
            }
        },
        {
            $match: filter
        },
    ]).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "section not found"
            });
        }
        if (result.length == 0) {
            return res.json({
                status: false,
                message: "no data found"
            });
        }
        return res.json({
            status: true,
            message: "section list",
            total: result.length,
            data: result
        })
    }
    ).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

//update section
router.put('/update/:id', async (req, res) => {
    let objForUpdate = {};
    if (req.body.course_id) {
        let CourseDetail = await courses.findOne({ _id: req.body.course_id });
        if (!CourseDetail) {
            return res.json({
                status: false,
                message: "course id not found"
            });
        }
        objForUpdate.course_id = req.body.course_id;
    }
    if (req.body.section_name) {
        let nameCheck = await sections.findOne({ section_name: req.body.section_name, _id: { $ne: req.params.id }, status: "active" });
        if (nameCheck) {
            return res.json({
                status: false,
                message: "section name already exist"
            });
        }
        objForUpdate.section_name = req.body.section_name;
    }
    if (req.body.section_description) {
        objForUpdate.section_description = req.body.section_description;
    }
    if (req.body.section_order) {
        if (isNaN(req.body.section_order)) {
            return res.json({
                status: false,
                message: "section order must be a number"
            });
        }
        let SectionDetail = await sections.findOne({ _id: req.params.id, status: "active" });
        if (!SectionDetail) {
            return res.json({
                status: false,
                message: "course id not found"
            });
        }
        let OrderCheck = await sections.findOne({ section_order: req.body.section_order, status: "active", course_id: SectionDetail.course_id, _id: { $ne: req.params.id } });
        if (OrderCheck) {
            return res.json({
                status: false,
                message: "section order already exist"
            });
        }
        objForUpdate.section_order = req.body.section_order;
    }
    sections.findOneAndUpdate({ _id: req.params.id, status: "active" }, objForUpdate, { new: true }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "section not found"
            });
        }
        return res.json({
            status: true,
            message: "section updated successfully",
            data: result
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

//delete section
router.delete('/delete/:id', async (req, res) => {
    sections.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }, { new: true }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "section not found"
            });
        }
        return res.json({
            status: true,
            message: "section deleted successfully",
            data: result
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

module.exports = router;