import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TESTIMONIAL = gql`
  mutation addTestimonial($testimonialText: String!) {
    addTestimonial(testimonialText: $testimonialText) {
      _id
      testimonialText
      createdAt
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation updateTestimonial($testimonialId: ID!, $testimonialText: String!) {
    updateTestimonial(testimonialId: $testimonialId, testimonialText: $testimonialText) {
      _id
      testimonialText
      isApproved
    }
  }
`;

export const ADMIN_UPDATE_TESTIMONIAL = gql`
  mutation approveTestimonial($testimonialId: ID!, $isApproved: Boolean!) {
    approveTestimonial(testimonialId: $testimonialId, isApproved: $isApproved) {
      _id
      isApproved
    }
  }
`;

export const ADMIN_UPDATE_USER = gql`
  mutation adminUpdateUser($userId: ID!, $isAdmin: Boolean!) {
    adminUpdateUser(userId: $userId, isAdmin: $isAdmin) {
      _id
      isAdmin
    }
  }
`;

export const MUTATE_CHECKOUT = gql`
  mutation checkout($cartItems: [CartItemsInput]!) {
    checkout(cartItems: $cartItems) {
      redirectUrl
    }
  }
`;

export const REMOVE_TESTIMONIAL = gql`
  mutation removeTestimonial($testimonialId: ID!) {
    removeTestimonial(testimonialId: $testimonialId) {
      _id
    }
  }
`;
