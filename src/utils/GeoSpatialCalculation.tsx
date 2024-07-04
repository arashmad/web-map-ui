import { fromLonLat } from "ol/proj";

import {
  Projection,
  GeographicCoordinate,
  WebMercatorCoordinate,
} from "../types/Map";

/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {GeographicCoordinate} coordinate Longitude and latitude of geographic coordinate system
 * @param {Projection} projectionLike Target projection. Default is Web Mercator, i.e. 'EPSG:3857'.
 * @returns {WebMercatorCoordinate} Coordinate projected to the target projection.
 */
const transformFromLonLat = (
  coordinate: GeographicCoordinate,
  projectionLike: Projection = "EPSG:3857"
): WebMercatorCoordinate => {
  const [x, y] = fromLonLat([coordinate.long, coordinate.lat], projectionLike);
  return { x, y };
};

const GeoSpatialCalculation = {
  transformFromLonLat,
};

export default GeoSpatialCalculation;
