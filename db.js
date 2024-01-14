import knex from "knex";
import {config} from "dotenv";

config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT} = process.env;

export const db = knex({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: PORT
    },
    useNullAsDefault: true
});

db.on('query', ({sql, bindings}) => {
    console.log('[db]', sql, bindings);
})