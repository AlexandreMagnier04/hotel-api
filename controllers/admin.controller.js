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

    getUpdateClient = (req, res) => {
        try {
            const updateClient = this.adminService.updateClient(parseInt(req.params.id), req.body);
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

    getCreateClient = (req, res) => {
        try {
            const { name, email, phone } = req.body;

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

    getAllRooms = (req, res) => {
        try {
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

    getRoomById = (req, res) => {
        try {
            const room = this.adminService.findRoomById(parseInt(req.params.id));
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
    
    getAllBookings = (req, res) => {
        try {
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

    getBookingById = (req, res) => {
        try {
            const booking = this.adminService.findBookingById(parseInt(req.params.id));
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

    getCreateBookingClient = (req, res) => {
        try {
            const { roomId, clientId } = req.body;

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

            // ✅ Gestion des erreurs dans le contrôleur
            if (!result.room) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Room not found'
                });
            }

            if (!result.client) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Client not found'
                });
            }

            if (result.occupied) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'Room is already occupied'
                });
            }

            // ✅ Succès
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
    getDeleteBookingById = (req, res) => {
        try {
            const bookingId = parseInt(req.params.id);

            const deleteBooking = this.adminService.deleteBookingById(bookingId);
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