import {
    Car,
} from '../../../models/index.js';
class DoorController {
    static async post(req, res, next) {
        try {
            const { action } = req.body;

            // Проверка переданных данных
            if (!['lock', 'unlock'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action. Use "lock" or "unlock".' });
            }

            // Получение автомобиля из базы данных (предположим, один автомобиль)
            let car = await Car.findByPk(1); // Здесь 1 - это id автомобиля, замените при необходимости

            if (!car) {
                if (!car) {
                    car = await Car.create({
                        engine: 'off',
                        doors: 'locked',
                        trunk: 'close',
                        lights: 'off',
                    });
                }
            }

            // Обновление состояния дверей
            const updatedDoorState = action === 'lock' ? 'locked' : 'unlocked';
            car.doors = updatedDoorState;

            // Сохраняем изменения в базе данных
            await car.save();

            res.status(200).json({
                message: `Doors ${updatedDoorState}.`,
                doors: car.doors,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

}

export default DoorController;
