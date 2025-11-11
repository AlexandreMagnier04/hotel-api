# Hotel API

API REST pour la gestion d'un hôtel permettant de gérer les chambres, les clients et les réservations.



L'API suit l'architecture suivante: 

- **Service** : Contient la logique métier.
- **Controller** : Gère les requêtes HTTP et les réponses.  
- **Routes** : Définit les routes de l'API.
- **FileHelper** : Gère la lecture et l'écriture des données dans les fichiers JSON.

## Installation

- Clonez le dépôt.
- Ne pas oublier d'installer les dépendances node_modules et la configuration du projet.
- Ajouter dans le projet les fichiers json dans datas/ : `clients.json`, `hotel.json`. `bookings.json` sera déjà présent mais vide, étant celui qui stockera les nouvelles réservations.


## Routes de l'API

### Admin

- `GET admin/clients` : Récupérer la liste des clients.
- `GET admin/clients/:id` : Récupérer les détails d'un client.
- `PUT admin/clients/:id` : Mettre à jour un client.
- `POST admin/clients` : Ajouter un nouveau client.
- `DELETE admin/clients/:id` : Supprimer un client.
- `GET admin/rooms` : Récupérer la liste des chambres.
- `GET admin/rooms/:id` : Récupérer les détails d'une chambre.
- `GET admin/bookings` : Récupérer la liste des réservations.
- `GET admin/bookings/:id` : Récupérer les détails d'une réservation.
- `POST admin/bookings` : Créer une nouvelle réservation.
- `DELETE admin/bookings/:id` : Annuler une réservation.

### User

- `GET user/hotel`: Récupérer les informations de l'hôtel.
- `GET user/rooms`: Récupérer la liste des chambres.
- `GET user/rooms/available`: Récupérer la liste des chambres disponibles.
- `GET user/rooms/:id`: Récupérer les détails d'une chambre.
- `POST user/bookings`: Créer une nouvelle réservation.
- `DELETE user/bookings/:id`: Annuler une réservation.

 
## Tests avec Postman

Pour tester l'API, vous pouvez utiliser Postman. 

