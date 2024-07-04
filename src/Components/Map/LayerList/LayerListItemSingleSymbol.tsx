/* Import Styles */
import "./LayerList.css";

/**
 * Component Interface.
 */
export interface ILayerListItemSingleSymbol {
  /** Explain me */
  color: string;
  /** Explain me */
  label?: string;
}

/**
 * Component Body.
 */
const LayerListItemSingleSymbol: React.FC<ILayerListItemSingleSymbol> = (
  props
) => {
  const { color } = props;

  return (
    <div className="layer-group-item-legend-panel-item">
      <span
        className="mdi mdi-circle-slice-8 mdi-14px"
        style={{ color: color }}
      ></span>
    </div>
  );
};

export default LayerListItemSingleSymbol;
