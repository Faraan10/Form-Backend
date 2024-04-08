const mongoose = require("mongoose");

const dataModel = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		number: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Data", dataModel);
