const { registration_user, login_user, activate_user } = require("../service/AUTH_SERVICE");



exports.registration = async(req,res)=>{
    const result = await registration_user(req);
    res.status(200).json(result);
};
exports.activate = async(req,res)=>{
    const result = await activate_user(req);
    res.status(200).json(result);
};
exports.login = async(req,res)=>{
    const result = await login_user(req);
    res.status(200).json(result);
};