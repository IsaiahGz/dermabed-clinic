const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  name: String
  firstName: String
  lastName: String
  email:  String
  password:   String
  fullName: String
  isAdmin: Boolean
}

  type Testimonial {
    _id: ID
    testimonialText: String
    user: User
    createdAt: String
    }

    type Product {
      _id: ID
    }

  type Query {
    testimonials: [Testimonial]!
    testimonial(testimonialId: ID!): Testimonial
  }
  
  type Query {
    products: [Product]!
    product(productId: ID!): Product
  }
  
  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addTestimonial(testimonialText: String!, userId: ID!): Testimonial
    removeTestimonial(testimonialId: ID!): Testimonial
    updateTestimonial(testimonialId: ID!): Testimonial
     }
  
     type Mutation {
    addProduct(productText: String!, productId: ID!): Product
    removeProduct(productId: ID!): Product
    updateProduct(productId: ID!): Product
     }
     
     type Mutation {
    addUser(userText: String!, userId: ID!): User
    removeUser(userId: ID!): User
    updateUser(userId: ID!): User
     }
`;

module.exports = typeDefs;
