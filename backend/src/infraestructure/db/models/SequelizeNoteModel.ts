import { sequelize } from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";

export interface NoteAttributes {
    id?: number;
    title: string;
    content: string;
    userId: number;
}

export interface NoteCreationAttribute extends Optional<NoteAttributes, 'id'> { }

export interface NoteInstance extends Model<NoteAttributes, NoteCreationAttribute>, NoteAttributes { }

export const SequelizeNoteModel = sequelize.define<NoteInstance>(
    'SequelizeNoteModel',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id"
        }
    },
    {
        tableName: "notes",
        timestamps: false
    }
)