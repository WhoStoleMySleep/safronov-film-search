import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import Movie from '@/lib/models/movie';

export async function GET(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const movies = await Movie.find({ owner: payload._id });
  return NextResponse.json(movies);
}

export async function POST(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  try {
    const body = await request.json();
    const movie = await Movie.create({ ...body, owner: payload._id });
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json({ message: 'Некорректные данные фильма' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
