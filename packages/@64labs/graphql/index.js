const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

module.exports = ({ typeDefs, resolvers }) => (q, ctx) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const send = () => graphql(schema, q.query, {}, ctx, q.variables, q.operationName)
  return Array.isArray(q) ? Promise.all(q.map(send)) : send(q)
}

