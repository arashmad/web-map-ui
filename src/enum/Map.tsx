export enum MapView {
  Latitude = 52.3934839,
  Longitude = 13.0635935,
  Zoom = 13,
  BaseLayer = "osm",
}

export enum MapGroupLayers {
  Base = "base-map",
  UserData = "user-data",
  UserUtils = "user-utils",
  Results = "results",
}

export enum MapTileLayerTypes {
  OSM = "osm",
  EsriTopography = "esri-topo",
  EsriSatellite = "esri-sat",
}

export enum MapUserDataLayers {
  ReferencePoints = "reference-points",
  TimeSeries = "time-series-data",
}

export enum MapVectorLayerTypes {
  Point = "Point",
  Line = "Linestring",
  Polygon = "Polygon",
}

export enum BaseStylePointLayer {
  Radius = 8,
  Fill_Color = "#FF0000",
  Stroke_Color = "",
  Border = 0,
}

export enum MapLayerPrefix {
  RGB = "custom_rgb_lyr_",
  Util = "util_",
  Classified = "step_",
}
