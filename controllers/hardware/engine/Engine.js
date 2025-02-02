import { Car } from '../../../models/index.js';

class EngineController {
    static async post(req, res) {
        try {
            const { action} = req.body;
            const car = await Car.findByPk(1);

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            if (action === 'start') {
                car.engine = 'on'
                await car.save();
                return res.status(200).json({ status: 'ok' });
            }
            if (action === 'stop') {
                car.engine = 'off';
                car.engineWarmUpTime = 0;
                await car.save();
                return res.status(200).json({ status: 'ok' });
            }
            return res.status(400).json({ error: 'Invalid action. Use "start" or "stop".' });


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default EngineController;
