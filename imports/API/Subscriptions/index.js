import { RedisPubSub } from 'graphql-redis-subscriptions';

const Redis = require('ioredis');

const options = {
  host: Meteor.settings.REDIS_DOMAIN_NAME,
  port: Meteor.settings.REDIS_PORT_NUMBER,
  password: Meteor.settings.REDIS_PASSWORD,
  retry_strategy: (ops) => {
    // reconnect after
    return Math.max(ops.attempt * 100, 3000);
  },
};


export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
