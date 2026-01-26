import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2025-12-15.clover' as any, // 実際の環境に合わせて適切なバージョンを指定するか、このコメントで抑制します
});

// リクエストで受け取るアイテムの型定義
interface CheckoutItem {
  priceId: string;
  quantity: number;
}

interface CheckoutRequestBody {
  items: CheckoutItem[];
}

export async function POST(request: Request) {
  try {
    // リクエストボディを型付きで取得
    const body: CheckoutRequestBody = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // itemに型がついているため、: any は不要になります
    const line_items = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      
      // 住所収集と送料設定
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1000,
              currency: 'jpy',
            },
            display_name: '通常配送',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    console.error('Stripe Session Error:', err);
    
    // err が Error オブジェクトかどうかをチェックして安全にメッセージを取得
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}