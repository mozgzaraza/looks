import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="catalog__item"
    speed={2}
    width={312}
    height={500}
    viewBox="0 0 312 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="312" height="400" />
    <rect x="0" y="459" rx="0" ry="0" width="170" height="22" />
    <rect x="0" y="416" rx="0" ry="0" width="312" height="25" />
  </ContentLoader>
);

export default Skeleton;
