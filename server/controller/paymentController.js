export const paymentForHoneyGold =
  (stripe, stripePayment) => async (req, res) => {
    try {
      const pack = "gold";
      const price = "price_1NWAyiSJWUMWi9GNmBqj6WU5";
      const { email } = req.body;
      const session = await stripePayment(stripe, email, price, pack);
      console.log(session.url);
      res.json({ url: session.url });
    } catch (error) {
      console.log(error);
    }
  };

export const paymentForHoneyPlatinum =
  (stripe, stripePayment) => async (req, res) => {
    try {
      const pack = "platinum";
      const price = "price_1NWDiSSJWUMWi9GNoM896ywt";
      const { email } = req.body;
      const session = await stripePayment(stripe, email, price, pack);
      res.json({ url: session.url });
    } catch (error) {
      console.log(error);
    }
  };
