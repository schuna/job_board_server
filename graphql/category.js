import {db} from "../db.js";

export let category = {
    products: ({id: categoryId}, {filter}) => {
        let filteredProducts = db.select().from('products').where(
            'categoryId', categoryId);

        if (filter) {
            // noinspection JSUnresolvedVariable
            filteredProducts = db.select().from('products').where(
                'categoryId', categoryId).where('onSale', filter.onSale)
        }
        return filteredProducts;
    },
};