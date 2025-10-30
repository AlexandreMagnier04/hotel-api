import express from 'express';
import AdminRoutes from './routes/admin.routes.js';

const app = new express();
const port = 3000;

app.use(express.json());

const adminRouter = new AdminRoutes().router;
app.use("/admin/clients", adminRouter);

app.listen(port, () => { console.log(`Server ON, listening on port ${port}`) });