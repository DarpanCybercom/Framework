const chalk = require("chalk");
const jwt = require('jsonwebtoken');

exports.tokenValidate = (req, res, next) => {

   /* console.log(req.headers); */
   const [tokenName , accesstoken] =  req.headers.authorization.split(" ");
   let jwtSecretKeyAccessToken = process.env.JWT_SECRET_KEY_ACCESSTOKEN;
   
  
   jwt.verify(accesstoken, jwtSecretKeyAccessToken, function(err, decoded) {
      if (err) {

         console.log(err);

         res.json(err);

      }else{
         next(); 
      }
    });

}