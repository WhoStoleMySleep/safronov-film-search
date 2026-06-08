import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const { JWT_SECRET = 'dev-secret' } = process.env;

export function verifyToken(request) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return null;
  const token = authorization.replace('Bearer ', '');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function unauthorized() {
  return NextResponse.json({ message: 'Необходима авторизация' }, { status: 401 });
}
