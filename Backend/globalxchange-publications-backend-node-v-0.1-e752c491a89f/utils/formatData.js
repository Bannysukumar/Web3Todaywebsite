const uuid = require('uuid');
const field_detail = require('../models/pub_field_data');

// Update a specific mall by ID dynamic fields
const sanitizeData = (collection_name, raw_data) => {
    return new Promise(function (resolve, reject) {
        // console.log("funing");
        let collection = collection_name
        let obj = { ...raw_data };
        let objKey = Object.keys(obj);
        field_detail.find({ collection_name: collection, status: "active", field_key: { $in: [...objKey] } }, 'field_key').then(addedField => {
            // console.log("fielddata===>", addedField);
            let procData = {};
            for (let i = 0; i < addedField.length; i++) {
                procData[addedField[i].field_key] = obj[addedField[i].field_key];
            }
            // console.log("procData last ===>", procData);
            resolve({ status: true, data: procData });
        }).catch(err => {
            console.log("sanitize fun err===>");
            // console.log("sanitize fun err===>", err);
            reject({ "status": false, "message": err.message });
        });
    });
}

const profileIdgenerator = (appcode) => {

    // console.log("uuid------v4", uuid.v4().split('-')[4]);
    // console.log('timestamp-----', Date.now());
    return (appcode + "u" + uuid.v4().split('-')[4] + "t" + Date.now())
};

// need to add logic to update using the time concept not number i.e base 60 for min and base 24 for hr 
// const standardTime = (timeOffset, time) => {
//     let opr = timeOffset.substring(1, 2);
//     let min = timeOffset.substring(1);
//     console.log("min before", min);
//     let hr = Math.floor(min / 60);
//     min = min % 60;
//     let carry = 0;
//     const newTime = {}
//     if (opr == '+') {
//         newTime.minutes = Number(time.minutes) + min;
//         carry = Math.floor(newTime.minutes / 60);
//         newTime.minutes = newTime.minutes % 60;
//         newTime.hours = Number(time.hours) + hr + carry;
//         carry = Math.floor(newTime.hours / 24);
//         newTime.hours = newTime.hours % 24;
//     } else {
//         carry = 0;
//         if (Number(time.minutes) > min)
//             newTime.minutes = Number(time.minutes) - min;
//         else {
//             carry = 1;
//             let newmin = min - Number(time.minutes);
//             newTime.minutes = 60 - newmin;
//         }
//         let sumhr= carry;
//         if(Number(time.hours)>sumhr){
//             newTime.hours = Number(time.hours) - sumhr;
//         }else{

//         }
//     }
//     return newTime;
// }

const standardTime = (timeOffset, time) => {
    let opr = timeOffset.substring(0, 1);
    let min = timeOffset.substring(1);
    console.log("min before", min);
    let carry = 0;
    const newTime = {}
    let time_min = Number(time.hours) * 60;
    time_min = time_min + Number(time.minutes);
    let processed_time = 0;
    if (opr == "+") {
        console.log("positive");
        processed_time = Number(time_min) + Number(min);
        // carry = 1;
    } else if (opr == "-") {
        processed_time = time_min - min;
        if (processed_time < 0) {
            carry = -1;
            processed_time = (24 * 60) + processed_time;
        }
    }
    newTime.minutes = processed_time % 60;
    newTime.hours = Math.floor(processed_time / 60);
    if (newTime.hours > 24) {
        carry = 1;
        newTime.hours = newTime.hours % 24;
    } else {
        newTime.hours = newTime.hours % 24;
    }
    newTime.carry = carry;
    return newTime;
}

module.exports.sanitizeData = sanitizeData;
module.exports.profileIdgenerator = profileIdgenerator;
module.exports.standardTime = standardTime;