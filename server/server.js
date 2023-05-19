require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PurchaseHistory } = require('./models');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  introspection: process.env.NODE_ENV !== 'production',
});

// Setup route for Stripe webhook
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const endpointSecret = process.env.NODE_ENV === 'production' ? process.env.STRIPE_DEV_WEBHOOK : process.env.STRIPE_LOCAL_WEBHOOK;

  const sig = request.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the completed event
  if (event.type === 'checkout.session.completed') {
    const paymentIntentSucceeded = event.data.object;
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(paymentIntentSucceeded.id, {
      expand: ['line_items'],
    });
    await PurchaseHistory.create({
      checkoutSessionId: sessionWithLineItems.id,
      email: sessionWithLineItems.customer_details.email,
      productsQuantity: JSON.parse(sessionWithLineItems.metadata.productsQuantity),
      amountTotal: sessionWithLineItems.amount_total / 100,
      name: sessionWithLineItems.customer_details.name,
    });
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
