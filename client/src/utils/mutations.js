import { gql } from '@apollo/client';

export const ADD_THOUGHT = gql`
  mutation addTestimonial($testimonialText: String!, $testimonialAuthor: String!) {
    addTestimonial(testimonialText: $testimonialText, testimonialAuthor: $testimonialAuthor) {
      _id
      testimonialText
      testimonialAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
