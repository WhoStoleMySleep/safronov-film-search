import React from 'react';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__box-text">
        <p className="about-me__name">Константин Сафронов</p>
        <p className="about-me__specialization">Студент ЮТМиИТ, 20 лет</p>
        <p className="about-me__paragraph">
          Живу в Юрге. Данный проект выполнен в рамках дипломной работы.
        </p>
      </div>
    </section>
  );
}
