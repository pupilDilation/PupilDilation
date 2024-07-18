module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define("Seat", {
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //FK
    },
    status: {
      type: DataTypes.STRING,
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
  });

  return Seat;
};
