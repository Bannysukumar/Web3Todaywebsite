const mongoose = require('mongoose');
const router = require('express').Router();
const axios = require('axios');

const PubUserVideoAnswers = require('../models/pub_user_video_answers');
const PubVideoQuestions = require('../models/pub_video_questions');
const Publication = require('../models/pub_publication_detail');

router.post('/new', async (req, res) => {

    let UserVideoQuestionDetail = await PubUserVideoAnswers.findOne({
        user_id: req.body.user_id, question_id: req.body.question_id, status: "active"
    })

    if (UserVideoQuestionDetail) {
        return res.json({
            status: false,
            message: "You have already answered this question"
        })
    }

    let previousBalance = await axios.get(`https://publications.apimachine.com/articleread/finalpoints?user_id=${req.body.user_id}&publication_id=${req.body.publication_id}`);
    if (previousBalance.data.status == false) {
        previousBalance = 0
    } else {
        previousBalance = previousBalance.data.totalPoints
    }


    let QuestionDetail = await PubVideoQuestions.findOne({
        _id: req.body.question_id, status: "active"
    })

    if (!QuestionDetail) {
        return res.json({
            status: false,
            message: "Question not found"
        })
    }else{
        QuestionDetail.options.forEach(element => {
            if (element.option == req.body.answer) {
                if (element.is_correct == true) {
                    req.body.is_correct = true
                }
            }
        });
    }

    if (!req.body.is_correct) {
        req.body.is_correct = false
    }

    let PublicationDetail = await Publication.findOne({
        _id: req.body.publication_id, status: "active"
    });
    if(!PublicationDetail){
        return res.json({
            status: false,
            message: "Publication not found"
        })
    }else{
        if (req.body.is_correct) {
            req.body.points = PublicationDetail.videoQuestionPoints
        }
    }

    PubUserVideoAnswers.create({
        user_id: req.body.user_id,
        question_id: req.body.question_id,
        publication_id: req.body.publication_id,
        answer: req.body.answer,
        is_correct: req.body.is_correct,
        points: req.body.points,
    }).then((result) => {
        if (req.body.is_correct) {
            return res.json({
                status: true,
                message: "Answer saved successfully",
                data: result,
                previousBalance,
                newBalance: parseInt(previousBalance) + parseInt(req.body.points)
            })
        } else {
            return res.json({
                status: true,
                message: "Answer saved successfully",
                data: result,
            })
        }
    }).catch((err) => {
        return res.json({
            status: false,
            message: err.message
        })
    })
})

router.get('/list', async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }

    if (req.query.user_id) {
        if (!mongoose.Types.ObjectId.isValid(req.query.user_id)) {
            return res.json({
                status: false,
                message: "Invalid user id"
            })
        }
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id);
    }

    if (req.query.question_id) {
        if (!mongoose.Types.ObjectId.isValid(req.query.question_id)) {
            return res.json({
                status: false,
                message: "Invalid question id"
            })
        }
        filter.question_id = mongoose.Types.ObjectId(req.query.question_id);
    }
    PubUserVideoAnswers.
        aggregate([
            {
                $match: filter
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $lookup: {
                    from: "pub_video_questions",
                    localField: "question_id",
                    foreignField: "_id",
                    as: "question"
                }
            },
            {
                $unwind: "$question"
            },
            {
                $lookup: {
                    from: "pub_videos",
                    localField: "question.video_id",
                    foreignField: "_id",
                    as: "video"
                }
            },
            {
                $unwind: "$video"
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    question_id: 1,
                    answer: 1,
                    is_correct: 1,
                    points: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    // question: {
                    //     _id: 1,
                    //     article_id: 1,
                    //     question: 1,
                    //     options: 1,
                    //     status: 1,
                    //     createdAt: 1,
                    //     updatedAt: 1,
                    // },
                    video: {
                        _id: 1,
                        title: 1,
                        desc: 1,
                        image: 1,
                        status: 1,
                    }
                }
            }
        ]).then((result) => {
            if (result.length == 0) {
                return res.json({
                    status: false,
                    message: "No answers found"
                })
            }
            return res.json({
                status: true,
                message: "List of answers",
                data: result
            })
        }
        ).catch((err) => {
            return res.json({
                status: false,
                message: "Something went wrong" + err
            })
        }
        )
})



module.exports = router;