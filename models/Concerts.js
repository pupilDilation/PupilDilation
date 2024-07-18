const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
  const Concerts = sequelize.define("Concerts", {
    concertId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    concertTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concertLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concertPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    concertRow: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    concertCol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    concertImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    concertPlot: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      //FK
    },
  });

  return Concerts;
};
