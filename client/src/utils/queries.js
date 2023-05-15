import { gql } from '@apollo/client';

export const QUERY_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      _id
      testimonialText
      user {
        _id
        fullName
      }
      isApproved
      createdAt
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      price
      description
      inStock
    }
  }
`;
