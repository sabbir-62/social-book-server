const express = require('express');
const { registration, login, activate, forget_password, set_password, create_profile, reset_profile, profile_block_pin_save, block_usre_get, pin_post_get, save_post_get, viewSingleProfile } = require('../Controllers/AUTH');
const uploads = require('../Helpers/Upload');
const { tokenVerify } = require('../Middlewares/TokenVerify');
const router = express.Router();

// user auth.....
router.post('/registration',registration);
router.post('/activate/:id',activate);
router.post('/login',login);
router.post('/forget-password',forget_password);
router.post('/set-password/:id',set_password);


// user profile.....
router.post('/create-profile',tokenVerify,uploads,create_profile);
router.post('/rest-profile',tokenVerify,reset_profile);
router.post('/block-pin-save-remove',tokenVerify,profile_block_pin_save);
router.get('/block-user',tokenVerify,block_usre_get);
router.get('/save-post',tokenVerify,save_post_get);
router.get('/pin-post',tokenVerify,pin_post_get);
router.get('/view-single-profile/:id',tokenVerify,viewSingleProfile); 





module.exports = router;