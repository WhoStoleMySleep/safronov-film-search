import { NextResponse } from 'next/server';

const BEATFILM_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export async function GET() {
  try {
    const res = await fetch(BEATFILM_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return NextResponse.json({ message: 'Ошибка источника' }, { status: 502 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Не удалось получить фильмы' }, { status: 500 });
  }
}
