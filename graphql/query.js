import {db} from "../db.js";
import {rejectIf} from "./resolvers.js";

export let query = {
    users: async () => db.select().from('users'),
    messages: async (_root, _args, {userId}) => {
        rejectIf(!userId);
        return db.select().from('messages');
    },
    products: async () => db.select().from('products'),
    categories: async () => db.select().from('categories'),
    product: async (_root, {id}) => db.select().from('products').where('id', id).first(),
    category: async (_root, {id}) => db.select().from('categories').where('id', id).first(),
};