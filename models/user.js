module.exports = (sequelize, DataType) => {
  const User = sequelize.define("user", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "string") {
            throw new Error("only alphabets awllowed in first name");
          }
        },
      },
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "string") {
            throw new Error("only alphabets awllowed in last name");
          }
        },
      },
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "string") {
            throw new Error("only alphabets awllowed in email");
          }
        },
      },
    },
    password: {
      type: DataType.STRING,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "string") {
            throw new Error("only alphabets awllowed in password");
          }
        },
      },
    },
    role: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "string") {
            throw new Error("only alphabets awllowed in role");
          }
        },
      },
    },
    isDelete: {
      type: DataType.BOOLEAN,
      defaultValue: false,
      validate: {
        isTypeMAtch(value) {
          if (typeof value !== "boolean") {
            throw new Error("only boolean allow in iselete");
          }
        },
      },
    },
  });
  return User;
};
