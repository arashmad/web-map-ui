// Import node packages
import { Map, View } from "ol";
import { Group as LayerGroup } from "ol/layer";
import { defaults as defaultControls, ScaleLine } from "ol/control";

// Import types
import { Map as MapType } from "../types/Map";

export const createMap = (param: MapType): Map => {
  const {
    target,
    zoom,
    center,
    // overlays,
    groups,
    showAttribution,
    showZoom,
    showScaleBar,
  } = param;

  const layers = groups.map((gr) => {
    return new LayerGroup({
      layers: [],
      properties: { name: gr },
    });
  });

  const controls = defaultControls({
    attribution: showAttribution,
    zoom: showZoom,
  });

  if (showScaleBar) {
    controls.extend([
      new ScaleLine({
        units: "metric",
        bar: true,
        steps: parseInt("4", 10),
        text: true,
        minWidth: 140,
      }),
    ]);
  }

  return new Map({
    target: target,
    view: new View({
      zoom: zoom,
      center: [center.x, center.y],
    }),
    layers: layers,
    controls: controls,
  });
};
