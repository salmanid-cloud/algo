import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  const { amount, receipt, notes } = await request.json();

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Razorpay keys are not configured.' }, { status: 500 });
  }

  if (!amount || Number(amount) < 100) {
    return NextResponse.json({ error: 'A valid amount in paise is required.' }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const order = await razorpay.orders.create({
    amount: Number(amount),
    currency: 'INR',
    receipt: receipt || `heritage-${Date.now()}`,
    notes: notes || {}
  });

  return NextResponse.json({ order, keyId: process.env.RAZORPAY_KEY_ID });
}
