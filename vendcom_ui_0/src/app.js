const dotenv = require('dotenv');
const express = require('express');
const hbs = require('express-hbs');
const routes = require('./routes');
dotenv.config();

const app = express();
app.use(express.static(__dirname + '/public'))


app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layouts/layout',
    extname: '.hbs',
}));

app.set('view engine', 'hbs');
console.log(__dirname);
app.set('views', __dirname + '/views');
app.locals.apiUrl = process.env.API_URL;

routes.register(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log('The web server has started on port ' + process.env.SERVER_PORT);
});

