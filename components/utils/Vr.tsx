import React from "react";

interface VrProps {
  style?: React.CSSProperties;
}

const Vr: React.FC<VrProps> = ({ style }) => {
  return <div className="h-full absolute border-r-2 border-solid border-black" style={style} />;
};

export default Vr;
