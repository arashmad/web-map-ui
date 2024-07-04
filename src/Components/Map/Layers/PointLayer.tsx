import { useEffect } from "react";
import { Collection } from "ol";
import { Group } from "ol/layer";

import { CreateLayerGroup, createPointLayer } from "../utilities/Layer";

import { IPointLayerComponent } from "../Interfaces";

import { useMapContext } from "../../../context/map.context";

const PointLayer: React.FC<IPointLayerComponent> = ({
  id,
  label,
  zIndex,
  visible,
  groupId,
  groupLabel,
  groupZIndex,
  geometry,
  style,
}) => {
  const { mapCtxMap } = useMapContext();

  useEffect(() => {
    if (mapCtxMap) {
      /**
       * Create a new ol.layer.Group from layer which has not group yet
       */

      if (!mapCtxMap.getLayers().getArray().length) {
        const layerGroup = CreateLayerGroup({ groupId, groupLabel });
        mapCtxMap.addLayer(layerGroup);
      } else {
        mapCtxMap.getLayers().forEach((layerCollection) => {
          if (layerCollection.get("id") !== groupId) {
            const layerGroup = CreateLayerGroup({ groupId, groupLabel });

            // debugger;

            const mapLayers = mapCtxMap.getLayers();
            const mapLayersList = mapCtxMap.getLayers().getArray();
            const ids = mapLayersList.map((el) => {
              return el.getZIndex() || 0;
            });

            const place = ids.findIndex((el) => el > groupZIndex);
            if (place < 0) {
              mapLayers.push(layerGroup);
            } else {
              mapLayers.insertAt(place, layerGroup);
            }

            /**
             * Set ol.map layers again with reordered list according to
             * the group zIndex
             */
            if (mapLayers instanceof Collection) {
              mapCtxMap.setLayers(mapLayers);
            }
          }
        });
      }

      /**
       * Create a new ol.layer.Vector.
       */
      const pointLayer = createPointLayer({
        id,
        label,
        zIndex,
        visible,
        groupId,
        geometry,
        style,
      });

      /**
       * Add newly created ol.layer.Vector to its related group.
       */
      mapCtxMap
        .getLayers()
        .getArray()
        .map((layerGr) => {
          if (layerGr instanceof Group) {
            if (layerGr.get("id") === groupId) {
              const layersInGroup = layerGr.getLayers();
              layersInGroup.push(pointLayer);
              if (layersInGroup instanceof Collection) {
                layerGr.setLayers(layersInGroup);
              }
            }
          }
        });

      return () => {
        if (mapCtxMap) {
          mapCtxMap.removeLayer(pointLayer);
        }
      };
    }
  }, [mapCtxMap]);

  return null;
};

export default PointLayer;
