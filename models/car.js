import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize.js';

class Car extends Model {}

Car.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        engine: {
            type: DataTypes.ENUM('on', 'off'),
            allowNull: false,
            defaultValue: 'off',
        },
        doors: {
            type: DataTypes.ENUM('locked', 'unlocked'),
            allowNull: false,
            defaultValue: 'locked',
        },
        trunk: {
            type: DataTypes.ENUM('open', 'close'),
            allowNull: false,
            defaultValue: 'close',
        },
        lights: {
            type: DataTypes.ENUM('on', 'off'),
            allowNull: false,
            defaultValue: 'off',
        },
        engineWarmUpTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0, // Начальное время прогрева
            comment: 'Время прогрева двигателя в секундах',
        },
        lightsDuration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Время работы фар в секундах',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'car',
        modelName: 'Car',
        sequelize,
        timestamps: true,
    }
);

export default Car;
