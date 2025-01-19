import { Car } from '../../../models/index.js';

class EngineController {
    static async post(req, res, next) {
        try {
            const { action, engineWarmUpTime } = req.body;
            const car = await Car.findByPk(1);

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            if (action === 'start') {
                if (car.engine === 'on') {
                    return res.status(400).json({ error: 'Engine is already running.' });
                }

                // Если передано время прогрева
                if (engineWarmUpTime !== undefined) {
                    if (engineWarmUpTime < 0) {
                        return res.status(400).json({ error: 'Invalid engineWarmUpTime. Must be a positive integer.' });
                    }
                    console.log("mdav")
                    // Запуск двигателя с временем прогрева
                    car.engine = 'on';
                    car.engineWarmUpTime = engineWarmUpTime; // Устанавливаем время прогрева из запроса
                    car.updatedAt = new Date();
                } else {
                    // Запуск двигателя без времени прогрева
                    car.engine = 'on';
                    car.engineWarmUpTime = 0; // Без прогрева
                    car.updatedAt = new Date();
                }

                await car.save();
                return res.status(200).json({
                    message: 'Engine started.',
                    engineState: car.engine,
                    engineWarmUpTime: car.engineWarmUpTime,
                });
            }

            if (action === 'stop') {
                if (car.engine === 'off') {
                    return res.status(400).json({ error: 'Engine is already off.' });
                }

                // Остановка двигателя
                car.engine = 'off';
                car.updatedAt = new Date();
                car.engineWarmUpTime = 0;  // Очистка времени прогрева
                await car.save();

                return res.status(200).json({
                    message: 'Engine stopped.',
                    engineState: car.engine,
                });
            }

            return res.status(400).json({ error: 'Invalid action. Use "start" or "stop".' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

    static async updateEngineWarmUpTime() {
        try {
            const car = await Car.findByPk(1); // Получаем автомобиль

            if (!car || car.engine === 'off' || car.engineWarmUpTime <= 0) {
                return; // Если двигатель выключен или время прогрева закончилось
            }

            // Уменьшаем время прогрева на 1 секунду
            car.engineWarmUpTime -= 1;

            // Если время прогрева закончилось, меняем состояние двигателя на 'off'
            if (car.engineWarmUpTime <= 0) {
                car.engine = 'off';  // Останавливаем двигатель
                car.updatedAt = new Date();

            }
            await car.save();
        } catch (error) {
            console.error('Error updating engine warm-up time:', error);
        }
    }
}

export default EngineController;
