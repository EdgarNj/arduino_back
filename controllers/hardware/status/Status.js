import { Car } from '../../../models/index.js';

class StatusController {
    static async get(req, res, next) {
        try {
            const car = await Car.findByPk(1); // Get the car

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            // Return the status of all components
            return res.status(200).json({

                    engine: car.engine === 'on',
                    lights: car.lights === "on",
                    doors: car.doors === "locked",
                    trunk: car.trunk === "open",

            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default StatusController;
