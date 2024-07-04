import React from "react";

interface ILayers {
  children: React.ReactNode;
}
const Layers: React.FC<ILayers> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layers;
