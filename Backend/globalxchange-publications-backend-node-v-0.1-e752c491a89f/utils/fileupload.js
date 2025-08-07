// const DOTENV = require('dotenv')
// DOTENV.config();
const fs = require('fs');
const AWS = require('aws-sdk');

require('dotenv').config({path:'../.env'});

// AWS setup

AWS.config.update({
    secretAccessKey: process.env.SECRETACCESSKEY,
    accessKeyId: process.env.ACCESSKEYID,
    region: process.env.REGION
});

const bucketName = process.env.BUCKETNAME;

const s3 = new AWS.S3();

// End AWS setup

const uploadToS3 = (filename) => {
    var s3res = {};
    console.log("call to s3function");
    return new Promise(function (resolve, reject) {

        fs.readFile(`./uploads/content/${filename}`, async (err, data) => {
            // console.log("call to s3function1");
            if (err) {
                s3res.statuscode = 2;
                s3res.err = err;
                // return s3res;
                reject(s3res);
            } else {

                var params = {
                    Bucket: process.env.BUCKETNAME,
                    // Bucket: bucketName,
                    Key: `media/content/${filename}`,
                    Body: data
                };
            }
            // console.log("call to s3function3");
            await s3.upload(params, async (s3err, data) => {
                // console.log("call to s3function4");
                if (s3err) {
                    s3res.statuscode = 3;
                    s3res.err = s3err;
                    reject(s3res);
                }
                else {
                    // console.log("call to s3function5");
                    await fs.unlink(`./uploads/content/${filename}`, function (err) {
                        if (err) {
                            console.log("error in file deletion local ");
                        }
                        console.log("Data.location", data.Location);

                        s3res.statuscode = 1;
                        s3res.err = null;
                        s3res.location = data;
                        resolve(s3res);
                    });
                }
            });
        });
    });
}

const uploadBulk = async (filearray) => {
    let files = filearray;
    // console.log("bulk files", files);
    let res_array = [];
    for (file in files) {
        //    await uploadToS3(files[file])
        await uploadToS3Bulk(files[file])
            .then(promisres => {
                res_array.push(promisres)
            }).catch(err => {
                res_array.push(err)
            });
    }
    return res_array;
}
// let promisefun = (filename) => {

//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             if (filename != 1) {
//                 resolve(filename + " promise");
//             } else {
//                 reject("err");
//             }
//         }, 2000);
//     });
// }

const uploadToS3Bulk = (filename) => {
    var s3res = {};
    // console.log("call to s3function");
    return new Promise(function (resolve, reject) {

        fs.readFile(`./uploads/content/${filename}`, async (err, data) => {
            // console.log("call to s3function1");
            if (err) {
                s3res.statuscode = 2;
                s3res.err = err;
                // return s3res;
                reject(s3res);
            } else {

                var params = {
                    Bucket: bucketName,
                    Key: `media/content/${filename}`,
                    Body: data
                };
            }
            // console.log("call to s3function3");
            await s3.upload(params, async (s3err, data) => {
                // console.log("call to s3function4");
                if (s3err) {
                    s3res.statuscode = 3;
                    s3res.err = s3err;
                    reject(s3res);
                }
                else {
                    // console.log("call to s3function5");
                    await fs.unlink(`./uploads/content/${filename}`, function (err) {
                        if (err) {
                            console.log("error in file deletion local");
                        }
                        // console.log("Data.location", data.Location);

                        s3res.statuscode = 1;
                        s3res.err = null;
                        s3res.location = data;
                        resolve(s3res);
                    });
                }
            });
        });
    });
}

module.exports.uploadToS3 = uploadToS3;
module.exports.uploadToS3Bulk = uploadToS3Bulk;
module.exports.uploadBulk = uploadBulk