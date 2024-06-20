const express = require('express');
const bodyparser = require ('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const connection  = require('./services/connection');
const routes = require('./routes/routes')


dotenv.config();

const app = express();

app.use(cors({       // Allow requests from specific origins (CORS configuration)
    origin : "http://localhost:4200",
}));

app.use(bodyparser.urlencoded({ extended: true}));    // Parse URL-encoded bodies and JSON bodies
app.use(bodyparser.json());
app.use(routes);


app.listen(process.env.PORT, ()=>{// Start the server, listening on the configured port
    console.log("Server is running on port :"+ process.env.PORT);
});
