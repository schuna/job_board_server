import {db} from "../db.js";

export let category = {
    products: ({id: categoryId}) => db.select().from('products').where(
        'categoryId', categoryId),
};