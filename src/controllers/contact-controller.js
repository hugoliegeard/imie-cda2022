const Contact = require('../models/contact-model');

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

    // -- 1. Récupération & Vérification des données.
    const body = req.body;
    // console.log(body);

    try {
        // -- 2. Sauvegarde des données dans la base.
        const contact = await Contact.create(body);
        await contact.save();
    } catch (err) {
        console.log(err);
    }

    // -- 3. Redirection.
    res.redirect('/contacts');

};
