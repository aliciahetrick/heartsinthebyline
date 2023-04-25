const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          //   description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQty,
    };
  });

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
          // Delivers between 5-7 business days
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
    // phone_number_collection: {
    //   enabled: true,
    // },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    // success_url: `https:localhost:3000/checkout-success`,
    // cancel_url: `https:localhost:3000/cart`,
  });

  res.send({ url: session.url });
});

// Stripe webhoook

router.post(
  "/webhook",
  //   express.raw({ type: "application/json" }),
  (request, response) => {
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
          console.log("customer", customer);
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

module.exports = router;
