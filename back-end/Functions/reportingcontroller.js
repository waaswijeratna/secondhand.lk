const db = require('../Services/db');

// Controller function for inserting reports
const insertReporting = async (req, res, next) => {
    // Data get from frontend
    const { reason, reportReview, ad_id, userId} = req.body;
    console.log("came?", userId);
    const user_id = userId; // Assuming a hardcoded user ID for this example
    const reported_time = new Date();
    

    // Insert data into reporting table
    const query = `
        INSERT INTO reporting (user_id, ad_id, reason, reportreview, reported_time) 
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(query, [user_id, ad_id, reason, reportReview, reported_time]);
        console.log('Data inserted into reporting table:', result);

        // Respond with a success message
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data into reporting table:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { insertReporting };
