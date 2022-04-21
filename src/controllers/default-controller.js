
/**
 * Import de notre model Contact.
 * Permet d'interroger notre base.
 */
const Contact = require('../models/contact-model');

/**
 * Page d'Accueil
 * @param req
 * @param res
 */
exports.index = (req, res) => {
    // -- Redirection vers /contacts.
    res.redirect('/contacts');
};

/**
 * Page lister les contacts
 * @param req
 * @param res
 */
exports.contacts = async (req, res) => {

    const contacts = await Contact.find();
    // console.log(contacts);

    res.render('contacts', {
        'contacts' : contacts.map(contact => contact.toJSON()),
    });
};

/**
 * Page afficher un contact
 * @param req
 * @param res
 */
exports.contact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).exec();
        res.render('contact', {
           'contact': contact.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
};
