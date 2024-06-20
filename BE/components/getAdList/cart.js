const connection = require('../../services/connection');

async function cart(req, res) {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json("Product ID and quantity are required");
    }

    const sql = `INSERT INTO cart(product_id, quantity) VALUES (?, ?)`;

    connection.query(sql, [product_id, quantity], (err, result) => {
        if (err) {
            console.log("Error inserting product into cart:", err);
            return res.status(500).json("Error occurred");
        }

        console.log("Product added to cart");
        res.status(201).json({ result: result });
    });
}

module.exports = cart;
