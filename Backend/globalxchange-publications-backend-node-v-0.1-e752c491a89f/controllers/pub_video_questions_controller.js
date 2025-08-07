const express = require('express');
const router = express.Router();

const PubVideoQuestions = require('../models/pub_video_questions');
const videos = require('../models/pub_video');
const mongoose = require('mongoose');

router.post('/new', async (req, res) => {

    let videoDetails = await videos.findOne({ _id: req.body.video_id, status: "active" });
    if (!videoDetails) {
        return res.json({
            status: false,
            message: "Video not found"
        })
    }

    PubVideoQuestions.create({
        video_id: req.body.video_id,
        question: req.body.question,
        options: req.body.options,
    }).then((result) => {
        return res.json({
            status: true,
            message: "Question added successfully",
            data: result
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});


router.get('/list', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.video_id) {
        filter.video_id = mongoose.Types.ObjectId(req.query.video_id);
    }
    if(req.query.question_id){
        filter._id = mongoose.Types.ObjectId(req.query.question_id);
    }
    PubVideoQuestions.
    aggregate([
        {
            $match: filter
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $lookup: {
                from: "pub_videos",
                localField: "video_id",
                foreignField: "_id",
                as: "videoDetails"
            }
        },
    ]).then((result) => {
        if(result.length == 0){
            return res.json({
                status: false,
                message: "No questions found"
            })
        }
        return res.json({
            status: true,
            message: "Question list",
            data: result
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

router.put('/update/:id', async (req, res) => {
    var objForUpdate = {};
    if (req.body.question) objForUpdate.question = req.body.question;
    if (req.body.options) objForUpdate.options = req.body.options;
    PubVideoQuestions.findOneAndUpdate({ _id: req.params.id }, objForUpdate).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "Question not found"
            })
        }
        return res.json({
            status: true,
            message: "Question updated successfully"
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});

router.delete('/delete/:id', async (req, res) => {
    PubVideoQuestions.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }).then((result) => {
        if (!result) {
            return res.json({
                status: false,
                message: "Question not found"
            })
        }
        return res.json({
            status: true,
            message: "Question deleted successfully"
        })
    }).catch((err) => {
        return res.json({
            status: false,
            message: "Something went wrong" + err
        })
    })
});



module.exports = router;