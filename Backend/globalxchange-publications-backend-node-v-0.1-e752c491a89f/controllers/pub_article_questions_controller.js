const express = require('express');
const router = express.Router();

const PubArticleQuestions = require('../models/pub_article_questions');
const articles = require('../models/pub_article');
const mongoose = require('mongoose');

router.post('/new', async (req, res) => {

    let articleDetails = await articles.findOne({ _id: req.body.article_id, status: "active" });
    if (!articleDetails) {
        return res.json({
            status: false,
            message: "Article not found"
        })
    }

    PubArticleQuestions.create({
        article_id: req.body.article_id,
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
    if (req.query.article_id) {
        filter.article_id = mongoose.Types.ObjectId(req.query.article_id);
    }
    if(req.query.question_id){
        filter._id = mongoose.Types.ObjectId(req.query.question_id);
    }
    PubArticleQuestions.
        aggregate([
            {
                $match: filter
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $lookup: {
                    from: "pub_articles",
                    localField: "article_id",
                    foreignField: "_id",
                    as: "articleDetails"
                }
            },
        ]).then((result) => {
            if (result.length == 0) {
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
    PubArticleQuestions.findOneAndUpdate({ _id: req.params.id }, objForUpdate).then((result) => {
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
    PubArticleQuestions.findOneAndUpdate({ _id: req.params.id, status: "active" }, { status: "inactive" }).then((result) => {
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