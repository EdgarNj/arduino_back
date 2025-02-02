import { Car } from '../../../models/index.js';

class CarController {
    static async get(req, res, next) {
        try {
            const car = await Car.findByPk(1); // Get the car

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            // Return the status of all components
            return res.status(200).json({
                carStatus: {
                    engine: car.engine,
                    engineWarmUpTime: car.engineWarmUpTime,
                    lights: car.lights,
                    lightsDuration: car.lightsDuration,
                    doors: car.doors,
                    trunk: car.trunk,
                    horn:car.horn
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default CarController;
