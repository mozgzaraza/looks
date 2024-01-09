// import { Link } from "react-router-dom";

function CatalogCategoryItem({ category }) {
  return (
    <li className="catalog__category-popupitem">
      <span>{category}</span>
      {/* <Link to={`/catalog/${category}`}>
        <span>{category}</span>
      </Link> */}
    </li>
  );
}
export default CatalogCategoryItem;
