const userPoolId = 'us-east-2_F4SRmE4RG';
const axios = require('axios');
let jwkToPem = require('jwk-to-pem');
let jwt = require('jsonwebtoken');

const admin = require('../models/pub_admin_detail');
const publicationOwner = require('../models/pub_publication_detail');
const publisher = require('../models/pub_publisher_detail');

const admin_emails = [
  // "roop@nvestbank.com",
  "shorupan@gmail.com",
];

const mallPlatformUser = (req, res, next) => {
  req.endpointType = "MallPlatformUser";
  next();
}
// publicationOwner
const publicationsOwner = (req, res, next) => {
  req.endpointType = "PublicationOwner";
  // console.log("req.endpointType", req.endpointType);
  next();
}
// publisher
const Publisher = (req, res, next) => {
  req.endpointType = "Publisher";
  // console.log("req.endpointType", req.endpointType);
  next();
}

const authenticateFun = async (req, res, next) => {
  var token = req.headers.authorization;
  var email = req.query.emailid;
  // console.log("email", email);
  // console.log("token", token);
  axios
    .get(`https://cognito-idp.us-east-2.amazonaws.com/${userPoolId}/.well-known/jwks.json `)
    .then(keys => {
      try {
        let jwk = keys.data.keys[0];
        let pem = jwkToPem(jwk);
        jwt.verify(token, pem, async function (err, decoded) {
          if (err) {
            res.status(401).json({
              status: false,
              message: "Authentication failed"
            });

            return;
          }
          // console.log(decoded.email, email);
          if (email.toLowerCase() === decoded.email.toLowerCase()) {
            // let adminmail = await admin.find({ email: email.toLowerCase(), product_name: product_name });
            const filter = {};
            filter.email = email.toLowerCase();
            let usermail;
            //Check the endpoint and call the collection accordingly
            if (req.endpointType == "MallPlatformUser")
              // usermail = await malluser.findOne(filter); //for the respective shop details
              usermail = await axios.get(`https://bos.apimachine.com/test/mallplatform/email/${filter.email}`);
            else if (req.endpointType == "PublicationOwner")
              usermail = await publicationOwner.findOne(filter);
            else if (req.endpointType == "Publisher")
              usermail = await publisher.findOne(filter);
            let adminmail = await admin.find(filter); //if admin tries to user the endpoint
            // console.log("aaaaaaaa", adminmail.length);
            // console.log("aaaaaaaa", usermail.data.data);
            // console.log("usermail=========",usermail);
            if (usermail || adminmail.length > 0) {
              console.log("Email Valid...");
            } else {
              
              console.log("Email not Valid...");
              res.status(401).json({
                status: false,
                message: "Invalid User"
              });
              return;
            }
          } else {
            console.log('Email not Valid...');
            res.status(401).json({
              status: false,
              message: "Invalid User"
            });
            return;
          }
          console.log("Exp...");
          var exp = decoded.exp;
          if (Date.now() >= exp * 1000) {
            console.log("Expired token");
            res.status(401).send();
            return;
          } else {
            console.log(" Token valid..");
            next();
            return;
          }
        });
      } catch (e) {
        console.log(e);
        res.status(401).json({
          status: false,
          message: "Authentication failed"
        });
        return;
      }
    }).catch(err => {
      console.log(err);
      res.status(401).json({
        status: false,
        message: "Authentication failed"
      });
    });
}

module.exports = { mallPlatformUser, publicationsOwner, Publisher, authenticateFun, };