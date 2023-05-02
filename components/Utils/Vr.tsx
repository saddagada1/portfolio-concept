import React from "react";

interface VrProps {
  style?: React.CSSProperties;
}

const Vr: React.FC<VrProps> = ({ style }) => {
  return (
    <div
      className="h-full absolute border-r-[0.1vmax] border-solid border-secondary z-10"
      style={style}
    />
  );
};

export default Vr;
