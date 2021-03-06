/**
 * Azure Function: CreateUser.
 *
 * Gets data from body, creates a
 * finalData object and saves it in MongoDB Atlas.
 *
 * @param context To pass data between function to / from runtime.
 * @param req HTTP Request sent to the Azure function by POST body.
 */
module.exports = async function (context, req) {
	// Let's call it log.
	const log = context.log;

	// Log the entire request URI.
	log('[RAN] RequestUri=%s', req.originalUrl);

	// Database interaction.
    const mongoose = require('mongoose');
    const databaseConnect = require('../../database');

    // Connect to MongoDB Atlas
    databaseConnect();

	// User Schema.
	require('../../models/user.model');
	const User = mongoose.model('User');

	// Create a Response.
	if (req.body) { // Simple authentication for the purpose of demo.

		// Build the data we need.
        const finalData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		}

		// Save to db.
		const user = await (new User(finalData)).save();
		log("[OUTPUT]—— USER CREATED: ", user);

		// Respond with 200.
		context.res = {
			status: 200,
			body: `User ${req.body.name} created sucessfully!`
		};
	} else {
		context.res = {
			status: 400,
			body: "Error on creating user"
		};
	}

	context.done();
};