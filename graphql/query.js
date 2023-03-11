import {db} from "../db.js";
import {rejectIf} from "./resolvers.js";

export let query = {
    users: async () => db.select().from('users'),
    messages: async (_root, _args, {userId}) => {
        rejectIf(!userId);
        return db.select().from('messages');
    },
    products: async (_root, {filter}, _context) => {
        let filterProducts = await db.select().from('products').then((res) => {
            console.log("json: ", JSON.stringify(res));
            return res;
        }).catch((err) => {
            console.log("err", err);
            return [];
        });

        console.log("filtered: ", filterProducts);
        let reviews = await db.select().from('reviews');
        if (filter) {
            const {onSale, avgRating} = filter;
            if (onSale) {
                filterProducts = filterProducts.filter((product) => {
                    return product.onSale;
                });
            }
            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filterProducts = filterProducts.filter((product) => {
                    let sumRating = 0;
                    let numberOfReviews = 0;
                    reviews.forEach((review) => {
                        if (review.productId === product.id) {
                            console.log("product: ", product);
                            console.log("review: ", review);
                            sumRating += review.Rating;
                            numberOfReviews++
                        }
                    })
                    const avgProductReview = sumRating / numberOfReviews;
                    return avgProductReview >= avgRating;
                })
            }
            return filterProducts;
        } else {
            return filterProducts;
        }
    },
    categories: async () => db.select().from('categories'),
    product: async (_root, {id}) => db.select().from('products').where('id', id).first(),
    category: async (_root, {id}) => db.select().from('categories').where('id', id).first(),
    reviews: async (_root) => db.select().from('reviews')
};