const express = require('express')
const bodyParser = require('body-parser')
const GraphqlHandler = require('@64labs/graphql')

const graphql = GraphqlHandler({
  typeDefs: `
    type Animal {
      name: String
      species: String
    }

    type Query {
      animals: [Animal]
    }
  `,
  resolvers: {
    Query: {
      animals: root => [{ name: 'Fruit Cup', species: 'Hamster' }]
    }
  }
})

const app = express()

app.use(bodyParser.json())

app.post('/graphql', async ({ body }, res) => {
  res.json(await graphql(body, {}))
})

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening at :${listener.address().port}`)
)
