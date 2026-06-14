import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import Folder from '@/lib/models/folder';
import RutubeVideo from '@/lib/models/rutubeVideo';

export async function PATCH(request, { params }) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const { id } = await params;
  const { name } = await request.json();
  if (!name?.trim()) return NextResponse.json({ message: 'Название обязательно' }, { status: 400 });
  const folder = await Folder.findById(id);
  if (!folder) return NextResponse.json({ message: 'Папка не найдена' }, { status: 404 });
  if (folder.owner.toString() !== payload._id.toString()) {
    return NextResponse.json({ message: 'Нельзя изменить чужую папку' }, { status: 403 });
  }
  folder.name = name.trim();
  await folder.save();
  return NextResponse.json(folder);
}

export async function DELETE(request, { params }) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const { id } = await params;
  const folder = await Folder.findById(id);
  if (!folder) return NextResponse.json({ message: 'Папка не найдена' }, { status: 404 });
  if (folder.owner.toString() !== payload._id.toString()) {
    return NextResponse.json({ message: 'Нельзя удалить чужую папку' }, { status: 403 });
  }
  await RutubeVideo.updateMany({ folderId: id, owner: payload._id }, { folderId: null });
  await Folder.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Папка удалена' });
}
