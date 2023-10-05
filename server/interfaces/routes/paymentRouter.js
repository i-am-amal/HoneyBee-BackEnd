import express from "express";
import { paymentForHoneyGold, paymentForHoneyPlatinum } from "../../controller/paymentController.js";
import { stripePayment } from "../../usecases/PaymentInteractor.js";
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51NWAuLSJWUMWi9GNqTbIXPQPYFmTjwbmx1WpXnJ1RgKUMh9IkjZZtTR1W5Arrj5vY0O2NKOHoUnljyJkNt8WyGwV00cDrc8IF2');
const router = express.Router();


router.post('/gold', paymentForHoneyGold(stripeInstance, stripePayment));
router.post('/platinum', paymentForHoneyPlatinum(stripeInstance, stripePayment));

export default router;