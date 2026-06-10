import { NextResponse } from 'next/server';

const ALLOWED_HOST = 'kinopoiskapiunofficial.tech';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  if (!imageUrl) return new NextResponse(null, { status: 400 });

  let parsed;
  try { parsed = new URL(imageUrl); } catch { return new NextResponse(null, { status: 400 }); }
  if (parsed.hostname !== ALLOWED_HOST) return new NextResponse(null, { status: 403 });

  const key = process.env.KINOPOISK_API_KEY;
  const headers = key ? { 'X-API-KEY': key } : {};

  try {
    const res = await fetch(imageUrl, { headers });
    if (!res.ok) return new NextResponse(null, { status: res.status });
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: { 'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg' },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
