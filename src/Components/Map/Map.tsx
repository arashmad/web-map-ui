/* Import from React */
import React, { useRef, useEffect } from "react";

/* Import from ol */
import { Map as OlMap, View } from "ol";
import { Group } from "ol/layer";

/* Import Context Managers */
import { useMapContext } from "../../context/map.context";

/* Import Types */
import { WebMercatorCoordinate } from "../../types/Map";

/* Import Styles */
import "./Map.css";

/**
 * Map Options Interface.
 */
interface IMapOptions {
  /** Explain me */
  layerList?: boolean;
  /** Explain me */
  drawingTools?: boolean;
}

/**
 * Component Interface.
 */
interface IMap {
  /** Explain me */
  zoom: number;
  /** Explain me */
  center: WebMercatorCoordinate;
  /** Explain me */
  options: IMapOptions;
  /** Explain me */
  topLeftFirst?: React.ReactNode;
  /** Explain me */
  topLeftSecond?: React.ReactNode;
  /** Explain me */
  children?: React.ReactNode;
}

const Map: React.FC<IMap> = ({
  zoom,
  center,
  // options,
  // topLeftFirst,
  // topLeftSecond,
  children,
}) => {
  const { mapCtxInitialize } = useMapContext();

  const mapRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { x, y } = center;

  /**
   * Specifications that ol.Map supports
   */

  /**
   * Options that ol.Map supports
   */
  // const showLayerList =
  //   typeof options.layerList === "undefined" ? false : options.layerList;
  // const showDrawingTools =
  //   typeof options.drawingTools === "undefined" ? false : options.drawingTools;

  /**
   * Create an empty ol.Map instance
   */
  useEffect(() => {
    const options = {
      view: new View({ zoom, center: [x, y] }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new OlMap(options);

    // Helps to see groups and layers
    mapObject.on("click", () => {
      mapObject
        .getLayers()
        .getArray()
        .map((layerGr) => {
          if (layerGr instanceof Group) {
            console.log("");
            console.log("Group :", layerGr.get("id"));
            console.log("Layers :");
            layerGr
              .getLayers()
              .getArray()
              .map((lyr) => {
                console.log(lyr.get("id"));
              });
          }
        });
    });

    mapObject.setTarget(mapRef.current);
    mapCtxInitialize(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <div ref={mapRef} className="ol-map">
      {children}
    </div>
  );
};

export default Map;
