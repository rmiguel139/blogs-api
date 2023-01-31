const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
}

module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory,
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory,
    });
  };

  return PostCategory;
};