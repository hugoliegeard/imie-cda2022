/**
 * Importer le package http.
 * Permet de gérer les opérations HTTP.
 */
const http = require('http');

/**
 * Importer le package filesystem.
 * Permet l'accès au système de fichiers.
 * https://devdocs.io/node/fs
 */
const fs = require('fs');

/**
 * Déclaration de l'hôte et du port.
 */
const hostname = "127.0.0.1";
const port = 3000;

/**
 * Création de notre serveur web en JS !
 */
const server = http.createServer(
    (req, res) => {

        // -- Génération de notre URL de base
        const baseUrl = `${req.protocol}://${req.headers.host}/`;

        // -- URL de la requète
        const reqUrl = new URL(req.url, baseUrl);
        //console.log(reqUrl);

        if (reqUrl.pathname === '/') {

            fs.readFile(__dirname + '/views/html/index.html', (
                (err, data) => {

                    if (err) console.log(err);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);

                }));

        } else if (reqUrl.pathname === '/contacts') {

            fs.readFile(__dirname + '/views/html/contacts.html', (
                (err, data) => {

                    if (err) console.log(err);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);

                }));

        } else if (reqUrl.pathname === '/public/assets/css/style.css') {
            fs.readFile(__dirname + '/public/assets/css/style.css', (
                (err, data) => {
                    if (err) console.log(err);
                    res.statusCode = 200;
                    res.end(data);
                }));
        } else {

            fs.readFile(__dirname + '/views/html/erreur404.html', (
                (err, data) => {

                    if (err) console.log(err);

                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);

                }));

        }

    });

/**
 * Démarrage du serveur et écoute des
 * connexions sur le port 3000.
 */
server.listen(port, hostname, () => {
    console.log(`Serveur en ligne via 
    http://${hostname}:${port}/`);
    console.log(`CTRL + C pour stopper.`)
});
