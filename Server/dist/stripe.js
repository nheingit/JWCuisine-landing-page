"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = require("stripe");
exports.stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: '2020-08-27',
});
//# sourceMappingURL=stripe.js.map