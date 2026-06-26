import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// 1. Mock Database
const db = {
  users: [
    { id: "1", username: "alice_wonder", email: "alice@example.com" },
    { id: "2", username: "bob_builder", email: "bob@example.com" }
  ],
  posts: [
    { id: "101", title: "GraphQL is awesome", content: "Learning the basics today.", authorId: "1" },
    { id: "102", title: "Express + Apollo", content: "Setting up the server.", authorId: "1" },
    { id: "103", title: "Building a house", content: "Can we fix it?", authorId: "2" }
  ]
};

// 2. The Schema (Type Definitions)
const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    # Get a list of all users
    users: [User!]!
    
    # Get a specific user by ID
    user(id: ID!): User
    
    # Get all posts
    posts: [Post!]!
  }

  type Mutation {
    # Create a new post
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

// 3. The Resolvers
const resolvers = {
  Query: {
    users: () => db.users,
    user: (_, args) => db.users.find(u => u.id === args.id),
    posts: () => db.posts,
  },
  Mutation: {
    createPost: (_, args) => {
      const newPost = {
        id: String(Math.floor(Math.random() * 10000)), // Generate a random ID
        title: args.title,
        content: args.content,
        authorId: args.authorId
      };
      db.posts.push(newPost);
      return newPost;
    }
  },
  // Field-level Resolvers to connect the graph
  User: {
    // How to get the 'posts' for a given User
    posts: (parentUser) => {
      return db.posts.filter(post => post.authorId === parentUser.id);
    }
  },
  Post: {
    // How to get the 'author' for a given Post
    author: (parentPost) => {
      return db.users.find(user => user.id === parentPost.authorId);
    }
  }
};

// 4. Server Setup Function
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Apply middleware: CORS, body-parser, and Apollo Server's expressMiddleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  // Start the HTTP server
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startServer();
