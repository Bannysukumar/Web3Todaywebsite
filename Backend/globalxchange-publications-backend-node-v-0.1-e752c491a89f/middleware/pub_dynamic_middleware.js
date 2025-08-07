const mongodb = require("mongodb");
// const makeDb = require('../mongodb_connection');
// const database = makeDb();
// const { database } = require('../app');
const { dbConnection,mongodbConnection } = require('../mongodb_connection');
let database = dbConnection();


// Dynamic field Update for Dynamic Collection name
module.exports.updatedynamicObject = async (collectionName, condObj, updateObj) => {
    const collection_name = collectionName;
    const db = await database;
    // const db = await mongodbConnection;
    let objForUpdate = {
      ...updateObj
    };
    return new Promise(function (resolve, reject) {
      if (collection_name) {
        if (Object.keys(condObj).length > 0) {
          if (Object.keys(objForUpdate).length > 0) {
            db.collection(collection_name).updateOne(condObj, {
              $set: objForUpdate
            }, function (err, result) {
              if (err) {
                // console.log(`err====>${err}`);
                reject({
                  status: false,
                  message: err.message,
                });
              } else {
                resolve({
                  status: true,
                  data: result
                });
              }
            });
          } else {
            reject({
              status: false,
              message: "No field given for update",
            });
          }
        } else {
          reject({
            status: false,
            message: "Required condition is not given",
          });
        }
      } else {
        reject({
          status: false,
          message: "Invalid collection",
        });
      }
    });
  };