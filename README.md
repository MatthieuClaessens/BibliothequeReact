<h1 align="center">BiblioReact 📖</h1>

###

<p align="left">Cette application est une bibliothèque virtuelle développée avec React pour le front-end et JSON Server pour le back-end. Elle permet de consulter une liste de livres et de stocker les données dans un fichier JSON (db.json).</p>

###

<p align="left">Le projet est entièrement conteneurisé avec Docker, ce qui permet de lancer le frontend et le backend facilement sans installation locale de Node.js ou d’autres dépendances.</p>

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img height="200" src="https://i.ibb.co/wF7k0JMs/ca6-1.png" />
      </td>
      <td align="center" width="50%">
        <img height="200" src="https://i.ibb.co/pvWPHphN/ca4.png" />
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img height="200" src="https://i.ibb.co/n8KNYKgt/ca5.png" />
      </td>
      <td align="center" width="50%">
        <img height="200" src="https://i.ibb.co/6RdxQH7n/image.png" />
      </td>
    </tr>
  </table>
</div>

###

###

<h3 align="left">Arborescence</h3>

###

```bash
.
├── data/                  # Données persistantes
├── public/                 # Fichiers statiques
│   └── images/             # Images publiques
│       └── couvertures/    # Couvertures de livres
├── src/
│   ├── assets/             # Assets sources
│   ├── components/         # Composants React
│   └── pages/              # Pages de l'application
├── docker-compose.yml      # Configuration Docker Compose
├── package.json            # Dépendances du projet
└── README.md               # Documentation
```

###

<h3 align="left">Prérequis</h3>

###

<p align="left">- Docker installé<br>- Docker Compose (version récente)<br><br>Aucune installation de Node.js ou npm n’est nécessaire pour exécuter l’application.</p>

###

<h4 align="left">Lancer l’application</h4><p>Dans le terminal, à la racine du projet :</p><br>

```bash
docker compose up --build
```

<br>- Le frontend sera disponible sur : http://localhost:3000<br>- Le backend JSON Server sera disponible sur : http://localhost:3001/books</p>

### 
<h4 align="left">Option : utiliser l'image Docker exportée</h4>

<p align="left">
Si vous ne souhaitez pas reconstruire les conteneurs avec Docker Compose, vous pouvez utiliser l'image Docker pré-exportée fournie : <code>bibliotheque-react.tar</code>.
</p>

#### 

<h4>Charger l'image</h4>

```bash
docker load -i bibliotheque-react.tar
```

###

<h3 align="left">Explications techniques</h3>

###

<h3 align="left">Frontend</h3>

###

<p align="left">- Construit avec React.<br>- Utilise un multi-stage Dockerfile :<br>- Stage build : construit l’application React avec Node.js.<br>- Stage nginx : sert les fichiers statiques avec Nginx.<br>- Port exposé : 80 dans le conteneur → mappé sur 3000 local.</p>

###

<h4 align="left">Backend</h4>

###

<p align="left">- JSON Server sert le fichier db.json comme API REST.<br>- Port exposé : 3001.<br>- Permet les opérations GET, POST, PUT, PATCH, DELETE sur /books.</p>

###

<h4 align="left">Docker Compose</h4>

###

<p align="left">- Orchestration des deux services : frontend et api.<br>- Le frontend dépend du backend pour s’assurer que le serveur JSON est lancé avant.</p>

###

<h4 align="left">Arrêter et nettoyer</h4>

###
```bash
docker compose down
```
<p align="left">Arrête les conteneurs et le réseau.<br><br>Les images restent présentes, mais peuvent être supprimées avec :</p><br>

```bash
docker image rm bibliothequereact-main-frontend
```

```bash
docker image rm bibliothequereact-main-api
```

###

<h4 align="left">Points forts</h4>

###

<p align="left">- Conteneurisation complète → facile à exécuter partout.<br>- Séparation front/back claire.<br>- JSON Server permet un backend léger pour prototypage rapide.</p>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
</div>

###
