import fs from 'fs';

export default class FileHelper {

    constructor() {
        this.hotelFile = './datas/hotel.json';
        this.clientsFile = './datas/clients.json';
        this.bookingsFile = './datas/bookings.json';
    }

    readDatas() {
        const clientsData = fs.readFileSync(this.clientsFile, 'utf-8');
        const hotelData = fs.readFileSync(this.hotelFile, 'utf-8');
        const bookingsData = fs.readFileSync(this.bookingsFile, 'utf-8');

        const hotelParsed = JSON.parse(hotelData);

        return {
            clients: JSON.parse(clientsData).clients || [],
            hotelRooms: hotelParsed.rooms || [],
            hotelInfo: {
                name: hotelParsed.name || '',
                location: hotelParsed.location || {},
                contact: hotelParsed.contact || {},
                facilities: hotelParsed.facilities || []
            },
            bookings: JSON.parse(bookingsData).bookings || []
        };
    }

    writeDatas(datas) {
        // ✅ Lire les données existantes
        const existingData = this.readDatas();

        // ✅ Fusionner : garder l'ancien si le nouveau est undefined
        const clientsToWrite = datas.clients !== undefined ? datas.clients : existingData.clients;
        const hotelRoomsToWrite = datas.hotelRooms !== undefined ? datas.hotelRooms : existingData.hotelRooms;
        const bookingsToWrite = datas.bookings !== undefined ? datas.bookings : existingData.bookings;

        // ✅ Écrire clients.json
        fs.writeFileSync(
            this.clientsFile,
            JSON.stringify({ clients: clientsToWrite }, null, 2),
            'utf-8'
        );

        // ✅ Écrire hotel.json EN GARDANT la structure complète
        const hotelFileData = JSON.parse(fs.readFileSync(this.hotelFile, 'utf-8'));
        hotelFileData.rooms = hotelRoomsToWrite; // ✅ CORRECTION ICI (ligne 48)

        // Mettre à jour hotelInfo si fourni
        if (datas.hotelInfo !== undefined) {
            if (datas.hotelInfo.name) hotelFileData.name = datas.hotelInfo.name;
            if (datas.hotelInfo.location) hotelFileData.location = datas.hotelInfo.location;
            if (datas.hotelInfo.contact) hotelFileData.contact = datas.hotelInfo.contact;
            if (datas.hotelInfo.facilities) hotelFileData.facilities = datas.hotelInfo.facilities;
        }

        fs.writeFileSync(
            this.hotelFile,
            JSON.stringify(hotelFileData, null, 2),
            'utf-8'
        );

        // ✅ Écrire bookings.json
        fs.writeFileSync(
            this.bookingsFile,
            JSON.stringify({ bookings: bookingsToWrite }, null, 2),
            'utf-8'
        );
    }
}