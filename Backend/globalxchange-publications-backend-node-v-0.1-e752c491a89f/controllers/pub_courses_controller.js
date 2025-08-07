const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const publication = require('../models/pub_publication_detail');
const courses = require('../models/pub_courses');
const category = require('../models/pub_categories');
const navbar = require('../models/pub_navbar');


//create a new course
router.post('/create', async (req, res) => {

    if (!req.body.publication_id) {
        return res.json({
            status: false,
            message: "publication id can not be empty"
        });
    } else {
        let PublicationDetail = await publication.findOne({ _id: req.body.publication_id });
        if (!PublicationDetail) {
            return res.json({
                status: false,
                message: "publication id not found"
            });
        }
    }

    let nameCheck = await courses.findOne({ name: req.body.name });
    if (nameCheck) {
        return res.json({
            status: false,
            message: "course name already exist"
        });
    }

    if (!req.body.category) {
        return res.json({
            status: false,
            message: "category can not be empty"
        })
    }

    if (!req.body.navbar) {
        return res.json({
            status: false,
            message: "navbar can not be empty"
        })
    }

    let categorydetail = await category.find({ _id: { $in: req.body.category }, status: 'active' });
    let navbardetail = await navbar.find({ _id: { $in: req.body.navbar }, status: 'active' });



    if (categorydetail.length != req.body.category.length) {
        return res.json({
            status: false,
            message: "category not found"
        });
    }

    if (navbardetail.length != req.body.navbar.length) {
        return res.json({
            status: false,
            message: "navbar not found"
        });
    }


    courses.create({
        name: req.body.name,
        publication_id: req.body.publication_id,
        category: req.body.category,
        email: req.body.email,
        navbar: req.body.navbar,
        profile_pic: req.body.profile_pic,
        tagline: req.body.tagline,
        language: req.body.language,
        what_you_will_learn: req.body.what_you_will_learn,
        requirements: req.body.requirements,
        description: req.body.description,
        audience: req.body.audience,
        preview_video: req.body.preview_video,
        subscription: req.body.subscription,
        cost: req.body.cost,
        currency: req.body.currency,
        teacherName: req.body.teacherName,
        teacherBio: req.body.teacherBio,
        teacherImage: req.body.teacherImage,
        ai_learning_assistant: req.body.ai_learning_assistant,
        classroom_chat: req.body.classroom_chat,
        live_group_lessons: req.body.live_group_lessons,
        one_on_one_lessons: req.body.one_on_one_lessons,
        number_of_tests: req.body.number_of_tests,
        number_of_downloads: req.body.number_of_downloads,
        certificate: req.body.certificate,
    }).then((data) => {
        return res.json({
            status: true,
            message: "course created successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "course creation failed",
            error: err
        });
    });
});

//get all courses
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
        filter._id = mongoose.Types.ObjectId(req.query.course_id);
    }
    if (req.query.email) {
        filter.email = req.query.email;
    }
    if (req.query.name) {
        filter.name = req.query.name;
    }
    if (req.query.publication_id) {
        filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id);
    }
    if (req.query.category) {
        filter.category = { $in: req.query.category };
    }
    if (req.query.navbar) {
        filter.navbar = { $in: req.query.navbar };
    }
    if (req.query.profile_pic) {
        filter.profile_pic = req.query.profile_pic;
    }
    if (req.query.tagline) {
        filter.tagline = req.query.tagline;
    }
    if (req.query.language) {
        filter.language = req.query.language;
    }
    if (req.query.what_you_will_learn) {
        filter.what_you_will_learn = req.query.what_you_will_learn;
    }
    if (req.query.requirements) {
        filter.requirements = req.query.requirements;
    }
    if (req.query.description) {
        filter.description = req.query.description;
    }
    if (req.query.audience) {
        filter.audience = req.query.audience;
    }
    if (req.query.preview_video) {
        filter.preview_video = req.query.preview_video;
    }
    if (req.query.subscription) {
        filter.subscription = req.query.subscription;
    }
    if (req.query.cost) {
        filter.cost = req.query.cost;
    }
    if (req.query.currency) {
        filter.currency = req.query.currency;
    }
    if (req.query.teacherName) {
        filter.teacherName = req.query.teacherName;
    }
    if (req.query.teacherBio) {
        filter.teacherBio = req.query.teacherBio;
    }
    if (req.query.teacherImage) {
        filter.teacherImage = req.query.teacherImage;
    }
    if (req.query.ai_learning_assistant) {
        filter.ai_learning_assistant = req.query.ai_learning_assistant;
    }
    if (req.query.classroom_chat) {
        filter.classroom_chat = req.query.classroom_chat;
    }
    if (req.query.live_group_lessons) {
        filter.live_group_lessons = req.query.live_group_lessons;
    }
    if (req.query.one_on_one_lessons) {
        filter.one_on_one_lessons = req.query.one_on_one_lessons;
    }
    if (req.query.number_of_tests) {
        filter.number_of_tests = req.query.number_of_tests;
    }
    if (req.query.number_of_downloads) {
        filter.number_of_downloads = req.query.number_of_downloads;
    }
    if (req.query.certificate) {
        filter.certificate = req.query.certificate;
    }
    courses.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "pub_user_profiles",
                let: { "email": "$email" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$email", "$$email"] },
                                    { $eq: ["$status", "active"] }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            "first_name": 1,
                            "last_name": 1,
                            "profile_pic": 1,
                            "email": 1
                        }
                    }
                ],
                as: "user_details"
            },
        },
        {
            $lookup: {
                from: "pub_sections",
                let: { "course_id": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$course_id", "$$course_id"] },
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
                    //Add sections
                    // {
                    //     $addFields: {

                    //     }
                    // },
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
                        },
                    },
                    {
                        $addFields: {
                            "video_count": { $size: "$pub_video_sections" },
                            // "video_length": {
                            //     $sum: { $toInt: '$pub_video_sections.video_length' }
                            // }
                        },
                    },
                ],
                as: "pub_sections"
            },
        },
        {
            $addFields: {
                "section_count": { $size: "$pub_sections" }
            }
        },
        {
            $addFields: {
                "section_video_count": { $sum: "$pub_sections.video_count" }
            }
        }
    ])
        .then((data) => {
            if (data.length == 0) {
                return res.json({
                    status: false,
                    message: "courses not found"
                });
            }
            return res.json({
                status: true,
                total: data.length,
                message: "courses found",
                data: data
            });
        }).catch((err) => {
            return res.json({
                status: false,
                message: "courses not found",
                error: err
            });
        });
})

//update course
router.put('/update/:id', async (req, res) => {
    let objForUpdate = {};
    if (req.body.name) {
        let nameCheck = await courses.findOne({ name: req.body.name, _id: { $ne: req.params.id }, status: "active" });
        if (nameCheck) {
            return res.json({
                status: false,
                message: "course name already exist"
            });
        }
        objForUpdate.name = req.body.name;
    }
    if (req.body.publication_id) {
        let PublicationDetail = await publication.findOne({ _id: req.body.publication_id });
        if (!PublicationDetail) {
            return res.json({
                status: false,
                message: "publication not found"
            });
        }
        objForUpdate.publication_id = req.body.publication_id;
    }
    if (req.body.category) {
        let categorydetail = await category.find({ _id: { $in: req.body.category }, status: 'active' });
        if (categorydetail.length != req.body.category.length) {
            return res.json({
                status: false,
                message: "category not found"
            });
        }
        objForUpdate.category = req.body.category;
    }
    if (req.body.navbar) {
        let navbardetail = await navbar.find({ _id: { $in: req.body.navbar }, status: 'active' });
        if (navbardetail.length != req.body.navbar.length) {
            return res.json({
                status: false,
                message: "navbar not found"
            });
        }
        objForUpdate.navbar = req.body.navbar;
    }
    if (req.body.profile_pic) {
        objForUpdate.profile_pic = req.body.profile_pic;
    }
    if (req.body.tagline) {
        objForUpdate.tagline = req.body.tagline;
    }
    if (req.body.language) {
        objForUpdate.language = req.body.language;
    }
    if (req.body.what_you_will_learn) {
        objForUpdate.what_you_will_learn = req.body.what_you_will_learn;
    }
    if (req.body.requirements) {
        objForUpdate.requirements = req.body.requirements;
    }
    if (req.body.description) {
        objForUpdate.description = req.body.description;
    }
    if (req.body.audience) {
        objForUpdate.audience = req.body.audience;
    }
    if (req.body.preview_video) {
        objForUpdate.preview_video = req.body.preview_video;
    }
    if (req.body.subscription) {
        objForUpdate.subscription = req.body.subscription;
    }
    if (req.body.cost) {
        objForUpdate.cost = req.body.cost;
    }
    if (req.body.currency) {
        objForUpdate.currency = req.body.currency;
    }
    if (req.body.teacherName) {
        objForUpdate.teacherName = req.body.teacherName;
    }
    if (req.body.teacherBio) {
        objForUpdate.teacherBio = req.body.teacherBio;
    }
    if (req.body.teacherImage) {
        objForUpdate.teacherImage = req.body.teacherImage;
    }
    if (req.body.ai_learning_assistant) {
        objForUpdate.ai_learning_assistant = req.body.ai_learning_assistant;
    }
    if (req.body.classroom_chat) {
        objForUpdate.classroom_chat = req.body.classroom_chat;
    }
    if (req.body.live_group_lessons) {
        objForUpdate.live_group_lessons = req.body.live_group_lessons;
    }
    if (req.body.one_on_one_lessons) {
        objForUpdate.one_on_one_lessons = req.body.one_on_one_lessons;
    }
    if (req.body.number_of_tests) {
        objForUpdate.number_of_tests = req.body.number_of_tests;
    }
    if (req.body.number_of_downloads) {
        objForUpdate.number_of_downloads = req.body.number_of_downloads;
    }
    if (req.body.certificate) {
        objForUpdate.certificate = req.body.certificate;
    }

    courses.findOneAndUpdate({ _id: req.params.id }, objForUpdate, { new: true }).then((data) => {
        if (!data) {
            return res.json({
                status: false,
                message: "course not found"
            });
        }
        return res.json({
            status: true,
            message: "course updated successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "course updation failed",
            error: err
        });
    })
});

//delete course
router.delete('/delete/:id', (req, res) => {
    courses.findOneAndUpdate({ _id: req.params.id }, { status: "inactive" }, { new: true }).then((data) => {
        if (!data) {
            return res.json({
                status: false,
                message: "course not found"
            });
        }
        return res.json({
            status: true,
            message: "course deleted successfully",
            data: data
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: "course deletion failed",
            error: err
        });
    })
})

module.exports = router;