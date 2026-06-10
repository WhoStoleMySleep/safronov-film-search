import { NextResponse } from 'next/server';

const KP_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';

function parseLength(length) {
  if (!length) return 0;
  if (String(length).includes(':')) {
    const [h, m] = String(length).split(':').map(Number);
    return h * 60 + m;
  }
  return parseInt(length) || 0;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) return NextResponse.json({ message: 'Нет запроса' }, { status: 400 });

  const key = process.env.KINOPOISK_API_KEY;
  if (!key) return NextResponse.json({ message: 'Нет ключа Кинопоиска' }, { status: 500 });

  try {
    const res = await fetch(
      `${KP_SEARCH_URL}?keyword=${encodeURIComponent(query)}&page=1`,
      { headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' } }
    );
    if (!res.ok) return NextResponse.json({ message: 'Ошибка Кинопоиска' }, { status: 502 });

    const data = await res.json();
    const results = (data.films ?? []).map((f) => ({
      id: String(f.filmId),
      title: f.nameRu ?? f.nameEn ?? '',
      thumbnail: f.posterUrlPreview ?? f.posterUrl ?? '',
      authorName: f.year ?? '',
      duration: parseLength(f.filmLength),
      url: `https://www.kinopoisk.ru/film/${f.filmId}/`,
    }));

    return NextResponse.json({ url: results[0]?.url ?? null, results });
  } catch {
    return NextResponse.json({ message: 'Ошибка запроса' }, { status: 500 });
  }
}
