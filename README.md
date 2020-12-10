## Introduction
Hello reader, my name is Noah Hein and this is my first project as a web developer that has been self-taught for the last 3 months. I am super excited to share this with you all. this readme will be a short tutorial on how to boot up this repo and get it working if you are cloning it onto your device, along with a list of things that I learned along the way making this project, and why I made it in the first place.

## About
I wanted to create a website for my wonderful brother Joseph who is a culinary expert that was looking to expand his catering business into the online space. 
He wanted a website that would let him do the following:
* people would be able to email him about potential catering/private chef events
* Have his contact info and social media listed for potential clients
* He wanted to start delivering recipes to people around town and have them manage their subscription and address from the site.

So for me I had a to-do list to get started on, I needed my project to:
* create and validate users that were able to:
   * pay for different subscriptions that would bill weekly
   * allow them to edit and delete these subscriptions
   * allow them to change their address, and make sure it was within Joseph's delivery range
   * let them pick what dishes they would be recieving and allow them to change it from week to week.


With all of the introductions out of the way lets get to the meat-and-potatoes!

## Database






Before we get into the repo, we need a server to hook it up to, If you want to have it configured exactly as I have you will need to run a postgresDB locally on your machine, I know a lot of people use heroku to spinup a server as well, that should be fine, you will just need to go to the `ormconfig.json` in the located at `root/server/ormconfig.json` and change this section here:
```
{
   "type": "postgres",
   
   "host": "localhost",
   
   "port": 5432,
   
   "username": "postgres",
   
   "password": "admin",
   
   "database": "JWCuisine",
   
   "synchronize": true,
   
   "logging": false,
  } 
  ```
You will need to change the host information along with your ` database ` , ` username `  and ` password ` , although we're using typorm so you could go with any DB  that they support.

If you don't know how to, or haven't run a server locally before you can follow the steps here:  https://www.tutorialspoint.com/postgresql/

They will walk you through getting it installed on your machine and getting it up and running to where you can run psql commands from your terminal!

the DB is the most painful part of the process; so  reader, if you have gotten this far, it should be smooth sailing!

## Stripe

Stripe Docs:
https://stripe.com/docs



The only other config that we have to deal with is hooking up your stripe information in the server and the frontend. Anywhere you see the ` {process.env.<THE_.ENV_VARIABLE>} `
will need to be replaced with a stripe key that you generate. Stripe docs are here to show you how to set this up, but longstory short, you should just need a public key that you use on the frontend, and a private key that you use on the backend, you can obtain these keys from the dashboard, and also roll new ones in case they become comprimised.

there are two seperate subscription mutations, that use seperate pricing models, and there is a `.env` used there as well, You would substitutde the `Price_ID` of a product that you created via the stripe CLI or the stripe dashboard. and just plug it in there.

Using test keys it would look something like this:

 Frontend in your .env file:

* `REACT_APP_STRIPE_KEY=pk_test_51HdzEeJIQLh7k5Y6avX8H0E4tzhNP1DBG5YwNQRepgNUsNDEtoK5yIPRQusxEvdLc0qIFD8usXkzawrcn1dtEwGo00Giughavn9` 
   <--- stripe example public key

 Server in your .env file:

* `STRIPE_KEY=sk_test_51HdzEeJIQLh7k5Y6EpBYW0fe4zbSoDhmD0lMPHzOyT2kSlvML1YDWg8Jzqc3YsSWtxgwWyRQpSZw6jH7xZudVMFF005PdFxbut` 
   ^^^ stripe example private key

* `STRIPE_SUBSCRIPTION_FOR_TWO=<Your Price_ID 1>`

* `STRIPE_SUBSCRIPTION_FOR_FOUR=<Your Price _ID 2>`

Once you have stripe configured, we're ready to start looking at the fun stuff!


## CodeBase

So getting it up and running shouldn't be too much of an issue at this point. We're using yarn, and have two different package.json files to look at. so if we're sitting in the root we need to

1. cd server
2. yarn install
After all of the dependencies are finished downloading we support both yarn watch(using nodemon) and yarn start
3. yarn start
4. we're done! you should get a console.log of the port that the server is on like so:

`🚀 Server ready at http://localhost:4000/graphql`

Now that the server is up, lets go ahead and go over to the frontend

once we cd into the frontend, it'll be the same steps as above:

1. yarn install
After all of the dependencies are finished downloading we should be good to go
2. yarn start.

At this point you should have the browser boot up to localhost:3000 and the site should be functional!

## Conclusion

This concludes the tutorial section this is the first readme I've written, so if you have any feedback or encouner and problems in the actual tutorial steps, please shoot me an email, my contact will be at the bottom!

Here is a list of the tech that I had to learn/use to build the site:

React, ApolloClient, Typeorm, PostgresSQL, Typescript, Yarn, Stripe, GraphQL, Dotenv, Express, Material-UI, and UUID.

Things I learned along the way:
How to make a website responsive
How to consume an API
How to work with a modern JS library
How to consume SOMEBODY ELSES API
How to build an API
How to successfully version your code using git
How to stylize components
How to use cookies
How to use Local Storage
How to build your own Authorization system
How to hash sensitive data that you will hold in your DB
How to handle CORS
How to provide useful errors for your application
How to validate user data

Now to compile a list of resources that I used to learn all of the technologies!

Big shoutout to BenAwad's tutorials, I used his stripe integration with graphql to start out with:

https://www.youtube.com/watch?v=G-Kj8Re6spA&list=PLN3n1USn4xllF5t1GZhEwFQNDnStgupdB&ab_channel=BenAwad
He walks through getting typeORM configured and getting you to the point where you can communicate between your graphql api and the client.

Very basic tutorial on how to use material-ui:
https://www.youtube.com/watch?v=rK0Lz8x7npA&t=295s&ab_channel=DailyWebCoding

Apollo Docs:
https://www.apollographql.com/docs/

Stripe Docs:
https://stripe.com/docs

Lots of the docs I was looking at were pre v16 for React, so they were all using Classes instead of functional components and hooks:
https://www.digitalocean.com/community/tutorials/react-converting-to-a-hook

I needed to track only the shipping address from stripe, and this feature was not easily findable on the stripe docs, but I found a nice blog showing me how to get a shipping token:
https://mattarkin.com/how-to-get-billing-and-shipping-address-data-from-stripe-checkout/

and of course stack overflow!
https://stackoverflow.com/

For any questions or concerns you can email me at: noahjhein@gmail.com, or find me on twitter @NHeinDev.

Thanks for reading!
