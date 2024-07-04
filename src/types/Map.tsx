/* Import from ol */
import { Overlay } from "ol";

/* Supported projections. */
export type Projection = "EPSG:4326" | "EPSG:3857";

/* Geographic coordinate template. */
export type GeographicCoordinate = {
  /** Longitude. */
  long: number;
  /** Latitude. */
  lat: number;
};

/* Web Mercator coordinate template. */
export type WebMercatorCoordinate = {
  /** Web Mercator X coordinate. */
  x: number;
  /** Web Mercator Y coordinate. */
  y: number;
};

/* Web Mercator map extent template. */
export type WebMercatorMapExtent = {
  /** Lower-Left corner of the map. */
  ll: WebMercatorCoordinate;
  /** Upper-Right corner of the map. */
  ur: WebMercatorCoordinate;
};

/* Type used for ol map object. */
export type Map = {
  /** The container for the map, either the element itself or the id of the element. */
  target: string;
  /** Zoom level used to calculate the initial resolution for the view. */
  zoom: number;
  /** The initial center for the view in EPSG:3857. */
  center: WebMercatorCoordinate;
  /** Explain me */
  overlays?: Overlay[];
  /** List of unique names to create layer groups in map object. */
  groups: string[];
  /** Toggling attribute information overlaid on map. */
  showAttribution?: boolean;
  /** Toggling zoom in/out buttons on map. */
  showZoom?: boolean;
  /** Toggling scale bare on map. */
  showScaleBar?: boolean;
};

/* Type used for ol map view. */
export type MapView = {
  /** Zoom level used to calculate the initial resolution for the view. */
  zoom: number;
  /** The initial center for the view in EPSG:3857. */
  center: WebMercatorCoordinate;
};
