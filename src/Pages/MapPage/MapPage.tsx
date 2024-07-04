/* Import Custom Components */
import Layout from "./Specification/Layout";
import Navbar from "./Specification/Navbar";
import Sidebar from "./Specification/Sidebar";
import MapPanel from "./Specification/MapPanel";

import { LayoutTypes } from "../../types";

/**
 * Component Interface.
 */
interface IMapPage {
  title?: string;
  layout?: LayoutTypes.MapPageLayout;
}

/**
 * Component Body.
 */
const MapPage: React.FC<IMapPage> = (props) => {
  const pageLayout =
    typeof props.layout === "undefined" ? "two-col" : props.layout;
  return (
    <Layout layout={pageLayout}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <MapPanel />
      </div>
    </Layout>
  );
};

export default MapPage;
