const User = require("./models/User");

app.get('/leaderboard', async (req, res) => {
    const players = await Player.find().sort({ score: -1 }).limit(10);
    res.json(players);
  });
  
  app.get('/players', async (req, res) => {
    const players = await Player.find().sort({ score: -1 });
    res.json(players);
  });

  app.get('/getuser', async (req, res) => {
    const users = User.find();
    console.log(users);
    
    return res.status(200).json(users);
  });
  
  app.put('/update-score', authenticateToken, async (req, res) => {
    const { id, score } = req.body;
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    
    if (req.user.userId !== player.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update this player\'s score' });
    }
  
    player.score = score;
    await player.save();
    res.json(player);
  });
  
  app.put('/admin-update-score', authenticateToken, async (req, res) => {
    const { id, score } = req.body;
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can update scores' });
    }
  
    player.score = score;
    await player.save();
    res.json(player);
  });
  