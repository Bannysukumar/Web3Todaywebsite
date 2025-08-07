const express = require('express');
const router = express.Router();
const axios = require('axios');

const actionMiddleware = require("../middleware/pub_action_video_track_middleware");
const publications = require('../models/pub_publication_detail');

const getDateTime = async () => {
    return new Promise(async (resolve, reject) => {
        let date = new Date();
        date = date.toLocaleString("en-US", { timeZone: "America/New_York" });
        let timestamp = Date.now();

        return resolve({ date, timestamp });
    })

}