const db = require('../Services/db');

//contraller function for insert ratings
const insertReporting =(req,res,next)=>{
    //data get form frontend
    const{reason,reportReview}=req.body;
    const user_id=1;
    const ad_id=1;
    const reported_time=new Date();

    // Insert data into ratings table
    
    const query = `
    INSERT INTO reporting (user_id, ad_id, reason, reportreview, reported_time) 
    VALUES (?, ?, ?, ?, ?)
`;
    db.query(query, [user_id, ad_id, reason, reportReview, reported_time], (err, result) => {
        if (err) {
            console.error('Error inserting data into ratings table:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Data inserted into ratings table:', result);

        // Respond with a success message
        res.status(200).json({ message: 'Data inserted successfully' });
    });

};

module.exports = {insertReporting};