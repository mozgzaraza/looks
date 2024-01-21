// import React from "react";

// const Cart = () => {
//   // Получаем текущий список продуктов в корзине из Local Storage
//   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//   return (
//     <div className="cart">
//       <h2>Корзина</h2>
//       <ul>
//         {cartItems.map((item, index) => (
//           <li key={index}>
//             {item.title} - {item.price}Р
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import ProductTimeSelector from "./ProductTimeSelector";

function Cart({ setOpenCart }) {
  const [selectedTime, setSelectedTime] = React.useState();
  console.log(selectedTime);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const removeProduct = (item) => {
    dispatch(
      removeFromCart({
        itemId: item.id,
        selectedSize: item.selectedSize,
        selectedTime: item.selectedTime,
      })
    );
  };
  const totalSum = cart.cart.reduce((sum, item) => {
    return (
      sum +
      (item.typeRent === "rent" ? item.rentPrice : item.buyPrice) *
        item.quantity
    );
  }, 0);
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="cart-popup__wrapper">
      <div className="cart-popup">
        <div className="cart-popup__top">
          <p className="cart-popup__info">{`количество товаров: ${cart.cart.length}`}</p>
          <span
            onClick={() => setOpenCart(false)}
            className="cart-popup__close"
          ></span>
        </div>
        <div className="cart-popup__content">
          {cart.cart.length === 0 ? (
            <p className="cart-popup__content-empty">
              Вы пока не добавили товары в корзину
            </p>
          ) : (
            <>
              <ul className="cart-popup__content-titles">
                <li className="cart-popup__content-title">товар</li>
                <li className="cart-popup__content-title">срок аренды</li>
                <li className="cart-popup__content-title">цена</li>
              </ul>
              <ul className="cart-popup__products">
                {cart.cart.map((obj, index) => (
                  <li key={index} className="cart-popup__product">
                    <img
                      className="cart-popup__product-img"
                      src={obj.imageUrl}
                      alt=""
                    ></img>
                    <div className="cart-popup__product-info">
                      <p className="cart-popup__product-name">{obj.title}</p>
                      <span className="cart-popup__product-code">
                        АРТ. {obj.id}
                      </span>
                      <span className="cart-popup__product-size">
                        {obj.selectedSize}
                      </span>
                    </div>
                    {obj.typeRent === "rent" ? (
                      <div className="product__btn-time">
                        <p>
                          <span>{obj.selectedTime}</span>
                          срок аренды
                        </p>
                      </div>
                    ) : (
                      <div className="product__btn-time">ПОКУПКА</div>
                    )}
                    <span className="cart-popup__product-price">
                      {obj.typeRent === "rent" ? obj.rentPrice : obj.buyPrice}
                    </span>
                    <button
                      onClick={() => removeProduct(obj)}
                      className="cart-popup__product-delete"
                    ></button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="cart-popup__bottom">
          <span className="cart-popup__total">{`Итого: ${totalSum}`}</span>
          <button className="cart-popup__btn">ОФОРМИТЬ ПРЕДЗАКАЗ</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
