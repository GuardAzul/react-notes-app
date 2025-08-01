import { SequelizeNoteModel } from "./SequelizeNoteModel";
import { SequelizeUserModel } from "./SequelizeUserModel";

// Relación: Un usuario tiene varias notas
SequelizeUserModel.hasMany(SequelizeNoteModel, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "notes"
})

// Relación inversa: Una nota solo pertenece a un usuario
SequelizeNoteModel.belongsTo(SequelizeUserModel, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user"
})

export {
    SequelizeUserModel,
    SequelizeNoteModel
}



