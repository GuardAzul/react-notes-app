import express from "express";
import noteRoutes from '../../infraestructure/web/routes/note.routes'
import userRoutes from '../../infraestructure/web/routes/user.routes'
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser())

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.use("/api/notes", noteRoutes)
app.use('/api/user', userRoutes)

export default app;