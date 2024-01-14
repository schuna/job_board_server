import {db} from "../db.js";
import {rejectIf} from "./resolvers.js";

export let query = {
    users: async () => db.select().from('users'),
    messages: async (_root, _args, {userId}) => {
        rejectIf(!userId);
        return db.select().from('messages');
    },
    expenses: async (_root, {filter}, _context) => {
        let filterExpenses = await db.select().from('expenses').then((res) => {
            return res;
        }).catch((err) => {
            console.log("err", err);
            return [];
        });
        if(filter){
            const {unit} = filter;
            if(unit){
                filterExpenses = filterExpenses.filter(
                    (expense) => {
                        return expense.unit === unit;
                    }
                )
            }
        }
        return filterExpenses;
    },
    expense: async (_root, {id}) => db.select().from('expenses').where('id', id).first()
};