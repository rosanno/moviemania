import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ loader }) => {
  return Array(loader)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="mt-4">
        <Skeleton className="w-[190px] h-[320px] md:h-[270px] lg:h-[330px] xl:h-[285px]" />
        <Skeleton className="w-[190px] mt-3" />
        <Skeleton width={90} className="mt-1" />
      </div>
    ));
};

export default SkeletonLoader;
