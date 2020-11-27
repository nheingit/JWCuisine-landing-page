const recipes = [
    {title: 'Recipes for two',
description: '3 Meals that make two servings, delivered to your door weekly!',
price: 80,
purchaseTitle: '$80 Monthly',
purchaseDescription: `purchase of this package includes 3 servings of 'Pan Seared Halibut' per week delivered to your doorstep ready for you to heat up and enjoy!`,
imageUrl: process.env.PUBLIC_URL+'/assets/planForTwo.png',
id:0,
quantity:0,
time: 1500,},

{title: 'Recipes for four',
description: '3 Meals that make four servings, delivered to your door weekly!',
price: 80,
purchaseTitle: '$80 Monthly',
purchaseDescription: `purchase of this package includes 3 servings of 'unknown' per week delivered to your doorstep ready for you to heat up and enjoy!`,
imageUrl: process.env.PUBLIC_URL+'/assets/planForFour.png',
id:1,
quantity:0,
time:1500,},
];
export default recipes;