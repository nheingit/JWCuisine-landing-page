const recipes = [
    {title: 'Pan Seared Halibut',
description: 'Pan Seared Halibut with a chilled Cauliflower Puree, Roasted Asparagus, Cauliflower, & Caramelized Onion Petals',
price: 80.00,
purchaseTitle: '$80 Monthly',
purchaseDescription: `purchase of this package includes 3 servings of 'Pan Seared Halibut' per week delivered to your doorstep ready for you to heat up and enjoy!`,
imageUrl: process.env.PUBLIC_URL+ '/assets/Halibut.jpg',
id:0,
time: 1500,},

{title: 'unknown',
description: 'I should be learning to make stuff like this!',
price: 80.00,
purchaseTitle: '$80 Monthly',
purchaseDescription: `purchase of this package includes 3 servings of 'unknown' per week delivered to your doorstep ready for you to heat up and enjoy!`,
imageUrl: process.env.PUBLIC_URL + '/assets/otherfood.jpg',
id:1,
time:1500,},
];
export default recipes;