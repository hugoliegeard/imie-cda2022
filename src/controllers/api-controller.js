

const Contact = require('../models/contact-model');
const {validationResult} = require('express-validator');

/**
 * Afficher les contacts
 * @param req
 * @param res
 */
exports.contacts_get = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
           status: 200,
           method: req.method,
           data: contacts
        });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

/**
 * Créer un nouveau contact
 * @param req
 * @param res
 */
exports.contacts_post = async (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            method: req.method,
           errors: errors.array()
        });
    } else {
        try {
            const contact = new Contact(body);
            await contact.save();
            res.status(201).json({
               status: 201,
               method: req.method,
               data: contact
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                method: req.method,
                message: err.message
            });
        }
    }
};

/**
 * Afficher un contact via son ID
 * @param req
 * @param res
 */
exports.contact_get = async (req, res) => {
};

/**
 * Modifier un contact via son ID
 * @param req
 * @param res
 */
exports.contact_put = async (req, res) => {
};

/**
 * Supprimer un contact via son ID
 * @param req
 * @param res
 */
exports.contact_delete = async (req, res) => {
};
