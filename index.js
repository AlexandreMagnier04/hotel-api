import express from 'express';
import HelloRoutes from './routes/hello.routes.js';

const app = new express();
const port = 3000;

app.use(express.json());

const helloRouter = new HelloRoutes().router;
app.use("/hello", helloRouter);

app.listen(port, () => { console.log(`Server ON, listening on port ${port}`) });