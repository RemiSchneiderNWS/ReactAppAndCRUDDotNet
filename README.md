# ReactAppAndCRUDDotNet
simple app react with EF CORE CRUD protected

Le but de se projet est de fournir une base pour permmettre de créer des applications web avec Api 
Cette base permet d'avoir une API avec un exemple simple de CRUD 
Une application Réact lié à l'API affichant les manipulations de l'API
à noté qu'un system de connexion avec session est mit en place coté Réact et Dot net, ce qui permet d'avoir une api avec des routes sécurisé
la base de données est sur un sql server.

Pour utiliser cette base  suivez les etapes suivantes:

1 : instantiez votre base de données grace à la migration
modifiez l'adresse de la base dans le fichier appsetting.json
puis excuté la commande "dotnet ef database update"

2 : vous pouvez start l'api DOT NET

3 : utilisez la commande "npm i" dans le dossier simpleapp

4 : utilisez la commande "npm start"

5 : il vous reste plus qu'à vous connecter sur l'addresse "http://localhost:3000/"

