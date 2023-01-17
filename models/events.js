module.exports = (sequelize, DataType) => {
  const Event = sequelize.define("event", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
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
    start: {
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
    end: {
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
  });
  return Event;
};
