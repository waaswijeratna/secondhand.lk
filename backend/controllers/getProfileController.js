const db = require("../models/db");

const getProfile = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
        const search_query = connection.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw err;
            if (result.length == 0) {
                console.log("--------> User does not exist");
                return res.sendStatus(404);
            } else {
                const email = result[0].email;
                const firstName = result[0].firstName;
                const lastName = result[0].lastName;
                const location = result[0].location;
                const subLocation = result[0].subLocation;
                return res.json({ email, firstName, lastName, location, subLocation });
            }
        });
    });
};

module.exports = getProfile;
