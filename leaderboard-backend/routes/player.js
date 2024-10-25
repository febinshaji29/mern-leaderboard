const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/getuser', playerController.getUser)
router.post('/', playerController.addPlayer);
router.put('/:id', playerController.updateScore);
router.get('/top', playerController.getTopPlayers);

module.exports = router;