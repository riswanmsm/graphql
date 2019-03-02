const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const uniqueId = require('uuid/v4');

const app = express();

app.use(bodyParser.json());

let events = [];

app.use('/api', graphQLHttp({
    schema: buildSchema(`

        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input InputEvent{
            title: String!
            description: String!
            price: Float!
        }

        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(inputEvent: InputEvent): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }    
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            let event = {
                _id: uniqueId(),
                title: args.inputEvent.title,
                description: args.inputEvent.description,
                price: +args.inputEvent.price,
                date: new Date().toISOString()
            }
            events.push(event);
            return event;
        }
    },
    graphiql: true
}));

app.get('/test', (req, res, next) => {
    res.sendFile(__dirname + '/test.html');
});

app.listen(8101, () => {
    console.log("Server started on 8101");
});