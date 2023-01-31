const posts = require('../services/posts');
const postCategories = require('../services/postCategorie');
const categories = require('../services/categorie');

const postsController = {
    /** @type {import('express').RequestHandler} */
  createPost: async (req, res) => {
    const { categoryIds } = req.body;

    const body = await posts.validate(req.body);
    await categories.verifyCategories(categoryIds);

    const createdPost = await posts.createPost({ ...body, userId: req.user.id });
    await postCategories.createPost(createdPost.id, categoryIds);
    res.status(201).json(createdPost);
  },
};

module.exports = postsController;