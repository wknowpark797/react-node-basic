const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

// Join
router.post('/join', (req, res) => {
	const params = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			params.userNum = doc.userNum;
			const userData = new User(params);

			userData.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => {
						res.json({ success: false });
					});
			});
		});
});

module.exports = router;
