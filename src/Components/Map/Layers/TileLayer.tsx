/* Import from React */
import { useEffect } from "react";

/* Import from ol */
import { Collection } from "ol";
import { Group } from "ol/layer";

/* Import Utility Functions */
import { CreateLayerGroup, CreateTileLayer } from "../utilities/Layer";

/* Import Context Managers */
import { useMapContext } from "../../../context/map.context";

/**
 * Component Interface.
 */
export interface ITileLayerComponent {
  /** Explain me */
  type: string;
  /** Explain me */
  id: string;
  /** Explain me */
  label: string;
  /** Explain me */
  zIndex: number;
  /** Explain me */
  visible: boolean;
  /** Explain me */
  groupId: string;
  /** Explain me */
  groupLabel: string;
  /** Explain me */
  groupZIndex: number;
}

const TileLayer: React.FC<ITileLayerComponent> = ({
  type,
  id,
  label,
  zIndex,
  visible,
  groupId,
  groupLabel,
  groupZIndex,
}) => {
  const { mapCtxMap } = useMapContext();

  useEffect(() => {
    if (mapCtxMap) {
      /**
       * Create a new ol.layer.Group from layer which does not have group yet
       */
      if (!mapCtxMap.getLayers().getArray().length) {
        const layerGroup = CreateLayerGroup({ groupId, groupLabel });
        mapCtxMap.addLayer(layerGroup);
        layerGroup.setZIndex(groupZIndex);
      } else {
        mapCtxMap.getLayers().forEach((layerCollection) => {
          if (layerCollection.get("id") !== groupId) {
            const layerGroup = CreateLayerGroup({ groupId, groupLabel });
            mapCtxMap.addLayer(layerGroup);
            layerGroup.setZIndex(groupZIndex);
          }
        });
      }

      /**
       * Create a new ol.layer.TileLayer.
       */
      const tileLayer = CreateTileLayer({
        type,
        id,
        label,
        groupId,
        zIndex,
        visible,
      });

      /**
       * Add newly created ol.layer.TileLayer to its related group.
       */
      mapCtxMap
        .getLayers()
        .getArray()
        .map((layerGr) => {
          if (layerGr instanceof Group) {
            if (layerGr.get("id") === groupId) {
              const layersInGroup = layerGr.getLayers();

              const layersInGroupAsArray = layersInGroup.getArray();
              const ids = layersInGroupAsArray.map((el) => {
                return el.getZIndex() || 0;
              });

              /**
               * Find the index of the layer to be pushed to the group based on the index
               * In this way, the layers ordered by their zIndex to have a better view in layer manager
               */
              const place = ids.findIndex((el) => el > zIndex);
              if (place < 0) {
                layersInGroup.push(tileLayer);
              } else {
                layersInGroup.insertAt(place, tileLayer);
              }
              if (layersInGroup instanceof Collection) {
                layerGr.setLayers(layersInGroup);
              }
            }
          }
        });

      return () => {
        if (mapCtxMap) {
          mapCtxMap.removeLayer(tileLayer);
        }
      };
    }
  }, [mapCtxMap]);

  return null;
};

export default TileLayer;
