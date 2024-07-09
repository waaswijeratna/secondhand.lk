const db = require('../Services/db');

const searchFunction = async (req, res, next) => {

    async function searchAds(defaultFlag, keywords, adType, urgent, top, category, subcategory, location, sublocation, nearMe, userId) {
        console.log("m2", category);

        const params = [];
        let query = `
            WITH ImageCTE AS (
                SELECT 
                    ad_id, 
                    JSON_ARRAYAGG(imagePath) AS imagePaths
                FROM images
                GROUP BY ad_id
            ),
            PromotionCTE AS (
                SELECT 
                    payment_ID, 
                    JSON_ARRAYAGG(JSON_OBJECT('promotion_ID', promotion_ID, 'expiration_date', expiration_date)) AS promotionDetails,
                    MAX(CASE WHEN promotion_ID LIKE 'U%' THEN 1 ELSE 0 END) AS isUrgent,
                    MAX(CASE WHEN promotion_ID LIKE 'T%' THEN 1 ELSE 0 END) AS isTop
                FROM promotion_choices
                GROUP BY payment_ID
            )
            SELECT 
                a.ad_id, 
                a.title, 
                a.description, 
                a.price, 
                a.adType,
                a.category_id, 
                a.created_by,
                a.created_at,
                a.bump_up_date,
                COALESCE(ic.imagePaths, JSON_ARRAY()) AS imagePaths,
                CASE
                    WHEN pc.promotionDetails IS NULL OR JSON_LENGTH(pc.promotionDetails) = 0 THEN NULL
                    ELSE pc.promotionDetails
                END AS promotionDetails,
                t.telephoneNumbers,
                c.category, 
                sc.subcategory, 
                l.location, 
                sl.sublocation,
                a.approved_status
            FROM ads a
            LEFT JOIN ImageCTE ic ON a.ad_id = ic.ad_id
            LEFT JOIN telephonenumbers t ON a.ad_id = t.ad_id
            LEFT JOIN PromotionCTE pc ON a.payment_ID = pc.payment_ID
            LEFT JOIN category c ON a.category_id = c.category_id
            LEFT JOIN subcategory sc ON a.subcategory_id = sc.subcategory_id
            LEFT JOIN location l ON a.location_id = l.location_id
            LEFT JOIN sublocation sl ON a.sublocation_id = sl.sublocation_id
            LEFT JOIN usertable utt ON a.created_by = utt.userId             
            WHERE 1=1
        `;

        if (!userId) {
            query += ` AND a.approved_status = 'approved'`;
        }
        else{
            query += ` AND a.approved_status <> 'rejected'`;
        }

        if (keywords) {
            query += ` AND MATCH(a.title, a.description) AGAINST(? IN NATURAL LANGUAGE MODE)`;
            params.push(keywords);
        }
        if (adType) {
            query += ` AND a.adType = ?`;
            console.log("here", adType);
            params.push(adType);
        }
        if (category) {
            query += ` AND a.category_id = ?`;
            params.push(category);
        }
        if (location) {
            query += ` AND a.location_id = ?`;
            params.push(location);
        }
        if (sublocation) {
            query += ` AND a.sublocation_id = ?`;
            params.push(sublocation);
        }
        if (nearMe) {
            query += ` AND (sl.sublocation = ? OR l.location = ?) `;
            params.push(nearMe);
            params.push(nearMe);
        }
        if (urgent) {
            query += ` AND pc.isUrgent = 1`;
        }
        if (top) {
            query += ` AND pc.isTop = 1`;
        }

        if (userId) {
            query += ` AND utt.userId = ?`;
            params.push(userId);
            query += ` ORDER BY a.bump_up_date DESC, a.approved_status`
        }
        else{
            query += ` ORDER BY a.bump_up_date DESC`
        }




        if (defaultFlag) {
            query += '  LIMIT 20';
        }

        console.log("m4", query, params);

        const [rows] = await db.query(query, params);
        return rows;
    }

    console.log("triggered");
    try {
        console.log("h1");
        const { defaultFlag, keywords, adType, urgent, top, category, subcategory, location, sublocation, nearMe, userId } = req.body;
        console.log("h2", userId);
        const results = await searchAds(defaultFlag, keywords, adType, urgent, top, category, subcategory, location, sublocation, nearMe, userId);
        console.log("result");
        res.json(results);
    } catch (error) {
        console.log("h3", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { searchFunction };
