import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json() as { items: { product_id: string; quantity: number }[] };
  const _ = body; // items received
  // In production this would create a Stripe/payment session
  // For now redirect to internal success page
  const host = req.headers.get('host') ?? 'localhost:3000';
  const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return NextResponse.json({ url: `${proto}://${host}/shop/success` });
}
