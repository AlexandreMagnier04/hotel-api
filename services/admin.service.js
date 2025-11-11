import FileHelper from "../utils/fileHelper.js";

//Service Admin - Contient la logique métier pour les administrateurs

export default class AdminService {

    constructor() {
        // Initialisation du helper pour la lecture/écriture des fichiers JSON
        this.helper = new FileHelper();
    }


    //Récupère tous les clients depuis le fichier de données
    findAllClients() {
        const data = this.helper.readDatas();

        // Si aucune donnée n'est trouvée, retourne un tableau vide
        if (!data) {
            return [];
        }
        return data.clients;
    }


    //Recherche un client spécifique par son ID
    findClientById(id) {
        const datas = this.helper.readDatas();
        // Recherche du client dans le tableau
        const data = datas.clients.find(client => client.id === id);
        if (!data) {
            return null;
        }
        return data;
    }



    //Met à jour les informations d'un client existant
    updateClient(id, { name, email, phone }) {
        const datas = this.helper.readDatas();
        // Recherche du client à modifier
        const data = datas.clients.find(client => client.id === id);
        if (!data) {
            return null;
        }
        // Mise à jour des propriétés
        data.name = name;
        data.email = email;
        data.phone = phone;
        // Sauvegarde des modifications dans le fichier
        this.helper.writeDatas(datas);
        return data;
    }


    //Créer un nouveau client
    createClient({ name, email, phone }) {
        const datas = this.helper.readDatas();
        if (!datas) {
            return [];
        }
        // Création du nouveau client avec un ID auto-incrémenté
        const newData = {
            id: datas.clients.length + 1,
            name: name,
            email: email,
            phone: phone
        };
        // Ajout du nouveau client au tableau
        datas.clients.push(newData);
        // Sauvegarde dans le fichier
        this.helper.writeDatas(datas);
        return newData;
    }


    //Récupère toutes les chambres de l'hôtels
    findAllRooms() {
        const data = this.helper.readDatas();
        if (!data) {
            return [];
        }
        return data.hotelRooms;
    }


    //Recherche une chambre spécifique par son ID
    findRoomById(id) {
        const datas = this.helper.readDatas();
        // Recherche de la chambre dans le tableau
        const data = datas.hotelRooms.find(room => room.id === id);
        if (!data) {
            return null;
        }
        return data;
    }


    //Récupère toutes les réservations
    findAllBookings() {
        const datas = this.helper.readDatas();
        if (!datas) {
            return [];
        }
        return datas.bookings;
    }


    //Recherche une réservation spécifique par son ID
    findBookingById(id) {
        const datas = this.helper.readDatas();
        // Recherche de la réservation dans le tableau
        const data = datas.bookings.find(booking => booking.id === id);
        if (!data) {
            return null;
        }
        return data;
    }


    //Créer une nouvelle réservation en assignant un client à une chambre
    createBookingClient(roomId, clientId) {
        const datas = this.helper.readDatas();

        // Vérification si la chambre existe
        const room = datas.hotelRooms.find(room => room.id === roomId);
        // Vérification si le client existe
        const client = datas.clients.find(client => client.id === clientId);

        // Cas 1: Chambre introuvable
        if (!room) {
            return { room: null, client };
        }

        // Cas 2: Client introuvable
        if (!client) {
            return { room, client: null };
        }

        // Cas 3: Vérification si la chambre est déjà réservée
        const existingBooking = datas.bookings?.find(
            booking => booking.roomId === roomId
        );

        if (existingBooking) {
            return { room, client, occupied: true };
        }

        // Initialisation du tableau bookings s'il n'existe pas
        if (!datas.bookings) {
            datas.bookings = [];
        }

        // Génération d'un ID pour la nouvelle réservation
        const newBookingId = datas.bookings.length > 0
            ? Math.max(...datas.bookings.map(b => b.id)) + 1
            : 1;

        // Création de la réservation avec toutes les informations
        const newBooking = {
            id: newBookingId,
            clientId: clientId,
            clientName: client.name,
            clientEmail: client.email,
            roomId: roomId,
            roomNumber: room.number,
            roomName: room.name,
            roomDescription: room.description,
            roomPrice: room.price,
            roomCapacity: room.capacity,
        };

        // Ajout de la nouvelle réservation au tableau
        datas.bookings.push(newBooking);

        // Sauvegarde de toutes les données (clients, chambres, réservations)
        this.helper.writeDatas(datas);

        return { room, client, booking: newBooking, occupied: false };
    }

    
    //Supprime une réservation par son ID
    deleteBookingById(bookingId) {
        const datas = this.helper.readDatas();

        // Recherche de la réservation à supprimer
        const data = datas.bookings.find(booking => booking.id === bookingId);
        if (!data) {
            return null;
        }

        // Suppression de la réservation du tableau
        const deletedBooking = datas.bookings.splice(data, 1)[0];
        // Sauvegarde des modifications
        this.helper.writeDatas(datas);

        return deletedBooking;
    }
}
