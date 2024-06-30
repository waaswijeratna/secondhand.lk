const db = require('../Services/db');

const chatBotFunction = (req, res, next) => {

    const options = {
        initial: [
            { text: 'ad posting related', key: 'option1' },
            { text: 'ad promoting related', key: 'option2' }
        ],
        option1: [
            { text: 'how to post ad', key: 'suboption1.1' },
            { text: 'how do i edit my ad', key: 'suboption1.2' },
            { text: 'how do i delete my ad', key: 'suboption1.3' }
        ],
        option2: [
            { text: 'what are the ad promotions', key: 'suboption2.1' },
            { text: 'what are the payment methods available', key: 'suboption2.2' }
        ],
        'suboption1.1': 'To post an ad, you need to go to the "Post Ad" section, fill out the required information, and submit.',
        'suboption1.2': 'To edit your ad, go to the "My Ads" section, select the ad you want to edit, make the changes, and save.',
        'suboption1.3': 'To delete your ad, go to the "My Ads" section, select the ad you want to delete, and click on the delete button.',
        'suboption2.1': 'Ad promotions include features such as highlighting your ad, placing it at the top of search results, and more.',
        'suboption2.2': 'The available payment methods are credit/debit cards, PayPal, and bank transfers.'
    };

    const userOption = req.body.option;
    const response = options[userOption] || 'Invalid option';
    res.json({ response });

}

module.exports = { chatBotFunction };