import FileHelper from "../utils/fileHelper.js";

export default class AdminService {

    constructor() {
        this.helper = new FileHelper();
    }

    findAllClients() {
        const data = this.helper.readDatas();

        if (!data) {
            return [];
        }
        return data.clients;
    }

    findClientById(id) {
        const datas = this.helper.readDatas();
        const data = datas.clients.find(client => client.id === id);
        if (!data) {
            return null;
        }
        return data;
    }

    updateClient(id, { name, email, phone }) {
        const datas = this.helper.readDatas();
        const data = datas.clients.find(client => client.id === id);
        if (!data) {
            return null;
        }
        data.name = name;
        data.email = email;
        data.phone = phone;
        this.helper.writeDatas(datas);
        return data;
    }

    createClient({ name, email, phone }) {
        const datas = this.helper.readDatas();
        if (!datas) {
            return [];
        };
        const newData = {
            id: datas.clients.length + 1,
            name: name,
            email: email,
            phone: phone
        };
        datas.clients.push(newData);
        this.helper.writeDatas(datas);
        return newData;
    }

    findAllRooms() {
        const data = this.helper.readDatas(); // Debug: voir le contenu
        if (!data) {
            return [];
        }
        return data.hotelRooms;
    }

    findRoomById(id) {
        const datas = this.helper.readDatas();
        const data = datas.hotelRooms.find(room => room.id === id);
        if (!data) {
            return null;
        }
        return data;
    }

    findAllBookings() {
        const datas = this.helper.readDatas();
        if (!datas) {
            return [];
        }
        return datas.bookings;
    }

    findBookingById(id) {
        const datas = this.helper.readDatas();
        const data = datas.bookings.find(booking => booking.id === id);
        if (!data) {
            return null;
        }
        return data;
    }

    createBookingClient(roomId, clientId) {
        const datas = this.helper.readDatas();
        // Vérifier que la chambre existe
        const room = datas.hotelRooms.find(room => room.id === roomId);
        // Vérifier que le client existe
        const client = datas.clients.find(client => client.id === clientId);
        // Cas 1: Chambre introuvable
        if (!room) {
            return { room: null, client };
        }

        // Cas 2: Client introuvable
        if (!client) {
            return { room, client: null };
        }
        
        // ✅ Cas 3: Vérifier si la chambre est déjà réservée dans bookings
        const existingBooking = datas.bookings?.find(
            booking => booking.roomId === roomId
        );

        if (existingBooking) {
            return { room, client, occupied: true };
        }

        // ✅ AJOUTER une réservation dans bookings.json
        if (!datas.bookings) {
            datas.bookings = [];
        }

        const newBookingId = datas.bookings.length > 0
            ? Math.max(...datas.bookings.map(b => b.id)) + 1
            : 1;

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

        datas.bookings.push(newBooking);

        // ✅ Écrire TOUT (clients, hotelRooms avec assignation, bookings)
        this.helper.writeDatas(datas);

        return { room, client, booking: newBooking, occupied: false };
    }

    deleteBookingById(id) {
        const datas = this.helper.readDatas();

        const data = datas.bookings.find(b => b.id === id);
        if (!data === -1) return null;

        const deletedBooking = datas.bookings.splice(data, 1)[0];
        this.helper.writeDatas(datas); // ✅ CORRECTION

        return deletedBooking;
    }
}
