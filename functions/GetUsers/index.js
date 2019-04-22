/**
 * Azure Function: CreateUser.
 *
 * Gets data from body, creates a
 * finalData object and saves it in MongoDB Atlas.
 *
 * @param context To pass data between function to / from runtime.
 * @param req HTTP Request sent to the Azure function by POST body.
 */
module.exports = async (context, req) => {
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

    console.log('req', req)

	// Create a Response.
	if (req) { // Simple authentication for the purpose of demo.

		// Save to db.
        const users = await User.find({});
		log("[OUTPUT]—— USERS LISTED: ", users);

		// Respond with 200.
		context.res = {
			status: 200,
			body: users
		};
	} else {
		context.res = {
			status: 400,
			body: "Error on creating user"
		};
	}

	context.done();
};