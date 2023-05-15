const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Testimonial {
    _id: ID
    testimonialText: String
    user: User
    createdAt: Date
    
  }

  type Query {
    testimonial: [Testimonial]!
    testimonial(testimonialId: ID!): Testimonial
  }

  type Mutation {
    addTestimonial(testimonialText: String!, userId: ID!): Testimonial
  
    removeTestimonial(testimonialId: ID!): Testimonial
    
  }
`;

module.exports = typeDefs;
