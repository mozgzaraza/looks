import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Cart from "./Cart";
function Header() {
  const [openCart, setOpenCart] = React.useState(false);
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img className="logo" src="./img/logo.svg" alt="logo" />
          <img className="logo--black" src="../img/logo-black.svg" alt="logo" />
        </Link>
        <nav className="menu">
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/catalog">Каталог</Link>
            </li>
            <li className="menu__item">О нас</li>
            <li className="menu__item">Правила</li>
            <li className="menu__item">Контакты</li>
            <li onClick={() => setOpenCart(true)} className="menu__item">
              Корзина
            </li>
          </ul>
          <button className="menu__burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="menu__mobile">
            <span className="menu__mobile-title">меню</span>
            <ul className="menu__mobile-nav">
              <li className="menu__mobile-item">женское</li>
              <li className="menu__mobile-item">мужское</li>
              <li className="menu__mobile-item">о нас</li>
              <li className="menu__mobile-item">правила</li>
              <li className="menu__mobile-item">контакты</li>
            </ul>
            <button className="menu__mobile-cart">
              <span>Корзина</span>
            </button>
          </div>
        </nav>
        {/* <div className={`cart-container ${openCart ? "open" : ""}`}>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : ""}
        </div> */}
        <CSSTransition
          in={openCart}
          timeout={200}
          classNames="animation-popup"
          unmountOnExit
        >
          <Cart setOpenCart={setOpenCart} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default Header;
