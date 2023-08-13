const express = require("express");
const path = require("path");

const app = express();

// 정적 파일 서비스 설정
app.use(express.static(path.join(__dirname, "dist")));

// 서버 시작
const port = process.env.PORT || 8087;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
