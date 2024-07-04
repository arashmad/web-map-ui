/* Import from React */
import { useState } from "react";

/* Import from ol */
import { Group } from "ol/layer";

/* Import Custom Components */
import LayerListItem from "./LayerListItem";

/* Import Styles */
import "./LayerList.css";

/**
 * Component Interface.
 */
interface ILayerListBaseMap {
  /** Group title in layer list*/
  title: string;
  /** Group (ol.Group) containing layers (ol.layer.*) */
  olGroup: Group;
}

/**
 * Component Body.
 */
const LayerListBaseMap: React.FC<ILayerListBaseMap> = (props) => {
  const { title, olGroup } = props;

  /**
   * Manage toggling layer in one group
   */
  const [activeLayer, setActiveLayer] = useState(
    olGroup?.getLayersArray()[0].get("name")
  );

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (!olGroup?.getLayersArray().length) {
    return <></>;
  }

  /**
   * Manage switching layer in one group
   */
  const onToggleLayer = (layerName: string) => {
    olGroup.getLayers().forEach((lyr) => {
      if (lyr.get("name").indexOf(layerName) >= 0) {
        lyr.setVisible(true);
      } else {
        lyr.setVisible(false);
      }
    });

    /**
     * Updating state
     */
    setActiveLayer(layerName);
  };

  return (
    <div className="layer-list-group">
      <p className="title">{title}</p>
      <div className="body">
        {olGroup
          ?.getLayersArray()
          .map((lyr) => (
            <LayerListItem
              key={lyr.get("name")}
              type="radio"
              name={lyr.get("name")}
              label={lyr.get("name")}
              active={lyr.get("name") === activeLayer}
              onToggleLayer={(e) => onToggleLayer(e.target.value)}
            />
          ))}
      </div>
    </div>
  );
};

export default LayerListBaseMap;
