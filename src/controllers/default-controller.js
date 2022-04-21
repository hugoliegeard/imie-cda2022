
/**
 * Import de notre model Contact.
 * Permet d'interroger notre base.
 */
const Contact = require('../models/contact-model');


/**
 * Import library QrCode / Vcard
 */
const QRCode = require('qrcode');
const vCardsJS = require('vcards-js');

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
        //create a new vCard
        let vCard = vCardsJS();
        vCard.firstName = contact.firstname;
        vCard.lastName = contact.lastname;
        vCard.email = contact.email;
        vCard.cellPhone = contact.tel;

        QRCode.toDataURL( vCard.getFormattedString(),function (err, url) {
            res.render('contact', {
                'contact': contact.toJSON(),
                'url': url
            });
        })

    } catch (err) {
        console.log(err);
    }
};
