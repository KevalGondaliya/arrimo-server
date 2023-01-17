const { users } = require("../models/");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "5135s4f3s5r3dfef4s3e2fd1fw3e5f1csd321vcs3e5f1e51fcs3e51fs3e5";
module.exports = {
  createUser: async (req, res) => {
    try {
      let existingUser = await users.findOne({
        where: { email: req.body.email, isDelete: false },
      });
      if (existingUser) {
        return res.status(400).json("User already added");
      }
      let password = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            resolve(hash);
          });
        });
      });
      req.body.password = password;
      const createdUser = await users.create(req.body);
      jwt.sign(createdUser.dataValues, SECRET_KEY);
      delete createdUser.dataValues.password;
      res.status(200).json({
        status: 200,
        data: createdUser,
        message: "User created successfully...",
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body.email && !body.password) {
        return res.status(400).json("Email and password are required");
      }
      let existingUser = await users.findOne({
        where: { email: body.email },
      });
      if (!existingUser || existingUser.isDelete) {
        return res.status(400).json("User not found");
      }
      let passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(
          body.password,
          existingUser.password,
          function (err, result) {
            resolve(result);
          }
        );
      });
      console.log(
        "passwordMatch",
        passwordMatch,
        body.password,
        existingUser.password
      );
      if (passwordMatch) {
        let u = {
          sub: existingUser.firstName,
          data: {
            id: existingUser.id,
            email: existingUser.email,
          },
        };
        let token = jwt.sign(u, SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          data: {
            token,
            user: existingUser,
          },
          message: "Login Successfully",
          success: true,
          status: 200,
        });
      } else {
        res.status(200).json({
          status: 404,
          message: "Invalid Password",
        });
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getUsers: async (req, res) => {
    try {
      await users
        .findAll({ where: { isDelete: false } })
        .then((data) => res.status(200).json({ status: 200, data: data }));
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  editUser: async (req, res) => {
    try {
      await users
        .update(req.body, { where: { id: req.params.id } })
        .then(() =>
          res
            .status(200)
            .json({ status: 200, message: "User updated successfully..." })
        );
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await users
        .update({ isDelete: true }, { where: { id: req.params.id } })
        .then(() =>
          res
            .status(200)
            .json({ status: 200, message: "User deleted successfully..." })
        );
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getLoginUser: async (req, res) => {
    try {
      await users
        .findOne({ where: { id: req.user.data.id } })
        .then((data) => res.status(200).json({ status: 200, data: data }));
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};
