const path = require('path');
const Post = require('../Models/postModel');
const { clientError, serverError } = require('./error');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.status(200).send({
        success: true,
        message: 'find all posts',
        data: posts
      });
    } else {
      await clientError(res, 404, 'post with this id was not found');
    }
  } catch (error) {
    await serverError(res, 500, error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (post) {
      res.status(200).send({
        success: true,
        message: 'find single posts',
        data: post
      });
    } else {
      await clientError(res, 404, 'post with this id was not found');
    }
  } catch (error) {
    await serverError(res, 500, error.message);
  }
};

const addPost = async (req, res) => {
  try {
    const UPLOAD_DIR = path.join(__dirname, 'public/images/users');
    // console.log('File will be saved to:', path.join(UPLOAD_DIR, req.file.filename));


    const newPost = new Post({
      content: req.body.content,
      userId: req.body.userId,
      // image: req.file.filename,
      // video: req.file.filename,
    });

    const post = await newPost.save();
    if (post) {
      res.status(201).send({
        success: true,
        message: 'post was added',
        data: post,
      });
    }
  } catch (error) {
    await serverError(res, 500, error.message);
    console.log(error);

  }
};


const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (post) {
      await Post.deleteOne({ _id: id });
      res.status(200).send({
        success: true,
        message: 'post was deleted'
      });
    } else {
      await clientError(res, 404, 'post with this id was not found');
    }
  } catch (error) {
    await serverError(res, 500, error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    if (req.file !== undefined) {
      const id = req.body.id;
      const post = await Post.findOne({ _id: id });
      if (post) {
        await Post.updateOne(
          { _id: id },
          {
            $set: {
              content: req.body.content,
              image: req.file.filename,
              video: req.file.filename
            }
          }
        );
        res.status(200).send({
          success: true,
          message: 'post was updated'
        });
      } else {
        await clientError(res, 404, 'post with this id was not found');
      }
    } else {
      const id = req.body.id;
      await Post.updateOne(
        { _id: id },
        {
          $set: {
            content: req.body.content,
            image: req.file.filename
          }
        }
      );
      res.status(200).send({
        success: true,
        message: 'post was updated'
      });
    }
  } catch (error) {
    await serverError(res, 500, error.message);
  }
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };