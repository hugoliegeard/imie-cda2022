const Contact = require('../models/contact-model');
const {validationResult} = require('express-validator');

/**
 * Page de création d'un contact
 * @param req
 * @param res
 */
exports.create_get = (req, res) => {
    res.render('contact/new-contact');
};

/**
 * Page de création d'un contact | POST
 * @param req
 * @param res
 */
exports.create_post = async (req, res) => {

    // -- 1a. Récupération
    const body = req.body;
    // console.log(body);

    // -- 1b. Validation des données
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {

        res.render('contact/new-contact', {
            'errors': errors.array(),
            'body': body
        });

    } else {

        try {
            // -- 2. Sauvegarde des données dans la base.
            const contact = await Contact.create(body);
            await contact.save();

            // -- 3a. Notification Flash
            req.session.flash = {
                type: 'success',
                message: 'Votre contact a bien été ajouté !'
            };

            // -- 3b. Redirection.
            res.redirect(`/contact/${contact._id}`);

        } catch (err) {

            req.session.flash = {
                type: 'danger',
                message: `Une erreur est survenue : ${err}`
            };

            res.redirect(`/contacts`);

        }

    } // endelse

};

/**
 * Suppression d'un contact.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id).exec();
        req.session.flash = {
            type: 'success',
            message: 'Votre contact a bien été supprimé !'
        };
        res.redirect(`/contacts`);
    } catch {
        req.session.flash = {
            type: 'danger',
            message: `Une erreur est survenue : ${err}`
        };
        res.redirect(`/contacts`);
    }
}
