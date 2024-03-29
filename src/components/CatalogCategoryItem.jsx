// import { Link } from "react-router-dom";

function CatalogCategoryItem({ gender, category, onSelectedCategory }) {
  return (
    <li className="catalog__category-popupitem">
      <span onClick={() => onSelectedCategory(category)}>{category}</span>
    </li>
  );
}
export default CatalogCategoryItem;
