import React from "react";

import CatalogItem from "../components/CatalogItem";
import Skeleton from "../components/CatalogItem/Skeleton";
import CatalogCategoryItem from "../components/CatalogCategoryItem";

const Catalog = () => {
  const [items, setItems] = React.useState([]);

  const [genderIndex, setGenderIndex] = React.useState(1);

  const [selectedType, setSelectedType] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState("*");
  const [selectedAll, setSelectedAll] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(true);

  const [openCategory, setOpenCategory] = React.useState(false);

  const [openSort, setOpenSort] = React.useState(false);

  const [selectedSort, setSelectedSort] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      selectedAll
        ? ` https://659c1f85d565feee2dac75bf.mockapi.io/items?gender=${genderIndex}`
        : ` https://659c1f85d565feee2dac75bf.mockapi.io/items?gender=${genderIndex}${
            selectedCategory !== "*" ? `&category=${selectedCategory}` : ""
          }`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [genderIndex, selectedCategory, selectedAll]);

  const onClickGender = (index) => {
    setGenderIndex(index);
    setSelectedAll(true);
    setOpenCategory(false);
    setOpenSort(false);
  };

  const onClickCategory = (category) => {
    if (openCategory && selectedType !== category) {
      setSelectedType(category);
    } else {
      setOpenCategory(!openCategory);
      setSelectedType(category);
      setOpenSort(false);
    }
  };
  const onClickAll = () => {
    setSelectedAll(true);
    setOpenCategory(false);
    setSelectedType(null);
    setOpenSort(false);
    console.log(items.length);
  };
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setOpenCategory(false);
    setSelectedAll(false);
  };

  const gender = ["женское", "мужское"];

  const selectedGender = gender[genderIndex];

  // const manCategoryClothes = [
  //   { display: "Все", value: "all" },
  //   { display: "мужские", value: "men" },
  //   { display: "Одежды", value: "clothes" },
  //   { display: "Свитеры", value: "sweaters" },
  //   { display: "Брюки", value: "pants" },
  //   { display: "рубашки", value: "shirts" },
  //   { display: "джинсы", value: "jeans" },
  //   { display: "пальто", value: "coat" },
  // ];
  const manCategoryClothes = [
    "Все",
    "мужские",
    "Одежды",
    "Свитеры",
    "Брюки",
    "рубашки",
    "джинсы",
    "пальто",
  ];
  const manCategoryShoes = ["Вся", "мужская", "обувь"];
  const manCategoryAccessories = ["Все", "мужские", "браслеты"];

  const womanCategoryClothes = [
    "Все",
    "женские",
    "Одежды",
    "Свитеры",
    "Брюки",
    "рубашки",
    "джинсы",
    "пальто",
  ];
  const womanCategoryShoes = ["Вся", "женская", "обувь"];
  const womanCategoryAccessories = ["Все", "женские", "браслеты"];

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
  const sort = ["по новизне", "сначала дешевые", "сначала дорогие"];

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
              <li
                onClick={() => onClickAll()}
                className={
                  selectedAll
                    ? "catalog__category-item catalog__category-item--all catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--all"
                }
              >
                Посмотреть все
              </li>
              <li
                onClick={() => onClickCategory("clothes")}
                className={
                  selectedType === "clothes" && openCategory
                    ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--clothes"
                }
              >
                одежда
              </li>
              <li
                onClick={() => onClickCategory("shoes")}
                className={
                  selectedType === "shoes" && openCategory
                    ? "catalog__category-item catalog__category-item--clothes catalog__category-item--active"
                    : "catalog__category-item catalog__category-item--clothes"
                }
              >
                обувь
              </li>
              <li
                onClick={() => onClickCategory("accessories")}
                className={
                  selectedType === "accessories" && openCategory
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
                  {categoriesData[selectedType][selectedGender].map(
                    (category, index) => (
                      <CatalogCategoryItem
                        onSelectedCategory={handleCategoryChange}
                        key={index}
                        category={category}
                      />
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="catalog__filter">
          <h1 className="catalog__filter-title">
            {selectedAll ? "Все" : selectedCategory}

            <span>{items.length}</span>
          </h1>
          <div className="catalog__filter-popupinner">
            <button
              onClick={() => setOpenSort(!openSort)}
              className="catalog__filter-btn"
            >
              фильтр и сортировка
            </button>
            <div
              className={
                openSort
                  ? "catalog__filter-popup catalog__filter-popup--active"
                  : "catalog__filter-popup"
              }
            >
              <div className="catalog__size-inner">
                <span>размер</span>
                <ul className="catalog__size">
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>
                      xs
                    </label>
                  </li>
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>s
                    </label>
                  </li>{" "}
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>m
                    </label>
                  </li>{" "}
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>l
                    </label>
                  </li>{" "}
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>
                      xl
                    </label>
                  </li>{" "}
                  <li className="catalog__size-item">
                    <label className="catalog__size-label">
                      <input type="checkbox" name="size" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                </ul>
              </div>
              <div className="catalog__color-inner">
                <span>цвет</span>
                <ul className="catalog__color">
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                  <li className="catalog__color-item">
                    <label className="catalog__color-label">
                      <input type="checkbox" name="color" />
                      <span></span>
                      xxl
                    </label>
                  </li>
                </ul>
              </div>
              <div className="catalog__sort-inner">
                <span>сортировка</span>
                <ul className="catalog__sort">
                  {sort.map((name, i) => (
                    <li
                      onClick={() => setSelectedSort(i)}
                      key={i}
                      className={
                        selectedSort === i
                          ? "catalog__sort-item catalog__sort-item--active"
                          : "catalog__sort-item "
                      }
                    >
                      <span></span>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="catalog__content">
          {isLoading
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <CatalogItem key={obj.id} {...obj} />)}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
