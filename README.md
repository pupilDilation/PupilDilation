# 폴더 구조

##### 메인 폴더 내에 `client`, `server` 폴더 생성

```bash
$ npm install express cors mysql2
```

##### express, cors, mysql2 설치

#### sequelize 세팅

```bash
$ npm install sequelize sequelize-cli

$ npx sequelize-cli init
```

##### migrations와 seeders 폴더는 필요없다고 함 (나중에 알아볼 것)

# JS 코드를 통한 Table 생성

### Table 정보 생성

```javascript
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
```

### `index.js`에 import

```javascript
const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
  });
});
```

### `/config/config.json` 세팅

```json
{
  "development": {
    "username": "tester",
    "password": "1234",
    "database": "schema_name",
    "host": "localhost",
    "dialect": "mysql"
  }
}
```

##### development 만 세팅하면 될듯

# 라우팅

##### `./routes` 디렉토리에 router 생성

```javascript
// Posts.js
const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", (req, res) => {
  res.send("Hello World");
});

// async keyword 사용
router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
});

module.exports = router;
```
