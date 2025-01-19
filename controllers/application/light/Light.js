import { Car } from '../../../models/index.js';

class LightController {
    static async post(req, res, next) {
        try {
            const { action, lightDuration } = req.body;
            const car = await Car.findByPk(1);

            if (!car) {
                return res.status(404).json({ error: 'Car not found.' });
            }

            if (action === 'turnOn') {
                if (car.lights === 'on') {
                    return res.status(400).json({ error: 'Lights are already on.' });
                }

                // If light duration is provided
                if (lightDuration !== undefined) {
                    if (lightDuration < 0) {
                        return res.status(400).json({ error: 'Invalid lightDuration. Must be a positive integer.' });
                    }

                    // Turn on lights with a specified duration
                    car.lights = 'on';
                    car.lightsDuration = lightDuration;  // Set the light duration
                    car.updatedAt = new Date();
                } else {
                    // Turn on lights without specifying a duration
                    car.lights = 'on';
                    car.lightsDuration = 0;  // Default no duration
                    car.updatedAt = new Date();
                }

                await car.save();
                return res.status(200).json({
                    message: 'Lights turned on.',
                    lightsState: car.lights,
                    lightsDuration: car.lightsDuration,
                });
            }

            if (action === 'turnOff') {
                if (car.lights === 'off') {
                    return res.status(400).json({ error: 'Lights are already off.' });
                }

                // Turn off lights
                car.lights = 'off';
                car.updatedAt = new Date();
                car.lightsDuration = 0;  // Clear the light duration
                await car.save();

                return res.status(200).json({
                    message: 'Lights turned off.',
                    lightsState: car.lights,
                });
            }

            return res.status(400).json({ error: 'Invalid action. Use "turnOn" or "turnOff".' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

    static async updateLightDuration() {
        try {
            const car = await Car.findByPk(1); // Get the car

            if (!car || car.lights === 'off' || car.lightsDuration <= 0) {
                return; // If lights are off or the duration has ended
            }

            // Decrease light duration by 1 second
            car.lightsDuration -= 1;

            // If the light duration ends, turn off the lights
            if (car.lightsDuration <= 0) {
                car.lights = 'off';  // Turn off the lights
                car.updatedAt = new Date();
            }
            await car.save();
        } catch (error) {
            console.error('Error updating light duration:', error);
        }
    }
}

export default LightController;
