const bcrypt = require('bcryptjs');
const { validationEmail, validationLength, validationUserName, generateToken } = require("../Helpers/Validation");
const userModel = require('../Models/User_Model');
const { sendEmail } = require('../utilities/SentEmail_uts');
const jwt = require('jsonwebtoken');


exports.registration_user = async(req)=>{
    try {

        const {firstName,lastName,email,password} = req.body;

        if(!firstName || !lastName || !email || !password){
            return {status:"Fail",message:"all fields is required."};
        }

        if(!validationLength(firstName,3,15)){
            return {status:"Fail",message:"firstName must be 3 and 15 characters."};
        }

        if(!validationLength(lastName,3,15)){
            return {status:"Fail",message:"lastName must be 3 and 15 characters."};
        }

        if(!validationEmail(email)){
            return {status:"Fail",message:"invalid email address."};
        }

        if(!validationLength(password,8,40)){
            return {status:"Fail",message:"password must be 8 and 40 characters."};
        }

        const passwordBcrypt = await bcrypt.hash(password,12);

        const existEmail = await userModel.findOne({email});

        if(existEmail){
            return {status:"Fail",message:"email address already exist."};
        }

        const username = firstName + lastName;

        const newUserName = await validationUserName(username);

        const userData = await new userModel({
            firstName,lastName,email,userName:newUserName,password:passwordBcrypt
        }).save();

        const emailVerification = generateToken({id:userData._id},"15m");

        const url = `${process.env.BASE_URL}/activate/${emailVerification}`;

       await sendEmail(userData.email,userData.firstName,url);

       return {status:"success",message:"registration successfully."};

    } catch (err) {
        return {status:"Fail",message:"something went wrong.",error:err.message};
    }
};


exports.activate_user = async(req)=>{
    try {
        
        const {id} = req.params;
        if(!id){
            return {status:"Fail",message:"use token is required."};
        };

        const verificationData = jwt.verify(id,process.env.KEY);

        const expireToken = Date.now()/1000 > verificationData.exp;
        if(expireToken){
            return {status:"Fail",message:"expire Your Token please try again."};
        }

        const userData = await userModel.findByIdAndUpdate({_id:verificationData.id},{$set:{activated:true}});

        const userActivatedToken = generateToken({id:userData._id},"15d");

        return {status:"success",token:userActivatedToken};

    } catch (err) {
        return {status:"Fail",message:"something went wrong.",error:err.message};
    }
};




exports.login_user = async(req)=>{
    try {
        
        const {email,password} = req.body;

        if(!email || !password){
            return {status:"Fail",message:"all fields is required."};
        }
        if(!validationEmail(email)){
            return {status:"Fail",message:"invalid email address."};
        }
        if(!validationLength(password,8,40)){
            return {status:"Fail",message:"password must be 8 and 40 characters."};
        }

        const findUser = await userModel.findOne({email});
        if(!findUser){
            return {status:"Fail",message:"there are no account in this email."};
        };

        const passwordCheck = bcrypt.compare(password,findUser.password);
        if(!passwordCheck){
            return {status:"Fail",message:"invalid email/password.please try again."};
        };

        if(findUser.activated == true){
            const userToken = generateToken({id:findUser._id},"15d");
            return {status:"success",token:userToken};
        }else{
            const emailVerification = generateToken({id:findUser._id},"15m");

            const url = `${process.env.BASE_URL}/activate/${emailVerification}`;
    
           await sendEmail(findUser.email,findUser.firstName,url);
    
           return {status:"success",message:"Your account is not activated please first check your email and active your account."};
        };

    } catch (err) {
        return {status:"Fail",message:"something went wrong.",error:err.message};
    }
};