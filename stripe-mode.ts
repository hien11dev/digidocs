import { faker } from "@faker-js/faker";
import { Stripe } from "stripe";

const stripe: Stripe = new Stripe(
  "sk_test_51ONXG8Aggh8d0PyM9jvteoa5JZOdCAQQ5HxdYlx7RpDzqkYGABn8QBbZBV9Uo3ubpmmOlnbudsLw8AFslCpB51AX00hTkk1mxr",
  {
    apiVersion: "2023-10-16",
    typescript: true,
    stripeAccount: "acct_1ONXG8Aggh8d0PyM",
  }
);

const customer = async (
  params?: Stripe.CustomerCreateParams,
  options?: Stripe.RequestOptions
) => await stripe.customers.create(params, options);

const product = async () => {
  const product = await stripe.products.create({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    active: true,
    metadata: {
      test: "test",
    },
    images: [faker.image.url(), faker.image.url(), faker.image.url()],
  });

  await stripe.prices.create({
    currency: "usd",
    billing_scheme: "tiered",
    active: true,
    tiers_mode: "volume",
    tiers: [
      {
        up_to: 100,
        flat_amount: 100,
      },
      {
        up_to: 300,
        flat_amount: 300,
      },
      {
        up_to: 500,
        flat_amount: 450,
      },
      {
        up_to: 1000,
        flat_amount: 900,
      },
      {
        up_to: "inf",
        flat_amount: 1500,
      },
    ],
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
    product: product.id,
  });

  return product;
};

const customerId = "cus_PDLJ9h8lXmG35D";

const payment_method = async (
  params?: Stripe.PaymentMethodCreateParams,
  options?: Stripe.RequestOptions
) => await stripe.paymentMethods.create(params, options);

// const subscription = async () =>
//   await stripe.subscriptions.create({
//     customer: (await customer()).id,
//     items: [
//       {
//         plan: "gold",
//         quantity: 1,
//       },
//     ],
//   });

const main = async () => {
  // await product();
  // const pm = await payment_method({
  //   // customer: cus.id,
  //   type: "card",
  //   card: {
  //     // exp_month: 1,
  //     // exp_year: 2025,
  //     // number: "4242424242424242",
  //     // cvc: "123",
  //     token: "tok_visa",
  //   },
  // });
  // await customer({
  //   address: {
  //     city: faker.location.city(),
  //     country: faker.location.countryCode("alpha-2"),
  //     line1: faker.location.streetAddress(),
  //     line2: faker.location.secondaryAddress(),
  //     postal_code: faker.location.zipCode(),
  //     state: faker.location.state(),
  //   },
  //   balance: 0,
  //   description: faker.lorem.text(),
  //   email: faker.internet.exampleEmail(),
  //   metadata: {
  //     test: "test",
  //   },
  //   name: faker.person.fullName({ lastName: "Test" }),
  //   phone: faker.phone.number(),
  //   shipping: {
  //     address: {
  //       city: faker.location.city(),
  //       country: faker.location.countryCode("alpha-2"),
  //       line1: faker.location.streetAddress(),
  //       line2: faker.location.secondaryAddress(),
  //       postal_code: faker.location.zipCode(),
  //       state: faker.location.state(),
  //     },
  //     name: faker.person.fullName({ lastName: "Test Shipping" }),
  //     phone: faker.phone.number(),
  //   },
  //   tax_exempt: "none",
  //   test_clock: "clock_1ON6x5GFDPDQJ2lHwMl32HRt",
  //   preferred_locales: ["en", "vi"],
  //   payment_method: pm.id,
  // });
  // await stripe.subscriptions.create({
  //   customer: "cus_N1cZ3dD7d1J8eX",
  // });

  // await stripe.charges.create({
  //   amount: 1099,
  //   currency: "usd",
  //   source: "card_1OOwvsAggh8d0PyMFiMo13iI",
  //   customer: customerId,
  // });
  await stripe.prices.create({
    currency: "vnd",
    active: true,
    billing_scheme: "per_unit",
    recurring: {
      interval: "month",
      trial_period_days: 30,
      usage_type: "licensed",
    },
    expand: ["product"],
    product_data: {
      name: "test",
      active: true,
    },
    unit_amount: 1_990_000,
  });
};

main();
