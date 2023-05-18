const { gql } = require('apollo-server-express');

// Edit the product typedef

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    fullName: String
    email: String
    isAdmin: Boolean
  }

  type Testimonial {
    _id: ID
    testimonialText: String
    user: User
    createdAt: String
    isApproved: Boolean
  }

  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    inStock: Boolean
    imageUrl: String
  }

  type CartItem {
    product: Product
    quantity: Int
  }

  input CartItemsInput {
    productId: ID
    quantity: Int
  }

  type Stripe {
    redirectUrl: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type PurchaseHistory {
    _id: ID
    checkoutSessionId: String
    email: String
    productsQuantity: [CartItem]!
    amountTotal: Float
    name: String
  }

  type Query {
    purchaseHistoryBySession(checkoutSessionId: String!): PurchaseHistory
    getMyPurchaseHistory: [PurchaseHistory]!
  }

  type Query {
    testimonials: [Testimonial]!
    testimonial(testimonialId: ID!): Testimonial
    adminTestimonials: [Testimonial]!
  }

  type Query {
    products: [Product]!
    productsList(productIds: [ID]!): [Product]!
    product(productId: ID!): Product
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addTestimonial(testimonialText: String!): Testimonial
    removeTestimonial(testimonialId: ID!): Testimonial
  }

  type Mutation {
    addProduct(productText: String!, productId: ID!): Product
    removeProduct(productId: ID!): Product
    updateProduct(productId: ID!): Product
  }

  type Mutation {
    checkout(cartItems: [CartItemsInput]!): Stripe
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(userId: ID!): User
  }

  type Query {
    myTestimonials: [Testimonial]
  }

  type Mutation {
    approveTestimonial(testimonialId: ID!, isApproved: Boolean!): Testimonial
    updateTestimonial(testimonialId: ID!, testimonialText: String!): Testimonial
  }
`;

module.exports = typeDefs;
