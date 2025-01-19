import {
  Car
} from './models/index.js';

async function main() {
  await Car.sync({ alter: true });
  process.exit(0);
}

main();
