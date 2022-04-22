
const {check} = require('express-validator');

/**
 * Validation du Formulaire Contact
 * cf. https://github.com/validatorjs/validator.js#validators
 * cf. https://github.com/validatorjs/validator.js#sanitizers
 * cf. https://express-validator.github.io/docs/
 */
exports.contactValidator = [
    check('firstname').trim().notEmpty().withMessage('Vous devez saisir un prénom.'),
    check('lastname').trim().notEmpty().withMessage('Vous devez saisir un nom.'),
    check('email').trim().normalizeEmail()
        .notEmpty().withMessage('Vous devez saisir un email.')
        .isEmail().withMessage('Vérifier le format de l\'email.'),
    check('tel').blacklist(' ').isMobilePhone('fr-FR')
        .withMessage('Vérifiez le format du numéro de téléphone')
];
