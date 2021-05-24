const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require ('mongoose');

const  Post  =require('./models/Post');
const { MONGODB } = require ('./config');   
const typeDefs = gql`
        type Post {
            id: ID!
            body: String!
            createdAt: String!
            username: String!
        }
    type Query {
         
        getPosts: [Post]

    }
`;

const resolvers = { //correspoding resolvers to return what query returns
    Query: {
        async getPosts() {
            try {
                //if query fails and we dont use this the actual server might fail
                const posts = await find();
                return posts;
            }   catch(err) {
                throw new Error(err);
            }
        }
    } 
};

const server = new ApolloServer({
    typeDefs,
    resolvers       //setting apoolo server
});


//connecting to database /////////
mongoose
    .connect(MONGODB, { useNewUrlParser : true })  //otherwise will give deprecation warning if we dont
    .then(() => {
        console.log('Mongodb connected');  //to show db connected
        return server.listen({ port : 5000 });
    }) 
    .then((res) => {                      //server.listen({port: 5000}) //server running
        console.log(`Server running at ${res.url}`)
    });

    // opeining link transfer us to graphql page