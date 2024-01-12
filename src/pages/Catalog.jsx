import React from "react";

import CatalogItem from "../components/CatalogItem";
import Skeleton from "../components/CatalogItem/Skeleton";
import CatalogCategoryItem from "../components/CatalogCategoryItem";

const Catalog = () => {
  const [items, setItems] = React.useState([]);
  const [allItems, setAllItems] = React.useState([]);

  const [genderIndex, setGenderIndex] = React.useState(1);

  const [selectedType, setSelectedType] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("*");
  const [selectedAll, setSelectedAll] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(true);

  const [openCategory, setOpenCategory] = React.useState(false);

  const [openSort, setOpenSort] = React.useState(false);

  const [selectedSort, setSelectedSort] = React.useState({
    name: "по новизне",
    sortProperty: "date&order=desc",
  });

  const [selectedSizes, setSelectedSizes] = React.useState([]);
  const [availableSizes, setAvailableSizes] = React.useState([]);

  const [selectedColor, setSelectedColor] = React.useState([]);
  const [availableColor, setAvailableColor] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const categoryApi =
      selectedCategory !== "*" ? `&category=${selectedCategory}` : "";
    const sizeApi =
      selectedSizes.length > 0 ? `&size=${selectedSizes.join("|")}` : "";

    const colorApi =
      selectedColor.length > 0 ? `&color=${selectedColor.join("|")}` : "";
    // fetch(
    //   `https://659c1f85d565feee2dac75bf.mockapi.io/items?color=${selectedColor.join(
    //     "|"
    //   )}`
    // )
    fetch(
      selectedAll
        ? ` https://659c1f85d565feee2dac75bf.mockapi.io/items?gender=${genderIndex}&sortBy=${selectedSort.sortProperty}${colorApi}${sizeApi}`
        : ` https://659c1f85d565feee2dac75bf.mockapi.io/items?gender=${genderIndex}&sortBy=${selectedSort.sortProperty}${categoryApi}${colorApi}${sizeApi}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (selectedAll) {
          setAllItems(json);
          setItems(json);
          setIsLoading(false);
        } else {
          setItems(json);
          setIsLoading(false);
        }
      });

    window.scrollTo(0, 0);
  }, [
    genderIndex,
    selectedCategory,
    selectedAll,
    selectedSort,
    selectedSizes,
    selectedColor,
  ]);

  const onClickGender = (index) => {
    setGenderIndex(index);
    setSelectedAll(true);
    setOpenCategory(false);
    setOpenSort(false);
    setSelectedColor([]);
    setSelectedSizes([]);
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
    setSelectedType("");
    setOpenSort(false);
    setSelectedColor([]);
    setSelectedSizes([]);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setOpenCategory(false);
    setSelectedAll(false);
    setSelectedColor([]);
    setSelectedSizes([]);
  };
  const onClickFilter = () => {
    setOpenSort(!openSort);
    setAvailableSizes(uniqueSizes);
    setAvailableColor(uniqueColors);
  };
  const customSizeOrder = (a, b) => {
    const isNumeric = (value) => !isNaN(value);
    const parseSize = (size) => (isNumeric(size) ? parseInt(size, 10) : size);
    if (isNumeric(a) && isNumeric(b)) {
      return parseSize(a) - parseSize(b);
    }
    const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];
    return sizeOrder.indexOf(parseSize(a)) - sizeOrder.indexOf(parseSize(b));
  };

  const currentAvailableSizes = items.reduce((sizes, item) => {
    if (item.size) {
      sizes.push(...item.size);
    }
    return sizes;
  }, []);

  const getTypeCategories = (items, targetType) => {
    const filteredItems = allItems.filter((item) => item.type === targetType);
    const categories = [...new Set(filteredItems.map((item) => item.category))];
    return categories;
  };

  // Пример использования для категорий типа "clothes"
  const dynamicCategories = getTypeCategories(allItems, selectedType);
  // console.log(dynamicCategories);

  console.log(allItems);
  const uniqueSizes = [...new Set(currentAvailableSizes)].sort(customSizeOrder);
  const onClickSize = (sizeName) => {
    if (selectedSizes.includes(sizeName)) {
      setSelectedSizes((selectedSizes) =>
        selectedSizes.filter((size) => size !== sizeName)
      );
    } else {
      setSelectedSizes((selectedSizes) => [...selectedSizes, sizeName]);
    }
  };
  const currentAvailableColors = items.reduce((colors, item) => {
    if (item.color) {
      colors.push(item.color);
    }
    return colors;
  }, []);

  const uniqueColors = [...new Set(currentAvailableColors)];

  const onClickColor = (colorName) => {
    if (selectedColor.includes(colorName)) {
      setSelectedColor((selectedColor) =>
        selectedColor.filter((size) => size !== colorName)
      );
    } else {
      setSelectedColor((selectedColor) => [...selectedColor, colorName]);
    }
  };

  const allSizes = items.reduce((sizes, item) => {
    sizes.push(...item.size);
    return sizes;
  }, []);

  const gender = ["женское", "мужское"];

  const selectedGender = gender[genderIndex];

  // const manCategoryClothes = [
  //   { title: "Все", value: "all" },
  //   { title: "мужские", value: "men" },
  //   { title: "Одежды", value: "clothes" },
  //   { title: "Свитеры", value: "sweaters" },
  //   { title: "Брюки", value: "pants" },
  //   { title: "рубашки", value: "shirts" },
  //   { title: "джинсы", value: "jeans" },
  //   { title: "пальто", value: "coat" },
  // ];

  const categoryTitles = {
    manCategoryClothes: "мужская одежда",
    manCategoryShoes: "мужская обувь",
    manCategoryAccessories: "мужские аксессуары",
    womanCategoryClothes: "женская одежда",
    womanCategoryShoes: "женская обувь",
    womanCategoryAccessories: "женские аксессуары",
  };

  const firstUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const renderTitle = `${
    selectedGender === "женское" ? "woman" : "man"
  }Category${firstUppercase(selectedType)}`;

  // const manCategoryClothes = [
  //   "Свитеры",
  //   "Брюки",
  //   "рубашки",
  //   "джинсы",
  //   "пальто",
  // ];
  // const manCategoryShoes = ["кроссовки"];
  // const manCategoryAccessories = ["браслеты"];

  // const womanCategoryClothes = [
  //   "Свитеры",
  //   "Брюки",
  //   "рубашки",
  //   "джинсы",
  //   "пальто",
  // ];
  // const womanCategoryShoes = ["кроссовки"];
  // const womanCategoryAccessories = ["браслеты"];

  // const categoriesData = {
  //   clothes: {
  //     мужское: manCategoryClothes,
  //     женское: womanCategoryClothes,
  //   },
  //   shoes: {
  //     мужское: manCategoryShoes,
  //     женское: womanCategoryShoes,
  //   },
  //   accessories: {
  //     мужское: manCategoryAccessories,
  //     женское: womanCategoryAccessories,
  //   },
  // };
  const sort = [
    {
      name: "по новизне",
      sortProperty: "date&order=desc",
    },
    {
      name: "сначала дешевые",
      sortProperty: "price&order=asc",
    },
    {
      name: "сначала дорогие",
      sortProperty: "price&order=desc",
    },
  ];

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
                  {categoryTitles[renderTitle]}
                </span>
                <ul className="catalog__category-popup">
                  {/* {categoriesData[selectedType][selectedGender].map(
                    (category, index) => (
                      <CatalogCategoryItem
                        onSelectedCategory={handleCategoryChange}
                        key={index}
                        category={category}
                      />
                    )
                  )} */}
                  {dynamicCategories.map((category, index) => (
                    <CatalogCategoryItem
                      onSelectedCategory={handleCategoryChange}
                      key={index}
                      category={category}
                    />
                  ))}
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
              onClick={() => onClickFilter()}
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
                  {uniqueSizes.map((obj, i) => (
                    <li
                      onClick={() => onClickSize(obj)}
                      key={i}
                      className={
                        selectedSizes.includes(obj)
                          ? "catalog__size-item catalog__size-item--active"
                          : "catalog__size-item"
                      }
                    >
                      <span></span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="catalog__color-inner">
                <span>цвет</span>
                <ul className="catalog__color">
                  {uniqueColors.map((obj, i) => (
                    <li
                      onClick={() => onClickColor(obj)}
                      key={i}
                      className={
                        selectedColor.includes(obj)
                          ? "catalog__color-item catalog__color-item--active"
                          : "catalog__color-item"
                      }
                    >
                      <span></span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="catalog__sort-inner">
                <span>сортировка</span>
                <ul className="catalog__sort">
                  {sort.map((obj, i) => (
                    <li
                      onClick={() => setSelectedSort(obj)}
                      key={i}
                      className={
                        selectedSort.sortProperty === obj.sortProperty
                          ? "catalog__sort-item catalog__sort-item--active"
                          : "catalog__sort-item "
                      }
                    >
                      <span></span>
                      {obj.name}
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
