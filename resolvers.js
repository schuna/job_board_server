import {db} from './db.js';
import {PubSub} from 'graphql-subscriptions';
import {nanoid} from "nanoid";

const pubSub = new PubSub();

function rejectIf(condition) {
    if (condition) {
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
    Query: {
        users: async () => db.select().from('users'),
        messages: async (_root, _args, {userId}) => {
            rejectIf(!userId);
            return db.select().from('messages');
        }
    },
    Mutation: {
        createUser: async (_root, {input}) => {
            const user = {
                id: nanoid(),
                ...input,
            }
            await db.insert(user).into('users');
            await pubSub.publish('USER_ADDED', {userAdded: user});
            return user;
        },
        addMessage: async (_root, {input}, {userId}) => {
            rejectIf(!userId);
            const message = {
                id: nanoid(),
                from: userId,
                text: input.text
            }
            await db.insert(message).into('messages')
            await pubSub.publish('MESSAGE_ADDED', {messageAdded: message});
            return message;
        }
    },
    Subscription: {
        userAdded: {
            subscribe: (__root, _args, {userId}) => {
                rejectIf(!userId);
                return pubSub.asyncIterator('USER_ADDED');
            },
        },
        messageAdded: {
            subscribe: (_root, _args, {userId}) => {
                rejectIf(!userId);
                return pubSub.asyncIterator('MESSAGE_ADDED');
            }
        }
    },
};