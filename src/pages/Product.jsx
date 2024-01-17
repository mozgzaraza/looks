import React from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import ProductSizeSelector from "../components/ProductSizeSelector";
import ProductTimeSelector from "../components/ProductTimeSelector";

function Product() {
  const { productId } = useParams();
  const [allItems, setAllItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [typeRent, setTypeRent] = React.useState("rent");

  React.useEffect(() => {
    fetch("https://659c1f85d565feee2dac75bf.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setAllItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  const firstUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (isLoading === true) {
    return <div>Loading...</div>;
  }
  const product = allItems.find((item) => item.id == productId);

  return (
    <section className="product">
      <Header />
      <div className="container">
        <div className="product__inner">
          <div className="product__content">
            <span className="product__code">АРТ. {productId}</span>
            <h1 className="product__name">{firstUppercase(product.title)}</h1>

            <span className="product__tags">{`${
              product.gender == 1 ? "мужское" : "женское"
            } | ${
              product.type === "clothes"
                ? "одежда"
                : product.type === "shoes"
                ? "обувь"
                : "аксессуары"
            } | ${product.category}`}</span>
            <ul className="product__info">
              <li
                onClick={() => console.log(allItems)}
                className="product__info-item"
              >
                {product.info}
              </li>
              <li className="product__info-item">
                <span>Материал:</span>
                {product.material}
              </li>
            </ul>
            <div className="product__btn">
              <button
                onClick={() => setTypeRent("rent")}
                className={
                  typeRent === "rent"
                    ? "product__btn-item product__btn-item--active"
                    : "product__btn-item"
                }
              >
                взять в аренду
              </button>
              <button
                onClick={() => setTypeRent("buy")}
                className={
                  typeRent === "buy"
                    ? "product__btn-item product__btn-item--active"
                    : "product__btn-item"
                }
              >
                купить
              </button>
            </div>

            <div className="product__btn-info">
              {typeRent === "rent" ? (
                <ProductTimeSelector times={product.rentTime} />
              ) : (
                ``
              )}
              <ProductSizeSelector sizes={product.size} />
            </div>
            <div className="product__result">
              <p className="product__price">
                {typeRent === "rent" ? product.rentPrice : product.buyPrice}Р
              </p>
              <button className="product__add-cart">добавить в корзину</button>
            </div>
          </div>
          <ul className="product__photo">
            {product.imageGalleryUrl.map((item, index) => (
              <li
                key={index}
                className="product__photo-item"
                onClick={() => console.log(item)}
              >
                <img
                  src={`/img/catalog/${product.id}/${index + 1}.jpg`}
                  alt="фото товара"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Product;
