import {db} from "../db.js";

export let product = {
    category: (parent) => {
        // noinspection JSUnresolvedVariable
        return db.select().from('categories').where(
            'id', parent.categoryId).first()
    },
    reviews: ({id: productId}) => {
        return db.select().from("reviews").where('productId', productId)
    }
};