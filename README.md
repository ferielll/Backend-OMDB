# Backend-OMDB
## Comment il est construit ?
### Node.js avec TypeScript
Voici les étapes pour la construction de ce projet Node.js avec TypeScript :

1/ Tout d'abord, j'ai installe Node.js 

2/Installer TypeScript : TypeScript est un sur-ensemble de JavaScript qui permet de typage statique. je l'ai installe via npm en utilisant la commande suivante :
```
npm install -g typescript
```
3/Initialiser le projet : je l'ai initialise en utilisant la commande  ``` npm init ``` dans le répertoire racine du projet.
Cela créera un fichier package.json contenant les dépendances du projet.

4/Configuration de TypeScript : j'ai Crée un fichier tsconfig.json dans le répertoire racine du projet et j'ai définisse les paramètres appropriés pour le projet.
### Expressjs
J'ai utilise Express.js qui est un framework web populaire pour Node.js. Il permet de créer facilement des applications web en utilisant Node.js et offre de nombreuses fonctionnalités utiles pour la gestion des routes, la manipulation de fichiers, l'authentification, la gestion des sessions et plus encore. 
Voici les étapes pour utiliser Express.js :

1/ Installer Express.js  en utilisant la commande suivante :
```
npm install express
```
2/ Importer les dépendances nécessaires 

3/ Configurer l'application Express.js en créant une instance de l'application et en définissant les routes et les middlewares.
### Nodemon 
J'ai utilise Nodemon qui est un outil de ligne de commande qui permet de surveiller les fichiers d'un projet Node.js et de redémarrer automatiquement le serveur lorsqu'un changement est détecté.
Pour installer Nodemon, tapez la commande suivante :
```
npm install -g nodemon
```
### InversifyJS 
J'ai utilise aussi InversifyJS qui est un conteneur d'injection de dépendances pour JavaScript / TypeScript. Il permet de gérer facilement les dépendances de l'application et de les injecter dans les classes qui en ont besoin. Voici quelques étapes pour manipuler InversifyJS :

1/ Installer InversifyJS : en utilisant la commande suivante : 
```
npm install inversify reflect-metadata --save
```
2/ Importer les dépendances nécessaires dans le fichier TypeScript 

3/ Décorer les classes avec les annotations appropriées pour indiquer leurs dépendances et comment elles doivent être injectées en utilisant les annotations `@injectable` et `@inject` pour cela.
### OMDB API 
A propos OMDB (Open Movie Database) qui est une API publique qui fournit des informations sur les films et les séries télévisées. L'API est gratuite et offre un accès complet aux données de l'OMDB. 

Pour utiliser l'API OMDB, voici les étapes à suivre :

1/ Obtenir une clé API : Pour utiliser l'API OMDB,j'ai obtenu une une clé API gratuite en vous inscrivant sur le site web de l'OMDB.

2/ Installer la bibliothèque Axios : Axios est une bibliothèque JavaScript qui permet d'effectuer des requêtes HTTP. Pour utiliser l'API OMDB, j'ai installe la bibliothèque Axios en utilisant la commande suivante :
```
npm install axios
```
3/ Effectuer une requête à l'API OMDB : j'ai utilise Axios pour effectuer des requêtes à l'API OMDB. Par exemple, pour rechercher des informations sur un film, j'ai utilise la méthode get() d'Axios pour effectuer une requête GET. //code
### GoogleAPI 
J'ai utilise GoogleAPI intégrer google drive et google sheet ensemble avec l'app Backend OMDB en utilisant OAuth 2.0 qui est un protocole d'autorisation qui permet aux utilisateurs de donner accès à des applications tierces à leurs données stockées sur des services en ligne, tels que Google.
## Comment faire fonctionner le projet ?
* lancer le serveur en tapant la commande suivante : ``` npm run dev ```
* Recuperer la liste des films "Fast & Furious" en utilisant ce url : ``` localhost:5000/movies/films ```
* Récupérer la liste des films "Pirates des caraïbes" et qui va les stocker dans un Google Spreadsheet en ligne en utilisant ce url: ``` localhost:5000/movies/generateUrl ```
## Comment tu envisages la partie hébergement ?
### L'émergence du DevOps
* Le DevOps est un ensemble de pratiques qui permet d'associer développement et opérations.
Avec un besoin de mises à jour fréquentes pour rester innovant, le modèle traditionnel du développement d'applications avec des mises à jour espacées de plusieurs mois ou même années n'est plus possible.
Pour pouvoir mettre en production régulièrement, être agile n'est qu'une partie de l'équation. Le DevOps est là pour accélérer le processus grâce à une meilleure synergie entre les développeurs, les testeurs, les chefs de projets et les clients.
Cela passe par l'utilisation d'outils pour le contrôle du code, l'exécution des tests automatisés à chaque changement de code, le monitoring, l'automatisation de la gestion de l'infrastructure, etc.

## Comment tu vois une éventuelle montée en charge du système ?
Une montée en charge du système peut survenir lorsque le nombre d'utilisateurs ou de requêtes augmente de manière significative, ce qui peut impacter les performances de l'application. 
Voici quelques éléments à prendre en compte pour gérer une telle situation :

* Scalabilité : Il est important de concevoir le système en anticipant une éventuelle montée en charge. Cela peut être réalisé en optant pour une architecture modulaire et en utilisant des technologies qui permettent de gérer la charge de manière flexible, telles que des conteneurs ou des microservices. Cette approche permet d'ajouter facilement des ressources en fonction des besoins.

* Tests de charge : Il est également important de tester régulièrement l'application en simulant une charge importante. Cela permet de détecter les éventuels problèmes de performance et d'optimiser l'application en conséquence.

* Répartition de la charge : Si une seule machine ne peut pas gérer la charge, il est possible de répartir la charge sur plusieurs serveurs. Cela peut être réalisé en utilisant un système de répartition de charge qui distribue les requêtes entre plusieurs serveurs en fonction de la charge.
## Les forces , Les faiblesses et NEXT STEPS pour la mise en prod
### Les forces
+ Typage statique : TypeScript permet de détecter les erreurs de typage statique avant l'exécution du code, ce qui peut réduire le nombre d'erreurs de codage et faciliter le débogage.

+ Meilleure compatibilité : TypeScript est compatible avec les bibliothèques et les frameworks JavaScript existants, ce qui facilite l'intégration avec des projets existants.

+ Organisation du code : InversifyJS facilite l'organisation de votre code en encourageant une séparation claire des responsabilités. Il vous permet de définir des classes de services et de les enregistrer dans un conteneur IoC, ce qui rend le code plus lisible et plus facile à maintenir.

+ Modularité : InversifyJS permet de découpler les différents modules de votre application, ce qui rend votre code plus modulaire et plus facile à maintenir.

+ Accès aux données : Les API Google permettent aux développeurs d'accéder aux données de Google, telles que les données des utilisateurs de Google Drive, Google Maps, YouTube et bien d'autres.

+ Sécurité : OAuth 2.0 est une norme de sécurité éprouvée qui permet aux utilisateurs de partager des données de manière sécurisée avec des applications tierces.
### Les faiblesses
- Besoin d'outils de compilation supplémentaires : TypeScript nécessite l'utilisation d'un compilateur TypeScript supplémentaire pour générer du code JavaScript qui peut être exécuté dans Node.js.

- Surcharge de performance : L'utilisation d'InversifyJS peut entraîner une surcharge de performance due à la nécessité de créer et de maintenir un conteneur IoC pour gérer les dépendances.

- Courbe d'apprentissage : L'apprentissage d'InversifyJS peut prendre du temps, car il nécessite une compréhension approfondie des principes de l'injection de dépendances et des conteneurs IoC.

- Sécurité : Les API Google peuvent être vulnérables aux attaques, en particulier si les développeurs ne mettent pas en place des mesures de sécurité appropriées.
### Les NEXT STEPS pour la mise en prod
Pour la mise en production d'une application web, voici quelques étapes à suivre :

- Déployer l'application sur un serveur : La première étape consiste à déployer l'application sur un serveur. Cela peut se faire via FTP, SSH ou d'autres moyens de transfert de fichiers.

- Configurer l'environnement de production : Il est important de configurer l'environnement de production pour que l'application fonctionne correctement. Cela peut inclure la configuration du serveur web, de la base de données, du pare-feu et d'autres paramètres de sécurité.

- Configurer un domaine : Il est important de configurer un nom de domaine pour l'application afin que les utilisateurs puissent y accéder facilement. Cela peut se faire via un registrar de domaine ou un service d'hébergement web.

- Mettre en place des sauvegardes : Il est essentiel de mettre en place un système de sauvegarde pour l'application afin de pouvoir récupérer les données en cas de problème.

- Tester l'application : Il est important de tester l'application en production pour s'assurer qu'elle fonctionne correctement et que les utilisateurs peuvent y accéder sans problème.

- Suivre les performances de l'application : Il est important de suivre les performances de l'application en production pour s'assurer qu'elle fonctionne de manière optimale et que les utilisateurs peuvent y accéder rapidement. Cela peut se faire via des outils de surveillance ou des services d'analyse de performance.
