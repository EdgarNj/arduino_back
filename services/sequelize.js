import { Sequelize } from 'sequelize';
import './sequelize-mods/createOrUpdate.js';

const {
  MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,
} = process.env;

console.log(MYSQL_HOST);
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
