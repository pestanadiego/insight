const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();

const stripe = new Stripe('sk_test_51JyIhdBhuxwlUlvDY4K45jBr1gvmu1Ku3CFo1mSLAGBzTgQbCvxFpH7ddA6D7VVrmdlLU5J24jrelKgXkPcfu9WL00mRI2lMuE');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());



app.post('/api/checkout', async (req, res) => {

    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Cita",
        payment_method: id,
        confirm: true
    });

    console.log(payment);
    res.send({message: 'Pago exitoso'});

})



app.listen(3001, () => {
    console.log('Server on port', 3001);
})