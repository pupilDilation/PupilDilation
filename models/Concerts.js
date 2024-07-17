module.exports = (sequelize, DataTypes) => {
  const Concerts = sequelize.define("Concerts", {
    concertId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    people: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Concerts;
};
