const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ncrypt = require('ncrypt-js')
const secretKey = 'test'

const dotenv = require('dotenv').config()

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10) // Permet d'hasher(crypter) le mdp. On passe le corps du mdp qui sera passé par le front. Le "salt" correspond au nombre de fois où l'algo de hashage est exécuté.
        .then((hash) => {
            const user = new User({
                // Enregistrement du nouvel utilisateur dans la bdd
                profileName: req.body.profileName,
                email: req.body.email, // Adresse indiqué dans le corps de la requête
                password: hash, // On enregistre le hash du mdp et non le mdp en blanc
                profilImageUrl: '',
                moderateur: req.body.moderateur
            })
            user.save() // Enregistrement dans la BDD
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // On récupère l'utilisateur de la base qui correspond à l'adresse courriel entrée
        .then((user) => {
            if (!user) {
                // Si on ne reçoit pas de user, on renvoit une erreur
                return res.status(404).json({ error: 'Utilisateur non trouvé !' })
            }
            bcrypt
                .compare(req.body.password, user.password) // La méthode compare de bcrypt compare un string avec un hash pour, par exemple, vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données.
                .then((valid) => {
                    if (!valid) {
                        // Si la comparaison n'est pas bonne, on renvoie une erreur
                        return res.status(401).json({ error: 'Mot de passe incorrect!' })
                    }
                    res.status(200).json({
                        // Sinon, on renvoie son UserId et un Token
                        userId: user._id,
                        token: jwt.sign(
                            // À l'intérieur nous dictons les données que nous souhaitons encoder dans ce toker (payload).
                            { userId: user._id }, // Données que l'on veut encoder -> payload. Le UserId est encodé car on ne veut pas qu'un user soit en capacité de modifier les informations d'un autres UserId.
                            process.env.MONGODB_TOKEN, // Clef secrete pour l'encodage. En production, on utiliserait une chaîne de caractère beaucoup plus longue et aléatoire.
                            { expiresIn: '24h' } // Configuration : chaque Token durera 24h
                        )
                    })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.getUserInfos = (req, res, next) => {
    User.findOne({ _id: req.params.id }) // La méthode findOne() dans notre modèle  pour trouver le user unique ayant le même _id que le paramètre de la requête
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json({ error }))
}

exports.modifyImgProfil = (req, res, next) => {
    const imgProfil = req.file // Dans cette version modifiée de la fonction, on crée un objet sauceObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance sauce à partir de sauceObject , puis on effectue la modification.
        ? {
              ...JSON.parse(req.body.user), // JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
              profilImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
        : { ...req.body }
    User.updateOne({ _id: req.params.id }, { ...imgProfil, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Image de profil rajouter' }))
        .catch((error) => res.status(400).json({ error: error }))
}
