const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "118.41.71.215",
  user: "tester",
  password: "1234",
  database: "pupildilation_test",
});

module.exports = pool.promise();
