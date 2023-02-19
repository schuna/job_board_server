import {nanoid} from "nanoid";
import {db} from "../db.js";
import {pubSub, rejectIf} from "./resolvers.js";

export let mutation = {
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
};