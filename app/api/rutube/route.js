import { NextResponse } from 'next/server';

const RUTUBE_SEARCH_URL = 'https://rutube.ru/api/search/video/';

function extractId(video) {
  if (video.id) return String(video.id);
  const parts = video.video_url?.split('/').filter(Boolean) ?? [];
  return parts[parts.length - 1] ?? '';
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) return NextResponse.json({ message: 'Нет запроса' }, { status: 400 });

  const pageSize = searchParams.get('pageSize') ?? '1';

  try {
    const res = await fetch(
      `${RUTUBE_SEARCH_URL}?query=${encodeURIComponent(query)}&format=json&page=1&pageSize=${pageSize}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'ru-RU,ru;q=0.9',
          'Referer': 'https://rutube.ru/',
        },
      }
    );
    if (!res.ok) return NextResponse.json({ message: 'Ошибка Рутуба', status: res.status }, { status: 502 });
    const data = await res.json();
    const raw = data.results ?? [];
    const results = raw.map((v) => ({
      id: extractId(v),
      title: v.title ?? '',
      thumbnail: v.thumbnail_url ?? '',
      authorName: v.author?.name ?? '',
      duration: Math.round((v.duration ?? 0) / 60),
      url: v.video_url ?? '',
    }));
    return NextResponse.json({ url: results[0]?.url ?? null, results });
  } catch {
    return NextResponse.json({ message: 'Ошибка запроса' }, { status: 500 });
  }
}
