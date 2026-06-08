import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import Movie from '@/lib/models/movie';

export async function DELETE(request, { params }) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const { id } = await params;
  const movie = await Movie.findById(id);
  if (!movie) return NextResponse.json({ message: 'Фильм не найден' }, { status: 404 });
  if (movie.owner.toString() !== payload._id.toString()) {
    return NextResponse.json({ message: 'Нельзя удалить чужой фильм' }, { status: 403 });
  }
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Фильм удалён' });
}
