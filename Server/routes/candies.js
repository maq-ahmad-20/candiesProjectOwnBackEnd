
const express = require('express');
const candiesController = require('../controllers/candies');
const router = express.Router();




router.get('/getCandy/:candyId', candiesController.getSingelCandy)

router.get('/getAllCandies', candiesController.getAllCandies)

router.post('/postCandies', candiesController.postCandies)

router.put('/editCandy', candiesController.editCandy);

router.delete('/deleteCandy/:candyId', candiesController.deleteCandy)

module.exports = router;