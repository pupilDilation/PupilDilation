// express rest api 생성을 위한 템플릿
const express = require("express");
const app = express();
const port = 3001;

// express가 json 형식 요청을 자동으로 파싱
// client가 서버로 보내는 요청이 json 형식일 때
// javascript 오브젝트로 변환해서 req.body 에 저장
app.use(express.json());

const db = require("./models");

// Routers
const userRouter = require("./routes/Users");
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
  });
});
