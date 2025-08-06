import express from "express";
import noteRoutes from '../../infraestructure/web/routes/note.routes'
import userRoutes from '../../infraestructure/web/routes/user.routes'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.use("/api/notes", noteRoutes)
app.use('/api/user', userRoutes)

export default app;