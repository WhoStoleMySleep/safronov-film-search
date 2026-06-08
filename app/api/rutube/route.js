import { NextResponse } from 'next/server';

const RUTUBE_SEARCH_URL = 'https://rutube.ru/api/search/video/';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) return NextResponse.json({ message: 'Нет запроса' }, { status: 400 });

  try {
    const res = await fetch(`${RUTUBE_SEARCH_URL}?query=${encodeURIComponent(query)}&format=json&page=1`);
    if (!res.ok) return NextResponse.json({ message: 'Ошибка Рутуба' }, { status: 502 });
    const data = await res.json();
    const first = data.results?.[0];
    if (!first) return NextResponse.json({ url: null });
    return NextResponse.json({ url: first.video_url });
  } catch {
    return NextResponse.json({ message: 'Ошибка запроса' }, { status: 500 });
  }
}
