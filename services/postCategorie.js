const models = require('../database/models');

const postsCategories = {
  createPost: async (postId, categories) => {
    const postCategories = await Promise.all(
      categories.map(async (categoryId) => {
        const postCategory = await models.PostCategory.create({ postId, categoryId });
        return postCategory;
      }),
    );
    return postCategories;
  },
};

module.exports = postsCategories;