import { NextResponse } from 'next/server';

export async function GET() {
    const data = { value: Math.round(Math.random() * 100) };

    console.log('GET /api/test', data);

    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json(data);
}
