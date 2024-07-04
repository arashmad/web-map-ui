export interface ILayerGroup {
  groupId: string;
  groupLabel: string;
}

/**
 * Interface for the Point Vector Layer Style
 */
export interface IPointStyle {
  radius?: number;
  fillColor?: string;
  strokeColor?: string;
  border?: number;
  label?: string;
  labelPosition?: "top" | "bottom";
}

export interface IVectorStyle {
  pointStyle: IPointStyle;
}

/**
 * Interface for the Point Vector Layer
 */
export interface IPointLayer {
  id: string;
  groupId: string;
  label: string;
  zIndex: number;
  visible: boolean;
  geometry: IGeoJSONObject;
  style: IPointStyle;
}

/**
 * Interface for the Tile Layer
 */
export interface ITileLayer {
  type: string;
  id: string;
  groupId: string;
  label: string;
  zIndex: number;
  visible: boolean;
}

/**
 * Interface for the Point Vector Layer Component
 * <PointLayer/>
 */
export interface IPointLayerComponent {
  id: string;
  label: string;
  zIndex: number;
  visible: boolean;
  groupId: string;
  groupLabel: string;
  groupZIndex: number;
  geometry: IGeoJSONObject;
  style: IPointStyle;
}

/**
 * Interface for the GeoJSON Object
 */
export interface IGeoJSONObject {
  type: string;
  features: IFeature[];
}

/**
 * Interface for the GeoJSON Object Feature
 */
export interface IFeature {
  type: string;
  properties: IProperties;
  geometry: IPointGeometry;
}

/**
 * Interface for the GeoJSON Object Feature Geometry of type Point
 */
export interface IPointGeometry {
  coordinates: number[];
  type: string;
}

export interface IProperties {}
