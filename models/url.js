'use strict';

module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    originalUrl: {
      type: DataTypes.STRING,
    },
    shortUrl: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    freezetableName: true,
    tableName: 'URL'
  })
  return Url;
};