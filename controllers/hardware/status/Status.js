import { Car } from '../../../models/index.js';

class StatusController {
    static async get(req, res, next) {
        try {
            const car = await Car.findByPk(1); // Get the car

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            // Extract current status
            const carStatus = {
                engine: car.engine === 'on',
                lights: car.lights === 'on',
                doors: car.doors === 'locked',
                trunk: car.trunk === 'open',
                horn: car.horn === 'on',
            };

            // Respond with the status
            res.status(200).json(carStatus);

            // Turn off the horn after responding
            if (car.horn === 'on') {
                car.horn = 'off';
                await car.save();
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default StatusController;
