// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/dbConfig");
// const { Users } = require("./users");

// const SupernatantsSampleStorage = sequelize.define(
// 	"SupernatantsSampleStorage",
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		subjectId: DataTypes.STRING,
// 		visitName: DataTypes.STRING,
// 		modifyAliquot: DataTypes.STRING,
// 		aliquotStored: DataTypes.STRING,
// 		roomAllocation: DataTypes.STRING,
// 		freezerNumber: DataTypes.STRING,
// 		boxNumber: DataTypes.STRING,
// 		column: DataTypes.STRING,
// 		row: DataTypes.STRING,
// 		comments: DataTypes.STRING,
// 		aliquotId: DataTypes.STRING,
// 		boxId: DataTypes.STRING,
// 	},
// 	{ timestamps: true }
// );

// SupernatantsSampleStorage.belongsTo(Users, { foreignKey: "userId" });
// Users.hasMany(SupernatantsSampleStorage, { foreignKey: "userId" });

// SupernatantsSampleStorage.sync();
// sequelize.sync({ alter: true });
// module.exports = SupernatantsSampleStorage;
