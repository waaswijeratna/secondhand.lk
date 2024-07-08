const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./Routes/routes");
const http = require('http');
const initializeSocket = require('./Services/socket');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin: "*",
// }));

// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());

// // Serve static files from the Angular app
// app.use(express.static('public'));

const server = http.createServer(app);

const io = initializeSocket(server);
app.set('io', io);

app.use(routes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
