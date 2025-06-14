// api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { carrito } = req.body;
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return res.status(400).json({ error: 'Carrito vacío o inválido.' });
  }

  try {
    const line_items = carrito.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.nombre,
        },
        unit_amount: Math.round(parseFloat(item.precio) * 100), // centavos
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://pruebas.mediosconvalor.com/digital.store/gracias.html',
      cancel_url: 'https://pruebas.mediosconvalor.com/digital.store/carrito.html',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
