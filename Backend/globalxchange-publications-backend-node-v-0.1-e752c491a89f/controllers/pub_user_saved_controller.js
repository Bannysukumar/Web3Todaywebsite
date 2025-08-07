const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const PubUserSavedData = require("../models/pub_user_saved_data");
const Publication = require("../models/pub_publication_detail");
const Article = require("../models/pub_article");
const Video = require("../models/pub_video");
const WebStory = require("../models/pub_web_story_template");
const Company = require("../models/pub_company_detail");
const CaseStudy = require("../models/pub_casestudy");
const Story = require("../models/pub_stories");
const Documentary = require("../models/pub_documentaries");
const User = require("../models/pub_user_profile");

//create a user saved data
router.post("/", async (req, res) => {
    if (req.body.user_id) {
        let userExist = await User.findOne({ _id: req.body.user_id, status: "active" });
        if (userExist) {
            let savedDataExist = await PubUserSavedData.findOne({ user_id: req.body.user_id, status: "active" });
            if (req.body.publication_id) {
                let publicationExist = await Publication
                    .findOne({ _id: req.body.publication_id, status: "active" });
                if (!publicationExist) {
                    return res.json({
                        status: false,
                        message: "Publication not found",
                    });
                }
                if (req.body.article_id) {
                    let articleExist = await Article
                        .findOne({ _id: req.body.article_id, status: "active" });
                    if (!articleExist) {
                        return res.json({
                            status: false,
                            message: "Article not found",
                        });
                    }
                }
                if (req.body.video_id) {
                    let videoExist = await Video
                        .findOne({
                            _id: req
                                .body.video_id, status: "active"
                        });
                    if (!videoExist) {
                        return res.json({
                            status: false,
                            message: "Video not found",
                        });
                    }
                }
                if (req.body.webstory_id) {
                    let webstoryExist = await WebStory
                        .findOne({
                            _id: req
                                .body.webstory_id, status: "active"
                        });
                    if (!webstoryExist) {
                        return res.json({
                            status: false,
                            message: "Web Story not found",
                        });
                    }
                }
                if (req.body.company_id) {
                    let companyExist = await Company
                        .findOne({
                            _id: req
                                .body.company_id, status: "active"
                        });
                    if (!companyExist) {
                        return res.json({
                            status: false,
                            message: "Company not found",
                        });
                    }
                }
                if (req.body.casestudy_id) {
                    let casestudyExist = await CaseStudy
                        .findOne({
                            _id: req
                                .body.casestudy_id, status: "active"
                        });
                    if (!casestudyExist) {
                        return res.json({
                            status: false,
                            message: "Case Study not found",
                        });
                    }
                }
                if (req.body.stories_id) {
                    let storiesExist = await Story
                        .findOne({
                            _id: req
                                .body.stories_id, status: "active"
                        });
                    if (!storiesExist) {
                        return res.json({
                            status: false,
                            message: "Stories not found",
                        });
                    }
                }
                if (req.body.documentary_id) {
                    let documentaryExist = await Documentary
                        .findOne({
                            _id: req
                                .body.documentary_id, status: "active"
                        });
                    if (!documentaryExist) {
                        return res.json({
                            status: false,
                            message: "Documentary not found",
                        });
                    }
                }
            }
            if (savedDataExist) {
                let objForUpdate = {};
                if (req.body.publication_id) objForUpdate.publication_id = req.body.publication_id;
                if (req.body.article_id) objForUpdate.article_id = req.body.article_id;
                if (req.body.video_id) objForUpdate.video_id = req.body.video_id;
                if (req.body.webstory_id) objForUpdate.webstory_id = req.body.webstory_id;
                if (req.body.company_id) objForUpdate.company_id = req.body.company_id;
                if (req.body.casestudy_id) objForUpdate.casestudy_id = req.body.casestudy_id;
                if (req.body.stories_id) objForUpdate.stories_id = req.body.stories_id;
                if (req.body.documentary_id) objForUpdate.documentary_id = req.body.documentary_id;

                PubUserSavedData.findOneAndUpdate({
                    user_id: req.body.user_id, status: "active"
                }, {
                    $addToSet: objForUpdate
                }).then((data) => {
                    res.json({
                        status: true,
                        message: "Data Updated Successfully",
                    });
                }).catch((err) => {
                    res.json({
                        status: false,
                        message: "Something went wrong",
                        data: err,
                    });
                });
            } else {
                PubUserSavedData.create({
                    user_id: req.body.user_id,
                    publication_id: req.body.publication_id,
                    article_id: req.body.article_id,
                    video_id: req.body.video_id,
                    webstory_id: req.body.webstory_id,
                    company_id: req.body.company_id,
                    casestudy_id: req.body.casestudy_id,
                    stories_id: req.body.stories_id,
                    documentary_id: req.body.documentary_id
                }).then((data) => {
                    res.json({
                        status: true,
                        message: "User Saved Data Created Successfully",
                        data: data,
                    });
                }).catch((err) => {
                    res.json({
                        status: false,
                        message: "Something went wrong",
                        data: err,
                    });
                });
            }
        } else {
            res.json({
                status: false,
                message: "User not found",
            });
        }
    } else {
        res.json({
            status: false,
            message: "User not found",
        });
    }
});

//get user saved data
router.get("/", async (req, res) => {
    let filter = {}
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    } else {
        filter.status = "active";
    }
    if (req.query.user_id) {
        filter.user_id = req.query.user_id;
    }

    let projectObj = {
    }

    if (req.query.publication) {
        projectObj.publication_id = 1;
    }
    if (req.query.article) {
        projectObj.article_id = 1;
    }
    if (req.query.video) {
        projectObj.video_id = 1;
    }
    if (req.query.webstory) {
        projectObj.webstory_id = 1;
    }
    if (req.query.company) {
        projectObj.company_id = 1;
    }
    if (req.query.casestudy) {
        projectObj.casestudy_id = 1;
    }
    if (req.query.stories) {
        projectObj.stories_id = 1;
    }
    if (req.query.documentary) {
        projectObj.documentary_id = 1;
    }
    if (req.query.publication_id) {
        filter.publication_id = req.query.publication_id;
        projectObj.user_id = 1;
        let data = await PubUserSavedData.aggregate([
            {
                $project: projectObj
            },
            {
                $lookup: {
                    from: "pub_user_profiles",
                    let: { "user_id": "$user_id" },
                    pipeline: [
                        {
                            $addFields: {
                                id: { "$toString": "$_id" }
                            }
                        },
                        {
                            $match: {
                                $expr: {
                                    $in: ["$id", "$$user_id"]
                                }
                            }
                        },
                    ],
                    as: "userDetails"
                }
            }
        ])
        if (data.length == 0) {
            return res.json({
                status: false,
                message: "User Details Not Found",
                data: data,
            });
        }
        return res.json({
            status: true,
            message: "User Details Found for Publication",
            data: data,
        });
    }
    let displayobj = {}
    let pubSavedData = await PubUserSavedData.find(filter, projectObj, { sort: { "createdAt": -1 } })
    if (pubSavedData.length == 0) {
        return res.json({
            status: false,
            message: "User Saved Data Not Found"
        });
    }




    if (req.query.user_id) {
        let publicationData = await Publication.find({ _id: { $in: pubSavedData[0].publication_id } })
        displayobj.publicationCount = publicationData.length
        displayobj.publication = publicationData

        let articleData = await Article.find({ _id: { $in: pubSavedData[0].article_id } })
        displayobj.articleCount = articleData.length
        displayobj.article = articleData

        let videoData = await Video.find({ _id: { $in: pubSavedData[0].video_id } })
        displayobj.videoCount = videoData.length
        displayobj.video = videoData

        let webstoryData = await WebStory.find({ _id: { $in: pubSavedData[0].webstory_id } })
        displayobj.webstoryCount = webstoryData.length
        displayobj.webstory = webstoryData

        let companyData = await Company.find({ _id: { $in: pubSavedData[0].company_id } })
        displayobj.companyCount = companyData.length
        displayobj.company = companyData

        let casestudyData = await
            CaseStudy.find({ _id: { $in: pubSavedData[0].casestudy_id } })
        displayobj.casestudyCount = casestudyData.length
        displayobj.casestudy = casestudyData

        let storiesData = await Story.find({ _id: { $in: pubSavedData[0].stories_id } })
        displayobj.storiesCount = storiesData.length
        displayobj.stories = storiesData

        let documentaryData = await Documentary.find({ _id: { $in: pubSavedData[0].documentary_id } })
        displayobj.documentaryCount = documentaryData.length
        displayobj.documentary = documentaryData

        //remove empty array    
        for (var key in displayobj) {
            if (displayobj[key].length == 0) {
                delete displayobj[key];
            }
        }
        //remove zero count
        for (var key in displayobj) {
            if (displayobj[key] == 0) {
                delete displayobj[key];
            }
        }


        res.json({
            status: true,
            message: "User Saved Data Found",
            data: displayobj,
        });
    } else {
        res.json({
            status: true,
            message: "User Saved Data Found",
            data: pubSavedData,
        });
    }
})

module.exports = router;
