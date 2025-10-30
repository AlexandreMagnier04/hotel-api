import express from 'express';
import AdminController from '../controllers/admin.controller.js';

export default class AdminRoutes {
    constructor() {
        this.router = new express.Router();
        this.adminController = new AdminController();

        this.router.get("/", this.adminController.getAllClients);
        this.router.get("/:id", this.adminController.getClientById);
        this.router.put("/:id", this.adminController.updateClient);
    }

}