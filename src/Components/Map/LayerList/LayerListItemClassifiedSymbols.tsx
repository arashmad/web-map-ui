import "./LayerList.css";

/**
 * Interface => Symbol Color.
 */
interface ILayerListItemClassifiedSymbolsSymbol {
  color: string;
}

/**
 * Component => Symbol Color.
 */
const PixelSymbol: React.FC<ILayerListItemClassifiedSymbolsSymbol> = (
  props
) => {
  const { color } = props;

  return (
    <span
      className="mdi mdi-circle-slice-8 symbol"
      style={{ color: color }}
    ></span>
  );
};

/**
 * Interface => Symbol Label.
 */
interface ILayerListItemClassifiedSymbolsLabel {
  label: string;
}

/**
 * Component => Symbol Label.
 */
const PixelLabel: React.FC<ILayerListItemClassifiedSymbolsLabel> = (props) => {
  const { label } = props;
  return <span className="label">{label}</span>;
};

/**
 * Component Interface.
 */
interface ILayerListItemClassifiedSymbols {
  colors: string[];
  labels: string[];
}

/**
 * Component Body.
 */
const LayerListItemClassifiedSymbols: React.FC<
  ILayerListItemClassifiedSymbols
> = (props) => {
  const { colors, labels } = props;
  return (
    <>
      {colors?.map((c, i) => (
        <div className="legend-row" key={i}>
          <PixelSymbol color={c} />
          <PixelLabel label={labels[i]} />
        </div>
      ))}
    </>
  );
};

export default LayerListItemClassifiedSymbols;
