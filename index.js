// express rest api 생성을 위한 템플릿
const express = require("express");
// Routes
const concertRoutes = require("./routes/concertRoutes");
const userRoutes = require("./routes/userRoutes");
const clubRoutes = require("./routes/clubRoutes");
const authRoutes = require("./routes/authRoutes");
const seatRoutes = require("./routes/seatRoutes");

const path = require("path");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//mysql2 db configuration file
const db = require("./config/dbConfig");

// for Session
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    key: "sid",
    secret: "dnwnchlrkd206",
    store: sessionStore, // 얘 필수
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // 개발할 때만 false setting
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // cookie 24시간동안 유지
    },
  })
);
// session 준비완료 시 console.log 띄우기
sessionStore
  .onReady()
  .then(() => {
    // MySQL session store 사용 준비 완료됨
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    console.log(error);
  });

// express가 json 형식 요청을 자동으로 파싱
// client가 서버로 보내는 요청이 json 형식일 때
// javascript 오브젝트로 변환해서 req.body 에 저장
app.use(express.json());
// Routes 주소
app.use("/concerts", concertRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/club", clubRoutes);
app.use("/seats", seatRoutes);

// Routers
// const userRouter = require("./routes/Users");
// app.use("/users", userRouter);

// const concertRouter = require("./routes/Concerts");
// app.use("/concert", concertRouter);

app.use(express.static(path.join(__dirname, "pupil/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "pupil/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
