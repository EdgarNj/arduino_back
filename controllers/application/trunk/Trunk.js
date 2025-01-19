import {
    Car,
} from '../../../models/index.js';

class TrunkController {
    static async post(req, res, next) {
        try {
            const { action } = req.body;

            // Проверка действия (должно быть "open" или "close")
            if (!['open', 'close'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action. Use "open" or "close".' });
            }

            // Получение записи автомобиля из базы данных
            let car = await Car.findByPk(1); // Используем ID 1 как пример

            // Если запись не найдена, создаём её
            if (!car) {
                car = await Car.create({
                    engine: 'off',
                    doors: 'locked',
                    trunk: 'closed',
                    lights: 'off',
                });
            }

            // Обновление состояния багажника
            const updatedTrunkState = action === 'open' ? 'open' : 'close';
            car.trunk = updatedTrunkState;

            // Сохраняем изменения в базе данных
            await car.save();

            // Отправляем ответ клиенту
            res.status(200).json({
                message: `Trunk ${updatedTrunkState}.`,
                trunk: car.trunk,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

}

export default TrunkController;
