const db = require('../Services/db');

const bannerAd = async (req, res, next) => {
    console.log("triggered");
    try {
        const { adType, urgent, top, category, subcategory, location, sublocation, banner_type_id, defaultFlag } = req.body;
        console.log("id", banner_type_id);

        // Define the base SQL query and values array
        let baseSql = 'SELECT imagePath, url FROM banner_ad_images WHERE banner_type_id = ?';
        let baseValues = [banner_type_id];

        // Create an array of filter conditions and corresponding values
        const filters = [
            { condition: adType, query: ' AND adType = ?', value: adType },
            { condition: urgent, query: ' AND Urgent = ?', value: 1 },
            { condition: top, query: ' AND topAd = ?', value: 1 },
            { condition: category, query: ' AND category_id = ?', value: category },
            { condition: subcategory, query: ' AND subcategory_id = ?', value: subcategory },
            { condition: location, query: ' AND location_id = ?', value: location },
            { condition: sublocation, query: ' AND sublocation_id = ?', value: sublocation },
        ];

        let results = [];

        // Iterate through all combinations of filters, starting with the most specific
        for (let i = 0; i < (1 << filters.length); i++) {
            let sql = baseSql;
            let values = [...baseValues];
            for (let j = 0; j < filters.length; j++) {
                if (i & (1 << j)) {
                    sql += filters[j].query;
                    values.push(filters[j].value);
                }
            }
            sql += ' ORDER BY RAND() LIMIT 1';
            results = await db.query(sql, values);
            if (results.length > 0) break;
        }

        // If no results found and defaultFlag is present, retrieve a random image
        if (results.length === 0 && defaultFlag) {
            const defaultSql = 'SELECT imagePath, url FROM banner_ad_images WHERE banner_type_id = ? ORDER BY RAND() LIMIT 1';
            results = await db.query(defaultSql, [banner_type_id]);
        }

        res.status(200).json(results[0] || {}); // Return the first (random) result or an empty object if no result
        console.log("results", results);
    } catch (error) {
        console.error('Error in bannerAd function:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { bannerAd };
