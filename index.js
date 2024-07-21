// express rest api 생성을 위한 템플릿
const express = require("express");
const concertRoutes = require("./routes/concertRoutes");
const path = require("path");
const app = express();
const port = 3001;

// sequelize db models configuration files
// const db = require("./models");

//mysql2 db configuration file
const db1 = require("./config/dbConfig");

const { myQ } = require("./config/queries");

// express가 json 형식 요청을 자동으로 파싱
// client가 서버로 보내는 요청이 json 형식일 때
// javascript 오브젝트로 변환해서 req.body 에 저장
app.use(express.json());
app.use("/concerts", concertRoutes);

app.get("/concerts", async (req, res) => {
  try {
    const [row] = await db1.query(myQ);
    res.json(row[0]);
  } catch (err) {
    console.log(err);
  }
});

// Routers
// const userRouter = require("./routes/Users");
// app.use("/users", userRouter);

// const concertRouter = require("./routes/Concerts");
// app.use("/concert", concertRouter);

app.use(express.static(path.join(__dirname, "pupil/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "pupil/build/index.html"));
});

// db.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Server Running on Port ${port}`);
//   });
// });

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
