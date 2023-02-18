import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServer} from '@apollo/server';
import {expressMiddleware as apolloExpress} from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import {expressjwt} from "express-jwt";
import {readFile} from 'fs/promises';
import {useServer as useWsServer} from 'graphql-ws/lib/use/ws';
import {createServer as createHttpServer} from 'http';
import jwt from 'jsonwebtoken';
import {WebSocketServer} from 'ws';
import {db} from './db.js';
import {resolvers} from "./resolvers.js";

const PORT = 9000;
const JWT_SECRET = Buffer.from('eeb23d6a-8c7d-4c00-a8ca-f9b11d03fe3e', 'base64');

const app = express();

app.use(cors());
app.use(express.json());
app.use(expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret: JWT_SECRET
}))

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    const user = await db.select().from('users').where('email', email).first();
    if (user && user.password === password) {
        const token = jwt.sign({sub: user.email}, JWT_SECRET);
        res.json({token});
    } else {
        res.sendStatus(401);
    }
});

/**
 * Http Context
 */
function getHttpContext({req}){
    if(req.auth){
        return {userId: req.auth.sub};
    }
    return {};
}

function getWsContext({connectionParams}){
    const token = connectionParams?.accessToken;
    if(token){
        const payload = jwt.verify(token, JWT_SECRET);
        return {userId: payload.sub};
    }
    return {};
}
/**
 * GraphQL
 */

const typeDefs = await readFile('./schema.graphql', 'utf-8');
const schema = makeExecutableSchema({typeDefs, resolvers});

/**
 * Create HTTP server.
 */
const httpServer = createHttpServer(app);
const wsServer = new WebSocketServer({server: httpServer, path: '/graphql'});
useWsServer({schema, context: getWsContext}, wsServer);

const apolloServer = new ApolloServer({schema});
await apolloServer.start();
app.use('/graphql', apolloExpress(apolloServer, {context: getHttpContext}));
httpServer.listen({port: PORT}, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});