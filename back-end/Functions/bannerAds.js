const db = require('../Services/db');

const bannerAd = async (req, res, next) => {
    console.log("triggered");
    try {
        const { adType, urgent, top, category, subcategory, location, sublocation, banner_type_id, defaultFlag } = req.body;

        // Base SQL query and values array
        let sql = 'SELECT imagePath, url FROM banner_ad_images WHERE banner_type_id = ?';
        let values = [banner_type_id];

        // Add additional filters if present
        if (adType) {
            sql += ' AND adType = ?';
            values.push(adType);
        }
        if (urgent) {
            sql += ' AND Urgent = ?';
            values.push(1);
        }
        if (top) {
            sql += ' AND topAd = ?';
            values.push(1);
        }
        if (category) {
            sql += ' AND category_id = ?';
            values.push(category);
        }
        if (subcategory) {
            sql += ' AND subcategory_id = ?';
            values.push(subcategory);
        }
        if (location) {
            sql += ' AND location_id = ?';
            values.push(location);
        }
        if (sublocation) {
            sql += ' AND sublocation_id = ?';
            values.push(sublocation);
        }

        // Add the order by random and limit clause to select one random result
        sql += ' ORDER BY RAND() LIMIT 1';

        // Query the database
        let results = await db.query(sql, values);

        // If no results found and defaultFlag is present, retrieve a random image
        if (results.length === 0 && defaultFlag) {
            sql = 'SELECT imagePath FROM banner_ad_images WHERE banner_type_id = ? ORDER BY RAND() LIMIT 1';
            values = [banner_type_id];
            results = await db.query(sql, values);
        }

        res.status(200).json(results[0] || {}); // Return the first (random) result or an empty object if no result
        console.log("results", results);
    } catch (error) {
        console.error('Error in bannerAd function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { bannerAd };
