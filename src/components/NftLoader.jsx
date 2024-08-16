import React from "react";
import Skeleton from "react-loading-skeleton";

const NftLoader = () => {
  const renderSkeleton = () => {
    const el = [];
    for (let index = 0; index < 12; index++) {
      el.push(<Skeleton width={"100%"} height={300} />);
    }
    return el;
  };
  return <div className="py-4 nft-container">{renderSkeleton()}</div>;
};

export default NftLoader;
