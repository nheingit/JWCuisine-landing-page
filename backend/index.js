const cors = require("cors");
require('dotenv').config();
const express = require("express");
//TODO: add a stripe key
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_KEY);
const {v4: uuidv4 } = require("uuid");

const app = express();

//middleware
app.options('*', cors())

app.use(express.json());
app.use(cors());




//routes
app.get('/', (req, res)=>{
    res.send("your app is working");
})


app.post("/billing", async (req, res)=>{
    const user = req.body;
    const customer = stripe.customers.create({
        email: user.email,
        description: "test user desc"
    }).then((result)=>{
        stripe.billingPortal.sessions.create({
            customer: result.id,
            return_url: user.url
        }).then((response)=>{
            res.redirect(response.url)
        })
    })

});


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