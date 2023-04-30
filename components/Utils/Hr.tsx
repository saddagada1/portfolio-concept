import React from "react";

interface HrProps {
  style?: React.CSSProperties;
}

const Hr: React.FC<HrProps> = ({ style }) => {
  return (
    <div
      className="hr origin-left absolute border-t-[0.1vmax] border-solid border-secondary z-10"
      style={style}
    />
  );
};

export default Hr;
