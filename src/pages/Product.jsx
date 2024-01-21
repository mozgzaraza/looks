import React from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
// import Cart from "../components/Cart";
import Header from "../components/Header";
import ProductSizeSelector from "../components/ProductSizeSelector";
import ProductTimeSelector from "../components/ProductTimeSelector";

function Product() {
  const { productId } = useParams();
  const [allItems, setAllItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [typeRent, setTypeRent] = React.useState("rent");
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [openGallery, setOpenGallery] = React.useState(false);
  const [scrollbarWidth, setScrollbarWidth] = React.useState(0);

  const [selectedSize, setSelectedSize] = React.useState();
  const [selectedTime, setSelectedTime] = React.useState();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = (id) => {
    // dispatch(setCart(id));
    dispatch(setCart({ item: product, selectedSize, selectedTime, typeRent }));
  };
  console.log(cart);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  console.log(selectedTime);

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
  const product = allItems.find((item) => `${item.id}` === productId);

  const totalImages = product.imageGalleryUrl.length;

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 1
        : prevIndex === 0
        ? totalImages - 1
        : totalImages``
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < totalImages - 1 ? prevIndex + 1 : 0
    );
  };

  const openGalleryPopup = () => {
    setOpenGallery(!openGallery);
    calculateScrollbarWidth();
    // document.body.style.paddingRight = `${scrollbarWidth}px`;
    openGallery === true
      ? (document.body.style.overflow = "")
      : (document.body.style.overflow = "hidden");
  };

  const calculateScrollbarWidth = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    setScrollbarWidth(scrollbarWidth);
  };

  // const addToCart = (product) => {
  //   // Получаем текущий список продуктов в корзине из Local Storage
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //   // Добавляем новый продукт в корзину
  //   cartItems.push(product);

  //   // Сохраняем обновленный список продуктов в Local Storage
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // };
  // console.log(product);
  return (
    <section
      className="product"
      style={{ paddingRight: `${scrollbarWidth}px` }}
    >
      <Header />
      <div className="container">
        <div className="product__inner">
          <div className="product__content">
            <span className="product__code">АРТ. {productId}</span>
            <h1 className="product__name">{firstUppercase(product.title)}</h1>

            <span className="product__tags">{`${
              product.gender === "1" ? "мужское" : "женское"
            } | ${
              product.type === "clothes"
                ? "одежда"
                : product.type === "shoes"
                ? "обувь"
                : "аксессуары"
            } | ${product.category}`}</span>
            <ul className="product__info">
              <li className="product__info-item">{product.info}</li>
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
                <ProductTimeSelector
                  times={product.rentTime}
                  onTimeChange={handleTimeChange}
                />
              ) : (
                ``
              )}
              <ProductSizeSelector
                sizes={product.size}
                onSizeChange={handleSizeChange}
              />
            </div>
            <div className="product__result">
              <p className="product__price">
                {typeRent === "rent" ? product.rentPrice : product.buyPrice}Р
              </p>
              <button
                onClick={() => console.log("добавлено") & addToCart(product)}
                className="product__add-cart"
              >
                добавить в корзину
              </button>
            </div>
          </div>

          <ul className="product__photo">
            {product.imageGalleryUrl.map((item, index) => (
              <li
                key={index}
                className="product__photo-item"
                onClick={() =>
                  setSelectedImageIndex(index) & openGalleryPopup()
                }
              >
                <img
                  src={`/img/catalog/${product.id}/${index + 1}.webp`}
                  alt="фото товара"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {openGallery ? (
        <div onClick={() => openGalleryPopup()} className="product__gallery">
          <span
            onClick={(e) => {
              e.stopPropagation();
              showPreviousImage();
            }}
          ></span>
          <img
            onClick={(e) => {
              e.stopPropagation();
            }}
            src={`/img/catalog/${product.id}/${selectedImageIndex + 1}.webp`}
            alt="полное фото товара"
          />
          <span
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
          ></span>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Product;
