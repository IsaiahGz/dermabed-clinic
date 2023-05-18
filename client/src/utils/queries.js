import { gql } from '@apollo/client';

export const QUERY_PRODUCTS_LIST = gql`
  query ProductsList($productIds: [ID]!) {
    productsList(productIds: $productIds) {
      _id
      name
      price
      description
      inStock
      imageUrl
    }
  }
`;

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

export const QUERY_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(productId: $id) {
      _id
      name
      description
      price
      inStock
      imageUrl
    }
  }
`;

export const QUERY_ADMIN_TESTIMONIALS = gql`
  query GetAdminTestimonials {
    adminTestimonials {
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

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      firstName
      lastName
      email
      isAdmin
    }
  }
`;

export const QUERY_MY_TESTIMONIALS = gql`
  query GetMyTestimonials {
    myTestimonials {
      _id
      testimonialText
      createdAt
      isApproved
    }
  }
`;
