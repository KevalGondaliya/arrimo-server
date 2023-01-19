const { Sequelize, DataTypes } = require("sequelize");

const dbConfig = require("../config.js");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 1,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("connected..."))
  .catch((err) => err.message);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, DataTypes);
db.events = require("./events.js")(sequelize, DataTypes);

db.users.hasMany(db.events);
db.events.belongsTo(db.users);

db.sequelize.sync({ force: false }).then(async () => {
  await db.users.findAll({ where: { isDelete: false } }).then(async (data) => {
    if (data.length === 0) {
      var password = await new Promise((resolve) => {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash("123456", salt, function (err, hash) {
            resolve(hash);
          });
        });
      });
      await db.users
        .create({
          firstName: "admin",
          lastName: "admin",
          email: "admin@gmail.com",
          password: password,
          role: "admin",
        })
        .then(() => console.log("Admin created"));
    }
  });
  console.log("Tables synced");
});

module.exports = db;
