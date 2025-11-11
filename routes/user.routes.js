import express from 'express';
import UserController from '../controllers/user.controller.js';

export default class UserRoutes {
    constructor() {
        this.router = new express.Router();
        this.userController = new UserController();
        // ============== Routes hotel ==============
        this.router.get('/hotel', this.userController.getDatasHotel);
        //  ============ Routes bookings ==============
        this.router.post('/bookings', this.userController.getToBookRoom);
        this.router.delete('/bookings/:id', this.userController.getCancelBookingById);
        // ============== Routes rooms ==============
        this.router.get('/rooms', this.userController.getAllRooms);
        this.router.get('/rooms/available', this.userController.getAvailableRooms);
        this.router.get('/rooms/:id', this.userController.getRoomById);
        
        
    }
}