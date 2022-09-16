const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const dotenv = require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] // On créé un const à partir de la rêquete et du header authorization. On va séparer les éléments autour d'un espace. Ce qui nous retournera un tableau avec Bearer en premier élément et le token en 2e. On gardera alors uniquement le 2nd element.
        const decodedToken = jwt.verify(token, process.env.MONGODB_TOKEN) // On vient décoder le token. Lorsque le token est décodé, cela devient un objet JS...
        const userId = decodedToken.userId //...et on peut venir récupérer le User Id qui est dedans.
        req.auth = { userId: userId } // la reqête comprend userId
        User.findOne({ _id: mongoose.Types.ObjectId(userId) })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ error: 'Utilsateur non trouvé' })
                }
                if (req.body.userId && req.body.userId !== userId) {
                    console.log('User pas auth')
                    // S'il y a un userId dans le corps de la requête et que celui-ci est différent du userId.
                    throw 'User ID non valable !' // Renvoie une erreur
                }
                if (user.admin !== true) {
                    console.log('User pas admin')
                    throw 'User pas admin !' // Renvoie une erreur
                } else {
                    console.log('tout bon')
                    next()
                }
            })
            .catch((error) =>
                res.status(500).json({ error: error | 'Erreur recherche utilsateur' })
            )
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' })
    }
}