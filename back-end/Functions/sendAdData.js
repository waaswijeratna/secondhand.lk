const db = require('../Services/db');

const getAdvertisement = (req, res, next) => {
    const { ad_id } = req.params;
    console.log(ad_id);

    // Function to handle query errors
    const handleQueryError = (error, errorMessage) => {
        console.error(errorMessage, error);
        return res.status(500).json({ error: errorMessage });
    };

    // Retrieve advertisement data
    const adQuery = `SELECT * FROM ads WHERE ad_id = ?`;
    db.query(adQuery, [ad_id], (error, adResults) => {
        if (error) {
            return handleQueryError(error, 'Error retrieving advertisement');
        }

        if (adResults.length === 0) {
            return res.status(404).json({ error: 'Advertisement not found' });
        }

        const ad = adResults[0];
        const { category_id, categoryForm_id, payment_ID } = ad;

        // Retrieve form data based on category
        const formQueries = {
            '1': 'SELECT * FROM vehiclesform WHERE id = ?',
            '2': 'SELECT * FROM property WHERE id = ?',
            '3': 'SELECT * FROM electronicsform WHERE id = ?',
            '4': 'SELECT * FROM fashionform WHERE id = ?',
            '5': 'SELECT * FROM homeappliancesform WHERE id = ?',
            '6': 'SELECT * FROM furniturehomedecorsform WHERE id = ?',
            '7': 'SELECT * FROM sportandfitnessform WHERE id = ?',
            '8': 'SELECT * FROM musicalinstrumentform WHERE id = ?',
            '9': 'SELECT * FROM animalsform WHERE id = ?',
            '10': 'SELECT * FROM toolsandequipmentform WHERE id = ?',
            '11': 'SELECT * FROM educationform WHERE id = ?',
            '12': 'SELECT * FROM otherform WHERE id = ?'
        };

        const formQuery = formQueries[category_id];
        if (!formQuery) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        db.query(formQuery, [categoryForm_id], (error, formResults) => {
            if (error) {
                return handleQueryError(error, 'Error retrieving form data');
            }

            const formData = formResults[0];

            // Retrieve telephone numbers
            const telephoneNumbersQuery = 'SELECT telephoneNumbers FROM telephonenumbers WHERE ad_id = ?';
            db.query(telephoneNumbersQuery, [ad_id], (error, telephoneNumbersResults) => {
                if (error) {
                    return handleQueryError(error, 'Error retrieving telephone numbers');
                }

                const telephoneNumbers = JSON.parse(telephoneNumbersResults[0].telephoneNumbers);

                // Retrieve images
                const imagesQuery = 'SELECT imagePath FROM images WHERE ad_id = ?';
                db.query(imagesQuery, [ad_id], (error, imagesResults) => {
                    if (error) {
                        return handleQueryError(error, 'Error retrieving images');
                    }

                    const images = imagesResults.map(result => result.imagePath);

                    // Retrieve promotions (if any)
                    if (payment_ID) {
                        const promotionsQuery = `
                            SELECT pc.promotion_ID, pc.expiration_date
                            FROM promotion_choices pc
                            JOIN promotions_payment pp ON pc.payment_ID = pp.payment_ID
                            WHERE pp.payment_ID = ?
                        `;
                        db.query(promotionsQuery, [payment_ID], (error, promotionsResults) => {
                            if (error) {
                                return handleQueryError(error, 'Error retrieving promotions');
                            }

                            const promotions = promotionsResults.map(result => ({
                                promotion_ID: result.promotion_ID,
                                expiration_date: result.expiration_date
                            }));

                            // Send all data as a response
                            return res.status(200).json({ ad, formData, telephoneNumbers, images, promotions });
                        });
                    } else {
                        // Send data without promotions
                        return res.status(200).json({ ad, formData, telephoneNumbers, images });
                    }
                });
            });
        });
    });
};

module.exports = { getAdvertisement };
