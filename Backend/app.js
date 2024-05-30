const express = import('express');
const cors = import('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/pokemon', pokemonRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
