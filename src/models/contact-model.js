

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  1ère étape, la création d'un Schema, qui
 *  me permet de décrire la structure d'un
 *  Contact dans mon application.
 *  cf. https://mongoosejs.com/docs/guide.html#definition
 */
const ContactSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    tel: String
}, { timestamps: true }); // https://mongoosejs.com/docs/timestamps.html

/**
 * Dernière étape, la création du modèle
 * à partir du Schema.
 */
module.exports = mongoose.model('Contact', ContactSchema);
