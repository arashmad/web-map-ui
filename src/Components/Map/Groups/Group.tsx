import React from "react";

interface IGroups {
  children: React.ReactNode;
}
const Group: React.FC<IGroups> = ({ children }) => {
  return <div>{children}</div>;
};

export default Group;
