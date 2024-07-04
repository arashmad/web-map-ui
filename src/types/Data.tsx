/* Import from installed node packages */
import { GeoJSON } from "ol/format";

/* Template of layers data content in initial DataLayerGroups. */
export type DataLayerTemplate = {
  /**
   * Layer unique id.
   */
  id: string;
  /**
   * Layer category based on layer source type defined by openlayer
   */
  type: string;
  /**
   * Layer label to be displayed on layer list.
   */
  label: string;
  /**
   * Layer overlay order on base map.
   */
  index: number;
  /**
   * Display layer or not
   */
  visible: boolean;
  /**
   * Geometry information for vector layers
   */
  data?: GeoJSON;
};

/* Template of initial DataLayerGroups. */
export type DataLayerGroupsTemplate = {
  /**
   * Group unique id.
   */
  id: string;
  /**
   * Group label to be displayed on layer list.
   */
  label: string;
  /**
   * Group overlay order on base map.
   */
  index: number;
  /**
   * Layers in group.
   */
  layers: DataLayerTemplate[];
};
