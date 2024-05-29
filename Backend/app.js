const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');


const app = express();
app.use(cors());
app.use(express.json());
// EJS를 뷰 엔진으로 설정
app.set('view engine', 'ejs');

// 미들웨어로 라우트를 사용
app.use('/pokemon', pokemonRoutes);

// CORS 미들웨어를 등록
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
