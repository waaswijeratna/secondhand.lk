const connection = require('../../services/connection');

async function displaycart(req, res) {
    const sql = `SELECT * FROM cart`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log("Error fetching cart items:", err);
            return res.status(500).json({ error: "Error occurred while fetching cart items" });
        }

        console.log("Cart items retrieved successfully");
        res.status(200).json({ cartItems: result });
    });
}

module.exports = displaycart;
