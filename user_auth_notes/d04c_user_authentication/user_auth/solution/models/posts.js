"use strict";
module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define("posts", {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {

    underscored: true,

    classMethods: {
      associate: function(models) {
        posts.belongsTo(models.users, { foreignKey: 'user_id' });
      }
    }
  });
  return posts;
};
