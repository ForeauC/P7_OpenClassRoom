const Publication = require('../models/publication')
const fs = require('fs') // modules nodeJS permet de créer et gérer des fichiers
const { runInNewContext } = require('vm')
const publication = require('../models/publication')

exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication) // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON. Le corps de la requête contient une chaîne sauce , qui est simplement un objet Sauce converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
    delete publicationObject._id // On supprime le champ _id qui est généré automatiquement par la BDD (car ce ne sera pas le bon id)
    const publication = new Publication({
        // Création d'une instance
        ...publicationObject, // L'operateur spread "...", permet de copier les éléments du body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
    })
    publication
        .save() // Enregistre les infos dans la BDD
        .then(() => res.status(201).json({ message: 'Publication bien enregistrée' }))
        .catch((error) => {
            res.status(400).json({ error: error })
        })
}

exports.getAllPublication = (req, res, next) => {
    publication
        .find()
        .then((publications) => {
            return res.status(200).json(publications)
        })
        .catch((error) => res.status(404).json({ error: error }))
}

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file // Dans cette version modifiée de la fonction, on crée un objet publicationObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance sauce à partir de sauceObject , puis on effectue la modification.
        ? {
              ...JSON.parse(req.body.publication), // JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
        : { ...req.body }
    Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Publication modifié avec succés' }))
        .catch((error) => res.status(400).json({ error: error }))
}

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id }) // On trouve l'objet dans la BDD
        .then((publication) => {
            if (!publication) {
                res.status(404).json({ error: new Error('Erreur') })
            }
            if (publication.userId !== req.auth.userId) {
                res.status(400).json({ error: new Error('Requète non authorisé!') })
            }
            const filename = publication.imageUrl.split('/images/')[1] // Une fois trouvé, on extrait le nom du fichier à supprimer
            fs.unlink(`images/${filename}`, () => {
                // On le supprime avec fs.unlink
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(204).json({ message: 'Publication supprimé !' }))
                    .catch((error) => res.status(400).json({ error }))
            })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.getLikes = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then((publication) => {
            //like pour la premier fois
            if (!publication.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                // fonction inverse "!" si l'userId à déja like false sinon true , utilisation de la méthode includes qui permet de déterminer si un tableau contient une valeur et renvoie true si c'est le cas, false sinon
                publication.likes += 1
                publication.usersLiked.push(req.body.userId)
                // annuler un like
            } else if (publication.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                publication.likes -= 1
                let userKey = publication.usersLiked.indexOf(req.body.userId) // la méthode indexOf() permet d'obtnir l'index de l'élément sur lequel nous sommes actuellement
                publication.usersLiked.splice(userKey, 1) // La méthode spilce() change le contenu d'un tableau en supprimant ou en ajoutant des éléments. Ici, nous supprimons le premier élément qui commence par "userKey"
            }
        })
        .catch((error) => res.status(500).json({ error: error }))
}
