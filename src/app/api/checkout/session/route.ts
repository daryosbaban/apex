import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/lib/products';

const SHIPPING_FLAT_RATE = 15;
const FREE_SHIPPING_THRESHOLD = 500;

interface CheckoutLine {
  productId: string;
  quantity: number;
}

interface CheckoutRequestBody {
  items: CheckoutLine[];
  customer: { fullName: string; email: string; phone: string };
  shipping: { country: string; city: string; address: string; notes?: string };
}

export async function POST(req: NextRequest) {
  let body: CheckoutRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { items, customer, shipping } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }
  if (!customer?.email || !customer?.fullName) {
    return NextResponse.json({ error: 'Missing customer information' }, { status: 400 });
  }

  // Prices are always resolved server-side from our own catalog — never trust client-sent amounts.
  const lineItems: { price_data: { currency: string; unit_amount: number; product_data: { name: string; description: string } }; quantity: number }[] = [];
  let subtotal = 0;

  for (const line of items) {
    const quantity = Math.floor(Number(line.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }
    const product = products.find((p) => p.id === line.productId);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${line.productId}` }, { status: 400 });
    }
    if (product.stock === 'out-of-stock') {
      return NextResponse.json({ error: `${product.name} is out of stock` }, { status: 400 });
    }
    subtotal += product.price * quantity;
    lineItems.push({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.brand} ${product.name}`,
          description: product.shortDescription,
        },
      },
      quantity,
    });
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(shippingCost * 100),
        product_data: { name: 'Shipping', description: 'Standard delivery' },
      },
      quantity: 1,
    });
  }

  try {
    const stripe = getStripe();
    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customer.email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        fullName: customer.fullName,
        phone: customer.phone ?? '',
        country: shipping.country ?? '',
        city: shipping.city ?? '',
        address: shipping.address ?? '',
        notes: shipping.notes?.slice(0, 400) ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session creation failed', err);
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 });
  }
}
