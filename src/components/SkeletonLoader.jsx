import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ loader }) => {
  return Array(loader)
    .fill(0)
    .map((_, i) => (
      <div key={i}>
        <Skeleton className="w-[190px] h-[240px] sm:h-[260px]" />
        <Skeleton className="w-[190px] mt-3" />
        <Skeleton width={90} className="mt-2" />
      </div>
    ));
};

export default SkeletonLoader;
