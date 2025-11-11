import UserService from "../services/user.service.js";

//Contrôleur pour les opérations utilisateurs

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }


    //Récupère les données de l'hôtel
    getDatasHotel = (req, res) => {
        try {
            // Récupère les données de l'hôtel depuis le service
            const datasHotel = this.userService.findDatasHotel();
            // Retourne les données avec un status 200
            res.status(200).json(datasHotel);
        } catch (error) {
            console.error('Error in getDatasHotel controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère toutes les chambres
    getAllRooms = (req, res) => {
        try {
            // Récupère toutes les chambres depuis le service
            const allRooms = this.userService.findAllRooms();
            // Retourne la liste des chambres
            res.status(200).json(allRooms);
        } catch (error) {
            console.error('Error in getAllRooms controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère une chambre par son ID
    getRoomById = (req, res) => {
        try {
            // Récupère la chambre par son ID depuis les paramètres de la requête
            const room = this.userService.findRoomById(parseInt(req.params.id));
            // Vérifie si la chambre existe
            if (!room) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Room not found'
                });
            }
            // Retourne la chambre trouvée
            res.status(200).json({ message: 'Room found successfully', room });
        } catch (error) {
            console.error(`Error in getRoomById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    //Récupère toutes les chambres disponibles
    getAvailableRooms = (req, res) => {
        try {
            // Récupère toutes les chambres disponibles
            const availableRooms = this.userService.findAvailableRooms();

            // Vérifie s'il y a des chambres disponibles
            if (!availableRooms) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'No available rooms found'
                });
            }

            // Retourne les chambres disponibles avec leur nombre
            res.status(200).json({
                message: 'Available rooms found successfully',
                count: availableRooms.length,
                availableRooms
            });
        } catch (error) {
            console.error('Error in getAvailableRooms controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }


    //Effectue une réservation de chambre
    getToBookRoom = (req, res) => {
        try {
            // Extrait les données du corps de la requête
            const { clientId, roomNumber } = req.body;

            // Valide la présence des champs requis
            if (!clientId || !roomNumber) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: `Missing required fields: ${!roomNumber ? 'roomNumber' : ''}${!roomNumber && !clientId ? ', ' : ''}${!clientId ? 'clientId' : ''}`
                });
            }

            // Tente de réserver la chambre
            const result = this.userService.toBookRoom(parseInt(roomNumber), clientId);

            // Vérifie si la chambre existe
            if (!result.room) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Room not found'
                });
            }

            // Vérifie si le client existe
            if (!result.client) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }

            // Vérifie si la chambre est déjà occupée
            if (result.occupied) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'Room is already booked'
                });
            }

            // Retourne la réservation créée avec succès
            res.status(201).json({
                message: 'Room booked successfully',
                booking: result.booking
            });
        } catch (error) {
            console.error('Error in getToBookRoom controller:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }


    //Annule une réservation par son ID
    getCancelBookingById = (req, res) => {
        try {
            // Récupère l'ID de la réservation depuis les paramètres
            const bookingId = parseInt(req.params.id);

            // Annule la réservation
            const cancelBooking = this.userService.cancelBookingById(bookingId);
            // Vérifie si la réservation existe
            if (!cancelBooking) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Booking not found'
                });
            }
            // Retourne la réservation annulée
            res.status(200).json({ message: 'Booking canceled successfully:', booking: cancelBooking });
        } catch (error) {
            console.error(`Error in deleteBookingById controller (id: ${req.params.id}):`, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
}
