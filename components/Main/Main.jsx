import React from 'react';
import Link from 'next/link';
import './Main.css';

export default function Main() {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__content">
          <p className="hero__label">Стриминг-платформа</p>
          <h1 className="hero__title">
            Смотри что<br />
            <span className="hero__accent">нравится</span>
          </h1>
          <p className="hero__sub">
            Тысячи фильмов и сериалов — сохраняй, раскладывай по папкам,<br />
            возвращайся в любой момент.
          </p>
          <Link href="/movies" className="hero__btn">
            Смотреть фильмы
          </Link>
        </div>
        <div className="hero__orbs">
          <div className="hero__orb hero__orb_1" />
          <div className="hero__orb hero__orb_2" />
          <div className="hero__orb hero__orb_3" />
        </div>
      </section>
    </main>
  );
}
