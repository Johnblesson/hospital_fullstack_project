// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/dbConfig");
// const { Users } = require("./users");

// const PBMCSampleStorage = sequelize.define(
// 	"PBMCSampleStorage",
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		boxID: DataTypes.STRING,
// 		aliquotId: DataTypes.STRING,
// 		subject: DataTypes.STRING,
// 		visitName: DataTypes.STRING,
// 		sampleType: DataTypes.STRING,
// 		aliquot: DataTypes.STRING,
// 		AID: DataTypes.STRING,
// 		roomLocation: DataTypes.STRING,
// 		freezerNumber: DataTypes.INTEGER,
// 		boxNumber: DataTypes.STRING,
// 		rowNumber: DataTypes.INTEGER,
// 		columnNumber: DataTypes.INTEGER,
// 		shipped: DataTypes.STRING,
// 		shippedDate: DataTypes.DATEONLY,
// 		comments: DataTypes.STRING,
// 	},
// 	{ timestamps: true }
// );

// PBMCSampleStorage.belongsTo(Users, { foreignKey: "userId" });
// Users.hasMany(PBMCSampleStorage, { foreignKey: "userId" });

// PBMCSampleStorage.sync();
// sequelize.sync({ alter: true });
// module.exports = PBMCSampleStorage;
