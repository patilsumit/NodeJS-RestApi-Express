var jwt = require('jsonwebtoken');
const password="supersecret";

//Generate JWT Token
function generateToken(payload,callback){
    jwt.sign(payload,password,callback);
}

//verify JWT Token
function verifyToken(token,callback){
    jwt.verify(token,password,callback);
}

//Test token generate
generateToken({user:"sumit"},(err,token)=>{
    console.log('Got Token:',token);

    //Test token validation
    verifyToken(token ,(err,decodeData)=>{
        if(err){
            console.log("Error:",err);
        }
        else{
            console.log("Decode Info:",decodeData);
        }
    })
});

module.exports.generateToken=generateToken;
module.exports.verifyToken=verifyToken;