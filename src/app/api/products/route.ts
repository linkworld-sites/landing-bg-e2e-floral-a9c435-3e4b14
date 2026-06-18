import { NextResponse } from 'next/server';
import { CATALOG } from '@/lib/products';

export async function GET() {
  return NextResponse.json(CATALOG);
}
