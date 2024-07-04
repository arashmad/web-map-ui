/* Import from React */
import { useState, createContext, useContext } from "react";

/* Import from ol */
import { Map } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

/* Import from utils */
import { createMap } from "../utils/MapElements";

/* Import types */
import { MapTypes, DataTypes } from "../types";

/* Import initial data */
import { groups as mapInitLayerGroups } from "../data/data-layers.json";

/* Constant and Temporary values*/
const mapInitZoom = 13;
const mapInitCenter: MapTypes.GeographicCoordinate = {
  long: 13.0635935,
  lat: 52.3934839,
};
const mapInitCenterWebMercator: MapTypes.WebMercatorCoordinate = {
  x: fromLonLat([mapInitCenter.long, mapInitCenter.lat])[0],
  y: fromLonLat([mapInitCenter.long, mapInitCenter.lat])[1],
};

const initialProps = {
  zoom: mapInitZoom,
  center: mapInitCenterWebMercator,
  map: createMap({
    target: "",
    zoom: mapInitZoom,
    groups: [],
    center: mapInitCenterWebMercator,
  }),
  initGroups: mapInitLayerGroups,
};

interface IMapContext {
  /* OL Main Map Object */
  mapCtxMap: Map;
  mapCtxView: MapTypes.MapView;
  mapCtxInitLayerGroups: DataTypes.DataLayerGroupsTemplate[];
  /* About controlling map specification */
  /* About handling map events */
  mapCtxInitialize: (map: Map) => void;
  mapCtxUpdateView: (extent: MapTypes.WebMercatorMapExtent) => void;
  mapCtxUpdateCenter: (center: MapTypes.WebMercatorCoordinate) => void;
  fakeFunction: () => void;

  //   mapCtxUpdateCenter: (center: ICenter3857) => void;
}

export const MapContext = createContext<IMapContext>({
  /* OL Main Map Object */
  mapCtxMap: new Map(),
  mapCtxView: { zoom: mapInitZoom, center: mapInitCenterWebMercator },
  mapCtxInitLayerGroups: mapInitLayerGroups,
  /* About controlling map specification */
  /* About handling map events */
  mapCtxInitialize: () => null,
  mapCtxUpdateView: () => null,
  mapCtxUpdateCenter: () => null,
  fakeFunction: () => null,
});

const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stateOLMapObject, updateOLMapObjectState] = useState<Map>(
    initialProps.map
  );

  const [stateOLMapView, updateOLMapViewState] = useState<MapTypes.MapView>({
    zoom: initialProps.zoom,
    center: initialProps.center,
  });

  const [stateOLMapInitLayerGroups, updateOLMapInitLayerGroups] = useState<
    DataTypes.DataLayerGroupsTemplate[]
  >(initialProps.initGroups);

  /**
   * Initialize Map
   */
  const mapInitializeHandler = (map: Map) => {
    updateOLMapObjectState(map);
  };

  // Fake to discard error in running "yarn build"
  // Will be fixed in the future
  const fakeFunctionHandler = () => {
    updateOLMapViewState({
      zoom: initialProps.zoom,
      center: initialProps.center,
    });
    updateOLMapInitLayerGroups(initialProps.initGroups);
  };

  /**
   * Update view of the map using IExtent3857 object
   */
  const mapUpdateViewHandler = (extent: MapTypes.WebMercatorMapExtent) => {
    const { ll, ur } = extent;
    const targetExtent = [ll.x, ll.y, ur.x, ur.y];
    stateOLMapObject.getView().fit(targetExtent, {
      size: stateOLMapObject.getSize(),
      duration: 300,
    });
  };

  /**
   * Update center of the map using ICenter3857 object
   */
  const mapUpdateCenterHandler = (center: MapTypes.WebMercatorCoordinate) => {
    const { x, y } = center;
    const targetCenter = [x, y];
    stateOLMapObject.getView().fit(new Point(targetCenter), {
      maxZoom: stateOLMapObject.getView().getZoom(),
      duration: 300,
    });
  };

  const value = {
    /* OL Main Map Object */
    mapCtxMap: stateOLMapObject,
    mapCtxView: stateOLMapView,
    mapCtxInitLayerGroups: stateOLMapInitLayerGroups,
    /* About controlling map specification */
    /* About handling map events */
    mapCtxInitialize: mapInitializeHandler,
    mapCtxUpdateView: mapUpdateViewHandler,
    mapCtxUpdateCenter: mapUpdateCenterHandler,
    /* Temp */
    fakeFunction: fakeFunctionHandler,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);

  if (ctx === undefined) {
    throw new Error("useMapContext must be used within a MapContextProvider.");
  }

  return ctx;
};

export default MapContextProvider;
