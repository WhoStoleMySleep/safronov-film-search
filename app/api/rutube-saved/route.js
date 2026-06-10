import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import RutubeVideo from '@/lib/models/rutubeVideo';

export async function GET(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const videos = await RutubeVideo.find({ owner: payload._id });
  return NextResponse.json(videos);
}

export async function POST(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  try {
    const body = await request.json();
    const video = await RutubeVideo.create({ ...body, owner: payload._id });
    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json({ message: 'Некорректные данные' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
