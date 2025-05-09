const stripe = require('stripe')('sk_test_51PJ9B4P2cTSweUcpkCAAiCk6RAcd1DtxnptaQ0pmXJJfUGyVUez6oXTEHTmdv9Fvbm90mmUM9xdZhDqcOEJ6tVJm001gDs32RW');



const selectedPromotions = async(req, res, next) => {
    const { total_amount } = req.body;
    console.log(total_amount);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total_amount*100,
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
        });
    
        res.status(200).send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
        
};

module.exports = { selectedPromotions};

