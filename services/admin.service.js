import FileHelper from "../utils/fileHelper.js";

export default class AdminService {

    constructor() {
        this.helper = new FileHelper();
    }

    findAllClients() {
        const data = this.helper.readDatas();
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
}