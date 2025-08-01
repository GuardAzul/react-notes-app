import { sequelize } from '../../config/database';
import { DataTypes, Model, Optional } from "sequelize";

export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface UserCreateAttribute extends Optional<UserAttributes, 'id'> { }

export interface UserInstance extends Model<UserAttributes, UserCreateAttribute>, UserAttributes { }

export const SequelizeUserModel = sequelize.define<UserInstance>(
    'SequelizeUserModel',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "user",
        timestamps: false
    }
);
