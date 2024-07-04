/* Import Styles */
import "./LayerList.css";

/**
 * Component Interface.
 */
interface ILayerListItem {
  /** Layer selection type (like the "type" attribute html input element) */
  type: "radio" | "checkbox";
  /** Layer name to be used in interaction controls (should be unique) */
  name: string;
  /** Layer label to show on list */
  label: string;
  /** Set to true if the layer is switched on, otherwise false */
  active: boolean;
  /** Set to true if need to display layer external link, otherwise false */
  externalLink?: boolean;
  /** Handle toggling layer on/off */
  onToggleLayer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handle external link button onClick from child component and return layer name */
  onClickExternalLink?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    layerName: string
  ) => void;
}

/**
 * Component Body.
 */
const LayerListItem: React.FC<ILayerListItem> = () => {
  // const {
  //   type,
  //   name,
  //   label,
  //   active,
  //   externalLink,
  //   onToggleLayer,
  //   onClickExternalLink,
  // } = props;

  return (
    <>
      <div className="inner">
        {/* <Row className="align-items-center">
          <Col sm={1}>
            <input
              type={type}
              value={name}
              onChange={onToggleLayer}
              checked={active}
              disabled={!_valid}
            />
          </Col>
          <Col className="font-size-xs">{label}</Col>
        </Row> */}
        {/* {externalLink ? (
          <div className="second">
            <IconButton
              name="mdi-earth"
              size="sm"
              helper="Show external link"
              displayed={_valid && externalLink}
              onClick={
                onClickExternalLink
                  ? (e) => onClickExternalLink(e, name)
                  : () => {}
              }
            />
            <IconButton
              name="mdi-close-circle"
              size="sm"
              helper="Dataset is empty!"
              color="error"
              displayed={!_valid}
              disabled={true}
              onClick={() => {}}
            />
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
};

export default LayerListItem;
