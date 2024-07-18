module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sessionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    concertId: {
      type: DataTypes.INT,
      allowNull: false,
      //FK
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

  return Session;
};
