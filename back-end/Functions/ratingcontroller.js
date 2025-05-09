const db = require('../Services/db');

// Controller function for inserting ratings
const insertRatings = async (req, res, next) => {
    // Data get from frontend
    const { rating, review, ad_id , userId} = req.body;
    console.log("Ratings:", rating);
    const user_id = userId; // Assuming a hardcoded user ID for this example

    // Insert data into ratings table
    const query = `
        INSERT INTO userratings (user_id, ad_id, rating, rated_time, review) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)
    `;

    try {
        const [result] = await db.query(query, [user_id, ad_id, rating, review]);
        console.log('Data inserted into ratings:', result);

        // Respond with a success message
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data into ratings table:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { insertRatings };
