const express = require('express');
const bodyParser = require('body-parser')
const GraphqlHandler = require('./graphql')

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
  resolvers:{ 
    Query: {
      animals: root => ([{name: 'Fruit Cup', species: 'Hamster'}])
    }
  }
})

const app = express()

app.use(bodyParser.json())

app.post("/graphql", async ({body}, res) => {
  res.json(await graphql(body, {}))
});

const listener = app.listen(
  process.env.PORT,
  () => console.log(`Listening at :${process.env.PORT}`)
);
