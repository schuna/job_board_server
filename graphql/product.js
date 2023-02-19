import {db} from "../db.js";

export let product = {
    category: (parent, args, context) => {
        // noinspection JSUnresolvedVariable
        return db.select().from('categories').where(
            'id', parent.categoryId).first()
    },
};