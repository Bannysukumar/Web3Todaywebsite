const mongoose = require('mongoose');
const router = require('express').Router();
const axios = require('axios');
const cron = require('node-cron');

const PubUserDailyPointsRank = require('../models/pub_user_daily_points_rank');

router.get('/list', async (req, res) => {
    if (!req.query.publication_id) {
        return res.json({
            status: false,
            message: "Publication id is required"
        })
    }

    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
        if (req.query.status == "all")
            filter = {};
    }
    if (req.query.publication_id) {
        filter.publication_id = mongoose.Types.ObjectId(req.query.publication_id);
    }
    if (req.query.user_id) {
        filter.user_id = mongoose.Types.ObjectId(req.query.user_id);
    }
    PubUserDailyPointsRank.find(filter, null, { sort: { "daily_points_rank": 1 } })
        .then((result) => {
            if (result.length == 0) {
                return res.json({
                    status: false,
                    message: "No data found"
                })
            }
            return res.json({
                status: true,
                message: "User daily rank list",
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
});

async function calculateDailyRanks(){
    try{
     let userPointsData = await axios.get(`https://publications.apimachine.com/userpublication/?publication_id=638dd769b257b3715a8fbe07`)
        if(userPointsData.data.status){
            userPointsData.data.data = userPointsData.data.data.sort((a,b)=>{
                return b.userDailyPoints - a.userDailyPoints;
            });
            let currentRank = 1;
            const ranks = userPointsData.data.data.map((user,index)=>{
                //if there are no points for the user then the points will be 0
                if(!user.userDailyPoints){
                    user.userDailyPoints = 0;
                }
                if(index > 0 && user.userDailyPoints < userPointsData.data.data[index-1].userDailyPoints){
                    currentRank = index + 1;
                }
                return {
                    user_id: user.userDetail[0]._id,
                    publication_id: "638dd769b257b3715a8fbe07",
                    points: user.userDailyPoints,
                    daily_points_rank: currentRank
                }
            });
            await PubUserDailyPointsRank.deleteMany({publication_id: "638dd769b257b3715a8fbe07"});
            await PubUserDailyPointsRank.insertMany(ranks);
        }
    }catch(err){
        console.log(err);
    }
}

cron.schedule('0 0 * * *', () => {
    console.log('running a task every day at 12:00 AM');
    calculateDailyRanks();
}
);

module.exports = router;