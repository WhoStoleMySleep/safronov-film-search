import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import RutubeVideo from '@/lib/models/rutubeVideo';

export async function DELETE(request, { params }) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const { id } = await params;
  const video = await RutubeVideo.findById(id);
  if (!video) return NextResponse.json({ message: 'Видео не найдено' }, { status: 404 });
  if (video.owner.toString() !== payload._id.toString()) {
    return NextResponse.json({ message: 'Нельзя удалить чужое видео' }, { status: 403 });
  }
  await RutubeVideo.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Удалено' });
}
