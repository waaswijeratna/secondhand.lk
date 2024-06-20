const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'secondhand'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

const routes=require('./routes/routes')
app.use('/',routes)
/*
// Get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err.stack);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
});

// Add a product to the cart
app.post('/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const query = 'INSERT INTO cart (product_id, quantity) VALUES (?, ?)';

    db.query(query, [product_id, quantity], (err, results) => {
        if (err) {
            console.error('Error adding product to cart:', err.stack);
            res.status(500).send('Error adding product to cart');
            return;
        }
        res.json({ message: 'Product added to cart', cartId: results.insertId });
    });
});

// Get all items in the cart
app.get('/cart', (req, res) => {
    const query = `SELECT cart.id, products.name, products.price, cart.quantity 
                   FROM cart 
                   JOIN products ON cart.product_id = products.id`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching cart items:', err.stack);
            res.status(500).send('Error fetching cart items');
            return;
        }
        res.json(results);
    });
});

// Update the quantity of a product in the cart
app.put('/cart/:id', (req, res) => {
    const cartId = req.params.id;
    const { quantity } = req.body;
    const query = 'UPDATE cart SET quantity = ? WHERE id = ?';

    db.query(query, [quantity, cartId], (err, results) => {
        if (err) {
            console.error('Error updating cart item:', err.stack);
            res.status(500).send('Error updating cart item');
            return;
        }
        res.json({ message: 'Cart item updated' });
    });
});

// Remove an item from the cart
app.delete('/cart/:id', (req, res) => {
    const cartId = req.params.id;
    const query = 'DELETE FROM cart WHERE id = ?';

    db.query(query, [cartId], (err, results) => {
        if (err) {
            console.error('Error deleting cart item:', err.stack);
            res.status(500).send('Error deleting cart item');
            return;
        }
        res.json({ message: 'Cart item deleted' });
    });
});
*/
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});