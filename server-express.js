
/**
 * Chargement des variables d'ENV.
 * npm install dotenv
 */
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

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
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
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
app.use(bodyParser.urlencoded({extended:false}));

/**
 * Configuration de la connexion à MongoDB
 */
const mongoose = require('mongoose');
const mongoDbUri = process.env.MONGODB_URI;
mongoose.connect(mongoDbUri);

/**
 * Routes
 */
const appRoutes = require('./src/routes/app-routes');
app.use('/', appRoutes);

/**
 * Démarrage du serveur et écoute des
 * connexions sur le port 3000.
 */
app.listen(port,() => {
    console.log(`Serveur en ligne via 
    http://localhost:${port}/`);
    console.log(`CTRL + C pour stopper.`)
});
