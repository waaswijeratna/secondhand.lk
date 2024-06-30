const generateAccessToken = require('../generateAccessToken');

const ThirdPartyAuth = async (req, res, next) => {

    try{
        const user = req.user;
        const token = generateAccessToken({ id: user.id, email: user.email });
        res.json({ accessToken: token });
        // res.redirect('http://localhost:4200/homepage');
    } catch (error) {
        console.error('Error during third party authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = ThirdPartyAuth;
