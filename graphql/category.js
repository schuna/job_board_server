import {db} from "../db.js";

export let category = {
    products: (parent, args, context) => db.select().from('products').where(
        'categoryId', parent.id),
};