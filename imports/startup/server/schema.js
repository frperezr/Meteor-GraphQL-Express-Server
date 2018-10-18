import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

// User Schema
import UsersSchema from '../../API/Users/User.graphql';
import UsersResolvers from '../../API/Users/resolvers';

export function Schema() {
  const typeDefs = [
    UsersSchema,
  ];

  const resolvers = merge(
    UsersResolvers,
  );

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
}
