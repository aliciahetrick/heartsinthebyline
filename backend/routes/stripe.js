const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[0]],
          description: item.desc,
          metadata: {
            id: item.id,
            stock: item.metadata.stock,
          },
        },
        unit_amount: item.price.unit_amount,
      },
      quantity: item.cartQty,
    };
  });

  function allLineItemsInStock() {
    for (let i = 0; i < req.body.cartItems.length; i++) {
      if (
        req.body.cartItems[i].cartQty > req.body.cartItems[i].metadata.stock
      ) {
        return false;
      }
    }
    return true;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 500,
            currency: "usd",
          },
          display_name: "USPS First-Class Mail",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1000,
            currency: "usd",
          },
          display_name: "USPS Priority Mail",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 3500,
            currency: "usd",
          },
          display_name: "USPS Priority Mail Express",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 2,
            },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    // automatic_tax: {
    //   enabled: true,
    // },
    // customer_update: {
    //   shipping: "never",
    // },
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  if (allLineItemsInStock()) {
    res.send({ url: session.url });
  } else {
    res.status(500).send({ data: line_items });
  }
});

//Create order

const createOrder = async (customer, data, lineItems) => {
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent_id,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping_address: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed order: ", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhook

router.post("/webhook", (request, response) => {
  // confirms that the event that is being called from webhook is coming from stripe
  const sig = request.headers["stripe-signature"];

  let data;
  let eventType;

  const payload = request.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: process.env.WEBHOOK_ENDPOINT_SECRET,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      process.env.WEBHOOK_ENDPOINT_SECRET
    );
    console.log(`Webhook Verified: `, event);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;

  // Handle the event

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        stripe.checkout.sessions.listLineItems(
          data.id,
          {},
          function (err, lineItems) {
            console.log("lineItems", lineItems);
            createOrder(customer, data, lineItems);
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

module.exports = router;
