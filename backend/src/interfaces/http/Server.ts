import express from "express";
import noteRoutes from '../../infraestructure/web/routes/note.routes'
import userRoutes from '../../infraestructure/web/routes/user.routes'
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.use("/api/notes", noteRoutes)
app.use('/api/user', userRoutes)

export default app;