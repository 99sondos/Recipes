// hämta bliotek
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dishesRoutes = require('./routes/dishes');

//läser .env filen
dotenv.config();

//skapar en express app
const app = express();

//middleware som gör cors och json
app.use(cors());
app.use(express.json());

//hämtar routes från dishes
app.use('/api/dishes', dishesRoutes);




//testa så att servern fungerar som den ska
app.get('/', (req, res) => {
    res.send('<h1>Välkommen till Recept-API!</h1>');
  });





// Anslut till MongoDB med connection string från .env
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Ansluten till Mongodb databas'))
  .catch((err) => console.error('Fel vid anslutning:', err));
  
  // Starta servern
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server körs på http://localhost:${PORT}`));