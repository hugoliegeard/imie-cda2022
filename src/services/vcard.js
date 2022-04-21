

const vCardsJS = require("vcards-js");

module.exports = {

    /**
     * En partant d'un objet contact,
     * générer une vCard.
     * @param contact
     * @returns {String}
     */
    generateVCard: contact => {
        const vCard = vCardsJS();
        vCard.firstName = contact.firstname;
        vCard.lastName = contact.lastname;
        vCard.email = contact.email;
        vCard.cellPhone = contact.tel;

        return vCard.getFormattedString();
    }

};
