import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/user';

const { JWT_SECRET = 'dev-secret' } = process.env;

export async function POST(request) {
  await connectDB();
  try {
    const { email, password } = await request.json();
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    return NextResponse.json({ _id: token });
  } catch {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
  }
}
