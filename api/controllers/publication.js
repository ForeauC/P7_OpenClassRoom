const Publication = require('../models/publication');
const fs = require('fs'); // modules nodeJS permet de créer et gérer des fichiers
const { runInNewContext } = require('vm');
const publication = require('../models/publication');

exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication); // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON. Le corps de la requête contient une chaîne sauce , qui est simplement un objet Sauce converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.
    delete publicationObject._id; // On supprime le champ _id qui est généré automatiquement par la BDD (car ce ne sera pas le bon id)
    const publication = new Sauce ({ // Création d'une instance de sauce
        ...publicationObject,  // L'operateur spread "...", permet de copier les éléments du body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
    });
    publication.save() // Enregistre les infos dans la BDD
    .then(()=> res.status(201).json({ message : 'Publication bien enregistrée'}))
    .catch(error => {
        res.status(400).json({ error : error })});
};