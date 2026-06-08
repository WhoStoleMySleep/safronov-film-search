'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './OtherPages.css';

export default function OtherPages() {
  const router = useRouter();
  return (
    <section className="other-pages">
      <div className="other-pages__box">
        <h2 className="other-pages__title">404</h2>
        <p className="other-pages__text">Страница не найдена</p>
      </div>
      <button className="other-pages__button" onClick={() => router.back()}>Назад</button>
    </section>
  );
}
