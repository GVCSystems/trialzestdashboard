
module.exports.register = function (app) {

    app.get('/', (req, res) => {
        res.render('machine/index');
    });

}