# Groupomania

Bienvenue sur Groupomania Social Network

## Description

Stack utilisé : Node js et un serveur express pour l'API' / Vue js 3 pour le Front End

1. Pour utiliser correctement l'api , veuillez clonez ce repository

# GROUPOMANIA - front (vue 3)

## Installation

Depuis le dossier front : lancer le terminal et lancer le projet, taper la commande suivante `npm install`

## Acceder au serveur (http://localhost:8080/)

Depuis le dossier front : lancer le terminal et accéder au server, taper la commande suivante `npm run serve`

# GROUPOMANIA - api (node js)

## Installer Node

Depuis le dossier api, installer node (si besoin), taper la commande suivante `npm install -g npm`

## Lancer l'api

Dans le dossier api, lancer le terminal et démarrer l'api, taper la commande suivante `npm start`

## Base de données

La base de donnée utliser est mongoo db avec compass pour une utilisation local, pour lancer votre base donnée :

1. Dans le terminal taper ```mongosh````
2. Lancer mongoo compass et connecter vous au serveur indiquer dans le terminal
3. Dans votre dossier api, allez sur le fichier app.js et vérifier que le localhost de mongoo.connect sois le même que sur votre BDD et que le nom de la BDD aussi

# Utilisation

Pour s'inscrire sur le social network de Groupomania, il vous faut renseigner :

1. Un pseudo
2. Une adresse mail valide
3. Un mot de passe

Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

1. Une description + une image

Ces publications peuvent être likées, commentées, modifiées, supprimées. Le modérateur peut les modifier et les supprimer.
