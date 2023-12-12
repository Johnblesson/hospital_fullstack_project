// module.exports = {
// 	up: async (queryInterface, DataTypes) => {
// 		await queryInterface.createTable("sample_receipts", {
// 			id: {
// 				type: DataTypes.INTEGER,
// 				autoIncrement: true,
// 				primaryKey: true,
// 			},
// 			samplereceiptid: {
// 				type: DataTypes.STRING,
// 			},
// 			studyname: {
// 				type: DataTypes.STRING,
// 				validate: {
// 					len: [2, 255],
// 				},
// 			},
// 			subject: {
// 				type: DataTypes.STRING,
// 			},
// 			visitname: {
// 				type: DataTypes.STRING,
// 			},
// 			visitdate: {
// 				type: DataTypes.DATE,
// 			},
// 			ageatvisit: {
// 				type: DataTypes.STRING,
// 			},
// 			samplecollectiondate: {
// 				type: DataTypes.DATE,
// 			},
// 			blooddrawtime: {
// 				type: DataTypes.TIME,
// 			},
// 			samplereceiptdate: {
// 				type: DataTypes.DATE,
// 			},
// 			samplereceipttime: {
// 				type: DataTypes.TIME,
// 			},
// 			hematologysample: {
// 				type: DataTypes.STRING,
// 			},
// 			chemistrysample: {
// 				type: DataTypes.STRING,
// 			},
// 			humoralsample: {
// 				type: DataTypes.STRING,
// 			},
// 			cellularsample: {
// 				type: DataTypes.STRING,
// 			},
// 			comments: {
// 				type: DataTypes.STRING,
// 			},
// 			created_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			updated_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			user_id: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 				references: {
// 					model: "tbl_users",
// 					key: "id",
// 				},
// 				onUpdate: "CASCADE",
// 				onDelete: "CASCADE",
// 			},
// 		});
// 	},

// 	down: async (queryInterface) => {
// 		await queryInterface.dropTable("sample_receipts");
// 	},
// };
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("sample_receipts", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			samplereceiptid: {
				type: Sequelize.STRING,
			},
			studyname: {
				type: Sequelize.STRING,
				validate: {
					len: [2, 255],
				},
			},
			subject: {
				type: Sequelize.STRING,
			},
			visitname: {
				type: Sequelize.STRING,
			},
			visitdate: {
				type: Sequelize.DATE,
			},
			ageatvisit: {
				type: Sequelize.STRING,
			},
			samplecollectiondate: {
				type: Sequelize.DATE,
			},
			blooddrawtime: {
				type: Sequelize.TIME,
			},
			samplereceiptdate: {
				type: Sequelize.DATE,
			},
			samplereceipttime: {
				type: Sequelize.TIME,
			},
			hematologysample: {
				type: Sequelize.STRING,
			},
			chemistrysample: {
				type: Sequelize.STRING,
			},
			humoralsample: {
				type: Sequelize.STRING,
			},
			cellularsample: {
				type: Sequelize.STRING,
			},
			comments: {
				type: Sequelize.STRING,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "tbl_users",
					key: "user_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("sample_receipts");
	},
};
