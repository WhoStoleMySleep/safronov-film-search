import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, unauthorized } from '@/lib/authHelper';
import User from '@/lib/models/user';

const MONGO_DUPLICATE_CODE = 11000;

export async function GET(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  const user = await User.findById(payload._id);
  if (!user) return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(request) {
  const payload = verifyToken(request);
  if (!payload) return unauthorized();
  await connectDB();
  try {
    const { name, email } = await request.json();
    const user = await User.findByIdAndUpdate(
      payload._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_CODE) {
      return NextResponse.json({ message: 'Email уже используется' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Некорректные данные' }, { status: 400 });
  }
}
