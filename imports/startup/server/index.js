import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Schema } from './schema';
import { setupApi } from './express-server';

// make schema executable
const schema = Schema();
const server = express();
const context = {};

server.use('*', cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({
  graphiql: true,
  schema,
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'http://localhost:3000/subscriptions',
}));

// Set up the WebSocket for handling GraphQL subscriptions
new SubscriptionServer({
  execute,
  subscribe,
  schema,
  // on connect subscription lifecycle event
  onConnect: (connectionParams, webSocket) => {
    console.log('connection', webSocket.upgradeReq.headers['sec-websocket-key']);
  },
  onDisconnect: (webSocket, req) => {
    console.log('disconnected', req.request.headers['sec-websocket-key']);
  },
}, {
  server: WebApp.httpServer,
  path: '/subscriptions',
});

Meteor.startup(() => {
  setupApi();
  WebApp.connectHandlers.use(server);
});
