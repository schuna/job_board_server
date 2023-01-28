import DataLoader from "dataloader";
import knex from 'knex';
import {config} from "dotenv";

config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

export const db = knex({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    },
    useNullAsDefault: true
});


db.on('query', ({sql, bindings}) => {
    console.log('[db]', sql, bindings);
});

export function createCompanyLoader() {
    return new DataLoader(async (companyIds) => {
        console.log('[companyLoader] companyIds:', companyIds);
        const companies = await db.select().from('companies').whereIn('id', companyIds);
        return companyIds.map((companyId) => {
            return companies.find((company) => company.id === companyId);
        });
    });
}
