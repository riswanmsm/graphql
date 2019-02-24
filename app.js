const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/api', graphQLHttp({
    schema: buildSchema(`
        type rootQuery{
            events: [String!]!
        }

        type rootMutation{
            createEvent(name: String): String
        }

        schema{
            query: rootQuery
            mutation: rootMutation
        }    
    `),
    rootValue: {
        events: () => {
            return ["wedding", "Sports", "Press Meeting"];
        },
        createEvent: (args) => {
            return args.name;
        }
    },
    graphiql: true
}));

app.listen(8001, () => {
    console.log("Server started on 8001");
});