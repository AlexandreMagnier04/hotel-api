import fs from 'fs';

// Classe  pour la gestion des fichiers JSON
export default class FileHelper {

    constructor() {
        this.hotelFile = './datas/hotel.json';
        this.clientsFile = './datas/clients.json';
        this.bookingsFile = './datas/bookings.json';
    }

    //Lit et retourne les données des fichiers JSON
    readDatas() {
        const clientsData = fs.readFileSync(this.clientsFile, 'utf-8'); // Lire clients.json
        const hotelData = fs.readFileSync(this.hotelFile, 'utf-8'); // Lire hotel.json
        const bookingsData = fs.readFileSync(this.bookingsFile, 'utf-8'); // Lire bookings.json

        const hotelParsed = JSON.parse(hotelData); // Parser hotel.json

        // Retourner un objet avec toutes les données
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

    //Écrit les données dans les fichiers JSON
    writeDatas(datas) {
        // Lire les données existantes
        const existingData = this.readDatas();

        // Fusionner : garder l'ancien si le nouveau est undefined
        const clientsToWrite = datas.clients !== undefined ? datas.clients : existingData.clients;
        const hotelRoomsToWrite = datas.hotelRooms !== undefined ? datas.hotelRooms : existingData.hotelRooms;
        const bookingsToWrite = datas.bookings !== undefined ? datas.bookings : existingData.bookings;

        // Écrire clients.json
        fs.writeFileSync(
            this.clientsFile,
            JSON.stringify({ clients: clientsToWrite }, null, 2),
            'utf-8'
        );

        // Écrire hotel.json EN GARDANT la structure complète
        const hotelFileData = JSON.parse(fs.readFileSync(this.hotelFile, 'utf-8'));
        hotelFileData.rooms = hotelRoomsToWrite;

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

        // Écrire bookings.json
        fs.writeFileSync(
            this.bookingsFile,
            JSON.stringify({ bookings: bookingsToWrite }, null, 2),
            'utf-8'
        );
    }
}