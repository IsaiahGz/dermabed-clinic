const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Testimonial {
    _id: ID
    testimonialText: String
    userId: String
    createdAt: String
    
  }

  type Query {
    testimonial: [Testimonial]!
    testimonial(testimonialId: ID!): Testimonial
  }

  type Mutation {
    addTestimonial(testimonialText: String!, userId: String!): Testimonial
  
    removeTestimonial(testimonialId: ID!): Testimonial
    
  }
`;

module.exports = typeDefs;
