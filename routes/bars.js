var express = require('express');
var router = express.Router();
var bars = require('../controllers/barsController')

router.get('/', bars.index);

router.get('/new', bars.new);

router.get('/:id', bars.show);

router.post('/', bars.create);

router.post('/:barId/beers/:beerId', bars.createServe);

router.get('/:id/beers/new', bars.newServe);

router.delete('/:id', bars.delete);

module.exports = router;
