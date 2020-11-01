const cors = require("cors");
const express = require("express");
//TODO: add a stripe key
const stripe = require("stripe")(process.env.STRIPE_KEY);
const {v4: uuidv4 } = require("uuid");

const app = express();

//middleware

app.use(express.json());
app.use(cors());


//routes
app.get('/', (req, res)=>{
    res.send("your app is working");
})

app.post("/checkout", (req, res)=>{
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        },{idempotencyKey})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))

})

//listen
app.listen(8282, ()=> console.log("listening AT PORT 8282"));