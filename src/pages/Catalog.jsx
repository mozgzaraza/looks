import React from "react";

import CatalogItem from "../components/CatalogItem";
import CatalogCategoryItem from "../components/CatalogCategoryItem";
import catalog from "../assets/catalog.json";

const Catalog = () => {
  const [genderIndex, setGenderIndex] = React.useState(1);

  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const [currentCategories, setCurrentCategories] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickGender = (index) => {
    setGenderIndex(index);
  };

  const gender = ["женское", "мужское"];

  const selectedGender = gender[genderIndex];

  const manCategoryClothes = ["Все", "мужские", "Одежды"];
  const manCategoryShoes = ["Все", "мужские", "Кроссовки"];
  const manCategoryAccessories = ["Все", "мужские", "Браслеты"];

  const womanCategoryClothes = ["Все", "женские", "Одежды"];
  const womanCategoryShoes = ["Все", "женские", "Кроссовки"];
  const womanCategoryAccessories = ["Все", "женские", "Браслеты"];

  const categoriesData = {
    clothes: {
      мужское: manCategoryClothes,
      женское: womanCategoryClothes,
    },
    shoes: {
      мужское: manCategoryShoes,
      женское: womanCategoryShoes,
    },
    accessories: {
      мужское: manCategoryAccessories,
      женское: womanCategoryAccessories,
    },
  };

  const [openCategory, setOpenCategory] = React.useState(false);

  const onClickCategory = (category) => {
    if (openCategory && selectedCategory != category) {
      setSelectedCategory(category);
    } else {
      setOpenCategory(!openCategory);
      setSelectedCategory(category);
    }
  };
  console.log(openCategory);
  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog__type">
          <ul className="catalog__gender">
            {gender.map((value, i) => (
              <li
                key={i}
                onClick={() => onClickGender(i)}
                className={
                  genderIndex === i
                    ? "catalog__gender-item catalog__gender-item--active"
                    : "catalog__gender-item"
                }
              >
                {value}
              </li>
            ))}
          </ul>
          <div className="catalog__category-inner">
            <ul className="catalog__category">
              <li className="catalog__category-item catalog__category-item--all">
                Посмотреть все
              </li>
              <li
                onClick={() => onClickCategory("clothes")}
                // className={
                //   openCategory === true
                //     ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                //     : "catalog__category-item catalog__category-item--clothes"
                // }
                className={
                  selectedCategory === "clothes" && openCategory
                    ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--clothes"
                }
              >
                одежда
              </li>
              <li
                onClick={() => onClickCategory("shoes")}
                className={
                  selectedCategory === "shoes" && openCategory
                    ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--clothes"
                }
              >
                обувь
              </li>
              <li
                onClick={() => onClickCategory("accessories")}
                className={
                  selectedCategory === "accessories" && openCategory
                    ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--clothes"
                }
              >
                аксессуары
              </li>
            </ul>

            {openCategory && (
              <div className="catalog__category-popupinner">
                <span className="catalog__category-popuptitle">
                  {gender[genderIndex]} одежда
                </span>
                <ul className="catalog__category-popup">
                  {categoriesData[selectedCategory][selectedGender].map(
                    (category, index) => (
                      <CatalogCategoryItem key={index} category={category} />
                    )
                  )}

                  {/* {genderIndex === 0
                    ? womanCategoryClothes.map((category, index) => (
                        <CatalogCategoryItem key={index} category={category} />
                      ))
                    : manCategoryClothes.map((category, index) => (
                        <CatalogCategoryItem key={index} category={category} />
                      ))} */}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="catalog__filter">
          <h1 className="catalog__filter-title">
            пиджаки
            <span>27</span>
          </h1>
          <button className="catalog__filter-btn">фильтр и сортировка</button>
        </div>

        <div className="catalog__content">
          {catalog.map((obj) => (
            <CatalogItem key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Catalog;