import { Sequelize, DataTypes } from 'sequelize';

// For type-checking purposes within the app
export type Post = {
	id: string;
	title: string;
	published_on: string; // YYYY-MM-DD
	content: string;
};

// For parsing from the database
export const definePost = (sequelize: Sequelize) => {
	return sequelize.define(
		'Post',
		{
			id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			published_on: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{},
	);
};
