import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/user';

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_CODE = 11000;

export async function POST(request) {
  await connectDB();
  try {
    const { name, email, password } = await request.json();
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash });
    return NextResponse.json({ name: user.name, email: user.email, _id: user._id }, { status: 201 });
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_CODE) {
      return NextResponse.json({ message: 'Пользователь с таким email уже существует' }, { status: 409 });
    }
    if (err.name === 'ValidationError') {
      return NextResponse.json({ message: 'Некорректные данные при создании профиля' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
