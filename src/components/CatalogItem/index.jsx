function CatalogItem({ title, rentPrice, imageUrl, size }) {
  return (
    <div className="catalog__item">
      <div className="catalog__item-imgbox">
        <img
          className="catalog__item-img"
          src={imageUrl}
          alt="Фотография товара"
        />
      </div>

      <h2 className="catalog__item-title">{title}</h2>
      <p className="catalog__item-price">
        {rentPrice}Р<span>/сутки</span>
      </p>
    </div>
  );
}
export default CatalogItem;
