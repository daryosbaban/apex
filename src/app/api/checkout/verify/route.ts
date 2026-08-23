import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paid: session.payment_status === 'paid',
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email ?? session.customer_email,
    });
  } catch (err) {
    console.error('Stripe session verification failed', err);
    return NextResponse.json({ error: 'Unable to verify payment' }, { status: 500 });
  }
}
