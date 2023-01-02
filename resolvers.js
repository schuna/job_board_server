// noinspection JSUnresolvedVariable

import {Company, Job, User} from "./db.js";

function rejectIf(condition){
    if(condition){
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
    Query: {
        company: (_root, {id}) => Company.findById(id),
        job: (_root, {id}) => Job.findById(id),
        jobs: async () => Job.findAll(),
        users: async () => User.findAll(),
    },

    Mutation: {
        createJob: (_root, {input}, {user}) => {
            rejectIf(!user);
            return Job.create({...input, companyId: user.companyId });
        },
        deleteJob: async (_root, {id}, {user}) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(user.companyId !== job.companyId);
            return Job.delete(id)
        },
        updateJob: async (_root, {input}, {user}) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(user.companyId !== job.companyId);
            return Job.update({...input, companyId: user.companyId })
        },
        createUser: (_root, {input}) => User.create(input),
    },

    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    },

    Job: {
        company: (job) => {
            return Company.findById(job.companyId);
        },
    },

    User: {
        company: (user) => {
            return Company.findById(user.companyId);
        }
    }
};