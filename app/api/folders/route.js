import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import Folder from '@/lib/models/folder';

export async function GET(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const folders = await Folder.find({ owner: payload._id }).sort({ createdAt: 1 });
  return NextResponse.json(folders);
}

export async function POST(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  try {
    const { name } = await request.json();
    if (!name?.trim()) return NextResponse.json({ message: 'Название папки обязательно' }, { status: 400 });
    const folder = await Folder.create({ name: name.trim(), owner: payload._id });
    return NextResponse.json(folder, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
