const express = require("express");
const router = express.Router();
const FormData = require("../models/dataModel");

// get
router.get("/", async (req, res) => {
	const data = await FormData.find({});
	res.status(200).json(data);
});

// post
router.post("/", async (req, res) => {
	const { name, email, number } = req.body;

	if (!name || !email || !number) {
		res.status(401).json({ message: "You have not filled the required fields" });
		return;
	}

	const data = await FormData.create({
		name: name,
		email: email,
		number: number,
	});

	res.status(201).json({ data, message: "Form Submitted" });
});

// update
router.put("/:id", async (req, res) => {
	const { name, email, number } = req.body;

	const id = req.params.id;

	if (!id) {
		res.status(401).json({ message: "No Id" });
		return;
	}

	if (id.length < 24) {
		res.status(401).json({ message: "Enter a valid Id" });
		return;
	}

	const findData = await FormData.findById(id);

	if (!findData) {
		res.status(401).json({ message: "Record does not exist" });
		return;
	}

	const data = await FormData.findByIdAndUpdate(
		id,
		{
			name,
			email,
			number,
		},
		{ new: true }
	);

	res.status(201).json(data);
});

// delete

router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	// if (!id) {
	// 	res.status(401).json({ message: "No Id" });
	// 	return;
	// }

	// if (id.length < 24) {
	// 	res.status(401).json({ message: "Enter a valid Id" });
	// 	return;
	// }

	// const findForm = await FormData.findById(id);

	// if (!findForm) {
	// 	res.status(401).json({ message: "Record does not exist" });
	// 	return;
	// }

	const data = await FormData.findByIdAndDelete(id);

	res.status(200).json(data);
});

module.exports = router;
