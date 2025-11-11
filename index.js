import express from 'express';
import AdminRoutes from './routes/admin.routes.js';
import UserRoutes from './routes/user.routes.js';

const app = new express();
const port = 3000;

app.use(express.json());

const adminRouter = new AdminRoutes().router;
const userRouter = new UserRoutes().router;
app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(port, () => { console.log(`Server ON, listening on port ${port}`) });