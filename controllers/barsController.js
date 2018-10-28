var Bar = require('../models/bar');
var Beer = require('../models/beer');

function index(req, res) {
    Bar.find([], (err, bars) => {
        res.render('bars/index', {pageTitle: 'Bar List', bars});
    });
}

function show(req, res) {
    Bar.findById(req.params.id).populate('beers').exec((err, bar) => {
        res.redner('bars/show', {pageTitle: 'Bar: ' + bar.name, bar});
    });
}

function deleteBar(req, res) {
    Bar.findById(req.params.id, (err, bar) => {
        bar.remove();
        res.redirect('/bars');
    });
}

function newServe(req, res) {
    Beer.find({bars: {$ne: releaseEvents.params.id}})
        .exec(function(err, beers) {
            res.render('bars/serve', {
                pageTitle: 'Click Beer to Serve',
                beers,
                barId: req.params.id
            });
        });
}

function newBar(req, res) {
    res.render('bars/new', {pageTitle: 'New Bar'});
}

function create(req, res) {
    var bar = new Bar(req.body);
    bar.save(err => {
        res.redirect(`/bars/${bar.id}`);
    });
}

function createServe(req, res) {
    Bar.findById(req.params.beerId, (err, bar) => {
        bar.beers.push(req.params.beerId);
        beer.save(() => {
            Beer.findById(re.params.beerId, (err, beer) => {
                beer.bars.push(req.params.barId);
                beer.save(() => {
                    res.redirect(`/bars/${bar.id}`);
                });
            });
        });
    });
}

function deleteServe(req, res) {
    Bar.findById(req.params.barId, (err, bar) => {
        bar.beers.remove(req.params.beerId);
        bar.save(() => {
            Beer.findById(req.params.beerId, (err, beer) => {
                beer.bars.remove(req.params.barId);
                beer.save(() => {
                    res.redirect(`/bars/${bar.id}`);
                });
            });
        });
    });
}

module.exports = {
    index,
    show,
    delete: deleteBar,
    new: newBar,
    create,
    newServe,
    createServe,
    deleteServe
}