## Introduction

I am super excited to share this with you all. This `README` will be a short tutorial on how to boot up this repo and get it working if you are cloning it onto your device. It also includes a list of things that I learned along the way while making the project, and why I made it in the first place.

## About

I wanted to create a website for my wonderful brother Joseph. He is a culinary expert looking to expand his catering business into the online space. 
He wanted a website that would let him do the following:
* People would be able to email him about potential catering/private chef events
* Have his contact info and social media listed for potential clients
* He wanted to start delivering recipes to people around town and have them manage their subscription and address from the site.

So for me I had a to-do list to get started on, I needed my project to:
* Create and validate users that were able to:
   * pay for different subscriptions that would bill weekly
   * allow them to edit and delete these subscriptions
   * allow them to change their address, and make sure it was within Joseph's delivery range
   * let them pick what dishes they would be receiving and allow them to change it from week to week.
* Aggregate all of his contact information and social media links
* Stay consistent with his current branding theme

With all of the introductions out of the way lets get to the meat-and-potatoes!

## Database

Before we get into the repo, we need a server to hook it up to. If you want to have it configured exactly as I have you will need to run a Postgres database locally on your machine. I know a lot of people use heroku to spin up a server as well. That should be fine, you will just need to go to the `ormconfig.json` file located at `root/server/ormconfig.json` and change the following section:

```json
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

You will need to change the host information along with your `database`, `username`, and `password`. We're using typeORM so you could go with any database that they support. If you haven't run a server locally before you can [follow these steps](https://www.tutorialspoint.com/postgresql/).

They will walk you through getting it installed on your machine and getting it up and running to where you can run psql commands from your terminal! The DB is the most painful part of the process; so reader, if you have gotten this far, it should be smooth sailing!

## Stripe

The only other config that we have to deal with is hooking up your stripe information in the server and the frontend. Anywhere you see `{process.env.<THE_.ENV_VARIABLE>}` it will need to be replaced with a generated stripe key. [Stripe's documentation](https://stripe.com/docs) is here to show you how to set this up. But, long story short, you should just need:
* a public key you use on the frontend
* a private key you use on the backend

You can obtain these keys from the dashboard, and also roll new ones in case they become compromised. There are two separate subscription mutations that use separate pricing models. There is a `.env` used there as well. You would substitute the `Price_ID` of a product that you created via the Stripe CLI/dashboard and plug it in there. Using test keys it would look something like this:

#### Example public key - Frontend in `.env` file

* `REACT_APP_STRIPE_KEY=pk_test_51HdzEeJIQLh7k5Y6avX8H0E4tzhNP1DBG5YwNQRepgNUsNDEtoK5yIPRQusxEvdLc0qIFD8usXkzawrcn1dtEwGo00Giughavn9` 

#### Example private key - Server in `.env` file

* `STRIPE_KEY=sk_test_51HdzEeJIQLh7k5Y6EpBYW0fe4zbSoDhmD0lMPHzOyT2kSlvML1YDWg8Jzqc3YsSWtxgwWyRQpSZw6jH7xZudVMFF005PdFxbut` 
* `STRIPE_SUBSCRIPTION_FOR_TWO=<Your Price_ID 1>`
* `STRIPE_SUBSCRIPTION_FOR_FOUR=<Your Price _ID 2>`

Once you have Stripe configured, we're ready to start looking at the fun stuff!

## CodeBase

Getting it up and running shouldn't be too much of an issue at this point. We're using `yarn`, and have two different `package.json` files to look at. If we're sitting in the root we need to `cd` into `server` and run `yarn install`.

```bash
cd server
yarn install
```

After all of the dependencies are finished downloading we support both `yarn watch` (using nodemon) and `yarn start`.

```bash
yarn start
```

We are done! You should get a `console.log` of the port that the server is on like so:

`🚀 Server ready at http://localhost:4000/graphql`

Now that the server is up, let's go ahead and go over to the frontend. Once we `cd` into the frontend, it'll be the same steps as above:

```bash
yarn install
```

After all of the dependencies are finished downloading we should be good to go:

```bash
yarn start
```

At this point you should have the browser boot up to [localhost:3000](https://localhost:3000) and the site should be functional!

## Conclusion and Takeaways

This concludes the tutorial section this is the first readme I've written, so if you have any feedback or encounter and problems in the actual tutorial steps, please shoot me an email, my contact will be at the bottom! Here is a list of the tech that I had to learn/use to build the site:

* React
* ApolloClient
* TypeORM
* PostgresSQL
* Typescript
* Yarn
* Stripe
* GraphQL
* Dotenv
* Express
* Material-UI
* UUID

### Things I learned along the way

* How to make a website responsive
* How to consume an API
* How to work with a modern JS library
* How to consume SOMEBODY ELSES API
* How to build an API
* How to successfully version your code using git
* How to stylize components
* How to use cookies
* How to use Local Storage
* How to build your own Authorization system
* How to hash sensitive data that you will hold in your DB
* How to handle CORS
* How to provide useful errors for your application
* How to validate user data

## Resources

Now to compile a list of resources that I used to learn all of the technologies!

* Big shoutout to Ben Awad, I used his [stripe integration with graphql tutorials](https://www.youtube.com/watch?v=G-Kj8Re6spA&list=PLN3n1USn4xllF5t1GZhEwFQNDnStgupdB&ab_channel=BenAwad) to start out with.
  * He walks through getting typeORM configured
  * He gets you to the point where you can communicate between your graphql api and the client
* [Very basic tutorial on how to use material-ui](https://www.youtube.com/watch?v=rK0Lz8x7npA&t=295s&ab_channel=DailyWebCoding)
* [Apollo Documenation](https://www.apollographql.com/docs/)
* [Stripe Documenation](https://stripe.com/docs)
* Lots of the docs I was looking at were pre v16 for React, so they were all using [Classes instead of functional components and hooks](https://www.digitalocean.com/community/tutorials/react-converting-to-a-hook)
* I found a nice blog showing me [how to get a shipping token](https://mattarkin.com/how-to-get-billing-and-shipping-address-data-from-stripe-checkout/)
  * I needed to track only the shipping address from Stripe but this feature was not easily findable on the stripe docs
* Of course [stack overflow!](https://stackoverflow.com/)

For any questions or concerns you can email me at noahjhein@gmail.com, or find me on twitter @NHeinDev.

Thanks for reading!
