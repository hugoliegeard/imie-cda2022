

const express = require('express');
const router = express.Router();

// -- Importation des controlleurs.
const defaultController = require('../controllers/default-controller');
const contactController = require('../controllers/contact-controller');

// -- Chargement des routes
router.get('/', defaultController.index);
router.get('/contacts', defaultController.contacts);
router.get('/contact/:id', defaultController.contact);

// -- Ajouter, Editer, Supprimer un Contact
router.get('/ajouter-un-contact', contactController.create_get);
router.post('/ajouter-un-contact', contactController.create_post);
router.get('/contact/:id/delete', contactController.delete);

// -- Exportation du router avec les routes.
module.exports = router;
