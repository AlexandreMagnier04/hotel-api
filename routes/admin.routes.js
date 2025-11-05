import express from 'express';
import AdminController from '../controllers/admin.controller.js';

export default class AdminRoutes {
    constructor() {
        this.router = new express.Router();
        this.adminController = new AdminController();

    // ============== Routes clients ==============
        this.router.get("/clients", this.adminController.getAllClients);
        this.router.get("/clients/:id", this.adminController.getClientById);
        this.router.put("/clients/:id", this.adminController.getUpdateClient);
        this.router.post("/clients", this.adminController.getCreateClient);
        
    // ============== Routes rooms =================== 
        this.router.get("/rooms", this.adminController.getAllRooms);
        this.router.get("/rooms/:id", this.adminController.getRoomById);
        
    // ============== Routes bookings ===================
        this.router.get("/bookings", this.adminController.getAllBookings);
        this.router.get("/bookings/:id", this.adminController.getBookingById);
        this.router.post("/bookings", this.adminController.getCreateBookingClient);
        this.router.delete("/bookings/:id", this.adminController.getDeleteBookingById);
    }
}