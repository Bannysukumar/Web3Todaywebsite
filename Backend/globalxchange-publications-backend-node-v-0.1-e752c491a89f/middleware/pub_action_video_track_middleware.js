const trackAction = require('../models/pub_action_video_track');

const createAction = (body) =>{
    return new Promise( function(resolve, reject){
        let recordObj = body;
        // TODO need to add validations for trackAction record insertion
        trackAction.create(recordObj).then((result)=>{
            resolve({
                status:true,
                data: result
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        });
    });
};

const pauseAction = (body) =>{
    return new Promise( function(resolve, reject){
        let conditionObj = body;
        let updateObj={};
        updateObj.track_status = 'pause';
        trackAction.updateOne(conditionObj,updateObj).then((result)=>{
            resolve({
                status:true,
                data: result,
                message:'successfully paused',
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        }); 
    });
};

const stopAction = (body) =>{
    return new Promise( function(resolve, reject){
        let conditionObj = body;
        let updateObj={};
        updateObj.track_status = 'stop';
        trackAction.updateOne(conditionObj,updateObj).then((result)=>{
            resolve({
                status:true,
                data: result,
                message:'successfully Stop',
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        });
    });
};

const updateAction = (body) =>{
    return new Promise( function(resolve, reject){
        let conditionObj = body.condObj;
        let updateObj=body.updateObj;
        trackAction.updateOne(conditionObj,updateObj).then((result)=>{
            resolve({
                status:true,
                data: result,
                message:'successfully Updated'

            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        }); 
    });
};

const getAction = (body) =>{
    return new Promise( function(resolve, reject){
        let conditionObj = body.condObj;
        trackAction.findOne(conditionObj).then((result)=>{
            resolve({
                status:true,
                data: result
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        }); 
    });
};

const getallAction = (body) =>{
    return new Promise( function(resolve, reject){
        let conditionObj = body.condObj;
        trackAction.find(conditionObj).then((result)=>{
            resolve({
                status:true,
                data: result
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        }); 
    });
};

const aggregateAction = (body) =>{
    return new Promise( function(resolve, reject){
        trackAction.aggregate(body).then((result)=>{
            resolve({
                status:true,
                data: result
            });
        }).catch((err)=>{
            resolve({
                status:false,
                message: err.message
            });
        }); 
    });
};
module.exports ={
    createAction,
    pauseAction,
    stopAction,
    updateAction,
    getAction,
    getallAction,
    aggregateAction,
}