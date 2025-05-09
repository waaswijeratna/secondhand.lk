const db = require('../Services/db');

const getAdvertisement = async (req, res, next) => {
    const { ad_id } = req.params;
    console.log(ad_id);

    // Function to handle query errors
    const handleQueryError = (error, errorMessage) => {
        console.error(errorMessage, error);
        return res.status(500).json({ error: errorMessage });
    };

    try {
        // Retrieve advertisement data
        const adQuery = `SELECT * FROM ads WHERE ad_id = ?`;
        const [adResults] = await db.query(adQuery, [ad_id]);

        if (adResults.length === 0) {
            return res.status(404).json({ error: 'Advertisement not found' });
        }

        const ad = adResults[0];
        const { category_id, payment_ID } = ad;

        // Retrieve form data based on category
        const formQueries = {
            '1': 'SELECT * FROM vehiclesform WHERE ad_id = ?',
            '2': 'SELECT * FROM property WHERE ad_id = ?',
            '3': 'SELECT * FROM electronicsform WHERE ad_id = ?',
            '4': 'SELECT * FROM fashionform WHERE ad_id = ?',
            '5': 'SELECT * FROM homeappliancesform WHERE ad_id = ?',
            '6': 'SELECT * FROM furniturehomedecorsform WHERE ad_id = ?',
            '7': 'SELECT * FROM sportandfitnessform WHERE ad_id = ?',
            '8': 'SELECT * FROM musicalinstrumentform WHERE ad_id = ?',
            '9': 'SELECT * FROM animalsform WHERE ad_id = ?',
            '10': 'SELECT * FROM toolsandequipmentform WHERE ad_id = ?',
            '11': 'SELECT * FROM educationform WHERE ad_id = ?',
            '12': 'SELECT * FROM otherform WHERE ad_id = ?'
        };

        const formQuery = formQueries[category_id];
        if (!formQuery) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const [formResults] = await db.query(formQuery, [ad_id]);
        const formData = formResults[0];

        // Retrieve telephone numbers
        const telephoneNumbersQuery = 'SELECT telephoneNumbers FROM telephonenumbers WHERE ad_id = ?';
        const [telephoneNumbersResults] = await db.query(telephoneNumbersQuery, [ad_id]);
        console.log("tele", telephoneNumbersResults[0].telephoneNumbers);
        const telephoneNumbers = telephoneNumbersResults[0].telephoneNumbers;

        // Retrieve images
        const imagesQuery = 'SELECT imagePath FROM images WHERE ad_id = ?';
        const [imagesResults] = await db.query(imagesQuery, [ad_id]);
        const images = imagesResults.map(result => result.imagePath);

        // Retrieve promotions (if any)
        if (payment_ID) {
            const promotionsQuery = `
                SELECT pc.promotion_ID, pc.expiration_date
                FROM promotion_choices pc
                JOIN promotions_payment pp ON pc.payment_ID = pp.payment_ID
                WHERE pp.payment_ID = ?
            `;
            const [promotionsResults] = await db.query(promotionsQuery, [payment_ID]);
            const promotions = promotionsResults.map(result => ({
                promotion_ID: result.promotion_ID,
                expiration_date: result.expiration_date
            }));

            // Send all data as a response
            return res.status(200).json({ ad, formData, telephoneNumbers, images, promotions });
        } else {
            // Send data without promotions
            return res.status(200).json({ ad, formData, telephoneNumbers, images });
        }
    } catch (error) {
        return handleQueryError(error, 'Error retrieving advertisement');
    }
};

module.exports = { getAdvertisement };
