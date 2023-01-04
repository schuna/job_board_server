// noinspection JSUnresolvedVariable

import {companyLoader, db} from "./db.js";
import {nanoid} from "nanoid";

function rejectIf(condition) {
    if (condition) {
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
        Query: {
            company: async (_root, {id}) => {
                return db.select().from('companies').where('id', id).first();
            },
            job: async (_root, {id}) => {
                return db.select().from('jobs').where('id', id).first();
            },
            jobs: async () => {
                return db.select().from('jobs');
            },
            users: async () => {
                return db.select().from('users');
            },
        },

        Mutation: {
            createJob: async (_root, {input}, {user}) => {
                rejectIf(!user);
                const job = {
                    id: nanoid(),
                    companyId: user.companyId,
                    ...input,
                };
                await db.insert(job).into('jobs');
                return job;
            },
            deleteJob: async (_root, {id}, {user}) => {
                rejectIf(!user);
                const job = await db.select().from('jobs').where('id', id).first();
                rejectIf(job.companyId !== user.companyId);
                return db.del().from('jobs').where('id', id);
            },
            updateJob: async (_root, {input}, {user}) => {
                rejectIf(!user);
                const job = await db.select().from('jobs').where('id', input.id).first();
                rejectIf(user.companyId !== job.companyId);
                return db.update({...input, companyId: user.companyId},
                    ['id', 'title', 'companyId', 'description']).from('jobs').where('id', input.id);
            },
            createUser: async (_root, {input}) => {
                const user = {
                    id: nanoid(),
                    ...input,
                }
                await db.insert(user).into('users');
                return user;
            },
        },

        Company: {
            jobs: async (company) => {
                return db.select().from('jobs').where('companyId', company.id);
            },
        },

        Job: {
            company: async (job) => {
                return await companyLoader.load(job.companyId);
            },
        },

        User: {
            company: async (user) => {
                return db.select().from('companies').where('id', user.companyId).first();
            },
        }
    }
;