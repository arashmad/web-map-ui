// REF => https://www.youtube.com/watch?v=b-hrxkgkG-s

import { MapPageLayout } from "../../../types/Layout";

interface ILayout {
  layout: MapPageLayout;
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = (props) => {
  return <div className="">{props.children}</div>;
};

export default Layout;
