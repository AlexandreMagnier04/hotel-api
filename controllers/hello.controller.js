import HelloService from "../services/hello.service.js";

export default class HelloController {
    constructor() {
        this.helloService = new HelloService();
    }

    getHello() {
        const helloMessage = this.helloService.getHelloMessage();
        return helloMessage;
    }
}