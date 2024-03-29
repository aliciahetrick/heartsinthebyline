const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");

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
    console.log("item", item);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image_url],
          description: item.desc,
          metadata: {
            id: item.id,
            stock: item.stock,
            stockA: item.stockA,
            stockB: item.stockB,
            stockC: item.stockC,
            cartGrade: item.cartGrade,
            type: item.type,
          },
        },
        unit_amount: item[`price${item.cartGrade}`] * 100 || item.price * 100,
      },
      quantity: item.cartQty,
    };
  });

  console.log("line items", line_items);

  console.log("request body", req.body);

  function allLineItemsInStock() {
    for (let i = 0; i < req.body.cartItems.length; i++) {
      const cartItem = req.body.cartItems[i];
      if (
        (cartItem.cartQty > cartItem[`stock${cartItem.cartGrade}`] &&
          cartItem.type === "pin") ||
        (cartItem.cartQty > cartItem.stock && cartItem.type === "sticker")
      ) {
        return false;
      }
    }
    return true;
  }

  function orderType() {
    for (let i = 0; i < req.body.cartItems.length; i++) {
      const cartItem = req.body.cartItems[i];
      if (cartItem.type === "pin") {
        return "pin";
      }
    }
    return "sticker";
  }

  const checkoutSessionObj = {
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [],
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  };

  if (orderType() === "sticker") {
    checkoutSessionObj.shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: 66,
          currency: "usd",
        },
        display_name: "USPS Stamped Mail",
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
    });
  } else {
    checkoutSessionObj.shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: 500,
          currency: "usd",
        },
        display_name: "USPS Ground Advantage",
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
    });
  }

  const session = await stripe.checkout.sessions.create(checkoutSessionObj);
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
    // console.log(`Webhook Verified: `, event);
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
