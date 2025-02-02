import {
    Car,
} from '../../../models/index.js';

class HornController {
    static async post(req, res, next) {
        try {
            const { action } = req.body;

            // Проверка действия (должно быть "open" или "close")
            if (!['on', 'off'].includes(action)) {
                return res.status(400).json({ error: 'Invalid action. Use "on" or "off".' });
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
                    horn:"off"
                });
            }


            const updatedHornState = action === 'on' ? 'on' : 'off';
            car.horn = updatedHornState;


            await car.save();


            res.status(200).json({
                message: `Horn ${updatedHornState}.`,
                horn: car.horn,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

}

export default HornController;
