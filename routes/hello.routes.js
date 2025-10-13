import express from 'express';
import HelloController from '../controllers/hello.controller.js';

export default class HelloRoutes {
    constructor() {
        this.router = new express.Router();
        this.helloController = new HelloController();

        this.router.get("/", (req, res) => {
            console.log(req);
            const message = this.helloController.getHello();
            res.status(200).send(message);
        });

        this.router.delete("/", (req, res) => {
            console.log(req.query.filter);
            const message = this.helloController.getHello();
            res.status(200).send(message);
        });

        this.router.post("/", (req, res) => {
            console.log(req.body);
            res.status(200).send("OK");

        })





    }

}