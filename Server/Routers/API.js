// api.js
const express = require('express');
const { registration, login, activate } = require('../Controllers/AUTH');
const router = express.Router();

// user auth.....
router.post('/registration', registration);
router.post('/activate/:id', activate);
router.post('/login', login);

const { getPosts, addPost, getPost, deletePost, updatePost } = require('../Controllers/postController');
const upload = require('../middleware/uploadFile');
const { createComment, readComment, updateComment, deleteComment } = require('../Controllers/commentController');
const { commentReplyCreate, getCommentReply, updateCommentReply, deleteCommentReply } = require('../Controllers/commentReplyController');

// post section
router.get('/getPosts', getPosts);
router.get('/getPost/:id', getPost);
router.post('/addPost', upload.single('file'), addPost);
router.put('/updatePost', upload.single('file'), updatePost); // Remove trailing slash
router.delete('/deletePost/:id', deletePost);

// comment router
router.post('/createComment', createComment)
router.get('/readComment/:id',readComment)
router.put('/updateComment/:id', updateComment)
router.delete('/deleteComment/:id', deleteComment)

// reply section
router.post('/createCommentReply', commentReplyCreate)
router.get('/getCommentReply/:id', getCommentReply)
router.put('/updateCommentReply/:id', updateCommentReply)
router.delete('/deleteCommentReply/:id', deleteCommentReply)

module.exports = router;