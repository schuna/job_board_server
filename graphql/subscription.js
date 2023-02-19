import {pubSub, rejectIf} from "./resolvers.js";

export let subscription = {
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
};