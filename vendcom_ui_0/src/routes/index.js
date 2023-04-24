const machine = require('./machine');

module.exports.register = function (app) {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/login', (req, res) => {
        res.render('login', { layout: null });
    });

    app.get('/machine/', (req, res) => {
        res.render('machine/index');
    });

    app.get('/machinedata', (req, res) => {
        res.render('machine_data');
    });

    // machine.register();
}