/**
 * Chargement des variables d'ENV.
 * npm install dotenv
 */
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

/**
 * Chargement du framework express
 */
const express = require('express');

/**
 * Initialisation d'Express
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * Configuration du templating handlebar
 */
const hbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();

/**
 * Permet de rechercher un param et sa valeur dans une collection
 * @param collection
 * @param param
 * @param value
 */
helpers.ifIn = ( collection = [], param, value ) => {
    for (let i = 0 ; i < collection.length ; i++) {
        if( collection[i][param] === value ) {
            return collection[i];
        }
    }
    return false;
}

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: helpers
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/**
 * Body Parser / Récupération des données POST.
 * https://github.com/expressjs/body-parser#readme
 * https://www.npmjs.com/package/body-parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Configuration de la connexion à MongoDB
 */
const mongoose = require('mongoose');
const mongoDbUri = process.env.MONGODB_URI;
mongoose.connect(mongoDbUri);

/**
 * Configuration des sessions avec Express
 * https://www.npmjs.com/package/express-session
 * https://www.npmjs.com/package/cookie-parser
 */
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

/**
 * Configuration des notifications flash.
 */
app.use(((
    req,
    res,
    next) => {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
}));

/**
 * Routes
 */
const appRoutes = require('./src/routes/app-routes');
const apiRoutes = require('./src/routes/api-routes');
app.use('/', appRoutes);
app.use('/api', apiRoutes);

/** Gestion des erreurs 404 **/
app.use((req, res) => {
    res.status(404).render('error');
});

/**
 * Démarrage du serveur et écoute des
 * connexions sur le port 3000.
 */
app.listen(port, () => {
    console.log(`Serveur en ligne via 
    http://localhost:${port}/`);
    console.log(`CTRL + C pour stopper.`)
});
