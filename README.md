This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

Hello reader, this readme will be a short tutorial on how to boot up this repo and get it working if you are cloning it onto your device, along with a list of things that I learned along the way making this project!

Before we get into the repo, we need a server to hook it up to, If you want to have it configured exactly as I have you will need to run a postgresDB locally on your machine, I know a lot of people use heroku to spinup a server as well, that should be fine, you will just need to go to the ormconfig.json in the server directory and change this section here:

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

You should just need to change the host information, although we're using typorm so you could go with any DB  that they support.

If you don't know how to, or haven't run a server locally before you can follow the steps here: https://www.tutorialspoint.com/postgresql/

They will walk you through getting it installed on your machine and getting it up and running to where you can run psql commands from your terminal!

the DB is the most painful part of the process, so if we've gotten this far, it should be smooth sailing!




The only other config that we have to deal with is hooking up your stripe information in the server and the frontend. Anywhere you see the {process.env.YOUR_SECRET_KEY}

Will need to be replaced with a stripe key that you generate. Stripe docs are at the bottom to show you how to set this up, but longstory short, you should just need a public key that you use on the frontend, and a private key that you use on the backend.

I have two seperate subscription mutations, that use seperate pricing models, and there is a .env used there as well, You would substitutde the Price_ID of a product that you created via the stripe CLI or the stripe dashboard. and just plug it in there.

Using test keys it would look something like this:

Frontend in your .env file:

REACT_APP_STRIPE_KEY=pk_test_51HdzEeJIQLh7k5Y6avX8H0E4tzhNP1DBG5YwNQRepgNUsNDEtoK5yIPRQusxEvdLc0qIFD8usXkzawrcn1dtEwGo00Giughavn9 <--- stripe public key

Server in your .env file:

STRIPE_KEY=sk_test_51HdzEeJIQLh7k5Y6EpBYW0fe4zbSoDhmD0lMPHzOyT2kSlvML1YDWg8Jzqc3YsSWtxgwWyRQpSZw6jH7xZudVMFF005PdFxbut <--- stripe private key

STRIPE_SUBSCRIPTION_FOR_TWO=<Your Price ID 1>

STRIPE_SUBSCRIPTION_FOR_FOUR=<Your Price ID 2>




So getting it up and running shouldn't be too much of an issue at this point. We're using yarn, and have two different package.json files to look at. so if we're sitting in the root we need to

1. cd server
2. yarn install
After all of the dependencies are finished downloading we support both yarn watch(using nodemon) and yarn start
3. yarn start
4. we're done! you should get a console.log of the port that the server is on like so:

🚀 Server ready at http://localhost:4000/graphql

Now that the server is up, lets go ahead and go over to the frontend

once we cd into the frontend, it'll be the same steps as above:

1. yarn install
After all of the dependencies are finished downloading we should be good to go
2. yarn start.

At this point you should have the browser boot up to localhost:3000 and the site should be functional.

This concludes the tutorial section this is the first readme I've written, so if you have any feedback or encouner and problems in the actual tutorial steps, please shoot me an email!

Noahjhein@gmail.com
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
How to use cookies.
How to build your own Authorization system
How to hash sensitive data that you will hold in your DB
How to handle CORS
How to provide useful errors for your application
How to validate user data

Now to compile a list of resources that I used to learn all of the technologies!

Big shoutout to BenAwad's tutorials, I used his stripe integration with graphql to start out with:

https://www.youtube.com/watch?v=G-Kj8Re6spA&list=PLN3n1USn4xllF5t1GZhEwFQNDnStgupdB&ab_channel=BenAwad
He walks through getting typeORM configured and getting you to the point where you can communicate

Very basic tutorial on how to use material-ui:
https://www.youtube.com/watch?v=rK0Lz8x7npA&t=295s&ab_channel=DailyWebCoding

Apollo Docs:
https://www.apollographql.com/docs/

Stripe Docs:
https://stripe.com/docs

Lots of the docs I was looking at were pre v16 for React, so they were all using Classes instead of functional components and hooks:
https://www.digitalocean.com/community/tutorials/react-converting-to-a-hook

and of course stack overflow!
https://stackoverflow.com/

Overall this has been my first project as a software developer, and in a few years(probably months honestly) I know I will look back at this code and cringe at how I decide to structure everything and  how I wrote code, but I am pretty proud of my finished product, and it has taught me more than I could have ever hoped for or expected!
