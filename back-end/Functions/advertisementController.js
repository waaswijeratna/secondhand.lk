const db = require('../Services/db');

const createOrUpdateAdvertisement = async (req, res, next) => {
    const { title, description, price, location_id, sublocation_id, telephoneNumbers , userId} = req.body;
    const { category_id, subcategory_id, adType } = req.body;
    let { ad_id } = req.body;  // Declare ad_id with let to allow reassignment

    const { total_amount, selected_promotions } = req.body;
    const images = req.body.fileUrls; // Use the file URLs from Firebase
    const user_id = userId;
    console.log("cvcc", user_id);
    console.log("images", images);

    try {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        // Function to handle query errors
        const handleQueryError = async (error, errorMessage) => {
            console.error(errorMessage, error);
            await connection.rollback();
            throw new Error(errorMessage);
        };

        // Define form data for different categories
        const formDatas = {
            '1': {
                table: 'vehiclesform',
                query: 'INSERT INTO vehiclesform (brand, model, yearOfManufacture, mileage, transmission, Part_or_Accessory, BicycleType, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE vehiclesform SET brand = ?, model = ?, yearOfManufacture = ?, mileage = ?, transmission = ?, Part_or_Accessory = ?, BicycleType = ? WHERE ad_id = ?',
                values: [req.body.brand, req.body.model, req.body.yearOfManufacture, req.body.mileage, req.body.transmission, req.body.Part_or_Accessory, req.body.BicycleType]
            },
            '2': {
                table: 'property',
                query: 'INSERT INTO property (landSize, unit, address, bedrooms, bathrooms, propertyType, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE property SET landSize = ?, unit = ?, address = ?, bedrooms = ?, bathrooms = ?, propertyType = ? WHERE ad_id = ?',
                values: [req.body.landSize, req.body.unit, req.body.address, req.body.bedrooms, req.body.bathrooms, req.body.propertyType]
            },
            '3': {
                table: 'electronicsform',
                query: 'INSERT INTO electronicsform (brand, model, computerType, tvType, screenSize, accessoryType, electronicOtherItemType, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE electronicsform SET brand = ?, model = ?, computerType = ?, tvType = ?, screenSize = ?, accessoryType = ?, electronicOtherItemType = ? WHERE ad_id = ?',
                values: [req.body.brand, req.body.model, req.body.computerType, req.body.tvType, req.body.screenSize, req.body.accessoryType, req.body.electronicOtherItemType]
            },
            '4': {
                table: 'fashionform',
                query: 'INSERT INTO fashionform (gender, brand, size, beautyProductType, otherFashionItem, ad_id) VALUES (?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE fashionform SET gender = ?, brand = ?, size = ?, beautyProductType = ?, otherFashionItem = ? WHERE ad_id = ?',
                values: [req.body.gender, req.body.brand, req.body.size, req.body.beautyProductType, req.body.otherFashionItem]
            },
            '5': {
                table: 'homeappliancesform',
                query: 'INSERT INTO homeappliancesform (brand, kitchenItem, laundryItem, cleaningItems, otherHomeAppliancesItem, ad_id) VALUES (?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE homeappliancesform SET brand = ?, kitchenItem = ?, laundryItem = ?, cleaningItems = ?, otherHomeAppliancesItem = ? WHERE ad_id = ?',
                values: [req.body.brand, req.body.kitchenItem, req.body.laundryItem, req.body.cleaningItems, req.body.otherHomeAppliancesItem]
            },
            '6': {
                table: 'furniturehomedecorsform',
                query: 'INSERT INTO furniturehomedecorsform (material, design, furnitureOrHomeDecorType, ad_id) VALUES (?, ?, ?, ?)',
                updateQuery: 'UPDATE furniturehomedecorsform SET material = ?, design = ?, furnitureOrHomeDecorType = ? WHERE ad_id = ?',
                values: [req.body.material, req.body.design, req.body.furnitureOrHomeDecorType]
            },
            '7': {
                table: 'sportandfitnessform',
                query: 'INSERT INTO sportandfitnessform (brand, sportAndFitnessItem, otherSportItem, ad_id) VALUES (?, ?, ?, ?)',
                updateQuery: 'UPDATE sportandfitnessform SET brand = ?, sportAndFitnessItem = ?, otherSportItem = ? WHERE ad_id = ?',
                values: [req.body.brand, req.body.sportAndFitnessItem, req.body.otherSportItem]
            },
            '8': {
                table: 'musicalinstrumentform',
                query: 'INSERT INTO musicalinstrumentform (brand, stringInstrumentsItem, windInstrumentsItem, otherInstrumentsItem, instrumentAccessories, recordingAndStudioEquipment, musicalOtherItems, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE musicalinstrumentform SET brand = ?, stringInstrumentsItem = ?, windInstrumentsItem = ?, otherInstrumentsItem = ?, instrumentAccessories = ?, recordingAndStudioEquipment = ?, musicalOtherItems = ? WHERE ad_id = ?',
                values: [req.body.brand, req.body.stringInstrumentsItem, req.body.windInstrumentsItem, req.body.otherInstrumentsItem, req.body.instrumentAccessories, req.body.recordingAndStudioEquipment, req.body.musicalOtherItems]
            },
            '9': {
                table: 'animalsform',
                query: 'INSERT INTO animalsform (domesticAnimalType, farmAnimalType, petSuppliesAndAccessoriesItem, otherAnimalsItem, ad_id) VALUES (?, ?, ?, ?, ?)',
                updateQuery: 'UPDATE animalsform SET domesticAnimalType = ?, farmAnimalType = ?, petSuppliesAndAccessoriesItem = ?, otherAnimalsItem = ? WHERE ad_id = ?',
                values: [req.body.domesticAnimalType, req.body.farmAnimalType, req.body.petSuppliesAndAccessoriesItem, req.body.otherAnimalsItem]
            },
            '10': {
                table: 'toolsandequipmentform',
                query: 'INSERT INTO toolsandequipmentform (toolType, toolPerformance, ad_id) VALUES (?, ?, ?)',
                updateQuery: 'UPDATE toolsandequipmentform SET toolType = ?, toolPerformance = ? WHERE ad_id = ?',
                values: [req.body.toolType, req.body.toolPerformance]
            },
            '11': {
                table: 'educationform',
                query: 'INSERT INTO educationform (schoolSupplyItem, educationalGameItem, otherEducationalItem, ad_id) VALUES (?, ?, ?, ?)',
                updateQuery: 'UPDATE educationform SET schoolSupplyItem = ?, educationalGameItem = ?, otherEducationalItem = ? WHERE ad_id = ?',
                values: [req.body.schoolSupplyItem, req.body.educationalGameItem, req.body.otherEducationalItem]
            },
            '12': {
                table: 'otherform',
                query: 'INSERT INTO otherform (otherItemName, otherItemDescription, ad_id) VALUES (?, ?, ?)',
                updateQuery: 'UPDATE otherform SET otherItemName = ?, otherItemDescription = ? WHERE ad_id = ?',
                values: [req.body.otherItemName, req.body.otherItemDescription]
            },
        };

        let existingAd = null;
        let payment_ID = null;

        if (ad_id) {
            try {
                const [adResults] = await connection.query('SELECT * FROM ads WHERE ad_id = ?', [ad_id]);
                existingAd = adResults[0];
                payment_ID = existingAd.payment_ID;
            } catch (error) {
                await handleQueryError(error, 'Error fetching existing advertisement');
            }
        }

        const handlePromotionInsertion = async () => {
            if (total_amount && selected_promotions) {
                if (!payment_ID) {
                    // Insert total_amount into promotions_payment table for new payments
                    const promotionsPaymentQuery = 'INSERT INTO promotions_payment (Total_amount) VALUES (?)';
                    try {
                        const [promotionsPaymentResults] = await connection.query(promotionsPaymentQuery, [total_amount]);
                        payment_ID = promotionsPaymentResults.insertId;
                    } catch (error) {
                        await handleQueryError(error, 'Error inserting total amount');
                    }
                } else {
                    // Update total amount in promotions_payment table for existing payments
                    const updatePromotionsPaymentQuery = 'UPDATE promotions_payment SET Total_amount = Total_amount + ? WHERE payment_ID = ?';
                    try {
                        await connection.query(updatePromotionsPaymentQuery, [total_amount, payment_ID]);
                    } catch (error) {
                        await handleQueryError(error, 'Error updating total amount');
                    }
                }

                // Insert selected promotions into promotion_choices table
                const promotionChoicesQuery = 'INSERT INTO promotion_choices (promotion_ID, expiration_date, payment_ID) VALUES (?, ?, ?)';
                const currentDate = new Date();

                for (let promotion of selected_promotions) {
                    const { promotion_ID, days } = JSON.parse(promotion);
                    const expiration_date = new Date(currentDate);
                    expiration_date.setDate(expiration_date.getDate() + days);

                    try {
                        await connection.query(promotionChoicesQuery, [promotion_ID, expiration_date, payment_ID]);
                    } catch (error) {
                        await handleQueryError(error, 'Error inserting promotion choice');
                    }
                }
            }
        };

        const saveOrUpdateAd = async () => {
            const created_by = user_id; // Hardcode a number for created_by
            const created_at = new Date(); // Get the current date and time
            const bump_up_date = new Date(); // Get the current date and time


            if (existingAd) {
                // Update existing advertisement
                const adsQuery = `UPDATE ads SET title = ?, description = ?, price = ?, location_id = ?, sublocation_id = ?, category_id = ?, subcategory_id = ?, adType = ?${payment_ID ? ', payment_ID = ?' : ''} WHERE ad_id = ?`;
                const adsValues = [title, description, price, location_id, sublocation_id, category_id, subcategory_id, adType];
                if (payment_ID) adsValues.push(payment_ID);
                adsValues.push(ad_id);

                try {
                    await connection.query(adsQuery, adsValues);
                } catch (error) {
                    await handleQueryError(error, 'Error updating advertisement');
                }
            } else {
                // Insert new advertisement
                const adsQuery = `INSERT INTO ads (title, description, price, location_id, sublocation_id, category_id, subcategory_id, adType, created_by, created_at, bump_up_date${payment_ID ? ', payment_ID' : ''}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?${payment_ID ? ', ?' : ''})`;
                const adsValues = [title, description, price, location_id, sublocation_id, category_id, subcategory_id, adType, created_by, created_at, bump_up_date];
                if (payment_ID) adsValues.push(payment_ID);

                try {
                    const [adsResults] = await connection.query(adsQuery, adsValues);
                    ad_id = adsResults.insertId; // Update ad_id with the newly inserted ad's ID
                } catch (error) {
                    await handleQueryError(error, 'Error creating advertisement');
                }
            }
        };

        const updateTelephoneNumbersAndImages = async () => {
            // Check if there are telephoneNumbers to update
            if (telephoneNumbers && telephoneNumbers.length > 0) {
                // Check if there is an existing telephoneNumbers record for the ad_id
                const checkExistingQuery = 'SELECT * FROM telephonenumbers WHERE ad_id = ?';
                try {
                    const [existingResult] = await connection.query(checkExistingQuery, [ad_id]);
                    if (existingResult.length > 0) {
                        // If there is an existing record, update the telephoneNumbers
                        const updateTelephoneNumbersQuery = 'UPDATE telephonenumbers SET telephoneNumbers = ? WHERE ad_id = ?';
                        await connection.query(updateTelephoneNumbersQuery, [JSON.stringify(telephoneNumbers), ad_id]);
                    } else {
                        // If there is no existing record, insert new telephoneNumbers
                        const insertTelephoneNumbersQuery = 'INSERT INTO telephonenumbers (ad_id, telephoneNumbers) VALUES (?, ?)';
                        await connection.query(insertTelephoneNumbersQuery, [ad_id, JSON.stringify(telephoneNumbers)]);
                    }
                } catch (error) {
                    await handleQueryError(error, 'Error updating or inserting telephone numbers');
                }
            }

            // Update images data into the images table
            // Remove existing images for the ad_id
            const deleteImagesQuery = 'DELETE FROM images WHERE ad_id = ?';
            try {
                await connection.query(deleteImagesQuery, [ad_id]);
            } catch (error) {
                await handleQueryError(error, 'Error deleting existing images');
            }

            // Insert new images into the images table
            const insertImagesQuery = 'INSERT INTO images (ad_id, imagePath) VALUES (?, ?)';
            for (let imagePath of images) {
                try {
                    await connection.query(insertImagesQuery, [ad_id, imagePath]);
                } catch (error) {
                    await handleQueryError(error, 'Error inserting image');
                }
            }
        };
        
        await handlePromotionInsertion();
        await saveOrUpdateAd();
        await updateTelephoneNumbersAndImages();

// Function to handle category form insertion or update
const handleCategoryFormInsertion = async () => {
    if (formDatas.hasOwnProperty(category_id)) {
        const formData = formDatas[category_id];
        let categoryForm_id;

        // Check if there is an existing form record for the ad_id
        const checkExistingFormQuery = `SELECT * FROM ${formData.table} WHERE ad_id = ?`;
        let existingFormRecord;
        try {
            const [formResults] = await connection.query(checkExistingFormQuery, [ad_id]);
            existingFormRecord = formResults[0];
        } catch (error) {
            await handleQueryError(error, `Error checking existing ${formData.table} record`);
        }

        if (existingFormRecord) {
            // Update existing form record
            formData.values.push(ad_id);
            try {
                await connection.query(formData.updateQuery, formData.values);
                categoryForm_id = existingFormRecord.id; // Assuming there is a unique ID column
            } catch (error) {
                await handleQueryError(error, `Error updating ${formData.table}`);
            }
        } else {
            // Insert new form record
            formData.values.push(ad_id); // Push ad_id as last value
            try {
                const [results] = await connection.query(formData.query, formData.values);
                categoryForm_id = results.insertId;
            } catch (error) {
                await handleQueryError(error, `Error creating ${formData.table}`);
            }
        }
    } else {
        console.error('Invalid category ID');
        return res.status(400).json({ error: 'Invalid category ID' });
    }
};



        await handleCategoryFormInsertion();

        await connection.commit();
        console.log('Transaction committed successfully');
        return res.status(200).json({ message: 'Advertisement saved successfully' });

    } catch (error) {
        console.error('Transaction rolled back due to error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createOrUpdateAdvertisement };
