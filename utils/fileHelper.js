import fs from 'fs';

export default class FileHelper {

    constructor() {
        this.hotelFile = './datas/hotel.json';
        this.clientsFile = './datas/clients.json';
    }

    readDatas() {
        const clientsData = fs.readFileSync(this.clientsFile, 'utf-8');
        const hotelData = fs.readFileSync(this.hotelFile, 'utf-8');
        return {
            clients: JSON.parse(clientsData).clients || [],
            hotel: JSON.parse(hotelData).hotel || []
        };
    };
    writeDatas(datas) {
        fs.writeFileSync(this.clientsFile, JSON.stringify({ clients: datas.clients }, null, 2), 'utf-8');
        fs.writeFileSync(this.hotelFile, JSON.stringify({ hotel: datas.hotel }, null, 2), 'utf-8');
    }
}

