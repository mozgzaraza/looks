import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <Link to="/catalog">Каталог</Link>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="#">
              О НАС
            </a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="#">
              АРЕНДА
            </a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="#">
              КОНТАКТЫ
            </a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="#">
              УСЛОВИЯ ПОЛЬЗОВАНИЯ
            </a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="#">
              Политика приватности
            </a>
          </li>
        </ul>
        <span>© 2021</span>
      </div>
    </div>
  );
}

export default Footer;
