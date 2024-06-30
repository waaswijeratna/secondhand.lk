const db = require('../Services/db');

const sendCategoryDetails = async (req, res, next) => {
  try {
    const ad_id = req.body.ad_id; // Assuming ad_id is sent in the request body
    const category_id = req.body.category_id; // Assuming category_id is sent in the request body

    // Determine table name based on category_id
    let tableName;
    switch (category_id) {
      case 1:
        tableName = 'vehiclesform';
        break;
      case 2:
        tableName = 'property';
        break;
      case 3:
        tableName = 'electronicsform';
        break;
      case 4:
        tableName = 'fashionform';
        break;
      case 5:
        tableName = 'homeappliancesform';
        break;
      case 6:
        tableName = 'furniturehomedecorsform';
        break;
      case 7:
        tableName = 'sportandfitnessform';
        break;
      case 8:
        tableName = 'musicalinstrumentform';
        break;
      case 9:
        tableName = 'animalsform';
        break;
      case 10:
        tableName = 'toolsandequipmentform';
        break;
      case 11:
        tableName = 'educationform';
        break;
      case 12:
        tableName = 'otherform';
        break;
      default:
        throw new Error('Invalid category_id');
    }

    // Construct SQL query
    const query = `SELECT * FROM ${tableName} WHERE ad_id = ?`;
    
    // Execute query
    const results = await db.query(query, [ad_id]);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error in sendCategoryDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { sendCategoryDetails };
