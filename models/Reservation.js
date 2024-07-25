module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    rsvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      //FK
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //FK
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //FK make need
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

  return Reservation;
};
