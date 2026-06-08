import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__text">
        В группе ИСиП-22 были освоены технологии, применённые в дипломном проекте.
      </p>
      <ul className="techs__items">
        {['HTML', 'CSS', 'JS', 'React', 'Next.js', 'Git', 'mongoDB'].map((tech) => (
          <li className="techs__item" key={tech}>
            <p className="techs__tech">{tech}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
