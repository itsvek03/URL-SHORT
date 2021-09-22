'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    freezetableName: true,
    tableName: 'users'
  });

  Users.beforeCreate(function (Users, options, cb) {
    if (Users.password) {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return err;
          }
          bcrypt.hash(Users.password, salt, (err, hash) => {
            if (err) {
              return err;
            }
            Users.password = hash;
            return resolve(Users, options);
          })
        })
      })
    }
  })

  Users.prototype.comparePassword = function (password, cb) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
          return Promise.reject("Something went wrong");
        }
        return resolve(isMatch)
      })
    })
  }


  return Users;
};