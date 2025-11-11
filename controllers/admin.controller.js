import AdminService from "../services/admin.service.js";

//Contrôleur pour les opérations administrateurs 

export default class AdminController {
    constructor() {
        this.adminService = new AdminService();
    }

    //Récupère tous les clients
    //Route: GET /clients
    getAllClients = (req, res) => {
        try {
            // Appel au service pour récupérer la liste complète des clients
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

    //Récupère un client spécifique par son ID
    //Route: GET /clients/:id
    getClientById = (req, res) => {
        try {
            // Récupération de l'ID depuis les paramètres de l'URL et conversion en nombre
            const client = this.adminService.findClientById(parseInt(req.params.id));

            // Vérification si le client existe
            if (!client) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }
            res.status(200).json({ message: 'Client found successfully:', client });
        }
        catch (error) {
            console.error(`Error in getClientById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Met à jour les informations d'un client
    //Route: PUT /clients/:id
    getUpdateClient = (req, res) => {
        try {
            // Mise à jour du client avec les données du body
            const updateClient = this.adminService.updateClient(parseInt(req.params.id), req.body);

            // Vérification si le client existe
            if (!updateClient) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }
            res.status(200).json({ message: 'Client updated successfully:', client: updateClient });
        } catch (error) {
            console.error(`Error in updateClient controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Crée un nouveau client
    //Route: POST /clients
    getCreateClient = (req, res) => {
        try {
            // Extraction des données du body
            const { name, email, phone } = req.body;

            // Validation : vérification que tous les champs obligatoires sont présents
            if (!name || !email || !phone) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: `Missing required fields: ${!name ? 'name' : ''}${!name && !email ? ', ' : ''}${!email ? 'email' : ''}${(!name || !email) && !phone ? ', ' : ''}${!phone ? 'phone' : ''}`
                });
            }

            const createClient = this.adminService.createClient({ name, email, phone });
            res.status(201).json({ message: 'Client created successfully', client: createClient });

        } catch (error) {
            console.error('Error in createClient controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère toutes les chambres
    //Route: GET /rooms
    getAllRooms = (req, res) => {
        try {
            // Récupération de toutes les chambres
            const allRooms = this.adminService.findAllRooms();
            res.status(200).json(allRooms);

            if (!allRooms) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'No rooms found'
                });
            }
        } catch (error) {
            console.error('Error in getAllRooms controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère une chambre spécifique par son ID
    //Route: GET /rooms/:id
    getRoomById = (req, res) => {
        try {
            // Recherche de la chambre par ID
            const room = this.adminService.findRoomById(parseInt(req.params.id));

            // Vérification si la chambre existe
            if (!room) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Room not found'
                });
            }
            res.status(200).json({ message: 'Room found successfully', room });
        } catch (error) {
            console.error(`Error in getRoomById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère toutes les réservations
    //Route: GET /bookings
    getAllBookings = (req, res) => {
        try {
            // Récupération de toutes les réservations
            const allBookings = this.adminService.findAllBookings();
            res.status(200).json({ message: 'All bookings found successfully', bookings: allBookings });
        } catch (error) {
            console.error('Error in getAllBookings controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère une réservation spécifique par son ID
    //Route: GET /bookings/:id
    getBookingById = (req, res) => {
        try {
            // Recherche de la réservation par ID
            const booking = this.adminService.findBookingById(parseInt(req.params.id));

            // Vérification si la réservation existe
            if (!booking) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Booking not found'
                });
            }
            res.status(200).json({ message: 'Booking found successfully', booking });
        } catch (error) {
            console.error(`Error in getBookingById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Crée une réservation en assignant un client à une chambre
    //Route: POST /bookings
    getCreateBookingClient = (req, res) => {
        try {
            // Extraction des IDs de la chambre et du client
            const { roomId, clientId } = req.body;

            // Validation : vérification que les IDs sont présents
            if (!roomId || !clientId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: `Missing required fields: ${!roomId ? 'roomId' : ''}${!roomId && !clientId ? ', ' : ''}${!clientId ? 'clientId' : ''}`
                });
            }

            const result = this.adminService.createBookingClient(
                parseInt(roomId),
                parseInt(clientId)
            );

            // Gestion des différents cas d'erreur :

            // La chambre n'existe pas
            if (!result.room) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Room not found'
                });
            }

            // Le client n'existe pas
            if (!result.client) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }

            // La chambre est déjà occupée
            if (result.occupied) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'Room is already occupied'
                });
            }

            // Succès : réservation créée avec succès
            res.status(201).json({
                message: 'Client assigned to room successfully',
                booking: result.booking
            });

        } catch (error) {
            console.error('Error in createBookingClient controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    
    //Supprime une réservation par son ID
    //Route: DELETE /bookings/:id
    getDeleteBookingById = (req, res) => {
        try {
            // Récupération de l'ID de la réservation
            const bookingId = parseInt(req.params.id);

            const deleteBooking = this.adminService.deleteBookingById(bookingId);

            // Vérification si la réservation existe
            if (!deleteBooking) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Booking not found'
                });
            }
            res.status(200).json({ message: 'Booking deleted successfully:', booking: deleteBooking });
        } catch (error) {
            console.error(`Error in deleteBookingById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
}