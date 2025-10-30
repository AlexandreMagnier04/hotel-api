import AdminService from "../services/admin.service.js";

export default class AdminController {
    constructor() {
        this.adminService = new AdminService();
    }

    getAllClients = (req, res) => {
        try {
            const allClients = this.adminService.findAllClients();
            res.status(200).json(allClients);
        } catch (error) {
            console.error('Error in getAllClients controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
    getClientById = (req, res) => {
        try {
            const client = this.adminService.findClientById(parseInt(req.params.id));
            if (!client) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }
            res.status(200).json({message: 'Client found successfully:', client});
        }
        catch (error) {
            console.error(`Error in getClientById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
    
    updateClient = (req, res) => {
        try {
            const updatedClient = this.adminService.updateClient(parseInt(req.params.id), req.body);
            if (!updatedClient) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }
            res.status(200).json({ message: 'Client updated successfully:', client: updatedClient });
        } catch (error) {
            console.error(`Error in updateClient controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
        
    }
}