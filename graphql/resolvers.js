import {PubSub} from 'graphql-subscriptions';
import {subscription} from "./subscription.js";
import {query} from "./query.js";
import {category} from "./category.js";
import {product} from "./product.js";
import {mutation} from "./mutation.js";

export const pubSub = new PubSub();

export function rejectIf(condition) {
    if (condition) {
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
    Query: query,
    Category: category,
    Product: product,
    Mutation: mutation,
    Subscription: subscription,
};