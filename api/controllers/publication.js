const Publication = require('../models/publication')
const User = require('../models/user')
const fs = require('fs') // modules nodeJS permet de créer et gérer des fichiers

exports.createPublication = (req, res, next) => {
    if (req.body.publication === null && req.file === undefined) {
        return res.status(400).json({ error: new Error('Publication non valide') })
    } else {
        const publicationObject = JSON.parse(req.body.publication) // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON. Le corps de la requête contient une chaîne , qui est simplement un objet converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
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
}

exports.getAllPublication = (req, res, next) => {
    Publication.find()
        .then((publications) => {
            return res.status(200).json(publications)
        })
        .catch((error) => res.status(404).json({ error: error }))
}

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file // Dans cette version modifiée de la fonction, on crée un objet publicationObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance publication à partir de publicationeObject , puis on effectue la modification.
        ? {
              ...JSON.parse(req.body.publication), // JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
        : { ...JSON.parse(req.body.publication) }
    Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Publication modifié avec succés' }))
        .catch((error) => res.status(400).json({ error: error }))
}

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id }) // On trouve l'objet dans la BDD
        .then((publication) => {
            if (!publication) {
                return res.status(404).json({ error: new Error('Erreur') })
            }

            User.findOne({ _id: req.auth.userId })
                .then((user) => {
                    if (!user) {
                        console.log("L'utilisateur n'existe pas")
                        return res.status(404).json({ error: 'Utilsateur non trouvé' })
                    }

                    // Si l'user est le propriétaire de la publication ou s'il est admin, on supprime la publication
                    if (publication.userId === req.auth.userId || user.admin === true) {
                        // On delete la publication ...
                        Publication.deleteOne({ _id: req.params.id })
                            .then(() => {
                                // ... si elle est bien effacée, on tente de supprimer l'image
                                const filename = publication.imageUrl.split('/images/')[1] // Une fois trouvé, on extrait le nom du fichier à supprimer

                                fs.unlink(`images/${filename}`, (err) => {
                                    if (err) {
                                        return res.status(500).json({ error: err })
                                    }
                                    return res
                                        .status(200)
                                        .json({ message: 'Publication supprimée !' })
                                })
                            })
                            .catch((error) => res.status(404).json({ error }))
                    } else {
                        return res.status(403).send('unauthorized request')
                    }
                })
                .catch((error) => console.log('raté'))
        })
        .catch((error) => res.status(404).json({ error }))
}

exports.likes = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then((publication) => {
            //like pour la premier fois
            if (!publication.usersLiked.includes(req.body.userId)) {
                // fonction inverse "!" si l'userId à déja like false sinon true , utilisation de la méthode includes qui permet de déterminer si un tableau contient une valeur et renvoie true si c'est le cas, false sinon
                publication.likes += 1
                publication.usersLiked.push(req.body.userId)
                // annuler un like
            } else if (publication.usersLiked.includes(req.body.userId)) {
                publication.likes -= 1
                let userKey = publication.usersLiked.indexOf(req.body.userId) // la méthode indexOf() permet d'obtnir l'index de l'élément sur lequel nous sommes actuellement
                publication.usersLiked.splice(userKey, 1) // La méthode spilce() change le contenu d'un tableau en supprimant ou en ajoutant des éléments. Ici, nous supprimons le premier élément qui commence par "userKey"
            }
            // on update la publi
            Publication.updateOne(
                { _id: req.params.id },
                {
                    likes: publication.likes,
                    usersLiked: publication.usersLiked
                }
            )
                // La méthode updateOne() permet de mettre à jour un un document MongoDB qui satifait les conditions ( filter, update, option)
                .then(() => res.status(200).json({ message: 'Like updated successfully!' }))
                .catch((error) => res.status(400).json({ error: error }))
        })
        .catch((error) => res.status(500).json({ error: error }))
}
