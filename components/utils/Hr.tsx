import React from "react";

interface HrProps {
  style?: React.CSSProperties;
}

const Hr: React.FC<HrProps> = ({ style }) => {
  return <div className="w-full absolute border-t-2 border-solid border-black" style={style} />;
};

export default Hr;
