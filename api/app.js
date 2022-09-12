const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const publicationRoutes = require('./routes/publication')
const path = require('path') // Le module path fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const helmet = require('helmet') // Helmet aide à protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
const mongoSanitize = require('express-mongo-sanitize')

const app = express() // Permet de créer une application express

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('connecté à Mongoose')
})

app.use(express.json()) // Intercepte toutes les requêtes qui contiennent du json et mettent à disposition le contenu sur l'objet requête dans req.body

// Empêcher les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // Permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    ) // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next()
})

app.use('/images', express.static(path.join(__dirname, 'images'))) // Cela indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images .

app.use('/api/auth', userRoutes)
app.use('/api/publication', publicationRoutes) // Le début de la route est défini juste ici

app.use(helmet())
app.use(mongoSanitize())

module.exports = app // Exportation de la const "app" pour y acceder depuis les autres fichiers du projet
