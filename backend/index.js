const cors = require("cors");
require('dotenv').config();
const express = require("express");
//TODO: add a stripe key
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_KEY);
const {v4: uuidv4 } = require("uuid");

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  preflightContinue: true

}

//middleware
app.use(express.json());
app.use(cors(corsConfig));
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
})




//routes
app.get('/', (req, res)=>{
    res.send("your app is working");
})


const session = await stripe.customer.create({
  description: "test customer"
}).then((customer)=>{
  stripe.checkout.sessions.create({
  customer: customer.id,
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_1HmAziJIQLh7k5Y65s1Hyupcq4',
    quantity: 1,
  }, {
    price: 'price_1HmAzHJIQLh7k5Y6ZNUmI5q4',
    quantity: 1,
  }],
  success_url: 'https://localhost:3000',
  cancel_url: 'https://localhost:3000',
});
})
 
  



app.post("/checkout", (req, res)=>{
    const {cart, token} = req.body;
    const amount = cart.reduce((acc, curr) => acc+curr.price, 0);
    console.log("PRODUCT", cart);
    console.log("PRICE", amount);
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: cart.name,
            shipping: {
                name: token.card.name,
                address: {
                    city: token.card.address_city,
                    country: token.card.address_country,
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    postal_code: token.card.address_zip,
                    state: token.card.address_state
                }
            }
        },{idempotencyKey})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))

})

//listen
app.listen(8282, ()=> console.log("listening AT PORT 8282"));