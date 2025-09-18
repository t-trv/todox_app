import cors from 'cors';
import express from 'express';
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json())


// middle ware
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/tasks", taskRoute);


// Kết nối tới database trước rồi mới chạy server ở cổng 3001
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running...", {PORT})
    })
})