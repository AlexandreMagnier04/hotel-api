import FileHelper from "../utils/fileHelper.js";


// Service User - Contient la logique métier pour les utilisateurs

export default class UserService {

    constructor() {
        // Initialisation du helper pour la lecture/écriture des fichiers JSON
        this.helper = new FileHelper();
    }


    //Récupère les informations générales de l'hôtel
    findDatasHotel() {
        const data = this.helper.readDatas();
        if (!data) {
            return [];
        }
        return data.hotelInfo;
    }


    //Récupère toutes les chambres de l'hôtel
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


    //Récupère uniquement les chambres disponibles (non réservées)
    findAvailableRooms() {
        const datas = this.helper.readDatas();
        if (!datas) {
            return [];
        }

        // Si aucune réservation n'existe, toutes les chambres sont disponibles
        if (!datas.bookings) {
            return datas.hotelRooms;
        }

        // Extraction des IDs des chambres déjà réservées
        const unavailableRoomIds = datas.bookings.map(booking => booking.roomId);

        // Filtrage pour ne garder que les chambres non réservées
        const availableRooms = datas.hotelRooms.filter(room => !unavailableRoomIds.includes(room.id));

        return availableRooms;
    }


    //Permet à un client de réserver une chambre par son numéro
    toBookRoom(roomNumber, clientId) {
        {
            const datas = this.helper.readDatas();

            // Vérification de l'existence de la chambre par son numéro
            const room = datas.hotelRooms.find(room => room.number === roomNumber);
            // Vérification de l'existence du client
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
                booking => booking.roomId === room.id
            );

            if (existingBooking) {
                return { room, client, occupied: true };
            }

            // Initialisation du tableau bookings s'il n'existe pas
            if (!datas.bookings) {
                datas.bookings = [];
            }

            // Génération d'un ID unique pour la nouvelle réservation
            const newBookingId = datas.bookings.length > 0
                ? Math.max(...datas.bookings.map(b => b.id)) + 1
                : 1;

            // Création de l'objet réservation avec toutes les informations
            const newBooking = {
                id: newBookingId,
                clientId: clientId,
                clientName: client.name,
                clientEmail: client.email,
                roomId: room.id,
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
    }

    
    //Annule une réservation par son ID
    cancelBookingById(bookingId) {
        const datas = this.helper.readDatas();

        // Recherche de la réservation à annuler
        const data = datas.bookings.find(booking => booking.id === bookingId);
        if (!data) {
            return null;
        }

        // Suppression de la réservation du tableau
        const cancelBooking = datas.bookings.splice(data, 1)[0];
        // Sauvegarde des modifications
        this.helper.writeDatas(datas);

        return cancelBooking;
    }
}
