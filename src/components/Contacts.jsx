function Contacts() {
  return (
    <div className="contacts">
      <div className="container">
        <address className="contacts__info">
          <ul className="contacts__list">
            <li className="contacts__item">
              Номер телефона
              <a href="tel:+74991234567" className="contacts__link">
                +7 499 123-45-67
              </a>
            </li>
            <li className="contacts__item">
              Почта
              <a href="mailto:MAIL@LOOKS.MAIL" className="contacts__link">
                MAIL@LOOKS.MAIL
              </a>
            </li>
            <li className="contacts__item">
              Адрес шоурума
              <span>Москва, ул. ПУШКИНА, 24, офис 273</span>
            </li>
          </ul>
          <a
            className="contacts__social"
            href="https://instagram.com/mozgzaraza?igshid=NTc4MTIwNjQ2YQ=="
          >
            LOOKS.RENT
          </a>
        </address>
      </div>
    </div>
  );
}

export default Contacts;
