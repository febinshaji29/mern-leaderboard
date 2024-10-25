const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/player');
const User = require('./models/User')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.MONGO_URI, "test");

mongoose.connect("mongodb+srv://febinshaji:kjlnjhlmrsq%402024@cluster0.tlivax1.mongodb.net/game_dashboard", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("error",err));

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.get('/test',async (req,res)=> {
    res.json({'key':"test"})
    
})
app.get('/getuser', async (req, res) => {
    const users = await User.find ();
    console.log(users);
//   const users = await mongoose.model('users').find({});
//   console.log(users);
    //return res.status(200).json(users);
    res.json({'key':"test"})
  });
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));