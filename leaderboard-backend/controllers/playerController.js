const Player = require('../models/Player');
const User = require('../models/User') 
exports.getUser = async (req, res) => {
    const users = User.find();
    return res.status(200).json(users);
  };

exports.addPlayer = async (req, res) => {
    const { name, id } = req.body;
    try {
        const newPlayer = new Player({ name, id });
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateScore = async (req, res) => {
    const { id } = req.params;
    const { score } = req.body;

    try {
        const player = await Player.findById(id);
        if (!player) return res.status(404).json({ message: 'Player not found' });

        player.score = score;
        await player.save();
        res.json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTopPlayers = async (req, res) => {
    try {
        const players = await Player.find().sort({ score: -1 }).limit(10);
        res.json(players);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};