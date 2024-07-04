/* Import from React */
import { useEffect, useState } from "react";

/* Import from ol */
import { Group } from "ol/layer";

/* Import Custom Components */
import LayerListItem from "./LayerListItem";

/* Import Enums */
import { MapGroupLayers } from "../../../enum/Map";

/* Import Styles */
import "./LayerList.css";

/**
 * Component Interface.
 */
interface ILayerListOverlay {
  /** Title of each section (group) in list */
  title: string;
  /** Group (ol.Group) containing layers (ol.layer.*) */
  olGroup: Group;
  /** Layer selection type (like the "type" attribute html input element) */
  selectionType: "radio" | "checkbox";
  /** Set to true to show layer list, otherwise false */
  displayLegend?: boolean;
  /** Set to true to show external link of layer in list, otherwise false */
  externalLink?: boolean;
  /** Control collapse effect in each section of layer list */
  collapsed?: boolean;
  /** Handle external link button onClick and return layer name*/
  showExternalLinkPopup: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => void;
}

/**
 * Component Body.
 */
const LayerListOverlay: React.FC<ILayerListOverlay> = (props) => {
  const {
    title,
    olGroup,
    selectionType,
    // displayLegend,
    externalLink,
    showExternalLinkPopup,
  } = props;

  // const _displayLegend =
  //   typeof displayLegend === "undefined" ? false : displayLegend;
  const _externalLink =
    typeof externalLink === "undefined" ? false : externalLink;

  /**
   * State to manage checked/un-checked item(s) in list
   */
  const [selectedLayers, setSelectedLayers] = useState<string[]>([""]);

  /**
   * Create label from name property
   */
  const adjustLabel = (label: string): string => {
    const suffix = label.split("_prefix_")[1];
    if (!suffix) return label;
    return suffix;
  };

  /**
   * Manage toggling layer in one group
   */
  const onToggleLayer = (layerName: string) => {
    olGroup.getLayers().forEach((lyr) => {
      if (lyr.get("name").indexOf(layerName) >= 0) {
        lyr.setVisible(!lyr.getVisible());
      } else {
        if (selectionType === "radio") {
          lyr.setVisible(false);
        }
      }
    });

    /**
     * Update selected item(s) in list
     */
    setSelectedLayers((currentState) =>
      selectionType === "radio"
        ? [layerName]
        : currentState.indexOf(layerName) >= 0
          ? currentState.filter((el) => {
              return el != layerName;
            })
          : [...currentState, layerName]
    );
  };

  /**
   * Manage clicking on external link button
   */
  const onClickExternalLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => {
    showExternalLinkPopup(e, layerName);
  };

  /**
   * UseEffect to set default selected layer in state
   */
  useEffect(() => {
    if (olGroup.getLayersArray().length) {
      const allNames = olGroup.getLayersArray().map((lyr) => {
        return lyr.get("name");
      });
      if (olGroup.get("name") === MapGroupLayers.Results)
        setSelectedLayers([allNames[0]]);
      else if (olGroup.get("name") === MapGroupLayers.UserUtils)
        setSelectedLayers(allNames);
    }
  }, [olGroup.getLayersArray().length]);

  /**
   * Is not added to DOM when ol.Group doesn't contain layer
   */
  if (!olGroup?.getLayersArray().length) {
    return <></>;
  }

  return (
    <div className="layer-list-group">
      <p className="title">{title}</p>
      <div className="body">
        {olGroup?.getLayersArray().map((lyr) => (
          <LayerListItem
            key={lyr.get("name")}
            type={selectionType}
            name={lyr.get("name")}
            label={adjustLabel(lyr.get("name"))}
            active={selectedLayers.indexOf(lyr.get("name")) >= 0}
            externalLink={_externalLink}
            // displayLegend={_displayLegend}
            // legendObject={lyr.get("legend")}
            onToggleLayer={(e) => onToggleLayer(e.target.value)}
            onClickExternalLink={(e, layerName) =>
              onClickExternalLink(e, layerName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LayerListOverlay;
