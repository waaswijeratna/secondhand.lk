const db = require('../Services/db');

//controller function for insert ratings
const insertRatings =(req,res,next)=>{
    //data get form frontend
    const{rating,review}=req.body;
    console.log("ratings",rating);
    const user_id=1;
    const ad_id=1;
    // const rated_time=CURRENT_TIMESTAMP;


    // Insert data into ratings table
    const query = `
            INSERT INTO userratings (user_id, ad_id, rating, rated_time, review) 
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)
        `;
    db.query(query, [user_id, ad_id, rating, review], (err, result) => {
        if (err) {
            console.error('Error inserting data into ratings table:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Data inserted into ratings')
        // Respond with a success message
        res.status(200).json({ message: 'Data inserted successfully' });
    });

};

module.exports = {insertRatings};