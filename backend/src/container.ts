import { CreateNote } from "./application/use-cases/CreateNote";
import { GetNoteById } from "./application/use-cases/GetNoteById";
import { GetNotesByUserId } from "./application/use-cases/GetNotesByUserId";
import { Login } from "./application/use-cases/Login";
import { GetUserById } from "./application/use-cases/GetUserById";
import { SaveUser } from "./application/use-cases/SaveUser";
import { SequelizeNoteRepository } from "./infraestructure/db/SequelizeNoteRepository";
import { SequelizeUserRepository } from "./infraestructure/db/SequelizeUserRepository";
import { NoteController } from "./infraestructure/web/controllers/NoteController";
import { UserController } from "./infraestructure/web/controllers/UserController";
import { DeleteNote } from "./application/use-cases/DeleteNote";

// Repositorries
const userRepository = new SequelizeUserRepository();
const noteRepository = new SequelizeNoteRepository();

// services


// uses-cases
const saveUser = new SaveUser(userRepository);
const getUserById = new GetUserById(userRepository);
const getUserByEmail = new Login(userRepository);

const createNote = new CreateNote(noteRepository);
const getNoteById = new GetNoteById(noteRepository);
const getNotesByUserId = new GetNotesByUserId(noteRepository);
const deleteNote = new DeleteNote(noteRepository);

// controllers
const noteController = new NoteController(createNote, getNoteById, getNotesByUserId, deleteNote);
const userController = new UserController(saveUser, getUserById, getUserByEmail);

export {
    userController,
    noteController 
}