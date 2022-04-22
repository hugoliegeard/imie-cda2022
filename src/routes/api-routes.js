const express = require('express');
const router = express.Router();

// -- Importation des controlleurs.
const apiController = require('../controllers/api-controller');

// -- Importation des validateurs.
const {contactValidator} = require('../validations/contact-validator');

// ---- ~ Chargement des routes ~ ---- \\

// Récupérer les contacts
router.get('/contacts', apiController.contacts_get),

// Ajouter un contact
router.post('/contacts', contactValidator, apiController.contacts_post),

// Récupérer un contact
router.get('/contacts/:id', apiController.contact_get),

// Mettre à jour un contact
router.put('/contacts/:id', contactValidator, apiController.contact_put),

// Supprimer un contact
router.delete('/contacts/:id', apiController.contact_delete),

// -- Exportation du router avec les routes.
    module.exports = router;
