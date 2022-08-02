const express = require('express');
const mongoose = require('mongoose');

const app = express(); // Permet de créer une application express

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
});

app.use(express.json()); // Intercepte toutes les requêtes qui contiennent du json et mettent à disposition le contenu sur l'objet requête dans req.body

// Empêcher les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
});


module.exports = app; // Exportation de la const "app" pour y acceder depuis les autres fichiers du projet