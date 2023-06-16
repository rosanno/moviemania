import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ loader }) => {
  return Array(loader)
    .fill(0)
    .map((_, i) => (
      <div key={i}>
        <Skeleton width={195} height={280} />
        <Skeleton width={195} className="mt-3" />
        <Skeleton width={90} className="mt-2" />
      </div>
    ));
};

export default SkeletonLoader;
