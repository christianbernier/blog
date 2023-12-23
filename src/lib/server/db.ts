import { Sequelize } from 'sequelize';
import { definePost } from './db.models';
import { env } from './env';
import pg from "pg";

// Initialize database objects
export const sequelize = new Sequelize(env.DB_URL || '', {
  dialectModule: pg,
});
export const Post = definePost(sequelize);

/**
 * @description Establish a connection to the database.
 */
export const connectToDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
