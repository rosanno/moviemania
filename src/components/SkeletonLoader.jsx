import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton width={190} height={280} />
      <Skeleton width={190} className="mt-3" />
      <Skeleton width={90} className="mt-2" />
    </div>
  );
};

export default SkeletonLoader;
