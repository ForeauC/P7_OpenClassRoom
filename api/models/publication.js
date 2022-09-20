const mongoose = require('mongoose')

const publicationSchema = mongoose.Schema({
    // Nous créons un schéma de données qui contient les champs souhaités pour chaque sauce, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose.
    profileName: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: true }
})

module.exports = mongoose.model('Publication', publicationSchema) // Permet d'exporter le modèle Mongoose, le rendant par là même disponible poÒ
