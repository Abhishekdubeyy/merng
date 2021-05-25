const {ApolloServer} = require('apollo-server');

const mongoose = require ('mongoose');


const typeDefs = require('./graphql/typeDefs');
const  resolvers = require('./graphql/resolvers/index.js');
const { MONGODB } = require ('./config.js');   



const server = new ApolloServer({
    typeDefs,
    resolvers       
});


//connecting to database /////////
mongoose
    .connect(MONGODB, { useNewUrlParser : true })  //otherwise will give deprecation warning if we dont
    .then(() => {
        console.log('Mongodb connected');  //to show db connected
        return server.listen({ port : 5000 });
    }) 
    .then((res) => {                      //server.listen({port: 5000}) //server running
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })

    // opeining link transfer us to graphql page