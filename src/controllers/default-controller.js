
/**
 * Import de notre model Contact.
 * Permet d'interroger notre base.
 */
const Contact = require('../models/contact-model');

/**
 * Importation du service vCard.
 */
const {generateVCard} = require('../services/vcard');


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

        // -- Génération de ma vCard via mon service
        const vCard = generateVCard(contact);

        // -- Génération du QrCode
        QRCode.toDataURL( vCard,function (err, url) {
            res.render('contact', {
                'contact': contact.toJSON(),
                'url': url
            });
        })

    } catch (err) {
        console.log(err);
    }
};
