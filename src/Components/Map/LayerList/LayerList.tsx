/* Import from ol */
import { Collection } from "ol";
import { Group } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

/* Import Custom Components */
import LayerListBaseMap from "./LayerListBaseMap";
import LayerListOverlay from "./LayerListOverlay";

/* Import Enums */
import { MapGroupLayers } from "../../../enum/Map";

/* Import Styles */
import "./LayerList.css";

/**
 * Component Interface.
 */
interface ILayerManager {
  /** Collection (ol.Collection) containing groups (ol.group) */
  olLayerCollection: Collection<Group>;
  /** Toggling layer list panel on/off */
  show: boolean;
  /** Handle external link button onClick from child component and return url for 3rd party apps */
  onShowExternalLinkPopup: (sourceLink: string) => void;
}

/**
 * Component Body.
 */
const LayerList: React.FC<ILayerManager> = (props) => {
  const { olLayerCollection, show, onShowExternalLinkPopup } = props;

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (!show) return <></>;

  /**
   * Show embedded error message in component
   */
  if (olLayerCollection.getArray().length === 0) {
    return (
      <div className="container">
        <div style={{ padding: 4 }}>
          <span style={{ color: "#444", fontSize: 11 }}>Loading map ...</span>
        </div>
      </div>
    );
  }

  /**
   * Filter layers in ol.collection using group name
   */
  const filterLayersInCollection = (group: string): Group => {
    return olLayerCollection
      .getArray()
      .filter((lyrGroup) => lyrGroup.get("name") === group)[0];
  };

  /**
   * Return external link for selected layer
   */
  const createExternalLink = (groupName: string, layerName: string) => {
    let sourceLink = "";
    olLayerCollection.forEach((layerGroup) => {
      if (layerGroup.get("name") === groupName) {
        layerGroup.getLayersArray().map((lyr) => {
          if (lyr instanceof TileLayer || lyr instanceof VectorLayer) {
            if (lyr.get("name") === layerName) {
              const layerSource = lyr.getSource();
              const layerSourceURL = layerSource?.getUrls()[0];
              if (lyr instanceof TileLayer) {
                sourceLink = layerSourceURL.split("?extent")[0];
                const parts = sourceLink.split("{z}/{x}/{y}");
                sourceLink = parts[0] + "wmts/capabilities.xml" + parts[1];
                return true;
              }
              // sourceLink = `${
              //   endpoints().data
              // }/geo/${getUserId()}/${wsID}/reference_data`;
            }
          }
        });
      }
    });
    return sourceLink;
  };

  /**
   * Manages displaying popup window containing external link
   */
  const showExternalLinkPopup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    groupName: string,
    layerName: string
  ) => {
    e.preventDefault();
    const sourceLink = createExternalLink(groupName, layerName);
    onShowExternalLinkPopup(sourceLink);
  };

  return (
    <div className="layer-list-container">
      <LayerListBaseMap
        title="Base Maps"
        olGroup={filterLayersInCollection(MapGroupLayers.Base)}
      />
      <LayerListOverlay
        title="Results"
        olGroup={filterLayersInCollection(MapGroupLayers.Results)}
        selectionType="radio"
        displayLegend
        externalLink
        showExternalLinkPopup={(e, layerName) =>
          showExternalLinkPopup(e, MapGroupLayers.Results, layerName)
        }
      />
      <LayerListOverlay
        title="Utils"
        olGroup={filterLayersInCollection(MapGroupLayers.UserUtils)}
        selectionType="checkbox"
        displayLegend
        externalLink
        showExternalLinkPopup={(e, layerName) =>
          showExternalLinkPopup(e, MapGroupLayers.UserUtils, layerName)
        }
      />
    </div>
  );
};

export default LayerList;
