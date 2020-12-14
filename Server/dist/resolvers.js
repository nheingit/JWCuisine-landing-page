"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = require("./entity/User");
const argon2 = require("argon2");
const stripe_1 = require("./stripe");
const zipCodeChecker_1 = require("./zipCodeChecker");
exports.resolvers = {
    Query: {
        me: (_, __, { req }) => {
            if (!req.session.userId) {
                return null;
            }
            return User_1.User.findOne(req.session.userId);
        }
    },
    Mutation: {
        register: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPassword = yield argon2.hash(password);
            yield User_1.User.create({
                email,
                password: hashedPassword
            }).save();
            return true;
        }),
        login: (_, { email, password }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            const valid = yield argon2.verify(user.password, password);
            if (!valid) {
                return null;
            }
            req.session.userId = user.id;
            return user;
        }),
        logout: (_, __, { req }) => {
            const user = User_1.User.findOne(req.session.userId);
            if (!user) {
                throw new Error("no user to logout");
            }
            new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err)
                        reject(err);
                    resolve();
                });
            });
        },
        createSubscriptionFour: (_, { source, ccLast4, shippingAddress }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user) {
                throw new Error();
            }
            if (!zipCodeChecker_1.default(shippingAddress.postal_code)) {
                throw new apollo_server_express_1.UserInputError("invalid zipcode, we only serve San Antonio currently");
            }
            let postalCode = user.postalCode;
            let stripeId = user.stripeId;
            if (!stripeId) {
                const customer = yield stripe_1.stripe.customers.create({
                    email: user.email,
                    source,
                    address: {
                        city: shippingAddress.city,
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2,
                        postal_code: shippingAddress.postal_code,
                        state: shippingAddress.state
                    }
                });
                postalCode = customer.address.postal_code.replace(/^"(.+(?="$))"$/, '$1');
                stripeId = customer.id;
            }
            else {
                yield stripe_1.stripe.customers.update(stripeId, {
                    source,
                    address: {
                        city: shippingAddress.city,
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2,
                        postal_code: shippingAddress.postal_code,
                        state: shippingAddress.state
                    }
                }).then(stripeCustomer => {
                    postalCode = stripeCustomer.address.postal_code.replace(/^"(.+(?="$))"$/, '$1');
                });
            }
            const subscription = yield stripe_1.stripe.subscriptions.create({
                customer: stripeId,
                items: [{
                        plan: process.env.STRIPE_SUBSCRIPTION_FOR_FOUR
                    }]
            });
            user.postalCode = postalCode;
            user.priceId = subscription.id;
            user.stripeId = stripeId;
            user.ccLast4 = ccLast4;
            user.type = "paid";
            console.log(user);
            yield user.save();
            return user;
        }),
        createSubscription: (_, { source, ccLast4, shippingAddress }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user) {
                throw new Error();
            }
            if (!zipCodeChecker_1.default(shippingAddress.postal_code)) {
                throw new apollo_server_express_1.UserInputError("invalid zipcode, we only serve San Antonio currently");
            }
            let postalCode = user.postalCode;
            let stripeId = user.stripeId;
            if (!stripeId) {
                const customer = yield stripe_1.stripe.customers.create({
                    email: user.email,
                    source,
                    address: {
                        city: shippingAddress.city,
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2,
                        postal_code: shippingAddress.postal_code,
                        state: shippingAddress.state
                    }
                });
                postalCode = customer.address.postal_code.replace(/^"(.+(?="$))"$/, '$1');
                stripeId = customer.id;
            }
            else {
                yield stripe_1.stripe.customers.update(stripeId, {
                    source,
                    address: {
                        city: shippingAddress.city,
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2,
                        postal_code: shippingAddress.postal_code,
                        state: shippingAddress.state
                    }
                }).then(stripeCustomer => {
                    postalCode = stripeCustomer.address.postal_code.replace(/^"(.+(?="$))"$/, '$1');
                });
            }
            const subscription = yield stripe_1.stripe.subscriptions.create({
                customer: stripeId,
                items: [{
                        plan: process.env.STRIPE_SUBSCRIPTION_FOR_TWO
                    }]
            });
            user.postalCode = postalCode;
            user.priceId = subscription.id;
            user.stripeId = stripeId;
            user.ccLast4 = ccLast4;
            user.type = "paid";
            console.log(user);
            yield user.save();
            return user;
        }),
        addDishToSubscription: (_, { foodDishData }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user || !user.stripeId || user.type !== "paid") {
                throw new Error();
            }
            const response = yield stripe_1.stripe.customers.update(user.stripeId, {
                metadata: {
                    dishOne: foodDishData.dishOne,
                    dishTwo: foodDishData.dishTwo,
                    dishThree: foodDishData.dishThree,
                    dishFour: foodDishData.dishFour,
                }
            });
            console.log(response);
            response;
            return user;
        }),
        changeCreditCard: (_, { source, ccLast4, shippingAddress }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user || !user.stripeId || user.type !== "paid") {
                throw new Error();
            }
            if (!zipCodeChecker_1.default(shippingAddress.postal_code)) {
                throw new apollo_server_express_1.UserInputError("invalid zipcode, we only serve San Antonio currently");
            }
            let postalCode = user.postalCode;
            yield stripe_1.stripe.customers.update(user.stripeId, {
                source,
                address: {
                    city: shippingAddress.city,
                    line1: shippingAddress.line1,
                    line2: shippingAddress.line2,
                    postal_code: shippingAddress.postal_code,
                    state: shippingAddress.state
                }
            }).then(stripeCustomer => {
                postalCode = stripeCustomer.address.postal_code.replace(/^"(.+(?="$))"$/, '$1');
            });
            ;
            user.postalCode = postalCode;
            user.ccLast4 = ccLast4;
            yield user.save();
            return user;
        }),
        cancelSubscription: (_, __, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session || !req.session.userId) {
                throw new Error("not authenticated");
            }
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user || !user.stripeId || user.type !== "paid") {
                throw new Error("no subscription to cancel");
            }
            const stripeCustomer = yield yield stripe_1.stripe.customers.retrieve(user.stripeId);
            const customerSubscription = yield stripe_1.stripe.subscriptions.retrieve(user.priceId);
            yield stripe_1.stripe.subscriptions.del(customerSubscription.id);
            if (!stripeCustomer.deleted) {
                yield stripe_1.stripe.customers.deleteSource(user.stripeId, stripeCustomer.default_source);
            }
            user.type = "free-trial";
            yield user.save();
            return user;
        })
    }
};
//# sourceMappingURL=resolvers.js.map