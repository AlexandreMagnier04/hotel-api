import express from 'express';
import UserController from '../controllers/user.controller.js';

export default class UserRoutes {
    constructor() {
        this.router = new express.Router();
        this.userController = new UserController();

    }
}