import React from "react";

import Header from "../components/Header";
const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <section className="main">
        <div className="container">
          <div className="main__decor">
            <img
              className="main__decor-item main__decor-item--we"
              src="img/decor/we.png"
              alt="we"
            />
            <img
              className="main__decor-item main__decor-item--are"
              src="img/decor/are.png "
              alt="are"
            />
            <img
              className="main__decor-item main__decor-item--looks"
              src="img/decor/looks.png"
              at="looks"
            />
          </div>
          <div className="main__sex">
            <button className="main__sex-item">женское</button>
            <button className="main__sex-item">мужское</button>
          </div>
          <h1 className="main__title ">модная одежда в аренду</h1>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about__top">
            <div className="about__top-info">
              <h2 className="about__title">
                наши сТилисТы подберуТ вам гоТовые образы из самых акТуальных
                вещей
              </h2>
              <p className="about__text">
                Самое время начать, то, что так давно хотел, но боялся! К чему
                все эти страхи. В масштабе целой жизни все мелочи. Пробуй, если
                хочешь! Меняй - если чувствуешь , что пора. Мы не боимся строить
                компанию, в которую очень часто не верили.
              </p>
            </div>
            <ul className="about__top-list">
              <li className="about__top-item">СОБСТВЕННОЕ ПРОИЗВОДСТВО</li>
              <li className="about__top-item">более 1700 позиций</li>
            </ul>
          </div>

          <div className="about__bottom">
            <div className="about__how">
              <h2 className="about__title">как это работаеТ</h2>
              <p className="about__text">
                Самое время начать, то, что так давно хотел, но боялся! К чему
                все эти страхи. В масштабе целой жизни все мелочи. Пробуй, если
                хочешь! Меняй - если чувствуешь , что пора. Мы не боимся строить
                компанию, в которую очень часто не верили. Мы не боимся жить по
                ценностям. Мы не боимся быть амбициозными.
              </p>
              <a href="#" className="about__how-link">
                подробнее о LOOKS
              </a>
            </div>
            <div className="about__rules">
              <h2 className="about__title">Правила аренды</h2>
              <p className="about__text">
                Самое время начать, то, что так давно хотел, но боялся! К чему
                все эти страхи. В масштабе целой жизни все мелочи. Пробуй, если
                хочешь! Меняй - если чувствуешь , что пора. Мы не боимся строить
                компанию, в которую очень часто не верили. Мы не боимся жить по
                ценностям. Мы не боимся быть амбициозными. И мы знаем, что ТЫ
                тоже не боишься, если выбираешь Новые подходы в потреблении и
                носишь необычные образы LOOKS.
              </p>
              <a href="#" className="about__rules-link">
                правила аренды
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
