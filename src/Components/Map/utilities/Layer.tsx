import { Group as LayerGroup } from "ol/layer";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

import { transformSRC } from "./Transformation";

import { MapTileLayerTypes, BaseStylePointLayer } from "../../../enum/Map";

import {
  ILayerGroup,
  ITileLayer,
  IPointLayer,
  IPointStyle,
  IGeoJSONObject,
} from "../Interfaces";

/**
 * Create ol.Source for the ol.layer.Tile layer
 * @param {string} type Type of the ol.source
 */
export const CreateTileSource = (type: string): OSM | XYZ => {
  switch (type) {
    case MapTileLayerTypes.EsriSatellite:
      return new XYZ({
        attributions: [
          "Powered by Esri",
          "Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        ],
        attributionsCollapsible: false,
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 23,
      });

    case MapTileLayerTypes.EsriTopography:
      return new XYZ({
        attributionsCollapsible: false,
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 23,
      });

    case MapTileLayerTypes.OSM:
    default:
      return new OSM();
  }
};

/**
 * Create ol.Source for the ol.layer.Vector layer
 * @param {GeoJSONObject} sourceData Geojson object
 */
export const CreateVectorSource = (
  sourceData: IGeoJSONObject
): VectorSource => {
  const GeoJSONObject3857 = transformSRC(sourceData);
  return new VectorSource({
    features: new GeoJSON().readFeatures(GeoJSONObject3857),
  });
};

/**
 * Create ol.layer.Tile
 * @param {ITileLayer} params layer parameters
 */
export const CreateTileLayer = (params: ITileLayer): TileLayer<OSM | XYZ> => {
  const layer = new TileLayer({
    source: CreateTileSource(params.type),
    properties: {
      id: params.id,
      label: params.label,
      groupId: params.groupId,
      type: params.type,
    },
  });
  layer.setZIndex(params.zIndex);
  layer.setVisible(params.visible);
  return layer;
};

/**
 * Create ol.Style for the ol.layer.Vector layer type
 * @param {IPointStyle} styleParam style parameters
 */
export const CreatePointStyle = (styleParam: IPointStyle): Style => {
  const { radius, fillColor, strokeColor, border } = styleParam;
  const _radius =
    typeof radius === "undefined" ? BaseStylePointLayer.Radius : radius;
  const _fillColor =
    typeof fillColor === "undefined"
      ? BaseStylePointLayer.Fill_Color
      : fillColor;
  const _strokeColor =
    typeof strokeColor === "undefined"
      ? BaseStylePointLayer.Stroke_Color
      : strokeColor;
  const _border =
    typeof border === "undefined" ? BaseStylePointLayer.Border : border;

  const styleObject = {
    radius: _radius,
    fill: new Fill({
      color: _fillColor,
    }),
    stroke: new Stroke({
      color: _strokeColor,
      width: _border,
    }),
  };

  return new Style({
    image: new CircleStyle(styleObject),
  });
};

/**
 * Create ol.Source based on the type
 * @param {IPointLayer} params layer parameters
 */
export const createPointLayer = (params: IPointLayer) => {
  const layer = new VectorLayer({
    source: CreateVectorSource(params.geometry),
    style: CreatePointStyle(params.style),
    properties: {
      id: params.id,
      label: params.label,
      groupId: params.groupId,
    },
  });
  layer.setZIndex(params.zIndex);
  layer.setVisible(params.visible);
  return layer;
};

/**
 * @param {ILayerGroup} params Unique id for the ol.layer.Group
 */
export const CreateLayerGroup = (params: ILayerGroup): LayerGroup => {
  return new LayerGroup({
    properties: {
      id: params.groupId,
      label: params.groupLabel,
    },
    layers: [],
  });
};
